import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, SafeAreaView, Dimensions, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const PRIMARY_COLOR = '#001F3F';

const chatFlow = {
  mainMenu: {
    message: "Hi! How can I help you today?",
    options: [
      "Booking Help",
      "Login / OTP Help",
      "Membership Info",
      "Events & Coaching",
      "Refunds & Cancellation",
      "Contact Support"
    ]
  },
  bookingHelp: {
    message: "What would you like help with?",
    options: [
      "How to book a venue",
      "Can I cancel a booking?",
      "Can I reschedule my booking?",
      "Where can I view my bookings?",
      "Back to Main Menu"
    ],
    responses: {
      "How to book a venue": "Go to the Venues tab → choose your location → pick your preferred venue → select a date & time slot → tap \"Book Now\" → complete payment.",
      "Can I cancel a booking?": "Cancellation is allowed only in specific cases:\n• Pay n Play: Cancel up to 24 hours before your slot.\n• Events: Cancel only if 30 days before the event.\n• Tournaments & Coaching sessions: ❌ No cancellation allowed.\nRefer to our full Cancellation Policy.",
      "Can I reschedule my booking?": "Sportzon does not currently support booking rescheduling.\nYou may cancel (if allowed) and rebook manually.",
      "Where can I view my bookings?": "Tap on My Bookings from the bottom navigation.\nYou can see all your venues, events, and class bookings there."
    }
  },
  loginHelp: {
    message: "Having trouble logging in?",
    options: [
      "Not receiving OTP",
      "Forgot Password",
      "Can I log in using email?",
      "Back to Main Menu"
    ],
    responses: {
      "Not receiving OTP": "Please ensure:\n• Correct mobile number\n• Strong network signal\n• Wait 1-2 mins and retry\nStill stuck? Email us at info@sportzon.in or call +91 9654696000.",
      "Forgot Password": "If you're using email login, tap \"Forgot Password\" on the login screen to reset it via email.",
      "Can I log in using email?": "Yes, you can either:\n• Log in with Mobile Number + OTP\n• Or with Email ID + Password"
    }
  },
  membershipInfo: {
    message: "Learn about Sportzon Memberships:",
    options: [
      "What benefits do I get?",
      "How to buy a membership?",
      "Membership validity period",
      "Back to Main Menu"
    ],
    responses: {
      "What benefits do I get?": "With a Sportzon membership, you get:\n• Access to all venues\n• 5% discount on all bookings\n• Free 15-day extension on renewal",
      "How to buy a membership?": "Go to the Membership tab → Select a plan → Tap \"Book Now\" → Complete the payment.",
      "Membership validity period": "Your membership is valid for 30 days, 90 days, or 1 year depending on the selected plan."
    }
  },
  eventsCoaching: {
    message: "How can we help with events or coaching?",
    options: [
      "How to register for an event?",
      "Can I book for others too?",
      "Can I cancel coaching or tournament?",
      "Back to Main Menu"
    ],
    responses: {
      "How to register for an event?": "Tap on the Events tab → Select your event → Tap \"Register\" → Enter your details → Complete the payment.",
      "Can I book for others too?": "Right now, each participant must register individually. Group booking will be supported in future updates.",
      "Can I cancel coaching or tournament?": "No cancellation allowed for:\n• Tournaments\n• Individual coaching sessions\nThese are non-refundable services once booked."
    }
  },
  refundsCancellation: {
    message: "Need help with refunds or cancellations?",
    options: [
      "Refund timelines",
      "Refund eligibility",
      "Jurisdiction info",
      "Back to Main Menu"
    ],
    responses: {
      "Refund timelines": "Refunds are processed within 5–7 working days and returned to the original payment source.",
      "Refund eligibility": "You're eligible for a refund only if:\n• Pay n Play: Cancelled 24 hours prior to booking.\n• Events:\n  o 30 days before → ✅ 100% refund\n  o 15 days before → ✅ 50% refund\n  o 7 days before → ✅ 100% refund\nTournaments & Coaching → Non-refundable\nRefer to Refund Policy for details.",
      "Jurisdiction info": "All disputes are subject to Delhi jurisdiction only."
    }
  },
  contactSupport: {
    message: "You can contact Sportzon support via:\n• Email: info@sportzon.in\n• Phone: +91 9654696000\nWe're happy to help!",
    options: ["Back to Main Menu"]
  }
};

