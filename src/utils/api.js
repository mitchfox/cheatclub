// API utility function with CORS proxy fallback
const API_URL = 'https://eccdn.com.au/misc/challengedata.json';

// Try direct fetch first, fallback to CORS proxy if needed
export const fetchRestaurants = async () => {
  try {
    // Try direct fetch first
    const response = await fetch(API_URL, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data || !data.restaurants) {
      throw new Error('Invalid data format received');
    }

    return data.restaurants;
  } catch (error) {
    // Check for CORS or network errors
    const isCorsError = 
      error.message.includes('CORS') || 
      error.message.includes('Failed to fetch') ||
      error.message.includes('NetworkError') ||
      error.name === 'TypeError';
    
    if (isCorsError) {
      console.warn('Direct fetch failed, trying CORS proxy...', error);
      try {
        // Using a public CORS proxy as fallback
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(API_URL)}`;
        const response = await fetch(proxyUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Proxy HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        let data;
        
        try {
          data = JSON.parse(text);
        } catch (parseError) {
          // If proxy returns wrapped JSON, try to extract it
          const jsonMatch = text.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            data = JSON.parse(jsonMatch[0]);
          } else {
            throw new Error('Failed to parse JSON response from proxy');
          }
        }
        
        if (!data || !data.restaurants) {
          throw new Error('Invalid data format received from proxy');
        }

        return data.restaurants;
      } catch (proxyError) {
        console.error('Proxy fetch also failed:', proxyError);
        throw new Error(`Failed to load restaurants. CORS error detected. Original error: ${error.message}`);
      }
    }
    throw error;
  }
};

