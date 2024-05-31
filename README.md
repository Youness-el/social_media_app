# Social Media Platform

## Overview

This is a social media platform that allows users to chat with each other, follow other users, like and comment on posts, and create new posts. The application is built with a modern tech stack, including React for the frontend, Node.js for the backend, MongoDB for the database, and Socket.IO for real-time communication.

## Features

- **User Registration and Authentication:** Users can sign up and log in to their accounts.
- **User Profiles:** Users can view and edit their profiles, including uploading profile pictures.
- **Real-time Chat:** Users can chat with each other in real-time.
- **Follow/Unfollow Users:** Users can follow or unfollow other users.
- **Post Creation:** Users can create new posts with text and images.
- **Like and Comment on Posts:** Users can like and comment on posts.
- **Responsive Design:** The application is responsive and works well on both desktop and mobile devices.

## Tech Stack

- **Frontend:** React, Redux, React Bootstrap, React Router
- **Backend:** Node.js, Express, MongoDB
- **Real-time Communication:** Socket.IO
- **Image Uploads:** Cloudinary
- **Styling:** CSS, React Bootstrap

## Installation

### Prerequisites

- Node.js (v14 or later)
- MongoDB
- Cloudinary account (for image uploads)

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
2. **Install server dependencies:**
    ```bash
   cd server
   npm install
3. **Install client dependencies:**
   ```bash
   cd ../client
   npm install
4. **Create a `.env` file in the server directory and add the following environment variables:**
   ```bash
   MONGO_URI=your_mongodb_uri
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   JWT_SECRET=your_jwt_secret

5. **Start the server:**
   ```bash
   cd ../backend
   npm run dev
6. **Start the frontend:**
   ```bash
   cd ../backend
   npm run dev
## Usage
### Registration and Login
- Visit the registration page to create a new account.
- Log in with your credentials to access the platform.
- User Profile
- View and edit your profile.
- Upload a profile picture.
### Chat
- Open a chat with another user to start a real-time conversation.
- Follow Users
- Visit another user's profile to follow or unfollow them.
### Posts
- Create a new post with text and an optional image.
- Like and comment on posts.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
If you have any questions or feedback, please contact me at [zouhairfgra@gmail.com].
