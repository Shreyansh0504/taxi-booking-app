import React, { useEffect, useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import { MdQuestionAnswer } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ setIsLoading, setUser, user }) => {
    const navigate = useNavigate()
    const [isSideBarOpen, setIsSideBarOpen] = useState(false)
    const toggleSideBar = () => {
        setIsLoading(true)
        setIsSideBarOpen(!isSideBarOpen)
        if (!isSideBarOpen) {
            document.getElementById("sidebar_container").style.transform = "translateX(200px)"
        }
        else {
            document.getElementById("sidebar_container").style.transform = "translateX(0px)"
        }
        setTimeout(() => {
            setIsLoading(false)
        }, 500);
    }
    const hamToggleSideBar = () => {
        setIsSideBarOpen(!isSideBarOpen)
        if (!isSideBarOpen) {
            document.getElementById("sidebar_container").style.transform = "translateX(200px)"
        }
        else {
            document.getElementById("sidebar_container").style.transform = "translateX(0px)"
        }
    }
    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser({})
        toggleSideBar()
        navigate("/auth")
    }
    useEffect(() => {
        toggleSideBar()
    }, [])
    return (
        <div className='navbar_container'>
            <div className="logo">Bounce</div>
            <div className="ham_icon" onClick={hamToggleSideBar}><GiHamburgerMenu /></div>
            <div className="sidebar_container" id='sidebar_container'>
                <ul>
                    <Link to={"/profile"}>
                        <li className="sidebar_item" onClick={toggleSideBar}><div className="sidebar_inner"><div className="sidebar_item_icon" id='username_nav'><FaUser /></div> {user.name}</div></li>
                    </Link>
                    <Link to={"/"}>
                        <li className="sidebar_item" onClick={toggleSideBar}><div className="sidebar_inner"><div className="sidebar_item_icon"><FaCar /></div> {user.userType === "Customer" ? " Book Ride" : " Available Rides"}</div></li>
                    </Link>
                    <Link to={"/ride-history"}>
                        <li className="sidebar_item" onClick={toggleSideBar}><div className="sidebar_inner"><div className="sidebar_item_icon"><MdHistory /></div> Ride History</div></li>
                    </Link>
                    <Link to={"/support"}>
                        <li className="sidebar_item" onClick={toggleSideBar}><div className="sidebar_inner"><div className="sidebar_item_icon"><MdQuestionAnswer /></div> Support & FAQ</div></li>
                    </Link>
                    <li className="sidebar_item" onClick={handleLogout}><div className="sidebar_inner_last"><div className="sidebar_item_icon"><FaSignOutAlt /></div> Logout</div></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
