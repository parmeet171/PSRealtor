import React, { useState, useMemo } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const GoogleMapComponent = ({ address = "rohini sector 24" }) => {
  const [coordinates, setCoordinates] = useState({ lat: 37.7749, lng: -122.4194 }); 

  
  const loaderOptions = useMemo(() => ({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, 
    libraries: ['places'],
  }), []);

  const { isLoaded } = useJsApiLoader(loaderOptions); 
  const fetchCoordinates = async (address) => {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();
      if (data.status === 'OK') {
        const location = data.results[0].geometry.location;
        setCoordinates({ lat: location.lat, lng: location.lng });
      } else {
        console.error('Geocoding error:', data.status, data.error_message);
      }
    } catch (error) {
      console.error('Failed to fetch geocode data:', error);
    }
  };

 
  React.useEffect(() => {
    if (address) fetchCoordinates(address);
  }, [address]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ height: '500px', width: '100%' }}
      zoom={15}
      center={coordinates}
    >
      <Marker position={coordinates} />
    </GoogleMap>
  );
};

export default GoogleMapComponent;
