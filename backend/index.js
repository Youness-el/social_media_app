const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const messageRoutes = require('./routes/messages');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const bodyParser = require("body-parser");
const Message = require('./models/Message'); // Import Message model

dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
}));

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use('/public', express.static('public'));

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/messages', messageRoutes);

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('joinRoom', ({ roomId }) => {
        socket.join(roomId);
    });

    socket.on('sendMessage', async ({ roomId, senderId,receiverId, content }) => {
        const message = new Message({ roomId, senderId,receiverId, content, createdAt: new Date() });
        await message.save();
        
        // Emit to the specific room
        io.to(roomId).emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
