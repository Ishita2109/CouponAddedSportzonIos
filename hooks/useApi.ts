import api from "../utils/api";
import { Alert } from 'react-native';

const handleApiError = (error, customMessage = '') => {
  console.error("API Error:", error);
  
  if (error.response) {
    // Server responded with error
    const message = error.response.data?.message || customMessage || 'Server error occurred';
    Alert.alert('Error', message);
    throw new Error(message);
  } else if (error.request) {
    // Request made but no response
    const message = 'Network error. Please check your connection.';
    Alert.alert('Error', message);
    throw new Error(message);
  } else {
    // Something else went wrong
    const message = customMessage || 'An unexpected error occurred';
    Alert.alert('Error', message);
    throw new Error(message);
  }
};

export const getVenues = async () => {
    try {
        const response = await api.get(`/landing/venues`);
        return response.data; // Return API response
    } catch (error) {
        handleApiError(error, 'Failed to fetch venues');
    }
};

export const getVenueDetails = async (venueSlug: string) => {
    try {
        const response = await api.get(`/landing/venues/${venueSlug}`);
        return response.data; // Return API response
    } catch (error) {
        handleApiError(error, 'Failed to fetch venue details');
    }
};

export const getCourtDetails = async (venueId: string) => {
    try {
        const response = await api.get(`landing/courts/${venueId}`);
        return response.data; // Return API response
    } catch (error) {
        handleApiError(error, 'Failed to fetch court details');
    }
};

export const landingOrders = async (payload) => {
    try {
        const response = await api.post(`/landing/payments/orders`, payload);
        return response.data; // Return API response
    } catch (error) {
        handleApiError(error, 'Failed to create order');
    }
};