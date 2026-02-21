const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');

const connectDB = require('./config/db');
const Chat = require('./models/Chat');

dotenv.config();

const app = express();
const server = http.createServer(app);

//Socket.io setup
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
        methods: ["GET", "POST"]
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

//Socket authentication
io.use((socket, next) => {
    try {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error('Authentication error'));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = decoded.id;

        next();
    } catch (error) {
        next(new Error('Authentication error'));
    }
});

const onlineUsers = new Map();

io.on('connection', (socket) => {
    console.log('User connected:', socket.userId);

    onlineUsers.set(socket.userId.toString(), socket.id);
    //Private messaging
    socket.on('private-message', async ({ receiverId, message }) => {
        try {
            const newMessage = await Chat.create({
                sender: socket.userId,
                receiver: receiverId,
                message
            });

            const populatedMessage = await Chat.findById(newMessage._id)
                .populate('sender', 'username')
                .populate('receiver', 'username');

            const receiverSocketId = onlineUsers.get(receiverId.toString());

            if (receiverSocketId) {
                io.to(receiverSocketId).emit('private-message', populatedMessage);
            }

            socket.emit('private-message', populatedMessage);

        } catch (error) {
            console.error(error);
        }
    });


    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.userId);
        onlineUsers.delete(socket.userId?.toString());
    });

});

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const questionRoutes = require('./routes/questionRoutes');
const answerRoutes = require('./routes/answerRoutes');
const adminRoutes = require('./routes/adminRoutes');
const chatRoutes = require('./routes/chatRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/answers', answerRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/chat', chatRoutes);

//Health check
app.get('/', (req, res) => {
    res.json({
        message: 'DoConnect API is running',
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

//404 handler
app.use((req, res) => {
    res.status(404).json({
        message: 'Route not found',
        path: req.originalUrl
    });
});

//Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development'
            ? err.message
            : 'Internal server error'
    });
});

//Start server (except in test)
if (process.env.NODE_ENV !== 'test') {
    connectDB()
        .then(() => {
            console.log('Database connected successfully');

            const PORT = process.env.PORT || 5000;

            server.listen(PORT, () => {
                console.log(`Server running on port ${PORT}`);
                console.log(`Socket.io server ready`);
            });
        })
        .catch(err => {
            console.error('MongoDB connection failed:', err.message);
            process.exit(1);
        });
}

module.exports = app;

