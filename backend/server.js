import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
// import ImportData from "./DataImport.js";
// import productRoute from "./Routes/ProductRoutes.js";
// import userRouter from "./Routes/UserRoutes.js";
// import orderRouter from "./Routes/orderRoutes.js";
import Stripe from "stripe";
import User from './models/User.js';
import jwt from 'jsonwebtoken'; 
dotenv.config();

connectDatabase();
const app = express();
const stripe  = new Stripe(process.env.STRIPE_KEY);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to authenticate the user using a token
const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

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

// Fetch user data endpoint
app.get('/api/get-user', authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send only necessary user data to the client (exclude sensitive info)
    const userData = {
      name: user.name,
      email: user.email,
      address: user.address,
      phoneNumber: user.phoneNumber,
    };

    res.json({ user: userData });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Fetch all available lottery tickets
app.get('/api/lottery-tickets', async (req, res) => {
  try {
    const lotteryTickets = await LotteryTicket.find();
    res.json({ lotteryTickets });
  } catch (error) {
    console.error('Error fetching lottery tickets:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`server run in port ${PORT}`));