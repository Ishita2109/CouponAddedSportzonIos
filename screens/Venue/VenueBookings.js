import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import useBookings from '../../hooks/useBookings';
import { useNavigation } from '@react-navigation/native';

const VenuesBooking = () => {
    const navigation = useNavigation();
    const { bookings, loading, error, refetch } = useBookings('venue');

    const renderBookingCard = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('MyBookingsDetails', { booking: item })}
        >
            <View style={styles.cardContent}>
                <Text style={styles.venueTitle}>{item.venue_name}</Text>
                <Text style={styles.dateTime}>{item.date} • {item.time}</Text>
                <Text style={styles.amountText}>₹{item.amount}</Text>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#063970" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={refetch}>
                    <Text style={styles.retryText}>Try Again</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (!bookings.length) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.noBookingsText}>No bookings found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={bookings}
                renderItem={renderBookingCard}
                keyExtractor={item => item.id?.toString()}
                contentContainerStyle={styles.listContainer}
                onRefresh={refetch}
                refreshing={loading}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    listContainer: {
        padding: 16,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    cardContent: {
        padding: 16,
    },
    venueTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    dateTime: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    amountText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#063970',
    },
    errorText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 12,
    },
    retryButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#063970',
        borderRadius: 4,
    },
    retryText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
    },
    noBookingsText: {
        fontSize: 16,
        color: '#666',
    },
});

export default VenuesBooking;