# Currency Converter Application Report

## Project Overview
The Currency Converter application was developed as a full-stack MERN assignment to demonstrate authentication, REST APIs, CRUD operations, and frontend integration. The system allows users to register and sign in, convert currencies, and maintain a personal conversion history. The project follows a modular folder structure and clean separation between frontend, backend, and supporting documents.

## Technologies Used
The frontend uses React.js with Vite, React Router DOM, Axios, and CSS. The backend uses Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, Passport.js, and dotenv. These technologies were selected to build a secure and scalable web application that supports both local authentication and Google OAuth login.

## Backend Architecture
The backend is organized into clear folders such as config, controllers, middleware, models, routes, services, and utils. The server entry point initializes the Express app and connects to MongoDB. Controllers handle request logic, services manage reusable conversion behavior, and middleware provides validation, authentication, and error handling. This structure keeps the project easy to maintain and extend.

## REST APIs
The backend exposes REST endpoints for health checks, authentication, conversion, and history management. The application supports user registration, login, profile retrieval, currency conversion, and CRUD operations for conversion history. Each route is designed to return consistent success or failure responses with meaningful messages that align with the assignment requirements.

## JWT Authentication
JWT authentication is implemented for protected routes. Passwords are hashed with bcrypt before being stored in MongoDB, and a JWT is returned after successful login. Protected APIs require the Authorization header with a Bearer token, and unauthorized requests return a 401 status code when the token is missing or invalid.

## OAuth2 Authentication
Google OAuth is configured with Passport.js using the passport-google-oauth20 strategy. This allows users to authenticate using their Google account and then return to the frontend dashboard. Although the real Google credentials must be provided in the environment file for production use, the implementation structure is complete and ready for configuration.

## Frontend Integration
The React frontend uses Axios for API communication and includes interceptors to attach the JWT token automatically. It contains pages for home, login, register, dashboard, profile, and history. The dashboard supports currency conversion, swapping currencies, and showing conversion results. The history page displays previously saved conversion records for the authenticated user.

## API Testing using Postman
The APIs were structured to be tested in Postman using a collection file stored at the root of the assignment folder. The collection includes requests for health checks, registration, login, profile access, conversion, history retrieval, creation, update, deletion, unauthorized access, and Google OAuth. The file uses variables such as {{baseUrl}} and {{jwtToken}} to simplify testing.

## Observations
The application demonstrates a complete end-to-end flow for authentication and currency conversion. The modular architecture keeps the project manageable, while the frontend provides a simple and interactive experience. The implementation also prepares the project for future enhancements such as real exchange rate APIs, improved UI design, and richer user profile management.

## Conclusion
This assignment successfully builds a full-stack Currency Converter application using the MERN stack. It satisfies the core requirements for REST APIs, CRUD operations, JWT authentication, Google OAuth setup, React integration, and API testing. The project is ready for local execution and can be expanded further for a more advanced production-grade solution.
