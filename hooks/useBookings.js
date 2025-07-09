import { useState, useEffect } from 'react';
import api from '../utils/api';
import SessionManager from '../utils/sessionManager';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKINGS_CACHE_KEY = 'cached_bookings';
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes

const useBookings = (type = 'all') => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchClassBookings = async (sessionData) => {
        try {
            console.log('Starting fetchClassBookings...');
            const headers = {
                'Authorization': `Bearer ${sessionData.timestamp}`,
                'Content-Type': 'application/json',
                'X-Session-Expiry': sessionData.expiryDate,
                'X-Last-Activity': sessionData.lastActivity
            };

            console.log('Making API call to /landing/class-registration/my-classes');
            const response = await api.get('/landing/class-registration/my-classes', { headers });
            console.log('Raw class registrations response:', JSON.stringify(response.data, null, 2));
            
            if (!response.data || !response.data.data) {
                console.log('No class registrations data found');
                return [];
            }

            // Filter registrations for current user
            const userRegistrations = response.data.data.filter(registration => 
                registration.user === sessionData.userData._id
            );

            console.log('Found user registrations:', userRegistrations.length);

            // Transform registrations to match booking format
            const transformedBookings = userRegistrations.map(registration => {
                const classTiming = JSON.parse(registration.classTiming || '{}');
                
                return {
                    id: registration._id,
                    venue_name: registration.admissionIn?.title || 'Class Name Not Available',
                    date: registration.admissionDate || new Date().toISOString().split('T')[0],
                    time: classTiming.from && classTiming.to 
                        ? `${classTiming.from} - ${classTiming.to}` 
                        : 'Time Not Available',
                    amount: registration.admissionIn?.fees || 0,
                    status: registration.status || 'active',
                    image: registration.admissionIn?.banner,
                    address: registration.admissionIn?.address || 'Address not available',
                    booked_on: registration.createdAt || new Date().toISOString(),
                    payment_method: 'Online',
                    transaction_id: registration.response?.razorpay_payment_id,
                    payment_status: registration.response ? 'completed' : 'pending',
                    booking_type: 'class',
                    class_details: {
                        ...registration.admissionIn,
                        description: registration.admissionIn?.description,
                        duration: registration.admissionIn?.duration,
                        feesFrequency: registration.admissionIn?.feesFrequency,
                        activity: registration.admissionIn?.activity,
                        coaches: registration.admissionIn?.coaches,
                        classTiming: classTiming
                    },
                    student_details: {
                        name: registration.fullName,
                        age: registration.age,
                        parentName: registration.parentName,
                        parentMobile: registration.parentMobile,
                        email: registration.email,
                        mobile: registration.mobile,
                        gender: registration.gender,
                        height: registration.height,
                        weight: registration.weight
                    }
                };
            });

            // Cache the transformed bookings
            await cacheBookings(transformedBookings, type);
            return transformedBookings;
        } catch (err) {
            console.error('Error in fetchClassBookings:', err);
            // Try to get cached data on error
            const cachedData = await getCachedBookings(type);
            if (cachedData) {
                return cachedData;
            }
            return [];
        }
    };

    const cacheBookings = async (bookingsData, bookingType) => {
        try {
            const cacheKey = `${BOOKINGS_CACHE_KEY}_${bookingType}`;
            const cacheData = {
                data: bookingsData,
                timestamp: new Date().getTime()
            };
            await AsyncStorage.setItem(cacheKey, JSON.stringify(cacheData));
        } catch (error) {
            console.error('Error caching bookings:', error);
        }
    };

    const getCachedBookings = async (bookingType) => {
        try {
            const cacheKey = `${BOOKINGS_CACHE_KEY}_${bookingType}`;
            const cachedData = await AsyncStorage.getItem(cacheKey);
            if (cachedData) {
                const { data, timestamp } = JSON.parse(cachedData);
                if (new Date().getTime() - timestamp < CACHE_EXPIRY) {
                    return data;
                }
            }
            return null;
        } catch (error) {
            console.error('Error getting cached bookings:', error);
            return null;
        }
    };

    const fetchBookings = async () => {
        try {
            console.log('Starting to fetch bookings...');
            setLoading(true);
            
            // First check if session is valid
            const isSessionValid = await SessionManager.checkSession();
            if (!isSessionValid) {
                console.log('Session check failed, attempting to refresh...');
                const refreshed = await SessionManager.refreshSession();
                if (!refreshed) {
                    console.log('Session refresh failed');
                    setError('Session expired. Please login again.');
                    setBookings([]);
                    return;
                }
            }

            const sessionData = await SessionManager.getSessionData();
            console.log('Session data:', JSON.stringify(sessionData, null, 2));
            
            if (!sessionData?.isLoggedIn) {
                console.log('User not logged in, checking session validity...');
                const isValid = await SessionManager.checkSession();
                if (!isValid) {
                    console.log('Session invalid, user needs to login');
                    setError('Please login to view your bookings');
                setBookings([]);
                return;
                }
            }

            // Check if session needs refresh
            const currentTime = new Date().getTime();
            if (currentTime > (sessionData.expiryDate - (5 * 24 * 60 * 60 * 1000))) {
                console.log('Session close to expiry, refreshing...');
                await SessionManager.refreshSession();
                // Get updated session data
                const updatedSession = await SessionManager.getSessionData();
                if (updatedSession) {
                    sessionData.timestamp = updatedSession.timestamp;
                    sessionData.expiryDate = updatedSession.expiryDate;
                    sessionData.lastActivity = updatedSession.lastActivity;
                }
            }

            await SessionManager.updateActivity();

            // Try to get cached data first
            const cachedBookings = await getCachedBookings(type);
            if (cachedBookings) {
                console.log('Using cached bookings data');
                setBookings(cachedBookings);
                setLoading(false);
            }

            if (type === 'class') {
                console.log('Fetching class bookings...');
                const classBookings = await fetchClassBookings(sessionData);
                console.log('Class bookings fetched:', JSON.stringify(classBookings, null, 2));
                setBookings(classBookings);
                setError(null);
                return;
            }

            const headers = {
                'Authorization': `Bearer ${sessionData.timestamp}`,
                'Content-Type': 'application/json',
                'X-Session-Expiry': sessionData.expiryDate,
                'X-Last-Activity': sessionData.lastActivity
            };

            console.log('Making API request with headers:', JSON.stringify(headers, null, 2));
            console.log('Fetching bookings for user:', sessionData.userData._id);
            
            const response = await api.get(`/landing/bookings?user_id=${sessionData.userData._id}`, { headers });
            console.log('Raw API response:', JSON.stringify(response.data, null, 2));

            if (!response.data || !response.data.data) {
                console.log('No bookings data found in response');
                setBookings([]);
                return;
            }

            // Filter bookings for current user
            let userBookings = response.data.data.filter(booking => 
                booking.user === sessionData.userData._id
            );
            if(type === 'venue') {
                userBookings = userBookings.filter(booking => booking?.bookingType === "arena" );
            }
            if(type === 'event') {
                userBookings = userBookings.filter(booking => booking?.bookingType === "event" );
            }

            console.log('Found user bookings:', userBookings.length);

            const transformedBookings = userBookings.map(booking => {
                const courtDetails = booking.court?.[0] || {};
                const slots = courtDetails.slots || [];

                return {
                    id: booking._id,
                    venue_name: booking.arena?.title || 'Venue Name Not Available',
                    date: courtDetails.date || booking.date || new Date().toISOString().split('T')[0],
                    time: slots[0]?.value || courtDetails.time || booking.time || 'Time Not Available',
                    amount: courtDetails.amount || booking.amount || 0,
                    status: booking.eventStatus || booking.status || 'completed',
                    image: booking.arena?.image || booking.venue_image,
                    address: booking.arena?.address || booking.venue_address,
                    booked_on: booking.createdAt || booking.booked_on || new Date().toISOString(),
                    payment_method: booking.payment_method || 'Online',
                    transaction_id: booking.orderId || booking.transaction_id,
                    slots: slots.map(slot => slot.value),
                    payment_status: booking.paymentStatus || 'completed',
                    booking_type: booking.bookingType || 'venue',
                    bookingId: booking.bookingId,
                    orderId: booking.orderId,
                    user: booking.user,
                    arena: booking.arena,
                    court: booking.court
                };
            });
            
            // Cache the transformed bookings
            await cacheBookings(transformedBookings, type);
            
            console.log('Final transformed bookings:', JSON.stringify(transformedBookings, null, 2));
            setBookings(transformedBookings);
            setError(null);
        } catch (err) {
            console.error('Error in fetchBookings:', err);
            if (err.response) {
                console.error('Error response:', JSON.stringify(err.response.data, null, 2));
            }
            // Try to get cached data on error
            const cachedData = await getCachedBookings(type);
            if (cachedData) {
                setBookings(cachedData);
                setError('Using cached data due to network error');
            } else {
            setError(err.message || 'Failed to load bookings');
            setBookings([]);
            }
        } finally {
            setLoading(false);
            console.log('Finished fetching bookings');
        }
    };

    useEffect(() => {
        fetchBookings();
    }, [type]);

    return { bookings, loading, error, refetch: fetchBookings };
};

export default useBookings;  



