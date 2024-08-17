
# FilterFlex Backend

The FilterFlex backend is built with Express and connects to MongoDB. It uses CORS for handling cross-origin requests and dotenv for managing environment variables.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [Environment Configuration](#environment-configuration)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Ensure you have the following installed:

- **Node.js** (v14.x or later)
- **npm** (comes with Node.js)
- **MongoDB** (for local development; make sure it is running)

## Installation

1. **Clone the Repository**

   If you haven’t cloned the repository yet, do so:

   ```bash
   git clone https://github.com/yourusername/filterflex_server.git
   cd filterflex_server` 

2.  **Install Dependencies**
    
    Install the required Node.js packages:
    `npm install` 
    

## Running the Server

3.  **Start the Server**
    
    To start the server, use:
    `npm start` 
    
    This will run `nodemon` which will automatically restart the server on code changes. The server will typically run on `http://localhost:3000` unless specified otherwise.
    

## Environment Configuration

4.  **Configure Environment Variables**
    
    Create a `.env` file in the root directory of the project with the following environment variables:
  

PORT=5000

URI=mongodb+srv://<username>:<password>@cluster0.ek5qasv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
    
    Replace `your_database` with the name of your MongoDB database.
    
    Ensure MongoDB is running locally or configure the URI to connect to a remote MongoDB instance.
    

## Troubleshooting

-   **Server Not Starting**: Ensure all dependencies are installed and MongoDB is running.
-   **Environment Variables**: Verify that the `.env` file is correctly set up and located in the root directory.
-   **Check Logs**: Review the terminal output for error messages that can help identify issues.

