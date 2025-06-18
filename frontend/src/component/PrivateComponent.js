import React from 'react'
import { useNavigate } from 'react-router-dom'

const PrivateComponent = ({ children }) => {
    const navigate = useNavigate()
    if (localStorage.getItem("token")) {
        return children
    }
    else {
        navigate('/auth')
    }
}

export default PrivateComponent