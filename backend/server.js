import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectMongoDb from './db/connectMongoDb.js';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import userRoutes from './routes/user.route.js';
import { app, server } from './socket/cocket.js';

import path from 'path';

const __dirname = path.resolve();

dotenv.config();

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8000;


app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/user', userRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend', 'dist')));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}

server.listen(PORT, async () => {
    await connectMongoDb();
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});