import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { MdHistory } from "react-icons/md";
import { FaLongArrowAltRight } from "react-icons/fa";

const BookingFinal = ({ rideId, dist, fare, to, from, setIsLoading }) => {
    const [no, setNo]=useState(null)
    async function fetchRiderData() {
        const jwtToken = localStorage.getItem('token');

        const response = await axios.post('http://localhost:8080/api/v1/user/getRiderDetails',
            { rideId: rideId }, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.data) {
            setNo(response.data.riderPhone)

        } else {
            console.error("Failed to fetch protected data:", response.status);
        }
    }
useEffect(()=>{
    fetchRiderData()
}, [])
    return (
        <div className="container">
            <div className="ride_history_container">
                <div className="header"><div className="header_icon"><MdHistory /></div>Ride Booked</div>
                <div className='single_ride_history_container' >
                    <div className="ride_history_item_head">
                        <div className="ride_history_item_head_from">{to}</div>
                        <div className="ride_history_item_head_arrow"><FaLongArrowAltRight /></div>
                        <div className="ride_history_item_head_to">{from[0]?.toUpperCase() + from?.slice(1, from.length)}</div>
                    </div>
                    <div className="ride_history_item_bottom">
                        <div className="ride_history_item_date">{Math.round(dist * 100) / 100} KM</div>
                        <div className="ride_history_item_fare">₹. {Math.round(fare * 100) / 100}</div>
                    </div>
                    <div className="ride_history_item_bottom">
                        <div className="ride_history_item_date">Driver Contact: {no}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingFinal
