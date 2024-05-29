import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import './Chat.css'
import { BsArrowLeft } from 'react-icons/bs';
const Chat = () => {
    const { userId, profileId } = useParams();
    const [userDetails, setUserDetails] = useState({});
const navigate= useNavigate()
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Connect to Socket.IO server only once when the component mounts
        const newSocket = io('http://localhost:5000');
        setSocket(newSocket);

        // Join chat room
        const roomId = [userId, profileId].sort().join('-');
        newSocket.emit('joinRoom', { roomId });

        // Fetch initial messages from the server
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`/api/messages/getMessages/${userId}/${profileId}`);
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };
         // Fetch user details
    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`/api/users/findbyId/${profileId}`);
            setUserDetails(response.data);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };
    fetchUserDetails();
        fetchMessages();

        // Listen for received messages
        newSocket.on('receiveMessage', (message) => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        // Clean up function to disconnect socket when component unmounts
        return () => {
            newSocket.disconnect();
        };
    }, [userId, profileId]);

    const handleSendMessage = () => {
        if (inputMessage.trim() === '') return;

        const roomId = [userId, profileId].sort().join('-');

        // Emit message to Socket.IO server
        socket.emit('sendMessage', { roomId, senderId: userId,receiverId:profileId, content: inputMessage });

        // Clear input field
        setInputMessage('');
    };
   

    return (
        <div className="chat-card">
        <div className="chat-header">
                <button className="back-button" onClick={()=>{navigate('/messages/${userId}')}}>
                    <BsArrowLeft size={24} />
                </button>
                <img src={userDetails.profilePicture} alt={userDetails.username} className="chat-header-img" />
                <h2 className="chat-header-username">{userDetails.username}</h2>
            </div>
        <div className="chat-body">
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div key={index} className={message.senderId === userId ? 'chat-message chat-message-sent' : 'chat-message chat-message-received'}>
                        {message.content}
                    </div>
                ))}
            </div>
            <div className="chat-input-container">
                <input 
                    type="text" 
                    value={inputMessage} 
                    onChange={(e) => setInputMessage(e.target.value)} 
                    className="chat-input"
                />
                <button onClick={handleSendMessage} className="chat-send-button">Send</button>
            </div>
        </div>
    </div>
    );
};

export default Chat;
