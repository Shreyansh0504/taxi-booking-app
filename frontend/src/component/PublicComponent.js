import React from 'react'
import { useNavigate } from 'react-router-dom'

const PublicComponent = ({ children }) => {
    const navigate = useNavigate()
    if (!localStorage.getItem("token")) {
        return children
    }
    else {
        navigate('/')
    }
}

export default PublicComponent