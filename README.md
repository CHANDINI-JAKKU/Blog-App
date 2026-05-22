# 📝 Blog App

A full-stack blogging platform with role-based access control, built with **React 19** and **Express.js**. Features secure JWT authentication, article management with recommendations, and a modern responsive UI.

---

## 📚 Documentation

This project is split into two main applications with separate READMEs:

### 🎨 [Frontend Documentation](./blog-app-frontend/README.md)
**React 19 + Vite + Tailwind CSS**
- User interface & components
- Authentication & authorization
- Article browsing & management
- Setup & deployment guides
- Tech stack: React, Vite, Tailwind, Framer Motion, Zustand

### 🔧 [Backend Documentation](./blog-app-backend/README.md)
**Express.js + MongoDB + Mongoose**
- REST API endpoints
- Authentication & JWT
- Database models & schemas
- File upload handling
- Setup & deployment guides
- Tech stack: Express, Mongoose, JWT, Cloudinary

---

## 🌐 Live Demo

| Service  | Platform | URL |
|----------|----------|-----|
| Frontend | **Vercel** | Deployed on Vercel |
| Backend  | **Render** | Deployed on Render |

---

## ✨ Key Features

- ✅ **User Registration & Login** — Secure JWT authentication with HTTP-only cookies
- ✅ **Role-Based Access** — Three roles: USER, AUTHOR, ADMIN with specific permissions
- ✅ **Article Management** — Full CRUD with categories, tags, and comments
- ✅ **Search & Discovery** — Full-text search, filtering by category/tags, trending/popular lists
- ✅ **Recommended Articles** — AI-like suggestions based on author, category, or tags
- ✅ **Saved Articles** — Users can bookmark articles for later
- ✅ **Engagement Metrics** — Like system and engagement tracking
- ✅ **Image Uploads** — Profile pictures & article images via Cloudinary
- ✅ **Protected Routes** — Client-side route guards based on user roles
- ✅ **Dark Mode** — Theme toggle with persistent preferences
- ✅ **Responsive Design** — Mobile-first UI with Tailwind CSS
- ✅ **Smooth Animations** — Framer Motion animations for enhanced UX

---

## 🛠 Tech Stack Overview

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.4 | UI library |
| Vite | 8.0.1 | Build tool & dev server |
| React Router | 7.13.2 | Client-side routing |
| Tailwind CSS | 4.2.2 | Styling |
| Framer Motion | 12.40.0 | Animations |
| Zustand | 5.0.12 | State management |
| Axios | 1.14.0 | HTTP client |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Express | 5.x | Web framework |
| Mongoose | 9.x | MongoDB ODM |
| JWT | - | Authentication |
| bcryptjs | - | Password hashing |
| Cloudinary | - | Image hosting |
| Multer | - | File uploads |

### Database
| Service | Type |
|---------|------|
| MongoDB Atlas | Cloud-hosted NoSQL |

---

## 📁 Project Structure

```
Blog-App/
├── README.md                      # This file (root overview)
│
├── blog-app-frontend/             # React 19 frontend
│   ├── README.md                  # Frontend-specific docs
│   ├── src/
│   │   ├── components/            # React components
│   │   ├── store/                 # Zustand state
│   │   ├── styles/                # Tailwind & custom styles
│   │   ├── axiosConfig.js         # HTTP client config
│   │   └── App.jsx                # Main app component
│   ├── package.json               # Frontend dependencies
│   ├── vite.config.js             # Vite configuration
│   └── vercel.json                # Vercel deployment config
│
└── blog-app-backend/              # Express.js backend
    ├── README.md                  # Backend-specific docs
    ├── APIs/
    │   ├── AdminAPI.js            # Admin endpoints
    │   ├── AuthorAPI.js           # Author endpoints
    │   ├── CommonAPI.js           # Auth endpoints
    │   └── UserAPI.js             # User endpoints
    ├── config/                    # Cloudinary & other config
    ├── middlewares/               # Express middlewares
    ├── models/                    # MongoDB schemas
    ├── server.js                  # Server entry point
    ├── package.json               # Backend dependencies
    └── render.yaml                # Render deployment config
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- **MongoDB Atlas** account (free tier available)
- **Cloudinary** account (free tier available)

### Setup Instructions

#### 1. Clone Repository
```bash
git clone https://github.com/CHANDINI-JAKKU/Blog-App.git
cd Blog-App
```

#### 2. Frontend Setup
```bash
cd blog-app-frontend
npm install
npm run dev
```
App will be available at **http://localhost:5173**

#### 3. Backend Setup
```bash
cd blog-app-backend
npm install
npm start
```
Server will run on **http://localhost:4000** (or configured PORT)

For detailed setup instructions, see:
- [Frontend README](./blog-app-frontend/README.md#-installation--setup)
- [Backend README](./blog-app-backend/README.md#-installation--setup)

---

## 📡 API Architecture

The backend provides REST API endpoints organized by role:

- **Auth** — User registration, login, logout
- **User** — Article browsing, comments, likes, saved articles
- **Author** — Article CRUD operations
- **Admin** — User management

See [Backend README](./blog-app-backend/README.md#-api-endpoints) for complete endpoint documentation.

---

## 🚢 Deployment

| Layer | Platform | Config File | Status |
|-------|----------|-------------|--------|
| Frontend | Vercel | `vercel.json` | ✅ Ready |
| Backend | Render | `render.yaml` | ✅ Ready |

### Deploy Frontend (Vercel)
```bash
cd blog-app-frontend
vercel deploy --prod
```

### Deploy Backend (Render)
- Connect GitHub repo to Render dashboard
- Set environment variables
- Auto-deploy on push to main

See deployment docs:
- [Frontend Deployment](./blog-app-frontend/README.md#-deployment)
- [Backend Deployment](./blog-app-backend/README.md#-deployment)

---

## 🌟 Unique Features

**Structured Article Experience**: Unlike traditional blogs, this platform creates a guided reading journey with:
- Recommended next articles based on current content
- Category-based article discovery
- Author-following recommendations
- Related content suggestions

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push branch: `git push origin feature/amazing-feature`
5. Open Pull Request

---

## 📄 License

This project is licensed under the **ISC License** — see LICENSE file for details.

---

## 👥 Support

- 🐛 [Report Issues](https://github.com/CHANDINI-JAKKU/Blog-App/issues)
- 💬 [Discussions](https://github.com/CHANDINI-JAKKU/Blog-App/discussions)
- 📧 [Email Support](mailto:support@example.com)

---

## 🙏 Acknowledgments

- React team for React 19
- Vercel for hosting & deployment
- Render for backend hosting
- MongoDB Atlas for database
- Cloudinary for image hosting
- All open-source contributors

---

**Made with ❤️ using React 19 & Express.js**
