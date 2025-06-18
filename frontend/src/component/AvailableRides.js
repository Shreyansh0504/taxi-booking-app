import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MdHistory } from "react-icons/md";
import { FaLongArrowAltRight } from "react-icons/fa";

const AvailableRides = ({customer, setIsLoading, user, setCustomer}) => {
  const [availableRides, setAvailableRides] = useState([])
  const jwtToken = localStorage.getItem('token');
  const fetchAvailableRides = async () => {
    try {
      const res = await axios.get(
        "https://taxi-booking-app-one.vercel.app/api/v1/user/getAllAvailableRides",
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setAvailableRides(res.data.availableRides)
    } catch (error) {

    }
  }

  const acceptRide = async (rideId, riderId) => {
    try {
      setIsLoading(true)
      const res = await axios.put(
        "https://taxi-booking-app-one.vercel.app/api/v1/user/acceptRide",
        {
          rideId,
          riderId,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data) {
        setCustomer({
          customerName: res.data.userName,
          phone: res.data.phone
        })
        setIsLoading(false)
        
      }
    } catch (error) {

    }
  }
  useEffect(() => {
    console.log(customer)
    fetchAvailableRides()
  }, [])
  return (
    <div className="container">
      <div className="ride_history_container">
        <div className="header"><div className="header_icon"><MdHistory /></div>{customer !== null ? "Customer details" : "Available Rides"}</div>
        {customer !== null ? <>
          <div className="ride_history_item_bottom">
            <div className="center_text">Customer Name: {customer.customerName}</div>
          </div>
          <div className="ride_history_item_bottom">
            <div className="center_text">Customer Phone: {customer.phone}</div>
          </div>
        </>
        : availableRides.length > 0 ? availableRides.map((ride, i) => {
          return <div className='single_ride_history_container' key={i}>
            <div className="ride_history_item_head">
              <div className="ride_history_item_head_from">{ride.from[0]?.toUpperCase() + ride.from?.slice(1, ride.from.length)}</div>
              <div className="ride_history_item_head_arrow"><FaLongArrowAltRight /></div>
              <div className="ride_history_item_head_to">{ride.to}</div>
            </div>
            <div className="ride_history_item_bottom">
              <div className="ride_history_item_date">{ride.distance} KM</div>
              <div className="ride_history_item_fare">₹. {ride.fare}</div>
            </div>
            <div className="ride_history_item_bottom">
              <div className="accept_btn" onClick={() => { acceptRide(ride._id, user._id) }}>Accept</div>
            </div>
          </div>
        })
          : <div className='no_rides'>No rides available</div>}
      </div>
    </div>
  )
}

export default AvailableRides
