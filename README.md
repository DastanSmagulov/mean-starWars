# Star Wars Data Explorer

A web application to explore Star Wars characters, planets, and starships using data from the SWAPI (Star Wars API).

## Setup Instructions

### Prerequisites

- Node.js (>= 14.x)
- MongoDB (>= 4.x)
- Git

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/mern-starWars.git
   cd mern-starWars
   ```

2. **Install server dependencies:**
   ```sh
   cd backend
   npm install
   ```

3. **Install client dependencies:**
   ```sh
   cd ../frontend
   npm install
   ```

4. **Set up MongoDB:**
   Make sure your MongoDB server is running. You can start MongoDB using the following command:
   ```sh
   mongod --dbpath /path/to/your/db
   ```

5. **Configure environment variables:**
   Create a `.env` file in the backend directory with the following content:
   ```env
   MONGO_URI=mongodb://localhost:27017/swapi
   PORT=5000
   ```

   And in the frontend directory, create a `.env` file with the following content:
   ```env
   REACT_APP_SWAPI_API=http://localhost:5000/api
   ```

## Running the Application

### Start the Backend Server

1. **Navigate to the backend directory:**
   ```sh
   cd backend
   ```

2. **Start the backend server:**
   ```sh
   nodemon server.js
   ```

   You should see output similar to:
   ```sh
   Server running on port 5000
   MongoDB connected successfully
   ```

### Start the Frontend Server

1. **Navigate to the frontend directory:**
   ```sh
   cd ../frontend
   ```

2. **Start the frontend server:**
   ```sh
   npm start
   ```

   You should see output similar to:
   ```sh
   Compiled successfully!
   You can now view the app in the browser.
   ```

3. **Open the application in your browser:**
   Navigate to `http://localhost:3000`

## Project Design and Development Process

### Design Process

The project was designed with a focus on modularity and scalability. The application consists of two main parts:

1. **Backend**: A Node.js/Express server that fetches data from SWAPI and provides endpoints for characters, planets, and starships. MongoDB is used for data storage and caching.

2. **Frontend**: A React application that interacts with the backend to display the data with pagination and search functionality.

### Development Process

The development process followed an iterative approach:

1. **Initial Setup**: Set up the basic structure for the backend and frontend. Configured MongoDB for data storage.

2. **API Integration**: Integrated SWAPI to fetch data for characters, planets, and starships. Implemented pagination and search functionality on the backend.

3. **Frontend Development**: Created React components for displaying characters, planets, and starships. Added pagination and search functionality.

## Unique Approaches and Methodologies

- **Modular Design**: The project is designed with a clear separation of concerns, making it easy to extend and maintain. Backend and frontend are decoupled, which allows independent development and scaling.

- **Environment Configuration**: Used environment variables to manage configuration, making it easy to switch between development and production environments.

### Compromises

- **Data Caching**: Instead of caching data on the server, the application fetches data directly from SWAPI on each request. This approach simplifies the implementation but may result in slower response times.

- **Error Handling**: Basic error handling is implemented. However, more robust error handling and user-friendly messages could be added.

### Known Issues

- **Pagination Limitations**: The frontend does not dynamically adjust the number of pagination buttons based on the total pages. This might be improved for better user experience.

- **Search Functionality**: The search functionality relies on SWAPI's search capabilities, which may have limitations and may not support partial matches effectively.
