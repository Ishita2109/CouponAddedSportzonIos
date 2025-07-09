/**
 * Utility to verify the LocationService is properly configured
 */

import LocationService from './LocationService';

// Print detailed information about the LocationService
console.log('🔍 LocationServiceCheck: Checking LocationService configuration');

// Check if LocationService exists
console.log('LocationService import result:', {
  isDefined: typeof LocationService !== 'undefined',
  type: typeof LocationService,
});

// Check if it's a valid object
if (typeof LocationService === 'object' && LocationService !== null) {
  // Check available methods
  console.log('Available methods:', Object.getOwnPropertyNames(LocationService));
  
  // Check if static methods are available
  const expectedMethods = [
    'requestAndroidPermission',
    'getCurrentPosition',
    'reverseGeocode',
    'getCurrentLocationWithAddress',
    'saveLocation',
    'getSavedLocation',
    'calculateDistance',
    'formatDistance'
  ];
  
  const missingMethods = expectedMethods.filter(
    method => typeof LocationService[method] !== 'function'
  );
  
  if (missingMethods.length === 0) {
    console.log('✅ All expected methods are available');
  } else {
    console.log('❌ Missing or invalid methods:', missingMethods);
  }
  
  // Check if constructor methods are directly callable
  console.log('Direct method call check:');
  expectedMethods.forEach(method => {
    try {
      console.log(`- ${method}: ${typeof LocationService[method]}`);
    } catch (e) {
      console.log(`- ${method}: Error accessing method: ${e.message}`);
    }
  });
  
  // Check static class implementation
  console.log('Class implementation check:');
  console.log(`- Is LocationService a class: ${typeof LocationService === 'function'}`);
  console.log(`- Is LocationService a constructor: ${LocationService.hasOwnProperty('prototype')}`);
} else {
  console.log('❌ LocationService is not a valid object');
}

const checkLocationService = () => {
  return {
    isValid: typeof LocationService === 'object' && LocationService !== null,
    hasMethods: typeof LocationService === 'object' && LocationService !== null 
      ? expectedMethods.every(method => typeof LocationService[method] === 'function')
      : false
  };
};

export default checkLocationService; 