import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import SearchBox from "./SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../actions/userActions";
import "./Messages.css"; // Import the CSS file for styling

const Messages = () => {
  const [chatList, setChatList] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const response = await axios.get(`/api/messages/getChatList/chatList/${userId}`);
        setChatList(response.data);
      } catch (error) {
        console.error("Error fetching chat list:", error);
      }
    };
    fetchChatList();
  }, [userId]);

  return (
    <div className="messages-container">
    <h1>Messages</h1>
    <div className="search-container">
      <label htmlFor="searchBox" className="search-label">New Chat</label>
      <SearchBox id="searchBox" />
    </div>
    <div className="chat-list">
      {chatList.map(({ user, message }) => (
        <Link key={user._id} to={`/chat/${userId}/${user._id}`} className="chat-item-link">
          <div className="chat-item">
            <img src={user.profilePicture} alt={user.username} className="chat-item-img" />
            <div className="chat-item-info">
              <h3 className="chat-item-username">{user.username}</h3>
              <p className="chat-item-message">{message ? message.content : "No messages yet"}</p>
              <p className="chat-item-time">{message ? moment(message.createdAt).fromNow() : ""}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>

  );
};

export default Messages;
