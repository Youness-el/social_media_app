import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import './Chat.css';
import { BsArrowLeft } from 'react-icons/bs';

const Chat = () => {
    const { userId, profileId } = useParams();
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({});
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const chatMessagesRef = useRef(null);

    useEffect(() => {
        const newSocket = io('https://smgram-api.onrender.com');
        setSocket(newSocket);

        const roomId = [userId, profileId].sort().join('-');
        newSocket.emit('joinRoom', { roomId });

        const fetchMessages = async () => {
            try {
                const response = await axios.get(`/api/messages/getMessages/${userId}/${profileId}`);
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`/api/users/findbyId/${profileId}`);
                setUserDetails(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchMessages();
        fetchUserDetails();

        newSocket.on('receiveMessage', (message) => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        return () => {
            newSocket.disconnect();
        };
    }, [userId, profileId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = () => {
        if (inputMessage.trim() === '') return;

        const roomId = [userId, profileId].sort().join('-');
        socket.emit('sendMessage', { roomId, senderId: userId, receiverId: profileId, content: inputMessage });

        setInputMessage('');
    };

    const scrollToBottom = () => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    };

    return (
        <div className="chat-card">
            <div className="chat-header">
                <button className="back-button" onClick={() => { navigate(`/messages/${userId}`) }}>
                    <BsArrowLeft size={24} />
                </button>
                <img src={userDetails.profilePicture} alt={userDetails.username} className="chat-header-img" />
                <h2 className="chat-header-username">{userDetails.username}</h2>
            </div>
            <div className="chat-body">
                <div className="chat-messages" ref={chatMessagesRef}>
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
