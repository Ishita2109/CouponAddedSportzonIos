import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'

const TnC = () => {
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
          <Text style={styles.title}>Terms and Conditions</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.introText}>
            At Sportzon, we are committed to providing our customers with a safe and enjoyable experience. By using our facilities and services, you agree to the following terms and conditions:
          </Text>
      
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="checkmark-circle" size={24} color="#4CAF50" />
              <Text style={styles.sectionTitle}>Acceptance of Terms</Text>
            </View>
            <Text style={styles.sectionText}>
              By accessing or using Sportzon, you agree to be bound by these Terms and Conditions ("Terms"). If you disagree with any part of the Terms, you may not access or use Sportzon.
            </Text>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="person-circle" size={24} color="#2196F3" />
              <Text style={styles.sectionTitle}>Eligibility</Text>
            </View>
            <Text style={styles.sectionText}>
              Sportzon is only available to users who are at least 14 years old and have the legal capacity to enter into binding contracts.
            </Text>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="key" size={24} color="#FF9800" />
              <Text style={styles.sectionTitle}>Account Creation</Text>
            </View>
            <Text style={styles.sectionText}>
              To access certain features of Sportzon, you may need to create an account. You are responsible for maintaining the confidentiality of your account information, including your username and password. You are also responsible for all activities that occur under your account.
            </Text>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="document-text" size={24} color="#9C27B0" />
              <Text style={styles.sectionTitle}>User Content</Text>
            </View>
            <Text style={styles.sectionText}>
              You may be able to submit content to Sportzon, such as comments, reviews, or photos. You retain all ownership rights to your User Content, but you grant Sportzon a non-exclusive, worldwide, royalty-free license to use, modify, publish, and distribute your User Content in connection with Sportzon.
            </Text>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="warning" size={24} color="#F44336" />
              <Text style={styles.sectionTitle}>Prohibited Conduct</Text>
            </View>
            <Text style={styles.sectionText}>
              You agree not to use Sportzon for any purpose that is unlawful, harmful, or prohibited by these Terms. This includes, but is not limited to:
              {'\n\n'}• Uploading or transmitting content that is infringing, obscene, hateful, or threatening.
              {'\n'}• Harassing, bullying, or intimidating other users.
              {'\n'}• Impersonating any person or entity.
              {'\n'}• Interfering with or disrupting the Sportzon platform.
            </Text>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="shield-checkmark" size={24} color="#607D8B" />
              <Text style={styles.sectionTitle}>Disclaimer</Text>
            </View>
            <Text style={styles.sectionText}>
              Sportzon is provided on an "as is" and "as available" basis. We make no warranties, express or implied, regarding the operation or performance of Sportzon.
            </Text>
          </View>

          <View style={styles.contactSection}>
            <Text style={styles.contactTitle}>Contact Us</Text>
            <Text style={styles.contactText}>
              If you have any questions about these Terms, please contact us at:
              {'\n'}info@sportzon.in
            </Text>
          </View>
        </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default TnC

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
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A237E',
    textAlign: 'center',
    fontFamily: 'NotoSerif-Italic',
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  introText: {
    fontSize: 16,
    color: '#424242',
    lineHeight: 24,
    marginBottom: 30,
    textAlign: 'justify',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A237E',
    marginLeft: 8,
  },
  sectionText: {
    fontSize: 14,
    color: '#616161',
    lineHeight: 20,
    textAlign: 'justify',
  },
  contactSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    marginBottom: 40,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 14,
    color: '#616161',
    lineHeight: 20,
  },
})