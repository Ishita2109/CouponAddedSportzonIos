/**
 * Simple test script for the LocationService module
 * 
 * Import this in a component and call the test function
 * to verify that LocationService is working correctly
 */

import LocationService from './LocationService';

export const testLocationService = async () => {
  console.log('========== LOCATION SERVICE TEST ==========');
  
  // Test 1: Check if LocationService is properly imported
  console.log('Test 1: Import check');
  if (!LocationService) {
    console.error('❌ LocationService import failed - module is undefined');
    return {
      success: false,
      error: 'Import failed'
    };
  }
  
  console.log('✅ LocationService imported successfully');
  console.log('LocationService type:', typeof LocationService);
  
  // Test 2: Check methods
  console.log('\nTest 2: Method check');
  const methods = [
    'requestAndroidPermission',
    'getCurrentPosition',
    'reverseGeocode',
    'getCurrentLocationWithAddress',
    'saveLocation',
    'getSavedLocation',
    'calculateDistance',
    'formatDistance'
  ];
  
  const missingMethods = methods.filter(method => typeof LocationService[method] !== 'function');
  
  if (missingMethods.length > 0) {
    console.error('❌ Missing methods:', missingMethods);
    return {
      success: false,
      error: 'Missing methods',
      details: missingMethods
    };
  }
  
  console.log('✅ All expected methods are available');
  
  // Test 3: Test distance calculation (doesn't require permissions)
  console.log('\nTest 3: Distance calculation');
  try {
    // New Delhi to Mumbai distance (~1200 km)
    const distance = LocationService.calculateDistance(
      28.6139, 77.2090,  // New Delhi
      19.0760, 72.8777   // Mumbai
    );
    
    console.log(`✅ Distance calculation succeeded: ${distance.toFixed(2)} km`);
    console.log(`   Formatted: ${LocationService.formatDistance(distance)}`);
  } catch (error) {
    console.error('❌ Distance calculation failed:', error);
    return {
      success: false,
      error: 'Distance calculation failed',
      details: error.message
    };
  }
  
  // Test 4: Saving and retrieving location
  console.log('\nTest 4: Save and retrieve location');
  try {
    const testLocation = {
      name: 'Test Location',
      address: 'Test Address, Test City',
      coordinates: {
        latitude: 28.6139,
        longitude: 77.2090
      }
    };
    
    await LocationService.saveLocation(testLocation);
    console.log('✅ Location saved successfully');
    
    const savedLocation = await LocationService.getSavedLocation();
    if (!savedLocation) {
      console.error('❌ Failed to retrieve saved location');
      return {
        success: false,
        error: 'Failed to retrieve saved location'
      };
    }
    
    console.log('✅ Retrieved saved location:', savedLocation);
    if (savedLocation.name !== testLocation.name) {
      console.error('❌ Retrieved location does not match saved location');
      return {
        success: false,
        error: 'Retrieved location mismatch',
        details: { saved: testLocation, retrieved: savedLocation }
      };
    }
  } catch (error) {
    console.error('❌ Storage test failed:', error);
    return {
      success: false,
      error: 'Storage test failed',
      details: error.message
    };
  }
  
  console.log('\n✅ All basic tests passed! The LocationService appears to be working correctly.');
  console.log('Note: Geocoding and current position tests require user interaction and were not performed.');
  console.log('===========================================');
  
  return {
    success: true,
    message: 'All basic tests passed'
  };
};

export default testLocationService; 