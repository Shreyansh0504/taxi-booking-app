import React, { useEffect, useState } from 'react'
import { MdHistory } from "react-icons/md";
import { FaLongArrowAltRight } from "react-icons/fa";

const RideHistory = ({ setIsLoading }) => {
    const [rideHistories, setRideHistories] = useState([])

    async function fetchAllRidesData() {
        const jwtToken = localStorage.getItem('token');

        const response = await fetch('http://localhost:8080/api/v1/user/getallrides', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const data = await response.json();

            alert(data.message)
            setRideHistories(data.rides)
        } else {
            alert("Something went wrong")
        }
    }


    useEffect(() => {
        setIsLoading(true)
        fetchAllRidesData();
        setTimeout(() => {
            setIsLoading(false)
        }, 500);
    }, [])
    return (
        <div className="container">
            {rideHistories.length > 0 ? <div className='ride_history_container'>
                <div className="header"><div className="header_icon"><MdHistory /></div>Your Rides</div>
                {rideHistories.map((item, index) => {
                    return <div className='single_ride_history_container' key={index}>
                        <div className="ride_history_item_head">
                            <div className="ride_history_item_head_from">{item.from}</div>
                            <div className="ride_history_item_head_arrow"><FaLongArrowAltRight /></div>
                            <div className="ride_history_item_head_to">{item.to}</div>
                        </div>
                        <div className="ride_history_item_bottom">
                            <div className="ride_history_item_date">{item.date.split("T")[0]}</div>
                            <div className="ride_history_item_fare">₹. {Math.round(item.fare * 100) / 100}</div>
                        </div>
                    </div>
                })}
            </div> : <div className='no_booking'>No Rides Yet</div>}
        </div>
    )
}

export default RideHistory
