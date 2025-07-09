import { venuedata } from '../screens/Venue/VenueData';

const DEFAULT_VENUES = {
  SPORTZON_WAVE: "Sportzon Wave City",
  K12: "K12 Schools",
  JBM: "JBM GLOBAL SCHOOL"
};

const MAX_VENUES = 3;

export const filterVenuesByLocation = (selectedLocation) => {
  if (!selectedLocation || !selectedLocation.city || !selectedLocation.state) {
    // Return the three fixed venues when no location is selected
    return getDefaultVenues();
  }

  const { city, state } = selectedLocation;
  let filteredVenues = [];

  // Step 1: Match by city
  const cityVenues = venuedata.filter(venue => 
    venue.city.toLowerCase().includes(city.toLowerCase())
  );
  filteredVenues.push(...cityVenues);

  // Step 2: If we need more venues, match by state
  if (filteredVenues.length < MAX_VENUES) {
    const stateVenues = venuedata.filter(venue => 
      venue.state.toLowerCase().includes(state.toLowerCase()) &&
      !venue.city.toLowerCase().includes(city.toLowerCase()) // Exclude already added city venues
    );
    
    // Add state venues until we reach MAX_VENUES
    const remainingSlots = MAX_VENUES - filteredVenues.length;
    filteredVenues.push(...stateVenues.slice(0, remainingSlots));
  }

  // Step 3: If still not enough, add default venues
  if (filteredVenues.length < MAX_VENUES) {
    const defaultVenues = getDefaultVenues();
    
    // Add default venues that aren't already in the list
    for (const venue of defaultVenues) {
      if (filteredVenues.length >= MAX_VENUES) break;
      
      const isDuplicate = filteredVenues.some(v => v.title === venue.title);
      if (!isDuplicate) {
        filteredVenues.push(venue);
      }
    }
  }

  // Ensure we only return MAX_VENUES
  return filteredVenues.slice(0, MAX_VENUES);
};

const getDefaultVenues = () => {
  // Find the three specific venues
  const sportzonWave = venuedata.find(v => v.title === DEFAULT_VENUES.SPORTZON_WAVE);
  const k12Schools = venuedata.find(v => v.title === DEFAULT_VENUES.K12);
  const jbmSchool = venuedata.find(v => v.title === DEFAULT_VENUES.JBM);

  // Return them in the specified order, filtering out any undefined values
  return [sportzonWave, k12Schools, jbmSchool].filter(Boolean);
};

// Debug helper function
export const debugFilterResults = (selectedLocation) => {
  const filtered = filterVenuesByLocation(selectedLocation);
  console.log('🏟️ Venue Filter Results:', {
    selectedLocation,
    totalVenues: filtered.length,
    venues: filtered.map(v => ({
      title: v.title,
      city: v.city,
      state: v.state
    }))
  });
  return filtered;
}; 