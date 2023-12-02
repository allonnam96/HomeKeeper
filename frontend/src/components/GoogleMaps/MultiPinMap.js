import React, { useEffect, useRef } from 'react';
import { Loader } from "@googlemaps/js-api-loader";

const MultiPinMap = ({ pins, name, mapId }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

        const loader = new Loader({
            apiKey: googleMapsApiKey,
            version: "weekly"
        });

        loader.load().then(() => {
            if (mapRef.current) {
                const pos = { lat: parseFloat(pins[0].lat), lng: parseFloat(pins[0].lng) };
                const map = new window.google.maps.Map(mapRef.current, {
                    center: pos,
                    zoom: 14,
                    mapId: mapId,
                    disableDefaultUI: true,
                });

                pins.forEach(pin => {
                    new window.google.maps.Marker({
                        position: {lat: parseFloat(pin.lat), lng: parseFloat(pin.lng)},
                        map: map,
                        title: name
                    })
                })
            }
        });
        
        return () => {
            if (mapRef.current) {
                mapRef.current.innerHTML = "";
            }
        };
    }, [pins, name, mapId]);

    return <div ref={mapRef} style={{ height: '100%' }}></div>;
};

export default MultiPinMap;
