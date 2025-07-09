import moment from "moment";
import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const guidelineBaseWidth = 375;
const scale = size => Math.min(width / guidelineBaseWidth * size, size);

interface DatePickerProps {
  isDatePickerVisible: boolean;
  setDatePickerVisibility: (visible: boolean) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  isDatePickerVisible,
  setDatePickerVisibility,
  selectedDate,
  setSelectedDate,
}) => {
  const today = moment().format("YYYY-MM-DD");
  const formattedSelectedDate = selectedDate ? moment(selectedDate).format("YYYY-MM-DD") : '';

  const handleDateSelect = (day: DateData) => {
    const newDate = new Date(day.dateString);
    setSelectedDate(newDate);
    setDatePickerVisibility(false);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setDatePickerVisibility(true)}
        style={styles.inputContainer}
      >
        <View style={styles.dateInputContent}>
          <Ionicons name="calendar-outline" size={scale(20)} color="#063970" />
          <Text style={styles.input}>
            {selectedDate
              ? moment(selectedDate).format("DD MMMM YYYY")
              : "Choose a date"}
          </Text>
        </View>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={isDatePickerVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Date</Text>
              <TouchableOpacity
                onPress={() => setDatePickerVisibility(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={scale(24)} color="#063970" />
              </TouchableOpacity>
            </View>
            
            <Calendar
              minDate={today}
              markedDates={{
                [formattedSelectedDate]: {
                  selected: true,
                  selectedColor: '#063970',
                  selectedTextColor: '#ffffff'
                }
              }}
              onDayPress={handleDateSelect}
              theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#063970',
                selectedDayBackgroundColor: '#063970',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#063970',
                dayTextColor: '#2d4150',
                textDisabledColor: '#d9e1e8',
                dotColor: '#063970',
                selectedDotColor: '#ffffff',
                arrowColor: '#063970',
                monthTextColor: '#063970',
                indicatorColor: '#063970',
                textDayFontWeight: '500',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '500',
                textDayFontSize: scale(14),
                textMonthFontSize: scale(16),
                textDayHeaderFontSize: scale(14)
              }}
              style={styles.calendar}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: scale(20),
    backgroundColor: '#fff',
    borderRadius: scale(15),
    marginVertical: scale(15),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: scale(2),
    },
    shadowOpacity: 0.1,
    shadowRadius: scale(4),
    elevation: 3
  },
  label: {
    fontSize: scale(16),
    marginBottom: scale(8),
    color: '#666',
    fontWeight: '500'
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    padding: scale(12),
    borderRadius: scale(10),
    backgroundColor: '#F8F9FD',
  },
  dateInputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10)
  },
  input: {
    fontSize: scale(16),
    color: '#333',
    flex: 1
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: scale(20),
    width: '90%',
    padding: scale(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: scale(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: scale(4),
    elevation: 5
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(15),
    paddingBottom: scale(10),
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0'
  },
  modalTitle: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: '#063970'
  },
  closeButton: {
    padding: scale(5)
  },
  calendar: {
    borderRadius: scale(10),
    marginTop: scale(10)
  }
});

export default DatePicker;