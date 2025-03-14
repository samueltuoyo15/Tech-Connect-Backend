import express, {Application} from "express"
import cors from "cors"
import helmet from "helmet"
import session from "express-session"
import connectDatabase from "./database/mongoose"
import passport from "./middlewares/passport"
import cookieParser from "cookie-parser"
import authRoute from "./routes/authRoute"
import dotenv from "dotenv"
dotenv.config()

const server: Application = express()
server.use(cors({origin: "http://localhost:5173", credentials: true,}))
server.use(express.json());
server.use(express.urlencoded({ extended: true }))
server.use(helmet())
server.use(cookieParser())
server.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: true,
}))
server.use(passport.initialize())
server.use(passport.session())
server.use("/api/auth", authRoute)
connectDatabase()

server.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
})