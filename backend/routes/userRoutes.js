import express from 'express'
import authenticateJWT from '../middleware/authMiddleware.js'
import { acceptRide, bookRide, getAllAvailableRides, getAllRides, getRideDetails, getRiderDetails, getUserProfile } from '../controllers/UserControllers.js'

const userRouter = express.Router()

userRouter.get('/myprofile', authenticateJWT, getUserProfile)
userRouter.post('/bookride', authenticateJWT, bookRide)
userRouter.get('/getallrides', authenticateJWT, getAllRides)
userRouter.get('/getAllAvailableRides', authenticateJWT, getAllAvailableRides)
userRouter.put('/acceptRide', authenticateJWT, acceptRide)
userRouter.post('/getRideDetails', authenticateJWT, getRideDetails)
userRouter.post('/getRiderDetails', authenticateJWT, getRiderDetails)

export default userRouter