# InkNova — Full-Stack Blogging Platform

A professional MERN-style blog application built for the Full-Stack Blog Application assignment.

## Stack
- Frontend: React.js, React Router, Tailwind CSS, Axios, Lucide React
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Authentication: JWT + bcryptjs
- Authorization: ownership checks on the backend
- CRUD: create, read, update and delete blogs

## Required assignment functionality
- Registration and login
- JWT authentication
- Protected routes
- View all blogs and blog details
- Create blog
- Update only your own blog
- Delete only your own blog
- User/profile section
- Responsive professional UI
- Loading/error/success states
- REST API
- MongoDB/Mongoose integration

## Folder structure
```text
InkNova/
├── backend/
│   ├── .env.example
│   ├── package.json
│   └── src/
│       ├── config/db.js
│       ├── controllers/authController.js
│       ├── controllers/blogController.js
│       ├── controllers/userController.js
│       ├── middleware/authMiddleware.js
│       ├── middleware/errorMiddleware.js
│       ├── models/User.js
│       ├── models/Blog.js
│       ├── routes/authRoutes.js
│       ├── routes/blogRoutes.js
│       ├── routes/userRoutes.js
│       ├── utils/generateToken.js
│       └── server.js
└── frontend/
    ├── .env.example
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    └── src/
        ├── components/
        ├── context/
        ├── layouts/
        ├── pages/
        ├── services/api.js
        ├── App.jsx
        ├── index.css
        └── main.jsx
```

## Setup

### 1. Backend
```bash
cd backend
npm install
```
Copy `.env.example` to `.env` and add your MongoDB connection string and JWT secret.

Then:
```bash
npm run dev
```

Backend runs on `http://localhost:5000`.

### 2. Frontend
Open another terminal:
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on the Vite URL shown in the terminal, normally `http://localhost:5173`.

## Environment variables

Backend `.env`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=replace_with_a_long_random_secret
```

Frontend `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

Do not commit `.env` files to GitHub.

## Main API endpoints
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/auth/me`
- GET `/api/blogs`
- GET `/api/blogs/:id`
- POST `/api/blogs`
- PUT `/api/blogs/:id`
- DELETE `/api/blogs/:id`
- GET `/api/users/profile`

The backend checks blog ownership before update/delete, so changing a frontend button or URL cannot bypass authorization.
