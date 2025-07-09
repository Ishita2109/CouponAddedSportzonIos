/**
 * Test script to verify Google Geocoding API configuration
 * 
 * Run this script using:
 * node TestGeocodingAPI.js YOUR_API_KEY
 */

const fetch = require('node-fetch');

const testGeocodingAPI = async (apiKey) => {
  if (!apiKey) {
    console.error('❌ API key is required');
    console.log('Usage: node TestGeocodingAPI.js YOUR_API_KEY');
    process.exit(1);
  }

  console.log('🔍 Testing Google Geocoding API with provided key...');
  
  // Test coordinates (Taj Mahal, India)
  const latitude = 27.1751;
  const longitude = 78.0421;
  
  try {
    // Test reverse geocoding
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
    console.log(`🌐 Making request to: ${url.replace(apiKey, 'API_KEY_HIDDEN')}`);
    
    const response = await fetch(url);
    const data = await response.json();
    
    console.log(`📊 API response status: ${data.status}`);
    
    if (data.status === 'OK') {
      console.log('✅ Geocoding API test successful!');
      console.log('📍 Sample result:');
      console.log(`   Address: ${data.results[0].formatted_address}`);
      console.log(`   Place ID: ${data.results[0].place_id}`);
      
      // Print first few address components
      if (data.results[0].address_components && data.results[0].address_components.length > 0) {
        console.log('🧩 Sample address components:');
        data.results[0].address_components.slice(0, 3).forEach(component => {
          console.log(`   - ${component.types.join(', ')}: ${component.long_name}`);
        });
      }
    } else if (data.status === 'REQUEST_DENIED') {
      console.error('❌ API key is invalid or has restrictions');
      console.error(`   Error message: ${data.error_message || 'No error message provided'}`);
      
      console.log('\n🛠️ Troubleshooting tips:');
      console.log(' 1. Check if your API key is correct');
      console.log(' 2. Ensure Geocoding API is enabled in your Google Cloud Console');
      console.log(' 3. Check API restrictions (IP, referrers, etc.)');
      console.log(' 4. Verify billing is enabled if needed');
    } else {
      console.error(`❌ API test failed with status: ${data.status}`);
      console.error(`   Error message: ${data.error_message || 'No error message provided'}`);
    }
  } catch (error) {
    console.error('❌ Error making API request:', error.message);
  }
};

// Get API key from command line argument
const apiKey = process.argv[2];
testGeocodingAPI(apiKey);

// Export for direct import in other files
module.exports = testGeocodingAPI; 