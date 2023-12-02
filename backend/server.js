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

// User registration endpoint
app.post("/api/register", (req, res) => {
  const { name, email, address, phoneNumber, password } = req.body;

  // Check if the user already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create a new user object
  const newUser = {
    id: users.length + 1,
    name,
    email,
    address,
    phoneNumber,
    password,
  };

  // Store the user in memory (replace this with database storage in production)
  users.push(newUser);

  res.json({ message: 'User registered successfully', user: newUser });
});

// User login endpoint
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const user = users.find((user) => user.email === email && user.password === password);

  if (user) {
    res.json({ message: 'Login successful', user });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});



// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`server run in port ${PORT}`));