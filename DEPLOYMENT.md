# Deployment Guide

## Architecture Diagram

Frontend (Vite + React) ---> Backend (Express + MongoDB) ---> MongoDB Atlas / Render database

## GitHub Workflow

A GitHub Actions pipeline runs on `push` and `pull_request` events. It checks out the code, installs dependencies in `backend` and `frontend`, runs tests if available, and builds the frontend.

### Pipeline Steps

1. Checkout repository
2. Setup Node.js
3. Install backend dependencies
4. Run backend tests
5. Install frontend dependencies
6. Run frontend tests
7. Build frontend

## Vercel Deployment (Frontend)

1. Connect the GitHub repository to Vercel.
2. Set the root directory to `frontend`.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Environment variable:
   - `VITE_API_URL`: `https://<your-backend-url>`

## Render Deployment (Backend)

1. Create a new Web Service on Render.
2. Connect the GitHub repository.
3. Root directory: `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Environment variables:
   - `PORT`
   - `MONGO_URI`
   - `JWT_SECRET`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
   - `GOOGLE_CALLBACK_URL`
   - `FRONTEND_URL`

## Environment Variables

### Backend
- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_CALLBACK_URL`
- `FRONTEND_URL`

### Frontend
- `VITE_API_URL`

## Deployment Verification

- Confirm frontend application opens successfully.
- Call the backend `/api/health` endpoint.
- Verify login and register flows.
- Test currency conversion.
- Confirm protected APIs return data for authenticated users.

## Notes

- Backend reads `PORT` from environment variables.
- Backend reads `MONGO_URI`, `JWT_SECRET`, and OAuth secrets from environment variables.
- Frontend uses `VITE_API_URL` for API requests.
