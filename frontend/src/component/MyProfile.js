import React, { useEffect } from 'react'
import { FaUser } from "react-icons/fa";

const MyProfile = ({ user, setIsLoading }) => {
  const userDetails = {
    name: "",
    email: "",
    phone: "",
    dp: "",
    startDt: "",
    noOfRides: []
  }

  async function fetchUserData() {
    const jwtToken = localStorage.getItem('token');

    const response = await fetch(
      "https://taxi-booking-app-one.vercel.app/api/v1/user/myprofile",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const res = await response.json();
      const data = res.user
      userDetails.name = data.name
      userDetails.email = data.email
      userDetails.phone = data.phone
      userDetails.startDt = data.createdAt
      userDetails.noOfRides = [...data.noOfRides]
    } else {
      console.error("Failed to fetch protected data:", response.status);
    }
  }


  useEffect(() => {
    setIsLoading(true)
    fetchUserData();
    setTimeout(() => {
      setIsLoading(false)
    }, 500);
  }, [])

  const dp = "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
  return (
    <div className='my_profile_container'>
      {user && <div className="my_profile_inner">
        <div className="header"><div className="header_icon"><FaUser /></div>Your Profile</div>
        <div className="my_profile_item_top_row"><div className="my_profile_dp" style={{ backgroundImage: `url(${dp})` }}></div><div className="my_profile_name">{user?.name}</div></div>
        <div className="my_profile_item"><div className="my_profile_title">Email</div><div className="my_profile_detail">{user?.email}</div><hr /></div>
        <div className="my_profile_item"><div className="my_profile_title">Phone</div><div className="my_profile_detail">{user?.phone}</div><hr /></div>
        <div className="my_profile_item"><div className="my_profile_title">Joined</div><div className="my_profile_detail">{user?.startDt}</div><hr /></div>
        <div className="my_profile_item"><div className="my_profile_title">No of Rides</div><div className="my_profile_detail">{user?.noOfRides?.length}</div></div>
      </div>}
    </div>
  )
}

export default MyProfile
