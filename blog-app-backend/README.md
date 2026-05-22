# 🔧 Blog App - Backend

A robust **Express.js** REST API backend for the Blog App platform. Handles user authentication, article management, comments, and role-based authorization with MongoDB persistence.

---

## 🌐 Live API

🔗 **[Deployed on Render](https://your-render-url.com)**

Base URL: `https://your-api-url.com`

---

## ✨ Features

### Authentication & Security
- 🔐 **JWT Authentication** — JSON Web Tokens with HTTP-only cookies
- 🛡️ **Password Hashing** — bcryptjs for secure password storage
- 🔒 **Role-Based Access Control** — USER, AUTHOR, ADMIN roles with specific permissions
- 🚫 **Protected Routes** — Token verification middleware on all protected endpoints
- ✅ **CORS Support** — Configured for frontend integration

### Content Management
- 📄 **Article CRUD** — Create, read, update, delete articles
- 💬 **Comments System** — Nested comments on articles
- 🏷️ **Categories & Tags** — Organize content
- 🔍 **Full-Text Search** — Search articles by title, content, category, tags
- 📊 **Sorting & Filtering** — Sort by date, popularity, trending
- 🔄 **Soft Deletes** — Archive articles without data loss

### User Management
- 👤 **User Registration** — Email-based signup with validation
- 🔑 **User Login** — Secure authentication
- 👥 **User Profiles** — User info and activity tracking
- 🚫 **Account Management** — Enable/disable accounts (admin only)
- 📧 **Email Verification** — Optional email confirmation

### Engagement Features
- ❤️ **Like System** — Users can like articles
- 🔖 **Saved Articles** — Bookmark articles for later
- 💪 **Engagement Tracking** — Track views, likes, comments per article
- 📈 **Analytics Ready** — Track user activity and metrics

### File Management
- 🖼️ **Image Uploads** — Profile pictures and article images
- ☁️ **Cloudinary Integration** — Cloud storage for images
- 📤 **Multer Middleware** — File upload handling and validation
- 🔄 **Automatic Image Processing** — Resize and optimize images

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | ≥ 18.x | JavaScript runtime |
| **Express.js** | 5.x | Web framework |
| **MongoDB** | Atlas | NoSQL database |
| **Mongoose** | 9.x | MongoDB ODM |
| **JWT** | - | Authentication tokens |
| **bcryptjs** | - | Password hashing |
| **Cloudinary** | - | Cloud image storage |
| **Multer** | - | File upload middleware |
| **Dotenv** | - | Environment variables |
| **CORS** | - | Cross-origin requests |
| **Cookie-parser** | - | Cookie handling |

---

## 📦 Installation & Setup

### Prerequisites
- **Node.js** >= 18.x
- **npm** >= 9.x
- **MongoDB Atlas** account (free tier available)
- **Cloudinary** account (free tier available)

### Step 1: Clone & Navigate

```bash
# Clone the repository
git clone https://github.com/CHANDINI-JAKKU/Blog-App.git
cd Blog-App/blog-app-backend

# Install dependencies
npm install
```

### Step 2: Environment Configuration

Create a `.env` file in the root directory with:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# Database
DB_URL=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/BlogApp

# Authentication
SECRET_KEY=your_super_secret_jwt_key_change_this
JWT_EXPIRY=7d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# File Upload
MAX_FILE_SIZE=5242880
ALLOWED_MIME_TYPES=image/jpeg,image/png,image/webp

# Email Configuration (Optional)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

### Step 3: Start the Server

```bash
# Development mode (with nodemon auto-reload)
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:4000`

---

## 🚀 Available Scripts

| Command | Purpose |
|---------|---------|
| `npm start` | Start production server |
| `npm run dev` | Start with nodemon (auto-reload) |
| `npm run test` | Run tests (if configured) |
| `npm run lint` | Check code quality |

---

## 📁 Project Structure

```
blog-app-backend/
├── APIs/
│   ├── AdminAPI.js          # Admin-only routes
│   │   └── User management (enable/disable accounts)
│   ├── AuthorAPI.js         # Author-only routes
│   │   └── Article CRUD operations
│   ├── CommonAPI.js         # Public auth routes
│   │   └── Register, login, logout
│   └── UserAPI.js           # User routes
│       └── Browse articles, comments, likes, saved articles
├── config/
│   ├── cloudinary.js        # Cloudinary configuration
│   └── cloudinaryUpload.js  # Image upload handler
├── middlewares/
│   └── verifyToken.js       # JWT verification middleware
├── models/
│   ├── ArticleModel.js      # Article & Comment schemas
│   └── UserModel.js         # User schema
├── server.js                # Express app entry point
├── package.json             # Dependencies & scripts
├── .env                     # Environment variables (not committed)
└── render.yaml              # Render deployment config
```

---

## 📡 API Endpoints

### Base URL
```
http://localhost:4000
```

---

### 🔓 Public Routes (No Auth Required)

#### Auth Endpoints (`/auth`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login & get JWT token |
| POST | `/auth/logout` | Clear auth session |
| GET | `/auth/verify` | Verify token validity |

**Register Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Login Request:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

---

### 🔐 Protected Routes (Auth Required)

#### User Routes (`/user-api`)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/user-api/articles` | Get all articles (with filters) | ✅ |
| GET | `/user-api/article/:id` | Get single article by ID | ✅ |
| POST | `/user-api/articles/comment` | Add comment to article | ✅ |
| POST | `/user-api/articles/like` | Like/unlike article | ✅ |
| GET | `/user-api/articles/recommended/:id` | Get recommended articles | ✅ |
| GET | `/user-api/saved-articles` | Get user's saved articles | ✅ |
| POST | `/user-api/saved-articles` | Save article | ✅ |
| DELETE | `/user-api/saved-articles/:articleId` | Remove saved article | ✅ |
| GET | `/user-api/profile` | Get user profile | ✅ |
| PUT | `/user-api/profile` | Update user profile | ✅ |
| POST | `/user-api/upload-avatar` | Upload profile picture | ✅ |

**Article Query Filters:**
```
GET /user-api/articles?search=react&category=tech&tag=javascript&sort=trending&page=1&limit=10
```

**Comment Request:**
```json
{
  "articleId": "123abc",
  "content": "Great article!",
  "rating": 5
}
```

---

#### Author Routes (`/author-api`)

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/author-api/articles` | Get author's articles | AUTHOR |
| POST | `/author-api/article` | Create new article | AUTHOR |
| PUT | `/author-api/article/:id` | Update article | AUTHOR |
| DELETE | `/author-api/article/:id` | Delete article | AUTHOR |
| GET | `/author-api/analytics` | Article analytics | AUTHOR |
| POST | `/author-api/upload-image` | Upload article image | AUTHOR |

**Create Article Request:**
```json
{
  "title": "Article Title",
  "content": "Article content here...",
  "category": "Technology",
  "tags": ["React", "JavaScript"],
  "thumbnail": "image_url_or_file"
}
```

---

#### Admin Routes (`/admin-api`)

| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | `/admin-api/users` | Get all users | ADMIN |
| GET | `/admin-api/user/:id` | Get user details | ADMIN |
| PUT | `/admin-api/user/toggle/:id` | Enable/disable user | ADMIN |
| DELETE | `/admin-api/user/:id` | Delete user (hard delete) | ADMIN |
| GET | `/admin-api/analytics` | Platform analytics | ADMIN |
| GET | `/admin-api/articles` | All articles (with status) | ADMIN |
| PUT | `/admin-api/article/approve/:id` | Approve article | ADMIN |

---

## 🗄️ Database Models

### User Model

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: Enum(['USER', 'AUTHOR', 'ADMIN']),
  avatar: String (URL),
  bio: String,
  isActive: Boolean,
  savedArticles: [ObjectId],
  likedArticles: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

### Article Model

```javascript
{
  _id: ObjectId,
  title: String,
  content: String,
  category: String,
  tags: [String],
  thumbnail: String (URL),
  author: ObjectId (reference to User),
  comments: [{
    _id: ObjectId,
    user: ObjectId,
    content: String,
    rating: Number (1-5),
    createdAt: Date
  }],
  likes: [ObjectId],
  savedBy: [ObjectId],
  views: Number,
  isPublished: Boolean,
  isDeleted: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔐 Authentication Flow

```
1. User sends credentials to /auth/register or /auth/login
2. Backend validates credentials
3. Backend creates JWT token (valid for 7 days)
4. Token sent as HTTP-only cookie to client
5. Client sends token in Authorization header on protected routes
6. Backend verifies token with verifyToken middleware
7. Request proceeds or returns 401 Unauthorized
```

### JWT Token Structure

```javascript
{
  userId: "user_id",
  email: "user@example.com",
  role: "USER|AUTHOR|ADMIN",
  iat: 1234567890,
  exp: 1234654290
}
```

---

## 🖼️ Image Upload

### Profile Avatar Upload

```
POST /user-api/upload-avatar
Content-Type: multipart/form-data

Field: avatar (file)
```

### Article Image Upload

```
POST /author-api/upload-image
Content-Type: multipart/form-data

Field: image (file)
```

### Response

```json
{
  "success": true,
  "imageUrl": "https://cloudinary.com/...",
  "publicId": "blog-app/image-id"
}
```

---

## 🚀 Deployment

### Deploy to Render

#### Step 1: Connect Repository
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Select your GitHub repository
4. Choose "Node"

#### Step 2: Configure Environment

Set these environment variables in Render dashboard:

```env
PORT=4000
NODE_ENV=production
DB_URL=your_mongodb_connection_string
SECRET_KEY=your_production_secret_key
FRONTEND_URL=https://your-vercel-url.com
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### Step 3: Deploy

```bash
git add .
git commit -m "Backend deployment updates"
git push origin main
```

Render auto-deploys on push!

### Alternative: Docker Deploy

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "start"]
```

Build and deploy:

```bash
docker build -t blog-api .
docker run -p 4000:4000 --env-file .env blog-api
```

---

## 🧪 Testing

### Manual Testing with cURL

**Register User:**
```bash
curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Get Articles (with token):**
```bash
curl -X GET http://localhost:4000/user-api/articles \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Using Postman

Import the provided `.http` files:
- `author-req.http`
- `admin-req.http`
- `user-req.http`

Each file contains pre-configured requests for testing.

---

## 🐛 Troubleshooting

### Issue: "Cannot connect to MongoDB"
- ✅ Check MongoDB Atlas is running
- ✅ Verify `DB_URL` in `.env` is correct
- ✅ Add IP address to MongoDB Atlas network access
- ✅ Check username/password in connection string

### Issue: "JWT token invalid"
- ✅ Verify token hasn't expired (7 days)
- ✅ Check `SECRET_KEY` is same in .env
- ✅ Ensure Authorization header format: `Bearer <token>`

### Issue: "File upload failed"
- ✅ Check Cloudinary credentials in `.env`
- ✅ Verify file size < 5MB
- ✅ Check file type is allowed (JPEG, PNG, WebP)

### Issue: "CORS errors"
- ✅ Verify `FRONTEND_URL` in `.env` matches frontend origin
- ✅ Check CORS middleware is enabled in server.js

### Issue: "500 Server Error"
- ✅ Check server logs for detailed error
- ✅ Verify all environment variables are set
- ✅ Restart server with `npm run dev`

---

## 📊 Performance Optimization

- 📦 **Indexed Queries** — MongoDB indexes on frequently searched fields
- 🔄 **Pagination** — Limit results to 10-20 per page
- 💾 **Caching** — Consider Redis for popular articles
- 🗜️ **Image Optimization** — Cloudinary auto-compression
- ⚡ **Lazy Loading** — Comments load on demand

---

## 🔒 Security Best Practices

- ✅ **Environment Variables** — Never commit `.env`
- ✅ **Password Hashing** — bcryptjs with salt rounds = 10
- ✅ **JWT Expiry** — 7-day token expiration
- ✅ **HTTPS Only** — Use HTTPS in production
- ✅ **CORS Restricted** — Only allow known origins
- ✅ **Rate Limiting** — Coming soon
- ✅ **Input Validation** — Sanitize all user inputs
- ✅ **SQL Injection Prevention** — Using Mongoose ODM

---

## 📝 Logging

Logs are written to console in development. For production:

```javascript
// Example: Log important events
console.log(`[${new Date().toISOString()}] User ${userId} created article`);
```

Consider using `winston` or `morgan` for advanced logging.

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/api-enhancement`
3. Make changes and test thoroughly
4. Commit: `git commit -m 'Add new API endpoint'`
5. Push: `git push origin feature/api-enhancement`
6. Open Pull Request

### Code Style
- Use meaningful variable names
- Add JSDoc comments for functions
- Follow existing code structure
- Test new endpoints before submitting

---

## 📄 License

This project is licensed under the **ISC License** — see LICENSE for details.

---

## 👥 Support

- 🐛 [Report Issues](https://github.com/CHANDINI-JAKKU/Blog-App/issues)
- 💬 [Discussions](https://github.com/CHANDINI-JAKKU/Blog-App/discussions)
- 📧 [Email Support](mailto:support@example.com)

---

## 🙏 Acknowledgments

- Express.js team
- MongoDB & Mongoose documentation
- Cloudinary for image hosting
- JWT.io for token standards
- All contributors and testers

---

**Made with ❤️ using Express.js & MongoDB**

---

## 📞 Quick Reference

| Resource | Link |
|----------|------|
| **GitHub** | https://github.com/CHANDINI-JAKKU/Blog-App |
| **Live API** | https://your-api-url.com |
| **Frontend Repo** | `../blog-app-frontend` |
| **MongoDB Docs** | https://docs.mongodb.com |
| **Express Docs** | https://expressjs.com |
| **Cloudinary Docs** | https://cloudinary.com/documentation |
| **JWT Docs** | https://jwt.io |
