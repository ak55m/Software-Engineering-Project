import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
// import ImportData from "./DataImport.js";
// import productRoute from "./Routes/ProductRoutes.js";
// import userRouter from "./Routes/UserRoutes.js";
// import orderRouter from "./Routes/orderRoutes.js";
import Stripe from "stripe";
dotenv.config();


connectDatabase();
const app = express();

const stripe  = new Stripe(process.env.STRIPE_KEY);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// API
// app.use("/api/import", ImportData);
// app.use("/api/products", productRoute);
// app.use("/api/users", userRouter);
// app.use("/api/orders", orderRouter);


app.post("/create-payment", async(req, res)=> {
  const { amount } = req.body;
  const actual = amount * 100;
  console.log(actual);  
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: actual,
      currency: "usd",
      payment_method_types: ['card'],
    });

    console.log(paymentIntent.client_secret);
    res.json({clientSecret: paymentIntent.client_secret});
    
  } catch (e) {
    console.log(e.message);
    res.status(400).json(e.message);
    }
});




// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server run in port ${PORT}`));