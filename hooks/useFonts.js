import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

export const useFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        if (Platform.OS === 'android') {
          // For Android, we need to ensure the font is loaded
          await Promise.all([
            // Add any additional fonts here if needed
          ]);
        }
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
      }
    };

    loadFonts();
  }, []);

  return fontsLoaded;
}; 