import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const MapWithDirections = ({ origin, destination, defaultOriginLongitude, defaultOriginLatitude }) => {
    const [directions, setDirections] = useState(null);

    // const directionsCallback = (response) => {
    //     console.log("direction fetching")
    //     console.log(response)
    //     if (response !== null) {
    //         if (response.status === 'OK') {
    //             setDirections(response);
    //         } else {
    //             console.error('Directions request failed:', response);
    //         }
    //     }
    // };

    return (
        <LoadScript googleMapsApiKey="AIzaSyCQ2hsG9E2sB4qh68nN-HDpwgRWW72x67k">
            <GoogleMap
                mapContainerStyle={{ width: '100%', height: '300px' }}
                center={{ lat: defaultOriginLatitude, lng: defaultOriginLongitude }}
                zoom={15}
            >
                {/* <DirectionsService
                    options={{
                        origin: origin,
                        destination: destination,
                        travelMode: 'DRIVING',
                    }}
                    callback={directionsCallback}
                /> */}
                {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
        </LoadScript>
    );
};

export default MapWithDirections;