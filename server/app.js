import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongodbConnect from "./database/db.js";
import { authMiddleware, attachUserToRequest, errorHandler } from "./public/middleware/auth.js";
import { login, register } from "./public/middleware/authenticator.js";

import cookieParser from "cookie-parser";
import responseTime from "response-time";

// importing routers
import feedbackRoutes from './routes/feedbacks.js'
import profileRoutes from './routes/profile.js'
import projectRoutes from './routes/project.js'

mongodbConnect();

const app = express();


app.use(express.json());
app.use(responseTime((req, res, time) => {
    res.responseTime = time.toFixed(2);
}));

// Custom Morgan format with response time
morgan.token('response-time', (req, res) => `${res.responseTime}ms`);
morgan.token('method', (req) => req.method);
morgan.token('url', (req) => req.url);
morgan.token('status', (req, res) => res.statusCode);

// Custom logging middleware to filter out OPTIONS requests
const customMorgan = (req, res, next) => {
    if (req.method !== 'OPTIONS') {
        morgan(':method :url :status - :response-time')(req, res, next);
    } else {
        next();
    }
};

app.use(customMorgan);
app.use(cookieParser())


const allowedOrigins = ['http://localhost:3000', 'https://groove-ai-web.vercel.app'];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow any methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    credentials: true, // Allow sending cookies across origins
};

app.use(cors(corsOptions));
// Explicitly handle preflight requests
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(204);
});

// Register endpoint
app.post('/api/register', register);
app.post('/api/login', login);
app.use('/api/feedback', feedbackRoutes);

app.use(authMiddleware);
app.use(attachUserToRequest);
app.use(errorHandler);

app.use('/api/profile', profileRoutes)
app.use('/api/project', projectRoutes)

app.post('/api/auth', (req, res) => {
    return res.status(200).json({ message: 'Json web token is valid' })
})

app.get("/healthcheck", (req, res) => {
    return res.json({ status: "success" });
});

app.use(errorHandler);
const PORT = 3001
// app.listen(PORT, () => {
//     console.log(`Server started, Listening to PORT: ${PORT}`);
// });


export default app;