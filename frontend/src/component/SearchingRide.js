import React, { useEffect, useState } from 'react'
import searching from '../assets/searching.png'
import { MdHistory } from "react-icons/md";
import { FaLongArrowAltRight } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchingRide = ({ rideId, dist, fare, to, from, setIsLoading }) => {
    const [rideStatus, setRideStatus]= useState('')
    const navigate = useNavigate()
    const jwtToken = localStorage.getItem('token');
    const fetchStatus = async()=>{
        try {
            const res = await axios.post(
              "https://taxi-booking-app-one.vercel.app/api/v1/user/getRideDetails",
              {
                rideId,
              },
              {
                headers: {
                  Authorization: `Bearer ${jwtToken}`,
                  "Content-Type": "application/json",
                },
              }
            );
            if(res.data.ride.rider !== ""){
                setRideStatus("Booked")
                navigate("/booked")
            }
        } catch (error) {
            
        }
    }

    const checkRideStatus = ()=>{
        let timer
            timer = setInterval(()=>{
                fetchStatus()
                if (rideStatus === "Booked") {
                    clearInterval(timer)
                }

            }, 60000)
            
    }

    useEffect(()=>{
        checkRideStatus()
    }, [])
  return (
    <div className='container searching_container' >
      <div className="searching_img" style={{backgroundImage: `url(${searching})`}}></div>
      <div className="ride_history_container">
                      <div className="header"><div className="header_icon"><MdHistory /></div>Searching Ride</div>
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
                      </div>
                  </div>
    </div>
  )
}

export default SearchingRide
