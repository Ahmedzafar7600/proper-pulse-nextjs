'use client';
import React, { useEffect, useState } from 'react';
import { setDefaults, fromAddress } from 'react-geocode';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import pin from '@/assets/images/pin.svg';
import Spinner from './Spiner';
import 'mapbox-gl/dist/mapbox-gl.css';

// Lazy load Map and Marker to avoid SSR issues
const Map = dynamic(() => import('react-map-gl/maplibre').then(mod => mod.Map), { ssr: false });
const Marker = dynamic(() => import('react-map-gl/maplibre').then(mod => mod.Marker), { ssr: false });

function PropertyMap({ property }) {
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [loading, setLoading] = useState(true);
  const [geoCodeError, setGeoCodeError] = useState(false);

  useEffect(() => {
    setDefaults({
      key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
      language: 'en',
      region: 'us',
    });

    const fetchCoords = async () => {
      try {
        const { street = '', city = '', state = '', zipcode = '' } = property.location;
        const fullAddress = `${street}, ${city}, ${state} ${zipcode}`;

        const res = await fromAddress(fullAddress);

        if (res?.results?.length === 0) {
          setGeoCodeError(true);
          return;
        }

        const { lat, lng } = res.results[0].geometry.location;
        if (!lat || !lng) {
          setGeoCodeError(true);
          return;
        }

        setCoords({ lat, lng });
      } catch (error) {
        console.error('Geocoding error:', error);
        setGeoCodeError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCoords();
  }, [property]);

  if (loading) return <Spinner />;
  if (geoCodeError || coords.lat === null || coords.lng === null) {
    return <div className="text-xl text-red-500">No location data found.</div>;
  }

  return (
    <Map
      mapLib={import('maplibre-gl')}
      initialViewState={{
        latitude: coords.lat,
        longitude: coords.lng,
        zoom: 1,
      }}
      style={{ width: '100%', height: 500 }}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
    >
      <Marker longitude={coords.lng} latitude={coords.lat} anchor="bottom">
        <Image src={pin} alt="Location" width={40} height={40} />
      </Marker>
    </Map>
  );
}

export default PropertyMap;
