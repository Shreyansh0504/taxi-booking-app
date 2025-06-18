import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import colors from 'colors'
import connectDb from './config/db.js'
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js'
import path from "path";
import { fileURLToPath } from "url";

const app = express()
dotenv.config()
connectDb()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

// middlewares
const corsOptions = {
  origin: "https://bounce-taxi-booking-shreyansh.vercel.app", // Specify the allowed origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Include credentials like cookies
};

app.use(cors(corsOptions));
app.use(express.json())
app.use(morgan('dev'))

app.use("/api/v1/auth", authRouter)
app.use('/api/v1/user', userRouter)

const port = process.env.PORT || 8080

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

app.listen(port, () => {
    console.log(`Backend running on ${port}`.bgMagenta)
})
