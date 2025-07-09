import React, { useMemo } from 'react';
import { View, Text, FlatList, SafeAreaView, StyleSheet, Image, Pressable, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { venuedata } from './Venue/VenueData';
import { ClassesData } from './Classes/ClassesData';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const VenueCard = ({ item }) => {
  const navigation = useNavigation();
  return (
    <Pressable 
      onPress={() => navigation.navigate('VenueDetails', { item })} 
      style={{ margin: 15, backgroundColor: "#fff", borderRadius: 10, elevation: 5 }}
    >
      <Image source={{ uri: item.image }} style={{ width: '100%', height: 200, borderRadius: 10 }} />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color:'black' }}>{item.title}</Text>
        <Text style={{ color: '#777' }}>{item.address1}</Text>
        <Text style={{ fontSize: 14, color: '#ff6600', marginTop: 5 }}>
          Rating: {item.rating}
        </Text>
        <Text style={{ fontSize: 14, marginTop: 5 }}>{item.timings}</Text>
      </View>
    </Pressable>
  );
};

const ClassCard = ({ item }) => {
  const navigation = useNavigation();
  return (
    <Pressable 
      onPress={() => navigation.navigate('ClassDetails', { item })} 
      style={{ margin: 15, backgroundColor: "#fff", borderRadius: 10, elevation: 5 }}
    >
      <Image source={{ uri: item.image }} style={{ width: '100%', height: 200, borderRadius: 10 }} />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color:'black' }}>{item.name}</Text>
        <Text style={{ color: '#777' }}>{item.address1}</Text>
        <Text style={{ fontSize: 14, color: '#ff6600', marginTop: 5 }}>{item.price}</Text>
        <Text style={{ fontSize: 14, marginTop: 5 }}>{item.timings}</Text>
      </View>
    </Pressable>
  );
};

const SportDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { sport } = route.params;

  // Filter venues and classes for the selected sport
  const filteredVenues = useMemo(() =>
    venuedata.filter(venue =>
      (venue.sportimages || []).some(s => (s.label || '').toLowerCase() === sport.toLowerCase())
    ),
    [sport]
  );

  const filteredClasses = useMemo(() =>
    ClassesData.filter(cls =>
      (cls.activities || []).some(a => (a.label || '').toLowerCase() === sport.toLowerCase())
    ),
    [sport]
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={28} color="#333" onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>{sport}</Text>
      </View>
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.sectionTitle}>Venues for {sport}</Text>
            {filteredVenues.length === 0 && (
              <Text style={styles.emptyText}>No venues found for this sport.</Text>
            )}
          </>
        }
        data={filteredVenues}
        renderItem={({ item }) => <VenueCard item={item} />}
        keyExtractor={item => item._id || item.id}
        ListFooterComponent={
          <>
            <Text style={styles.sectionTitle}>Classes for {sport}</Text>
            {filteredClasses.length === 0 && (
              <Text style={styles.emptyText}>No classes found for this sport.</Text>
            )}
            <FlatList
              data={filteredClasses}
              renderItem={({ item }) => <ClassCard item={item} />}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          </>
        }
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No venues or classes found for this sport.</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff6600',
    marginTop: 20,
    marginLeft: 15,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    marginLeft: 15,
    marginBottom: 10,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
});

export default SportDetailsScreen; 