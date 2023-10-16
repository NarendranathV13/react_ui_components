import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '800px',
  height: '400px'
};

const Map = () => {
  const userLocation = { // Default location
    lat: 40.7128,
    lng: -74.0060
  };
  return (
    <LoadScript googleMapsApiKey="AIzaSyDZmKnQpPM0beDs8Zd_pMyM0PIwGxgPD4s">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation} // Use user's location if available, otherwise use default
        zoom={10}
      >
        {userLocation && <Marker position={userLocation} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
