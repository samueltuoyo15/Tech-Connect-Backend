import {Request, Response} from "express";
import passport from "passport";
import supabase from "../supabase/supabase";


//sign up with email and password 
export default const signUpWithEmailAndPassword = async (req: Request, res: Response): Promise<any> => {
  const {username, email, password, gender} : {username: string; email: string; password: string, gender: string} = req.body;
  
  if(!gender || !username || !email || !password ){
   return res.status(400).json({message: "please both username, gender, password and email must not be empty"});
  }
  
  if(typeof gender !== "string"){
    return res.status(400).json({message: "invalid match for gender it must be either male or female if mot specified default is male"});
  }
  if(typeof username !== "string" || typeof email !== "string" || typeof password !== "string" || password.length > 20){
    return res.status(400).json({message: "please make sure type of password is a string and it must not be greater than 20"});
  }
  if((!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))){
    return res.status(400).json({message: "invalid email format"})
  }
  
  if (password.length < 6 || password.length > 20) {
    return res.status(400).json({ message: "Password must be 6-20 characters long" });
  }
  if (username.length < 3 || username.length > 14) {
    return res.status(400).json({ message: "Username must be 3-8 characters long" });
  }
 
  
  try{
    const {data, error} = await supabase.auth.signUp({email, password});
    if(error){
      console.error(error);
      return res.status(500).json({message: "unable to sign up"});
    }
    const {error: dbError} = await supabase.from("users").insert({
      id: data.user?.id,
      email,
      bio: "",
      profile_picture: "",
      username: username,
      gender: gender,
    });
    
    if(dbError){
      console.error(dbError)
      return res.status(500).json({message: "error saving new user to database"});
    }
    
    return res.status(200).json({message: "successfully signed up", user: data?.user});
  }catch(error: any){
    console.error(error);
    return res.status(500).json({message: "an error occurred in the server"});
  }
};

