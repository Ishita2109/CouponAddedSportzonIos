import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'

const RefundPolicy = () => {
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
            <Text style={styles.title}>Refund Policy</Text>
          </View>
          <View style={styles.spacer} />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.subtitle}>What is Sportzon's Return Policy? How does it work?</Text>
          
          <View style={styles.policySection}>
            <View style={styles.policyItem}>
              <Icon name="close-circle" size={20} color="#F44336" style={styles.policyIcon} />
              <Text style={styles.policyText}>
                For coaching sessions & tournament, there will be no refund once the payment is made.
              </Text>
            </View>

            <View style={styles.policyItem}>
              <Icon name="time" size={20} color="#4CAF50" style={styles.policyIcon} />
              <Text style={styles.policyText}>
                For "Pay n Play", refunds will be made only 24 hours prior to booking time.
              </Text>
            </View>

            <View style={styles.policyItem}>
              <Icon name="calendar" size={20} color="#2196F3" style={styles.policyIcon} />
              <Text style={styles.policyText}>
                For "Events", there will be 100% refund only 7 days prior to event date, 50% refund 15 days prior to event date and 100% refund 30 days prior to event date.
              </Text>
            </View>

            <View style={styles.policyItem}>
              <Icon name="hourglass" size={20} color="#FF9800" style={styles.policyIcon} />
              <Text style={styles.policyText}>
                Processing time of refund is 5-7 days. The refunded amount will be refunded to source after the mentioned time.
              </Text>
            </View>

            <View style={styles.disclaimer}>
              <Icon name="alert-circle" size={20} color="#9C27B0" style={styles.policyIcon} />
              <Text style={styles.disclaimerText}>
                *All the disputes are subject to Delhi jurisdiction only.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default RefundPolicy

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
  headerIcon: {
    marginBottom: 10,
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
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  disclaimerText: {
    flex: 1,
    fontSize: 12,
    color: '#9E9E9E',
    fontStyle: 'italic',
    lineHeight: 18,
  },
})