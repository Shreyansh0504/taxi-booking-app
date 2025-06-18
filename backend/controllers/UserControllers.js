import ridesModel from "../models/ridesModel.js"
import userModel from "../models/userModel.js"

export const getUserProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id)
        if (user) {
            const resUser = { ...user._doc, password: "" }
            res.status(200).send(
                {
                    user: { ...resUser },
                    success: true,
                    message: "User fetched"
                }
            )
        }
        else {
            res.status(400).send(
                {
                    success: false,
                    message: "User not found"
                }
            )
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Something went wrong"
        })
    }
}

export const bookRide = async (req, res) => {
    try {
        const { from, to, distance, fare, date } = req.body
        const user = await userModel.findById(req.user.id)
        if (user) {
            const ride = new ridesModel({
                user: req.user.id,
                from,
                to,
                distance,
                fare,
                date
            })
            await ride.save()
            user.noOfRides.push(ride)
            await user.save()
            const resUser = { ...user._doc, password: "" }
            res.status(200).send(
                {
                    user: resUser,
                    ride,
                    success: true,
                    message: "Ride Created"
                }
            )
        }
        else {
            res.status(400).send(
                {
                    success: false,
                    message: "User not found"
                }
            )
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Something went wrong"
        })
    }
}

export const getAllAvailableRides = async (req, res) => {
    try {
        const rides = await ridesModel.find()
        const availableRides = rides.filter((ride)=>ride.rider == null)
        return res.status(200).send({
            availableRides
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Something went wrong"
        })
    }
}

export const acceptRide = async (req, res) => {
    try {
        const { rideId, riderId } = req.body
        const ride = await ridesModel.findById(rideId)
        if (ride) {
            ride.rider = riderId              
            await ride.save()
        }
        const user = await userModel.findById(ride.user)
        return res.status(200).send({
            message: "Ride Booked",
            userName: user.name, 
            phone: user.phone
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Something went wrong"
        })
    }
}

export const getRideDetails = async (req, res) => {
    try {
        const ride = await ridesModel.findById(req.body.rideId)
        
        if(ride){
            return res.status(200).send({
                ride
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Something went wrong"
        })
    }
}

export const getRiderDetails = async (req, res) => {
    try {
        const ride = await ridesModel.findById(req.body.rideId)
        const user = await userModel.findById(ride.rider)

        if (user) {
            return res.status(200).send({
                riderPhone: user.phone            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Something went wrong"
        })
    }
}


export const getAllRides = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id)
        if (user) {
            if(user.userType === "Customer"){
                const allRides = await ridesModel.find()
                console.log(allRides[0].user)
                console.log(req.user.id)
                const rides = allRides.filter((ride, i) => ride.user == req.user.id)
                if (rides.length > 0) {
                    res.status(200).send(
                        {
                            rides,
                            success: true,
                            message: "Rides Fetched"
                        }
                    )
                }
                else {
                    res.status(400).send(
                        {
                            success: false,
                            message: "No ride found"
                        }
                    )
                }
            }
            else{
                const allRides = await ridesModel.find()
                console.log(allRides[0].user)
                console.log(req.user.id)
                const rides = allRides.filter((ride, i) => ride.rider == req.user.id)
                if (rides.length > 0) {
                    res.status(200).send(
                        {
                            rides,
                            success: true,
                            message: "Rides Fetched"
                        }
                    )
                }
                else {
                    res.status(400).send(
                        {
                            success: false,
                            message: "No ride found"
                        }
                    )
                }
            }

        }
        else {
            res.status(400).send(
                {
                    success: false,
                    message: "User not found"
                }
            )
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Something went wrong"
        })
    }
}