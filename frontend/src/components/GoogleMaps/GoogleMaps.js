import React, { useEffect, useRef } from 'react';
import { Loader } from "@googlemaps/js-api-loader";
import markerIcon from '../../assets/orange-marker.png'

const GoogleMaps = ({ lat, lng, name, mapId }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

        const loader = new Loader({
            apiKey: googleMapsApiKey,
            version: "weekly"
        });

        loader.load().then(() => {
            if (mapRef.current) {
                const pos = { lat, lng };
                const map = new window.google.maps.Map(mapRef.current, {
                    center: pos,
                    zoom: 15,
                    mapId: mapId,
                    disableDefaultUI: true,
                });

                new window.google.maps.Marker({
                    position: pos,
                    map: map,
                    title: name,
                    icon: {
                        url: markerIcon,
                        scaledSize: new window.google.maps.Size(50, 50)
                    }
                });
            }
        });
        
        return () => {
            if (mapRef.current) {
                mapRef.current.innerHTML = "";
            }
        };
    }, [lat, lng, name, mapId]);

    return <div ref={mapRef} style={{ height: '100%' }}></div>;
};

export default GoogleMaps;
