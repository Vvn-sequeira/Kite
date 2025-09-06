const passport = require("passport");
const {UserModel} = require("../Models/User");
const {createSecretToken } = require("../Util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async(req  , res  )=> {
   try{
    console.log(" Signup page triggerd");
    const { Email, Password, Username, createdAt } = req.body;
        const existingUser = await UserModel.findOne({Email});
        if(existingUser){
            return    res.status(400).json({message: "User alredady exist " , success : false  });
        }
    
        const newuser = await UserModel.create({ Email, Password, Username, createdAt });
        const token = createSecretToken(newuser._id);
        res.cookie("token" , token , {
            withCredentials: true,
            httpOnly: false,
        });

      console.log(" SignUp data has been stored ");
        res.status(201).json({message: "User Signed in  Successfully " , success : true , newuser });
     
    }
    catch(errror) {
       console.log(errror)
    }
  
}

module.exports.Login = async(req , res    )=> {
     
    try {
        console.log("Login route is trigerd ");
        const {Email , Password} = req.body ;
        if(!Email || !Password){
             return res.status(400).json({message: "All fields are requrired"}) 
        }
        const user = await UserModel.findOne({Email});
        if(!user){
            return  res.status(400).json({message:"user alredy exist please Signup"}); 
        }

        const auth = await bcrypt.compare(Password , user.Password);
        if(!auth)
        {
             return res.status(401).json({message: "Email or Password is incorect "}); 
        }

        const token = createSecretToken(user._id);
        res.cookie("token" , token , {
             withCredentials: true ,
             httpOnly : false , 
        });
        
        res.status(201).json({message : "User loged in succesfully " , success : true , user });
      

    } catch (error) {
        console.log(error);
    }
}