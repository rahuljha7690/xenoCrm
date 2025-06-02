import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './src/config/db.js';
import './src/config/redis.js'; // Initialize Redis connection
import campaignConsumer from './src/services/campaignConsumer.js';
import './src/config/passport.js';
import passport from 'passport';
import session from 'express-session';
const app = express();

app.use(session({ secret: 'your_secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


dotenv.config();


app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// DB connection
connectDB();

// Routes
import authRoutes from './src/routes/authRoutes.js';
import dataRoutes from './src/routes/dataRoutes.js';
import campaignRoutes from './src/routes/campaignRoutes.js';
import deliveryRoutes from './src/routes/deliveryRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/delivery', deliveryRoutes);

// Start Redis consumer
campaignConsumer();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

