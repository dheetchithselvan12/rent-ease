# RentEase Render Deployment

Deploy this project as two Render services:

- `server/`: Web Service
- `client/`: Static Site

## Backend Web Service

Create a new Render Web Service with these settings:

- Root Directory: `server`
- Runtime: `Node`
- Build Command: `npm install`
- Start Command: `npm start`

Add these environment variables:

```env
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SCREATE=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
SERVER_URI=https://your-backend-name.onrender.com
CLIENT_URI=https://your-frontend-name.onrender.com
NODE_ENV=production
```

After the backend deploys, copy its Render URL and use it for `SERVER_URI`.

## Google OAuth

In Google Cloud Console, add this authorized redirect URI:

```text
https://your-backend-name.onrender.com/api/auth/google/callback
```

It must match the backend `SERVER_URI`.

## Frontend Static Site

Create a new Render Static Site with these settings:

- Root Directory: `client`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`

Add this environment variable:

```env
VITE_API_BASE_URL=https://your-backend-name.onrender.com/api
```

Add this rewrite rule for React Router:

- Source Path: `/*`
- Destination Path: `/index.html`
- Action: `Rewrite`

After the frontend deploys, copy its Render URL and update the backend
`CLIENT_URI`, then redeploy the backend.

## Smoke Test

Test these flows after both services deploy:

- Register and login
- Google login redirect
- Product list and product details
- Rent Now to checkout
- Cart checkout
- Order creation
- Product image upload through Cloudinary
