const express=require("express");

const app=express();
require("dotenv").config();
require("./conn/conn")
const cors=require("cors")

const user=require("./routes/user")
const book=require("./routes/book")
const Favourite=require("./routes/favourite")
const cart=require("./routes/cart")
const order=require("./routes/order")
app.use(cors())
app.use(express.json());


//routes

app.use("/api/v1",user)
app.use("/api/v1",book)
app.use("/api/v1",Favourite)
app.use("/api/v1",cart)
app.use("/api/v1",order)

app.listen(process.env.PORT,()=>{
    console.log(`Server Started at port http://localhost:${process.env.PORT}`)
})