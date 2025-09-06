require("dotenv").config();

// express setup
const express = require("express");
const app = express();
// require Mongoose
const mongoose = require("mongoose");
//auth route 
const authRoute = require("./Routes/AuthRoute");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 1010
// Mongoose URL
const URLv= process.env.MONGO_URL;

const bodyParser = require("body-parser");
const cors = require("cors");

const {userVerification} = require("./Middlewares/AuthMiddleware");


// require the Models 
const {HoldingModel} = require("./Models/HoldingModels");
const {PositionModel} = require("./Models/PositionModel");
const {OrderModel} = require("./Models/OrderModel");
const {UserModel} = require("./Models/User");

const FRONTEND_URL = process.env.FRONTEND_URL;
// Requiring cors and bodyParser 
app.use(cookieParser());
app.use(
     cors({
       origin: [`${FRONTEND_URL}`],
       methods: ["GET", "POST", "PUT", "DELETE"],
       credentials: true,
     })
   ); 
app.use(bodyParser.json())
app.use(express.json())

// app.get("/data" , async(req,res)=>{


//    tempHolding.forEach((item)=> {
//         let newHolding = new HoldingModel({
//             name: item.name,
//             qty: item.qty,
//             avg: item.avg,
//             price: item.price,
//             net: item.net,
//             day: item.day,
//         })

//         newHolding.save();
//    })
// res.send("Done");
// })

// app.get("/pos" , async(req , res)=> {
       
//     let data =  [
       
//         {
//           product: "VVN",
//           name: "VIVI",
//           qty: 1,
//           avg: 3124.75,
//           price: 3082.65,
//           net: "+10.04%",
//           day: "-1.35%",
//           isLoss: true,
//         },
//       ];

//        data.forEach(item => {
//        let tempPos = new PositionModel(
//             {
//                 product: item.product,
//                 name: item.name,
//                 qty: item.qty,
//                 avg: item.avg,
//                 price: item.price,
//                 net: item.net,
//                 day: item.day,
//                 isLoss: item.isLoss,
//             }
//          )

//          tempPos.save();
//        });

//        res.send("done..")
// })

app.use("/"  , authRoute);

app.get("/allHoldings"  ,userVerification ,  async(req, res)=>{     
     let allHoldings = await HoldingModel.find({});
     res.json(allHoldings);      
});                                               

app.get("/allPosition" ,userVerification , async(req, res)=>{
     let allPosition = await PositionModel.find({});
     res.send(allPosition);
});


app.post("/newOrder" ,userVerification , async (req , res)=> {
      let newOrder = new OrderModel({
         name : req.body.name ,
         qty : req.body.qty,
         price : req.body.price,
         model : req.body.model 

      });
    console.log("responce from User : " , req.body);
  
      newOrder.save();
      res.send("Order saved !!"); 
})

app.use((req, res, next) => {
     res.status(404).send('<h1>404 - Page Not Found</h1>');
   });

app.listen(PORT , ()=>{
    console.log("the app is working ", PORT );
    // Connect the Mongoose
    mongoose.connect(URLv )
    console.log("DB is connected");
});

