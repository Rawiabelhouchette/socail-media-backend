# V-Network Backend

This is the backend for a social networking mobile application built with React Native. This project handles user authentication, posts, likes, comments, and relationships between users.

## Table of Contents

- [About The Project](#about-the-project)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Running Tests](#running-tests)
- [Deployment](#deployment)
- [Built With](#built-with)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## About The Project

This project is the backend for a social networking mobile application called V-Network. It provides a RESTful API for handling users, posts, messages, and other social networking features.

### Built With

* [Node.js](https://nodejs.org/)
* [Express.js](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)
* [JSON Web Tokens](https://jwt.io/)
* [Bcrypt.js](https://www.npmjs.com/package/bcryptjs)
* [Multer](https://www.npmjs.com/package/multer) for file uploads

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username_/your_project_name.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/signin` | Login an existing user |
| POST | `/api/auth/forgotpassword` | Send a password reset email |
| POST | `/api/auth/verifCode` | Verify the password reset code |
| PUT | `/api/auth/resetpassword` | Reset the user's password |

### Users

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/user` | Get all users |
| GET | `/api/user/:id` | Get a user by ID |
| PUT | `/api/user/:id` | Update a user |
| DELETE | `/api/user/:id` | Delete a user |
| PUT | `/api/user/:id/follow` | Follow a user |
| PUT | `/api/user/:id/unfollow` | Unfollow a user |
| PUT | `/api/user/:id/addclosefriend` | Add a close friend |
| PUT | `/api/user/:id/removeCloseFriend` | Remove a close friend |

### Posts

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/post` | Create a new post |
| GET | `/api/post` | Get all posts |
| GET | `/api/post/postsGifts` | Get all posts and gifts |
| GET | `/api/post/my-posts/:userId` | Get all posts by a user |
| PUT | `/api/post/:id` | Update a post |
| DELETE | `/api/post/:id` | Delete a post |
| PATCH | `/api/post/likepost/:id` | Like a post |
| PATCH | `/api/post/commentpost/:id` | Comment on a post |
| PATCH | `/api/post/editcommentpost/:id` | Edit a comment on a post |
| PATCH | `/api/post/deletecommentpost/:id` | Delete a comment on a post |

### Gifts

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/gift` | Create a new gift |
| GET | `/api/gift` | Get all gifts |
| GET | `/api/gift/my-gifts/:userId` | Get all gifts by a user |
| PUT | `/api/gift/:id` | Update a gift |
| DELETE | `/api/gift/:id` | Delete a gift |

### Messages

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/message` | Create a new message |
| GET | `/api/message/:sender/:receiver` | Get all messages between two users |

### Notifications

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/notification/allNotification` | Get all notifications |
| POST | `/api/notification` | Create a new notification |
| GET | `/api/notification/:userId` | Get all notifications for a user |
| PUT | `/api/notification/:id/read` | Mark a notification as read |
| DELETE | `/api/notification/:id` | Delete a notification |

## Running Tests

There are currently no tests configured for this project.

## Deployment

This project can be deployed to any hosting service that supports Node.js, such as Heroku, AWS, or DigitalOcean. You will need to set up your environment variables on the hosting service.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the ISC License. See `LICENSE` for more information.
