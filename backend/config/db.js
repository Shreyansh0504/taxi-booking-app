import mongoose from "mongoose"

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.DB_URL)
        console.log(`DB connected successfully`.bgGreen)
    } catch (error) {
        console.log(`Error connecting to DB ${error}`.bgRed)

    }
}

export default connectDb