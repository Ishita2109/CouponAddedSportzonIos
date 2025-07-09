import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    FlatList,
    ActivityIndicator,
    Alert,
    TouchableOpacity,
} from 'react-native';
import api from '../utils/api';
import { useNavigation } from '@react-navigation/native';
import SessionManager from '../utils/sessionManager';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TransactionHistory = () => {
    const [loading, setLoading] = useState(false);
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
            // If expiryDate is not set, calculate it as 24 hours from timestamp
            const expiryDate = sessionData.expiryDate || (sessionData.timestamp + (24 * 60 * 60 * 1000));
            
            if (currentTime > expiryDate) {
                await SessionManager.clearSession();
                setIsLoggedIn(false);
                return;
            }

            // Update sessionData with expiryDate if it was missing
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
        if (loading) return; // Prevent multiple simultaneous calls
        
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
            const response = await api.get('/landing/payments/recent-transactions', { headers });
            console.log('API Response:', response.data);

            if (response.data && response.data.data) {
                const transformedTransactions = response.data.data.map(item => ({
                    transaction_id: item.value.id,
                    created_at: new Date(item.value.created_at * 1000).toLocaleString(),
                    amount: item.value.amount / 100,
                    payment_method: item.value.method.toUpperCase(),
                    status: item.value.status,
                    description: item.value.description || 'N/A'
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

    const renderNotLoggedIn = () => (
        <View style={styles.notLoggedInContainer}>
            <Text style={styles.notLoggedInText}>Please login to view your transactions</Text>
            <TouchableOpacity 
                style={styles.loginButton}
                onPress={() => navigation.navigate('LoginModal')}
            >
                <Text style={styles.loginButtonText}>Login Now</Text>
            </TouchableOpacity>
        </View>
    );

    const renderTransaction = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.transactionHeader}>
                <Text style={styles.transactionId}>Txn ID: {item.transaction_id}</Text>
                <Text style={[styles.status, statusStyle(item.status)]}>
                    {item.status.toUpperCase()}
                </Text>
            </View>
            <Text style={styles.dateTime}>{item.created_at}</Text>
            <Text style={styles.amount}>₹{item.amount}</Text>
            <Text style={styles.label}>Payment Method: <Text style={styles.value}>{item.payment_method}</Text></Text>
            <Text style={styles.label}>Description: <Text style={styles.value}>{item.description}</Text></Text>
        </View>
    );

    const statusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'success':
            case 'fulfilled':
            case 'captured':
                return { color: '#4CAF50' };
            case 'failed':
                return { color: '#F44336' };
            case 'pending':
                return { color: '#FFA500' };
            case 'refunded':
                return { color: '#9C27B0' };
            default:
                return { color: '#333' };
        }
    };

    const renderEmpty = () => (
        <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No transactions found</Text>
            <Text style={styles.emptySubText}>Your transaction history will appear here</Text>
        </View>
    );

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#0047AB" />
            </SafeAreaView>
        );
    }

    if (!isLoggedIn) {
        return (
            <SafeAreaView style={styles.container}>
                {renderNotLoggedIn()}
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={transactions}
                keyExtractor={(item, index) => item.transaction_id || index.toString()}
                renderItem={renderTransaction}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={renderEmpty}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    listContainer: {
        padding: 15,
    },
    card: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    transactionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    transactionId: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#0047AB',
    },
    status: {
        fontSize: 12,
        fontWeight: '600',
    },
    dateTime: {
        fontSize: 12,
        color: '#666',
        marginBottom: 8,
    },
    amount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 8,
    },
    label: {
        fontSize: 13,
        color: '#666',
        marginBottom: 4,
    },
    value: {
        color: '#333',
        fontWeight: '500',
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 80,
        padding: 20,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#666',
        marginTop: 16,
    },
    emptySubText: {
        fontSize: 14,
        color: '#999',
        marginTop: 8,
        textAlign: 'center',
    },
    notLoggedInContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    notLoggedInText: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    loginButton: {
        backgroundColor: '#0047AB',
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 25,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default TransactionHistory; 