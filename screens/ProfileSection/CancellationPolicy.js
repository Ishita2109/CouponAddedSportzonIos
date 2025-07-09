import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'

const CancellationPolicy = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="arrow-back" size={24} color="#1A237E" />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Cancellation Policy</Text>
          </View>
          <View style={styles.spacer} />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.subtitle}>What is Sportzon's Cancellation Policy? How does it work?</Text>
          
          <View style={styles.policySection}>
            <View style={styles.policyItem}>
              <Icon name="trophy" size={20} color="#F44336" style={styles.policyIcon} />
              <Text style={styles.policyText}>
                For any tournament booking, No cancellation is allowed.
              </Text>
            </View>

            <View style={styles.policyItem}>
              <Icon name="time" size={20} color="#4CAF50" style={styles.policyIcon} />
              <Text style={styles.policyText}>
                For "Pay n Play", cancellation is allowed only 24 hours prior. No cancellation on date of play.
              </Text>
            </View>

            <View style={styles.policyItem}>
              <Icon name="calendar" size={20} color="#2196F3" style={styles.policyIcon} />
              <Text style={styles.policyText}>
                For "Events", cancellation can only be done 30 days prior to the start of event.
              </Text>
            </View>

            <View style={styles.policyItem}>
              <Icon name="person" size={20} color="#FF9800" style={styles.policyIcon} />
              <Text style={styles.policyText}>
                For individual coaching sessions, No cancellation is allowed.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CancellationPolicy

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 8,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  spacer: {
    width: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A237E',
    textAlign: 'center',
  },
  contentContainer: {
    padding: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#424242',
    marginBottom: 20,
    textAlign: 'center',
  },
  policySection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  policyItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  policyIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  policyText: {
    flex: 1,
    fontSize: 14,
    color: '#616161',
    lineHeight: 20,
    textAlign: 'justify',
  },
})