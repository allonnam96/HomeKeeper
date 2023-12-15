import React, { useEffect, useRef } from 'react';
import { Loader } from "@googlemaps/js-api-loader";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import markerIcon from '../../assets/orange-marker.png'


const MultiPinMap = ({ pins, name, mapId }) => {
    const mapRef = useRef(null);
    const history = useHistory();

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
                    zoom: 13,
                    mapId: mapId,
                    disableDefaultUI: true,
                });

                pins.forEach(pin => {
                    const marker = new window.google.maps.Marker({
                        position: {lat: parseFloat(pin.lat), lng: parseFloat(pin.lng)},
                        map,
                        title: pin.name,
                        icon: {
                            url: markerIcon,
                            scaledSize: new window.google.maps.Size(30, 30)
                        },
                        // label: {
                        //     text: pin.count,
                        //     color: "#4682B4",
                        //     fontSize: "25px",
                        //     fontWeight: "bold",
                        //     className: "marker-label"
                        // },
                        contactorId: pin.contractorId
                    })
                    marker.addListener("click", () => {history.push(`/contractors/${pin.contractorId}`)})
                    // marker.addListener("mouseOver", marker.setIcon(markerIcon))
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
