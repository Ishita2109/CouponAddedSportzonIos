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

const TransactionHistory = () => {
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        checkSessionAndFetchTransactions();
    }, []);

    const checkSessionAndFetchTransactions = async () => {
        try {
            const sessionData = await SessionManager.getSessionData();
            console.log('Session Data:', sessionData);
            
            if (!sessionData || !sessionData.isLoggedIn) {
                setIsLoggedIn(false);
                return;
            }

            const currentTime = new Date().getTime();
            const expiryDate = sessionData.expiryDate || (sessionData.timestamp + (24 * 60 * 60 * 1000));
            
            if (currentTime > expiryDate) {
                await SessionManager.clearSession();
                setIsLoggedIn(false);
                return;
            }

            if (!sessionData.expiryDate) {
                await SessionManager.setSessionData({
                    ...sessionData,
                    expiryDate
                });
            }

            setIsLoggedIn(true);
            await fetchTransactions();
        } catch (error) {
            console.error('Session check error:', error);
            setIsLoggedIn(false);
        }
    };

    const fetchTransactions = async () => {
        if (loading) return;
        
        try {
            setLoading(true);
            const sessionData = await SessionManager.getSessionData();
            
            if (!sessionData?.isLoggedIn) {
                setIsLoggedIn(false);
                return;
            }

            await SessionManager.updateActivity();

            const headers = {
                'Authorization': `Bearer ${sessionData.timestamp}`,
                'Content-Type': 'application/json',
                'X-Session-Expiry': sessionData.expiryDate,
                'X-Last-Activity': sessionData.lastActivity
            };

            console.log('Making API call with headers:', headers);
            const paymentId = await AsyncStorage.getItem('last_payment_id');
            const endpoint = paymentId 
                ? `/landing/payments/recent-transactions?payment_id=${paymentId}`
                : '/landing/payments/recent-transactions';
                
            const response = await api.get(endpoint, { headers });
            console.log('Raw API Response:', JSON.stringify(response.data, null, 2));

            if (response.data && response.data.data) {
                const transformedTransactions = response.data.data.map(item => ({
                    transaction_id: item.value.id,
                    date_time: new Date(item.value.created_at * 1000).toLocaleString(),
                    amount: item.value.amount / 100,
                    payment_method: item.value.method?.toUpperCase() || 'N/A',
                    status: item.value.status || 'PENDING',
                    purpose: item.value.description || 'Venue Booking'
                }));
                setTransactions(transformedTransactions);
            } else {
                setTransactions([]);
            }
        } catch (error) {
            console.error('Error fetching transactions:', error.response || error);
            if (error.response?.status === 401) {
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
            <Text style={{
                fontSize: 13,
                color: '#444',
            }}>Purpose: <Text style={{ fontWeight: '600' }}>{item.purpose}</Text></Text>
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
