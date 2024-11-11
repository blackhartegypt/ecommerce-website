require("dotenv").config();
const express=require("express");
const cors=require("cors");
const stripe=require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const app=express();
app.use(cors());
app.use(express.json());
const path=require("path");

if(process.env.NODE_ENV === "producttion"){
    app.use(express.static("build"));
    app.get("*",(req,res)=>res.sendFile(path.resolve(__dirname,"build","index.html")))
}
 
app.get("/",(req,res)=>res.send("welcome to you favourite shopping Website"))

const calculateOrderAmount=(items)=>
    items.reduce((total,{price,cartQuantity})=>total+price*cartQuantity,0)*100;

app.post("/create-payment-intent", async(req,res)=>{
    const {items,shipping,description}=req.body;
    const paymentIntent=await stripe.paymentIntents.create({
        amount:calculateOrderAmount(items),
        currency:"usd",
        automatic_payment_methods:{
            enabled:true,
        },
        description,
        shipping:{
            line1:shipping.line1,
            line2:shipping.line2,
            city:shipping.city,
            country:shipping.country,
            postal_code:shipping.postal_code,
        },
        name:shipping.name,
        phone:shipping.phone,
    })
    
    res.send({clientSecret:paymentIntent.client_secret,});
})
