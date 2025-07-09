import React, { useState } from 'react';
import {SafeAreaView,StyleSheet, View, Text, TouchableOpacity, FlatList, ActivityIndicator,} from 'react-native';
import useBookings from '../hooks/useBookings';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const VenuesTab = () => {
    const { bookings, loading, error, refetch } = useBookings('venue');
    return <BookingsList bookings={bookings} loading={loading} error={error} refetch={refetch} type='venue' />;
};

const EventsTab = () => {
    const { bookings, loading, error, refetch } = useBookings('event');
    return <BookingsList bookings={bookings} loading={loading} error={error} refetch={refetch} type='event'  />;
};

const ClassesTab = () => {
    const { bookings, loading, error, refetch } = useBookings('class');
    return <BookingsList bookings={bookings} loading={loading} error={error} refetch={refetch} type='class' />;
};

const BookingsList = ({ bookings, loading, error, refetch, type }) => {
    const navigation = useNavigation();

    const renderBookingCard = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('MyBookingsDetails', { booking: item })}
        >
            <View style={styles.cardContent}>
                <Text style={styles.venueTitle}>{item.venue_name}</Text>
                <Text style={styles.dateTime}>{item.date} • {item.time}</Text>

                <View style={styles.cardFooter}>
                    <Text style={styles.amountText}>₹{item.amount}</Text>
                    <View
                        style={[
                            styles.statusBadge,
                            item.status === 'upcoming' ? styles.statusUpcoming : 
                            item.status === 'active' ? styles.statusActive :
                            styles.statusCompleted
                        ]}
                    >
                        <Text
                            style={[
                                styles.statusText,
                                item.status === 'upcoming' ? styles.upcomingText : 
                                item.status === 'active' ? styles.activeText :
                                styles.completedText
                            ]}
                        >
                            {item.status === 'upcoming' ? 'Upcoming' : 
                             item.status === 'active' ? 'Active' :
                             'Completed'}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
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
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>{`No ${type} found`}</Text>
                <Text style={styles.emptySubText}>No history of bookings made yet!</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={bookings}
            renderItem={renderBookingCard}
            keyExtractor={item => item.id?.toString()}
            contentContainerStyle={styles.listContainer}
            onRefresh={refetch}
            refreshing={loading}
        />
    );
};

const MyBookings = () => {
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'venues', title: 'Venues' },
        { key: 'events', title: 'Events' },
        { key: 'classes', title: 'Classes' },
    ]);

    const renderScene = SceneMap({
        venues: VenuesTab,
        events: EventsTab,
        classes: ClassesTab,
    });

    return (
        <SafeAreaView style={styles.container}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={props => (
                    <TabBar
                        {...props}
                        style={styles.tabBar}
                        labelStyle={styles.tabLabel}
                        indicatorStyle={styles.tabIndicator}
                        activeColor="#063970"
                        inactiveColor="#666"
                    />
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F8FF',
    },
    tabBar: {
        backgroundColor: 'white',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    tabLabel: {
        fontSize: 14,
        fontWeight: '600',
        textTransform: 'none',
    },
    tabIndicator: {
        backgroundColor: '#063970',
        height: 3,
    },
    listContainer: {
        paddingTop: 15,
        paddingHorizontal: 20,
        paddingBottom: 20,
        flexGrow: 1,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardContent: {
        padding: 15,
    },
    venueTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    dateTime: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
    },
    amountText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    statusBadge: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
    statusUpcoming: {
        backgroundColor: '#FFE5B4',
    },
    statusCompleted: {
        backgroundColor: '#D3F9D8',
    },
    statusActive: {
        backgroundColor: '#E3F2FD',
    },
    statusText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    upcomingText: {
        color: '#FF8C00',
    },
    completedText: {
        color: '#388E3C',
    },
    activeText: {
        color: '#1976D2',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        marginBottom: 5,
    },
    emptySubText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#666',
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
});

export default MyBookings;