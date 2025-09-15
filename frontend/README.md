# MERN Blog Application

A complete full-stack blog application built with MERN (MongoDB, Express.js, React, Node.js) stack featuring user authentication, CRUD operations for blog posts, comments, and likes functionality.

## Features

- **User Authentication**: JWT-based authentication with login and registration
- **Role-Based Access Control**: User and Admin roles
- **Blog Posts**: Create, read, update, and delete blog posts
- **Comments System**: Add, edit, and delete comments on posts
- **Likes System**: Like and unlike posts
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **Real-time Updates**: Dynamic content updates

## Tech Stack

### Backend
- **Node.js** & **Express.js** - Server framework
- **MongoDB** & **Mongoose** - Database and ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **React Router DOM** - Navigation
- **Axios** - HTTP client

## Project Structure

```
Blog App - MERN/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── postController.js
│   │   └── commentController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── validation.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Post.js
│   │   └── Comment.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── postRoutes.js
│   │   └── commentRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── src/
│   ├── components/
│   │   ├── auth/
│   │   ├── blog/
│   │   ├── layout/
│   │   └── ui/
│   ├── pages/
│   ├── services/
│   ├── store/
│   └── App.tsx
└── package.json
```

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or pnpm

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the backend directory:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/blog-app
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```

4. **Start MongoDB** (if running locally):
   ```bash
   mongod
   ```

5. **Start the backend server**:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to project root**:
   ```bash
   cd ..
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open your browser** and visit `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get post by ID
- `POST /api/posts` - Create new post (protected)
- `PUT /api/posts/:id` - Update post (protected)
- `DELETE /api/posts/:id` - Delete post (protected)
- `PUT /api/posts/:id/like` - Like/unlike post (protected)

### Comments
- `GET /api/comments/post/:postId` - Get comments for a post
- `POST /api/comments/post/:postId` - Create comment (protected)
- `PUT /api/comments/:id` - Update comment (protected)
- `DELETE /api/comments/:id` - Delete comment (protected)

## Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Create Posts**: Click "New Post" to create a blog post
3. **View Posts**: Browse all posts on the homepage
4. **Interact**: Like posts and add comments
5. **Manage**: Edit or delete your own posts and comments
6. **Admin Features**: Admins can manage all posts and comments

## Available Scripts

### Frontend
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint issues
npm run format     # Format code with Prettier
```

### Backend
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
```

## Key Features Explained

### Authentication & Authorization
- JWT tokens for secure authentication
- Role-based access (user/admin)
- Protected routes and API endpoints

### CRUD Operations
- **Create**: Users can create new blog posts
- **Read**: Anyone can view posts and comments
- **Update**: Users can edit their own content
- **Delete**: Users can delete their own content, admins can delete any content

### Real-time Interactions
- Like/unlike posts
- Add, edit, delete comments
- Immediate UI updates

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- Protected API routes
- CORS configuration
- Role-based access control
