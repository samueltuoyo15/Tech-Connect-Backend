import { Request, Response } from "express";
import {User} from "../utils/type";
import passport from "../passport/passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

