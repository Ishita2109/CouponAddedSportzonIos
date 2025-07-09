import { useState, useEffect } from 'react';
import axios from 'axios';
import SessionManager from '../utils/sessionManager';

const useBookings = (type = 'all') => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const sessionData = await SessionManager.getSessionData();
            console.log('Session data in useBookings:', sessionData);
            
            if (!sessionData?.isLoggedIn) {
                console.log('User not logged in');
                setBookings([]);
                setError('User not logged in');
                return;
            }

            if (!sessionData?.userData?._id) {
                console.log('No user ID found in session');
                setBookings([]);
                setError('No user ID found');
                return;
            }

            console.log('Fetching bookings for user:', sessionData.userData._id);
            const response = await axios.get(`https://sportzon.in/api/landing/bookings?user_id=${sessionData.userData._id}`);
            console.log('Bookings API response:', response.data);
            
            // Filter bookings based on type
            let filteredBookings = response.data.data || [];
            if (type !== 'all') {
                filteredBookings = filteredBookings.filter(booking => booking.type === type);
            }
            
            console.log('Filtered bookings:', filteredBookings);
            setBookings(filteredBookings);
            setError(null);
        } catch (err) {
            console.error('Error in fetchBookings:', err);
            if (err.response) {
                console.error('Error response:', err.response.data);
            }
            setError(err.message);
            setBookings([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, [type]);

    return { bookings, loading, error, refetch: fetchBookings };
};

export default useBookings; 