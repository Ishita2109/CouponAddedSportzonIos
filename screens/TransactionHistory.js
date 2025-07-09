import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    FlatList,
    ActivityIndicator,
    Alert,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import api from '../utils/api';
import { useNavigation } from '@react-navigation/native';
import SessionManager from '../utils/sessionManager';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const TransactionHistory = () => {
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigation = useNavigation();
    const [sessionData, setSessionData] = useState(null);
    SessionManager.getSessionData()
    .then(sessionData => {
    //   console.log('Session Data:', sessionData);
      setSessionData(sessionData?.userData);
    })
    .catch(error => {
      console.error('Error getting session data:', error);
    });
    useEffect(() => {
        checkSessionAndFetchTransactions();
    }, [sessionData?.userData]);

    const checkSessionAndFetchTransactions = async () => {
        try {
            const sessionData = await SessionManager.getSessionData();
            console.log('Session Data:', sessionData);
            
            if (!sessionData || !sessionData.isLoggedIn || !sessionData.userData?._id) {
                setIsLoggedIn(false);
                setTransactions([]);
                return;
            }

            const currentTime = new Date().getTime();
            const expiryDate = sessionData.expiryDate || (sessionData.timestamp + (24 * 60 * 60 * 1000));
            
            if (currentTime > expiryDate) {
                await SessionManager.clearSession();
                setIsLoggedIn(false);
                setTransactions([]);
                return;
            }

            setIsLoggedIn(true);
            await fetchTransactions();
        } catch (error) {
            console.error('Session check error:', error);
            setIsLoggedIn(false);
            setTransactions([]);
        }
    };

    const fetchTransactions = async () => {
        if (loading) return;
        
        try {
            setLoading(true);
            const sessionData = await SessionManager.getSessionData();
            
            if (!sessionData?.isLoggedIn || !sessionData?.userData?._id) {
                console.log('User not logged in or missing user ID');
                setIsLoggedIn(false);
                setTransactions([]);
                return;
            }

            await SessionManager.updateActivity();

            const headers = {
                'Authorization': `Bearer ${sessionData.timestamp}`,
                'Content-Type': 'application/json',
                'X-Session-Expiry': sessionData.expiryDate,
                'X-Last-Activity': sessionData.lastActivity
            };
            let apiUrl=`https://sportzon.in/api/landing/payments/recent-transactions?user_id=${sessionData.userData._id}`

            const response = await axios.get(apiUrl, { headers });
            // console.log('API Response:', JSON.stringify(response.data, null, 2));
                console.log("==========================>",response,"================",apiUrl,"====",sessionData.userData)
          
            if (response.data && response.data.data) {
                console.log('Raw transactions data:', JSON.stringify(response.data.data, null, 2));
                // Transform the transactions data
                const transformedTransactions = response.data.data.map(item => {
                    // Check if item exists and has required properties
                    if (!item || !item.value) {
                        console.log('Invalid transaction item:', item);
                        return null;
                    }

                    try {
                        return {
                            transaction_id: item.value.id || item.value.payment_id,
                            date_time: new Date(item.value.created_at * 1000).toLocaleString(),
                            amount: item.value.amount / 100,
                            payment_method: item.value.method?.toUpperCase() || 'N/A',
                            status: item.value.status || 'PENDING',
                            purpose: item.value.description || 'Venue Booking',
                            type: item.value.entity || 'payment',
                            location: item.value.description?.split(' - ')[0] || 'N/A',
                            vpa: item.value.vpa || null,
                            order_id: item.value.order_id || null,
                            venue: item.value.venue || 'N/A',
                            court: item.value.court || 'N/A',
                            slot: item.value.slot || 'N/A'
                        };
                    } catch (error) {
                        console.error('Error transforming transaction:', error, item);
                        return null;
                    }
                }).filter(Boolean); // Remove any null entries

                console.log('Transformed transactions:', transformedTransactions);
                setTransactions(transformedTransactions);
            } else {
                console.log('No transactions data found in response');
                setTransactions([]);
            }
        } catch (error) {
            console.error('Error fetching transactions:', error);
            if (error.response?.status === 401) {
                await SessionManager.clearSession();
                setIsLoggedIn(false);
            } else {
                Alert.alert(
                    'Error',
                    error.response?.data?.message || 'Failed to fetch transactions. Please try again later.'
                );
            }
            setTransactions([]);
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        try {
            await fetchTransactions();
        } finally {
            setRefreshing(false);
        }
    }, []);

    const renderNotLoggedIn = () => (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 80,
        }}>
            <Text style={{
                fontSize: 16,
                color: '#888',
            }}>Please login to view your transactions</Text>
            <TouchableOpacity 
                style={{
                    backgroundColor: '#0047AB',
                    paddingHorizontal: 30,
                    paddingVertical: 12,
                    borderRadius: 25,
                    marginTop: 20,
                }}
                onPress={() => navigation.navigate('LoginModal')}
            >
                <Text style={{
                    color: 'white',
                    fontSize: 16,
                    fontWeight: 'bold',
                }}>Login Now</Text>
            </TouchableOpacity>
        </View>
    );

    const renderTransaction = ({ item }) => (
        <View style={{
            backgroundColor: 'white',
            padding: 15,
            borderRadius: 10,
            marginBottom: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 3,
        }}>
            <Text style={{
                fontSize: 14,
                fontWeight: 'bold',
                marginBottom: 4,
                color: '#0047AB',
            }}>Txn ID: {item.transaction_id}</Text>
            <Text style={{
                fontSize: 12,
                color: '#555',
                marginBottom: 8,
            }}>{item.date_time}</Text>
            <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#222',
                marginBottom: 6,
            }}>₹{item.amount}</Text>
            <Text style={{
                fontSize: 13,
                color: '#444',
            }}>Payment Method: <Text style={{ fontWeight: '600' }}>{item.payment_method}</Text></Text>
            <Text style={{
                fontSize: 13,
                color: '#444',
            }}>Status: <Text style={[{ fontWeight: '600' }, statusStyle(item.status)]}>{item.status}</Text></Text>
            {item.location && (
                <Text style={{
                    fontSize: 13,
                    color: '#444',
                    marginTop: 2,
                }}>Location: <Text style={{ fontWeight: '600' }}>{item.location}</Text></Text>
            )}
        </View>
    );

    const statusStyle = (status) => {
        switch (status.toLowerCase()) {
            case 'success':
            case 'fulfilled':
            case 'captured':
                return { color: 'green' };
            case 'failed':
                return { color: 'red' };
            case 'pending':
                return { color: '#FFA500' };
            case 'refunded':
                return { color: 'purple' };
            default:
                return { color: '#333' };
        }
    };

    const renderEmpty = () => (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 80,
        }}>
            <Text style={{
                fontSize: 16,
                color: '#888',
            }}>No transactions found.</Text>
        </View>
    );

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: '#F5F7FA',
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 15,
                backgroundColor: '#F5F7FA',
            }}>
                <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    style={{
                        padding: 8,
                        borderRadius: 20,
                        backgroundColor: 'white',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 3,
                        elevation: 3,
                    }}
                >
                    <Ionicons name="arrow-back" size={24} color="#0047AB" />
                </TouchableOpacity>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: '#0047AB',
                    marginLeft: 15,
                }}>
                    Transaction History
                </Text>
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#0047AB" />
            ) : !isLoggedIn ? (
                renderNotLoggedIn()
            ) : (
                <FlatList
                    data={transactions}
                    keyExtractor={(item, index) => item.transaction_id || index.toString()}
                    renderItem={renderTransaction}
                    contentContainerStyle={{
                        padding: 15,
                    }}
                    ListEmptyComponent={renderEmpty}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={["#0047AB"]}
                        />
                    }
                />
            )}
        </SafeAreaView>
    );
};

export default TransactionHistory;
 