const SupportCareScreen = () => {
  const navigation = useNavigation();
  const [chatHistory, setChatHistory] = useState([{ type: 'bot', message: chatFlow.mainMenu.message }]);
  const [currentCategory, setCurrentCategory] = useState('mainMenu');
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scrollViewRef = useRef();

  const handleChatOption = (option) => {
    if (option === "Back to Main Menu") {
      setCurrentCategory('mainMenu');
      setChatHistory(prev => [
        ...prev,
        { type: 'user', message: option },
        { type: 'bot', message: chatFlow.mainMenu.message }
      ]);
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
      return;
    }
    let newCategory = currentCategory;
    let response = '';
    switch (currentCategory) {
      case 'mainMenu':
        if (option === 'Booking Help') newCategory = 'bookingHelp';
        else if (option === 'Login / OTP Help') newCategory = 'loginHelp';
        else if (option === 'Membership Info') newCategory = 'membershipInfo';
        else if (option === 'Events & Coaching') newCategory = 'eventsCoaching';
        else if (option === 'Refunds & Cancellation') newCategory = 'refundsCancellation';
        else if (option === 'Contact Support') newCategory = 'contactSupport';
        response = chatFlow[newCategory]?.message || '';
        break;
      default:
        response = chatFlow[currentCategory]?.responses?.[option] || '';
        break;
    }
    setCurrentCategory(newCategory);
    setChatHistory(prev => [
      ...prev,
      { type: 'user', message: option },
      { type: 'bot', message: response }
    ]);
    Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
  };

  return (
    <SafeAreaView style={styles.fullScreenContainer}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#001F3F" />
        </Pressable>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.avatarBot}><Ionicons name="chatbubble-ellipses-outline" size={20} color="#fff" /></View>
          <Text style={styles.headerTitle}>Support Care</Text>
        </View>
        <View style={{width: 32}} />
      </View>
      <View style={styles.divider} />
      <View style={styles.freshChatArea}>
        <ScrollView
          style={styles.chatHistory}
          contentContainerStyle={{paddingBottom: 16}}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({animated: true})}
          showsVerticalScrollIndicator={false}
        >
          {chatHistory.map((chat, index) => (
            <Animated.View
              key={index}
              style={{
                opacity: fadeAnim,
                flexDirection: chat.type === 'user' ? 'row-reverse' : 'row',
                alignItems: 'flex-end',
                marginBottom: 14,
              }}
            >
              {chat.type === 'bot' && (
                <View style={styles.avatarBot}><Ionicons name="chatbubble-ellipses-outline" size={16} color="#fff" /></View>
              )}
              <View style={[
                styles.freshMessageContainer,
                chat.type === 'user' ? styles.freshUserMessage : styles.freshBotMessage
              ]}>
                <Text style={[
                  styles.freshMessageText,
                  chat.type === 'user' ? styles.freshUserText : styles.freshBotText
                ]}>{chat.message}</Text>
              </View>
              {chat.type === 'user' && (
                <View style={styles.avatarUser}><Ionicons name="person" size={14} color="#fff" /></View>
              )}
            </Animated.View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.optionsDivider} />
      <View style={styles.freshOptionsContainer}>
        {chatFlow[currentCategory]?.options.map((option, index) => (
          <Pressable
            key={index}
            style={({pressed}) => [
              styles.freshOptionButton,
              pressed && {opacity: 0.7}
            ]}
            onPress={() => handleChatOption(option)}
          >
            <Text style={styles.freshOptionText}>{option}</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: PRIMARY_COLOR,
    marginLeft: 10,
  },
  avatarBot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  avatarUser: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#ECECEC',
    marginHorizontal: 0,
  },
  freshChatArea: {
    flex: 1,
    backgroundColor: '#F8F8FA',
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 0,
  },
  chatHistory: {
    flex: 1,
  },
  freshMessageContainer: {
    marginBottom: 0,
    maxWidth: width * 0.75,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
  },
  freshUserMessage: {
    backgroundColor: PRIMARY_COLOR,
    alignSelf: 'flex-end',
    borderTopRightRadius: 4,
  },
  freshBotMessage: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#F2F2F2',
  },
  freshMessageText: {
    fontSize: 15,
    lineHeight: 21,
  },
  freshUserText: {
    color: '#fff',
    fontWeight: '600',
  },
  freshBotText: {
    color: '#222',
    fontWeight: '400',
  },
  optionsDivider: {
    height: 1,
    backgroundColor: '#ECECEC',
    marginHorizontal: 0,
  },
  freshOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 16,
    gap: 12,
  },
  freshOptionButton: {
    backgroundColor: '#fff',
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 1,
    marginBottom: 9,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    shadowColor: PRIMARY_COLOR,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  freshOptionText: {
    color: PRIMARY_COLOR,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.1,
  },
});

export default SupportCareScreen;