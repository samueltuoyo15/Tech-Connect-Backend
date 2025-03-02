# Tech Connect - Connecting Tech Enthusiasts! 🚀

## Description

Tech Connect is a modern social media platform built with Node.js, designed to connect tech enthusiasts around the globe. Share your thoughts, engage in conversations, and grow your network within a thriving community.

Key features include:

-   **Email & Google Authentication**: Securely sign up and sign in using email or Google.
-   **Email Verification**: Ensure user authenticity with email verification.
-   **Password Reset**: Easily reset forgotten passwords.
-   **User Profiles**: Customizable profiles with bios, profile pictures, and more.
-   **Posts**: Create and share text, images, and videos.
-   **Comments**: Engage with posts through comments.
-   **Like**: Show your support for posts with likes.
-   **Follow**: Follow other users to stay updated with their content.

## Installation 🔧

Follow these steps to set up Tech Connect locally:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/techconnect.git
    cd techconnect
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root directory with the following variables:

    ```
    PORT=3000
    MONGOOSE_URL=mongodb://localhost:27017/techconnect
    JWT_SECRET=your_jwt_secret
    GMAIL_USER=your_gmail_user@gmail.com
    GMAIL_PASS=your_gmail_password
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    SERVER_URL=http://localhost:3000
    SESSION_SECRET=your_session_secret
    NODE_ENV=development
    ```

4.  **Connect to MongoDB:**

    Make sure you have MongoDB installed and running. Update the `MONGOOSE_URL` in your `.env` file accordingly.

5.  **Run the server:**

    ```bash
    npm run dev
    ```

    The server will start at `http://localhost:3000`.

## Usage 💻

1.  **Sign Up/Sign In:**

    -   Navigate to the sign-up page to create a new account with your email, username, and password.
    -   Alternatively, sign in with your Google account for quick access.

2.  **Email Verification:**

    -   After signing up with email, verify your account by clicking the link sent to your email address.

3.  **Explore the Community:**

    -   View and interact with posts from other users.
    -   Follow users to personalize your feed.

4.  **Create Posts:**

    -   Share your thoughts, images, and videos with the community.

5.  **Engage with Content:**

    -   Like and comment on posts to start conversations.

## Features ✨

| Feature             | Description                                                     |
| :------------------ | :-------------------------------------------------------------- |
| Email Authentication  | Secure sign-up and sign-in using email and password.            |
| Google Authentication | Quick and easy sign-in using Google accounts.                  |
| Email Verification    | Ensures user authenticity and security.                       |
| Password Reset      | Allows users to reset their passwords if forgotten.             |
| User Profiles       | Customizable profiles with personal information.               |
| Posts               | Create and share text, images, and videos with the community. |
| Comments            | Engage in discussions by commenting on posts.                  |
| Likes               | Show appreciation for posts by liking them.                      |
| Follow              | Stay updated with your favorite users' content.                |
| Account Deletion    | Users can delete their account                                 |

## Technologies Used 🛠️

| Technology   | Version | Description                                                                  |
| :----------- | :------ | :--------------------------------------------------------------------------- |
| Node.js      | Latest  | JavaScript runtime environment                                               |
| Express      | Latest  | Web application framework for Node.js                                       |
| MongoDB      | Latest  | NoSQL database                                                               |
| Mongoose     | Latest  | MongoDB object modeling tool                                                 |
| JWT          | Latest  | JSON Web Tokens for authentication                                           |
| Bcryptjs     | Latest  | For password hashing                                                         |
| Nodemailer   | Latest  | Send emails for account verification and notifications                       |
| Passport     | Latest  | Authentication middleware for Node.js                                       |
| Google OAuth 2.0| Latest  | For sign-in with google  |
| Joi          | Latest  | Data validation library                                                     |
| Dotenv       | Latest  | Load environment variables from `.env` file                                 |
| Cors         | Latest  | Cross-Origin Resource Sharing middleware                                     |
| Helmet       | Latest  | Security middleware to set various HTTP headers                              |
| Cookie Parser| Latest  | Parse HTTP request cookies                                                   |
| Express Session| Latest  | Create a session middleware                                                 |

## Contributing 🤝

We welcome contributions to Tech Connect! Here's how you can contribute:

1.  **Fork the repository.**
2.  **Create a new branch** for your feature or bug fix:

    ```bash
    git checkout -b feature/your-feature-name
    ```

3.  **Make your changes** and commit them with descriptive commit messages.
4.  **Push your branch** to your forked repository.
5.  **Submit