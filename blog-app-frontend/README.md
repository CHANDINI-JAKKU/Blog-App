# 📝 Blog App - Frontend

A modern, responsive blogging platform frontend built with **React 19**, **Vite**, and **Tailwind CSS**. Features role-based access control, real-time article browsing, and a beautiful dark mode experience.

---

## 🌐 Live Demo

🔗 **[Deployed on Vercel](https://your-vercel-url.com)**

---

## ✨ Features

### User Experience
- ✅ **Responsive Design** — Mobile-first, works seamlessly on all devices
- ✅ **Dark Mode & Light Mode** — Theme toggle with persistent preferences
- ✅ **Real-time Search** — Full-text article search with instant results
- ✅ **Article Discovery** — Browse by category, tags, trending, and popular articles
- ✅ **Smooth Animations** — Powered by Framer Motion (v12.40.0 with React 19 support)
- ✅ **Toast Notifications** — User-friendly feedback for all actions

### Authentication & Authorization
- 🔐 **JWT-based Auth** — Secure login with HTTP-only cookies
- 👥 **Role-Based Access** — Three user roles with specific permissions:
  - **User** — Browse articles, post comments, save articles
  - **Author** — Create, edit, delete articles, track engagement
  - **Admin** — Manage users, enable/disable accounts
- 🔒 **Protected Routes** — Client-side route guards preventing unauthorized access

### Content Management
- 📄 **Article Browsing** — View full articles with metadata (author, date, category, tags)
- 💬 **Comments Section** — Read and post comments on articles
- ❤️ **Like System** — Like articles and track engagement
- 🔖 **Save Articles** — Bookmark articles for later reading in user profile
- 🏷️ **Category & Tags** — Filter and discover content
- 📌 **Trending & Popular** — Discover best-performing content

### Author Features
- ✍️ **Write Articles** — Rich article editor with preview
- ✏️ **Edit & Delete** — Manage published articles
- 📊 **Article Analytics** — Track views, likes, and engagement
- 👤 **Author Profile** — Showcase bio and all published articles

### Admin Panel
- 👨‍💼 **User Management** — View all users and their roles
- 🚫 **Account Control** — Enable/disable user accounts
- 📊 **Admin Dashboard** — Overview of platform statistics
- 🔍 **User Monitoring** — Track user activity

---

## 🛠 Tech Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **UI Framework** | React | 19.2.4 | UI library with latest features |
| **Routing** | React Router | 7.13.2 | Client-side navigation |
| **Build Tool** | Vite | 8.0.1 | Fast build & dev server |
| **Styling** | Tailwind CSS | 4.2.2 | Utility-first CSS framework |
| **HTTP Client** | Axios | 1.14.0 | API requests |
| **State Management** | Zustand | 5.0.12 | Lightweight global state |
| **Forms** | React Hook Form | 7.72.0 | Efficient form handling |
| **Animations** | Framer Motion | 12.40.0 | Smooth animations & transitions |
| **Notifications** | React Hot Toast | 2.6.0 | Toast notifications |
| **Icons** | Lucide React | 1.16.0 | Icon library |
| **Theming** | Next Themes | 0.4.6 | Dark/light mode support |
| **Date Formatting** | Date FNS | 4.2.1 | Date utilities |
| **Carousel** | Swiper | 12.1.4 | Image carousel component |
| **Intersection Observer** | React Intersection Observer | 10.0.3 | Lazy loading & animations |
| **Code Quality** | ESLint | 9.39.4 | Linting & code standards |

---

## 📦 Installation & Setup

### Prerequisites
- **Node.js** >= 18.x
- **npm** >= 9.x or **yarn**
- Backend API running (default: `http://localhost:5000`)

### Step 1: Clone & Install Dependencies

```bash
# Clone the repository
git clone https://github.com/CHANDINI-JAKKU/Blog-App.git
cd Blog-App/blog-app-frontend

# Install dependencies
npm install
```

### Step 2: Environment Configuration

Create a `.env.local` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000
VITE_API_TIMEOUT=30000

# Feature Flags (optional)
VITE_ENABLE_ANALYTICS=false
```

### Step 3: Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 🚀 Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production (optimized) |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

### Examples

```bash
# Development
npm run dev

# Production build
npm run build

# Check for lint issues
npm run lint

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
blog-app-frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   │   ├── ArticleCard.jsx        # Article display card
│   │   │   ├── LoaderSkeleton.jsx     # Loading placeholder
│   │   │   ├── SearchBar.jsx          # Search functionality
│   │   │   └── ThemeToggle.jsx        # Dark/Light mode toggle
│   │   ├── AdminAuthors.jsx           # Admin author management
│   │   ├── AdminProfile.jsx           # Admin dashboard
│   │   ├── AdminUsers.jsx             # Admin user management
│   │   ├── ArticleByID.jsx            # Single article view
│   │   ├── AuthorArticles.jsx         # Author's published articles
│   │   ├── AuthorProfile.jsx          # Author profile page
│   │   ├── EditArticle.jsx            # Article editor
│   │   ├── Footer.jsx                 # App footer
│   │   ├── Header.jsx                 # Navigation header
│   │   ├── Home.jsx                   # Home/landing page
│   │   ├── Login.jsx                  # Login form
│   │   ├── ProtectedRoute.jsx         # Route protection wrapper
│   │   ├── Register.jsx               # Registration form
│   │   ├── RootLayout.jsx             # Main layout wrapper
│   │   ├── Unauthorized.jsx           # 403 page
│   │   ├── UserProfile.jsx            # User profile page
│   │   └── WriteArticles.jsx          # Article creation
│   ├── store/
│   │   └── authStore.js               # Zustand auth state
│   ├── styles/
│   │   └── common.js                  # Shared styles & utilities
│   ├── App.jsx                        # Main App component
│   ├── App.css                        # Global styles
│   ├── index.css                      # Base styles
│   ├── main.jsx                       # React entry point
│   └── axiosConfig.js                 # Axios configuration
├── .eslintrc.js            # ESLint configuration
├── vite.config.js          # Vite configuration
├── vercel.json             # Vercel deployment config
├── package.json            # Dependencies & scripts
├── package-lock.json       # Locked dependency versions
└── README.md              # This file
```

---

## 🧩 Component Documentation

### Layout Components
- **`RootLayout`** — Main application wrapper with header and footer
- **`Header`** — Navigation bar with theme toggle and user menu
- **`Footer`** — Application footer

### Auth Components
- **`Login`** — User login form with email/password
- **`Register`** — New user registration form
- **`ProtectedRoute`** — Route guard for authenticated routes

### Article Components
- **`Home`** — Landing page with article feed
- **`ArticleByID`** — Full article view with comments
- **`WriteArticles`** — Article creation interface
- **`EditArticle`** — Article editing interface
- **`AuthorArticles`** — Author's article list
- **`ArticleCard`** (UI) — Reusable article preview card

### Profile Components
- **`UserProfile`** — User profile page with saved articles
- **`AuthorProfile`** — Author profile with bio and articles
- **`AdminProfile`** — Admin dashboard
- **`AdminUsers`** — User management table
- **`AdminAuthors`** — Author management table

### UI Components
- **`SearchBar`** — Search articles in real-time
- **`ThemeToggle`** — Dark/Light mode switcher
- **`LoaderSkeleton`** — Loading state placeholder

---

## 🔐 Authentication Flow

```
1. User submits login credentials
2. Backend validates & returns JWT token (HTTP-only cookie)
3. Token stored in browser cookies
4. Axios automatically includes token in API requests
5. ProtectedRoute checks auth status & role
6. Redirect to login if unauthorized
```

### Auth State (Zustand Store)

Located in [store/authStore.js](src/store/authStore.js):

```javascript
// Available in all components
const { user, token, login, logout, isAuthenticated } = useAuthStore();
```

---

## 🎨 Styling Guide

### Tailwind CSS
- Utility-first CSS framework
- All styling in JSX classes
- Dark mode support via `next-themes`

### Common Utilities
Located in [styles/common.js](src/styles/common.js):

```javascript
import { buttonStyles, cardStyles } from '@/styles/common';
```

### Theme Customization
Edit `tailwind.config.js` for colors, fonts, and spacing.

---

## 📡 API Integration

### Axios Configuration

[axiosConfig.js](src/axiosConfig.js) sets up:
- Base URL from environment variables
- Request/response interceptors
- Automatic token attachment
- Error handling

### Example API Call

```javascript
import axios from 'axios';

const response = await axios.get('/articles');
const data = response.data;
```

---

## 🌗 Dark Mode

Powered by `next-themes`:

```javascript
import { useTheme } from 'next-themes';

export function MyComponent() {
  const { theme, setTheme } = useTheme();
  
  return <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />;
}
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Connect Repository**
   ```bash
   vercel link
   ```

2. **Set Environment Variables**
   - Add `VITE_API_BASE_URL` in Vercel dashboard

3. **Deploy**
   ```bash
   vercel deploy --prod
   ```

### Or Use Git Push (Auto-Deploy)
```bash
git add .
git commit -m "Your message"
git push origin main
```

Vercel automatically detects changes and deploys!

---

## 🐛 Troubleshooting

### Issue: API requests failing
- ✅ Check backend is running on correct port
- ✅ Verify `VITE_API_BASE_URL` in `.env.local`
- ✅ Check CORS headers in backend

### Issue: Styling not applied
- ✅ Run `npm run build` to verify production build
- ✅ Check Tailwind CSS directives in `index.css`
- ✅ Clear browser cache

### Issue: Dark mode not working
- ✅ Check `next-themes` is initialized in `main.jsx`
- ✅ Verify theme provider wraps app

### Issue: Build fails
- ✅ Delete `node_modules` and `package-lock.json`, then `npm install`
- ✅ Check Node.js version >= 18.x
- ✅ Clear `.env.local` and use defaults

---

## 📊 Performance Optimization

- ⚡ **Code Splitting** — Lazy loading components with React Router
- 🖼️ **Image Optimization** — Cloudinary for image hosting
- 📦 **Bundle Size** — Analyzed with Vite's build report
- 🔄 **Caching** — Browser caching for static assets

---

## ✅ Quality Assurance

### Run Linting
```bash
npm run lint
```

### ESLint Rules
- Enforces React best practices
- Checks for common mistakes
- Ensures code consistency

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Style
- Follow existing naming conventions
- Use meaningful variable/component names
- Add comments for complex logic
- Test changes before submitting PR

---

## 📄 License

This project is licensed under the **MIT License** — see LICENSE file for details.

---

## 👥 Support

For issues, questions, or suggestions:
- 🐛 [Open an Issue](https://github.com/CHANDINI-JAKKU/Blog-App/issues)
- 💬 [Discussions](https://github.com/CHANDINI-JAKKU/Blog-App/discussions)
- 📧 Email: support@example.com

---

## 🎯 Roadmap

- [ ] Progressive Web App (PWA) support
- [ ] Real-time notifications with WebSockets
- [ ] Advanced analytics dashboard
- [ ] Article scheduling & auto-publish
- [ ] Social sharing features
- [ ] Email subscription system
- [ ] Advanced comment threading

---

## 🙏 Acknowledgments

- React team for React 19
- Vercel for hosting & Vite integration
- Tailwind CSS for styling framework
- All open-source contributors

---

**Made with ❤️ using React 19 & Vite**

---

## 📞 Quick Links

| Resource | Link |
|----------|------|
| **GitHub** | https://github.com/CHANDINI-JAKKU/Blog-App |
| **Live Demo** | https://your-vercel-url.com |
| **Backend Repo** | `../blog-app-backend` |
| **Issues** | https://github.com/CHANDINI-JAKKU/Blog-App/issues |
| **React Docs** | https://react.dev |
| **Vite Docs** | https://vitejs.dev |
| **Tailwind CSS** | https://tailwindcss.com |
