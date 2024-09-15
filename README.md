# iNotes - A Secure Personal Notes App

iNotes is a secure and private notes management application built using the MERN stack (MongoDB, Express, React, and Node.js). 
Users can create an account, log in, and store personal notes that are accessible only to them.

Features

  User Authentication: Secure login and account creation using encrypted passwords.
  Private Notes: Each user's notes are private and cannot be accessed by others.
  Local Storage: User data and notes are stored locally using MongoDB Compass.
  Responsive UI: Clean and responsive user interface built using React.
  
Technologies Used

  MongoDB: For storing user accounts and notes data locally.
  Express.js: Backend framework for building the server and handling API requests.
  React.js: Frontend framework for building the user interface.
  Node.js: Backend runtime environment for running the server.
  
# Installation
**Clone the repository:**

  git clone https://github.com/AaronS83/iNotes.git
  
**Navigate to the project directory:**

cd iNotes

**Install dependencies for the server:**

cd backend
npm install

**Install dependencies for the client:**

cd ../frontend
npm install

**Setup MongoDB:**

Ensure MongoDB is installed locally on your machine.
Start MongoDB locally using MongoDB Compass.

**Run the server and client:**

In two separate terminal windows:
Run the backend server:
cd backend
npm start

**Run the frontend:**

cd frontend
npm start

**Usage**

Open the browser and navigate to http://localhost:3000.
Register for a new account or log in with an existing account.
Write and save notes securely. Your notes are private and will be stored on MongoDB.

Security

Passwords are hashed using bcrypt for secure storage.
User sessions are managed using JWT (JSON Web Tokens) to keep the user logged in securely.
