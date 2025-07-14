'use client';
import React from 'react';
import { useEffect,useState } from 'react';
import { setDefaults,fromAddress } from 'react-geocode';
import Map,{ Marker } from 'react-map-gl/maplibre';
import Image from 'next/image';
import pin from '@/assets/images/pin.svg'
import Spiner from './Spiner';
import 'mapbox-gl/dist/mapbox-gl.css'

function PropertyMap({property}) {
    const [lat,setLat]=useState(null);
    const [lng,setLng]=useState(null);
    const [viewPort,setViewPort]=useState({
        latitude:0,
        longitude:0,
        zoom:15,
        width:'100%',
        height:'500px'
    });

    const [loading,setLoading]=useState(true);
    const [geoCodeError,setgeoCodeError ]=useState(false);

    setDefaults({key:process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,language:'en',region:'us'});

    useEffect(()=>{
        const fetchCoords=async ()=>{
            try{
                const res= await  fromAddress(`${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`);
                if(res.results.length===0){
                    setgeoCodeError(true);
                    return;
                }
                const {lat,lng}=res.results[0].geometry.location;
                setLat(lat);
                setLng(lng);
                setViewPort({
                    ...viewPort,
                    latitude:lat,
                    longitude:lng
                })
                console.log('helloLat',lat,lng);
            }catch(error){
                console.log(error);
                setgeoCodeError(true);
            }finally{
                setLoading(false);
            }
        }
        fetchCoords();
    },[]);

    if(loading) return (<Spiner> </Spiner>)
    if(geoCodeError) return (<div className='text--xl'>No Location Data Found</div>)

  return (
    !loading &&(
        <Map 
         mapLib={import('maplibre-gl')}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{
        longitude: lng,
        latitude: lat,
        zoom: 15
      }}
      style={{width: '100%', height: 500}}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json">
      <Marker longitude={lng} latitude={lat} anchor='bottom'>
        <Image src={pin} alt='location' width={40} height={40}></Image>
      </Marker>
      </Map>
    )
  );
}

export default PropertyMap;
