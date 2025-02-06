import express, {Application, Request, Response} from "express";
import cors from "cors";
import helmet from "helmet";
import session from "express-session";
import passport from "./passport/passport";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import authRoute from "./routes/authRoute";

const server: Application = express();
server.use(cors());
server.use(helmet());
server.use(cookieParser());
server.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: true,
}))
server.use(passport.initialize());
server.use(passport.session());
server.use(express.json());
server.use(authRoute);

server.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
});