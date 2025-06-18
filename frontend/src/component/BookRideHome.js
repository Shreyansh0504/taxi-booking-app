import React, { useEffect, useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import MapWithDirections from './MapWithDirections';
import { useNavigate } from 'react-router-dom';

const BookRideHome = ({setRideId, setIsLoading, setPrice, setDistance, user, origin, setOrigin, destination, setDestination }) => {

    const navigate = useNavigate()
    

    const [defaultOriginLatitude, setDefaultOriginLatitude] = useState(null)
    const [defaultOriginLongitude, setDefaultOriginLongitude] = useState(null)

    const [defaultDestinationLatitude, setDefaultDestinationLatitude] = useState(null)
    const [defaultDestinationLongitude, setDefaultDestinationLongitude] = useState(null)

   

    async function getLocationByIP() {
        try {
            const response = await fetch('https://ipinfo.io/json?token=d26b2335bed978');
            const data = await response.json();
            const [latitude, longitude] = data.loc.split(',');
            setDefaultOriginLatitude(+latitude)
            setDefaultOriginLongitude(+longitude)
            setOrigin(`${data.city}`)
        } catch (error) {
        }
    }

    getLocationByIP();

    async function getCoordinates(address) {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data && data.length > 0) {
                const location = data[0];
                return { lat: location.lat, lng: location.lon };
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }

    function toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    function haversineDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; 
        const lat1Rad = toRadians(lat1);
        const lat2Rad = toRadians(lat2);
        const deltaLat = toRadians(lat2 - lat1);
        const deltaLon = toRadians(lon2 - lon1);

        const a = Math.sin(deltaLat / 2) ** 2 +
            Math.cos(lat1Rad) * Math.cos(lat2Rad) *
            Math.sin(deltaLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; 
    }

    const findDistanceAndPrice = async() => {
        setIsLoading(true)
        if (destination.length > 0) {
            getCoordinates(destination)
                .then(async(coords) => {
                    if (coords) {
                        setDefaultDestinationLatitude(coords.lat)
                        setDefaultDestinationLongitude(coords.lng)
                        let dist = haversineDistance(defaultOriginLatitude, defaultOriginLongitude, coords.lat, coords.lng)

                        setDistance(dist)
                        setPrice(dist * 10)
                        const jwtToken = localStorage.getItem('token');
                        const date = new Date()
                        const response = await fetch('http://localhost:8080/api/v1/user/bookRide', {
                            method: 'POST',
                            body: JSON.stringify({
                                from: origin,
                                to: destination,
                                distance: dist,
                                fare: dist * 10,
                                date
                            }),
                            headers: {
                                'Authorization': `Bearer ${jwtToken}`,
                                'Content-Type': 'application/json'
                            }
                        });

                        if (response.ok) {
                            const data = await response.json();
                            localStorage.setItem("user", JSON.stringify(data.user))
                            setRideId(data.ride._id)
                            navigate('/searching-ride')
                        } else {
                            alert("Booking Failed")
                        }
                    } else {

                        alert("Booking Failed")
                    }
                });
        }
        else{
            alert("Provide destination")
        }

        setIsLoading(false)
    }

    return (
        <div className='book_ride_home_container'>
            <div className="book_ride_home_inner_container">
                <div className="booking_page_map_container">
                    {defaultOriginLatitude && defaultOriginLongitude && <MapWithDirections origin={origin} destination={destination} defaultOriginLatitude={defaultOriginLatitude} defaultOriginLongitude={defaultOriginLongitude} />}
                </div>
                <div className="booking_page_form">
                    <div className="booking_page_form_row">
                        <div className="booking_page_form_icon from_icon"><FaLocationDot /></div>
                        <input value={origin.length > 0 ? origin : ""} readOnly type="text" name="from_location" placeholder='From' id="from_location" />
                    </div>
                    <div className="booking_page_form_row">
                        <div className="booking_page_form_icon to_icon"><FaLocationDot /></div>
                        <input type="text" value={destination} onChange={(e) => { setDestination(e.target.value) }} name="from_location" placeholder='To' id="from_location" />
                    </div>
                    <div className="booking_page_form_row">
                        <button type='submit' onClick={findDistanceAndPrice}>Book Ride</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookRideHome
