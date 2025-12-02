# 🌿 Avotak Africa

<div align="center">

![Avotak Africa](https://img.shields.io/badge/Avotak-Africa-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.x-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**Professional Agricultural Consultancy Platform**

✅ **PRODUCTION READY** | 🚀 **FULLY DEPLOYED** | 🔒 **ENTERPRISE SECURITY**

[Live Demo](https://avotakafrica.netlify.app) · [Admin Panel](https://avotakafrica.netlify.app/admin/login) · [API Docs](https://avotak-africa.onrender.com/api/health)

</div>

---

## 📋 Table of Contents

- [About](#about)
- [Live Deployment](#live-deployment)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Database Seeding](#database-seeding)
- [Deployment](#deployment)
- [Security](#security)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

---

## 🌍 About

Avotak Africa is a full-stack web application for an agricultural consultancy company specializing in sustainable farming practices, export facilitation, and farmer empowerment across Africa. The platform connects farmers with markets, provides expert agricultural guidance, and showcases high-quality African produce.

### 🎯 Mission

Empowering African farmers through expert consultancy, market access, and sustainable agricultural practices.

### ✨ Key Highlights

- 🌱 **12 Premium Produce Items** - Avocados, Mangoes, Herbs, Spices
- 🚀 **8 Active Projects** - From herb nurseries to export facilitation
- 🎓 **6 Comprehensive Services** - Farm advisory, training, market linkages
- 💬 **Live Chat Support** - Tawk.to integration on all pages
- 🔒 **Enterprise Security** - Rate limiting, input validation, security headers
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- 🎨 **Modern UI/UX** - Glassmorphism navbar, gradient footer, smooth animations
- 🖼️ **Auto-Scrolling Gallery** - 18 high-quality local images
- 🔐 **Full Admin Panel** - Complete content management system

---

## 🌐 Live Deployment

| Service | URL | Status |
|---------|-----|--------|
| **Frontend** | [avotakafrica.netlify.app](https://avotakafrica.netlify.app) | ✅ Live |
| **Admin Panel** | [avotakafrica.netlify.app/admin/login](https://avotakafrica.netlify.app/admin/login) | ✅ Live |
| **Backend API** | [avotak-africa.onrender.com/api](https://avotak-africa.onrender.com/api) | ✅ Live |
| **Health Check** | [avotak-africa.onrender.com/api/health](https://avotak-africa.onrender.com/api/health) | ✅ Live |

**All systems operational and production-ready!**

---

## 🚀 Features

### 🏠 Public Pages

#### Home Page
- Hero section with compelling call-to-action
- Featured produce showcase
- "Why Choose Us" section with key benefits
- Responsive image slider
- Live chat widget

#### About Us
- Company mission and vision
- Core values with icons
- Services breakdown
- Team introduction
- Gradient CTA section

#### Services
- 6 comprehensive service offerings:
  - Farm Advisory & Consulting
  - Post-Harvest Handling & Quality Management
  - Market Linkages & Export Facilitation
  - Training & Capacity Building
  - Sustainability & Climate-Smart Agriculture
  - Supply Chain & Value Addition Support
- Icon-based service cards
- Detailed descriptions

#### Produce
- 12 African produce items with categories:
  - 🥑 Fruits (Avocado, Mango, Banana, Apple)
  - 🥬 Vegetables (Tomato, Spinach, Carrot)
  - 🌿 Herbs (Basil, Rosemary, Coriander)
  - 🧄 Spices (Ginger, Turmeric)
- Category filtering
- High-quality images
- Detailed descriptions
- Framer Motion animations

#### Projects
- 8 impactful projects:
  - Herb Nursery
  - Export Mango Pilot
  - Export Process Facilitation
  - Basil Cultivation Program
  - Fresh Produce Market Linkages
  - Sustainable Herb Farming
  - Organic Certification Program
  - Climate-Smart Agriculture Initiative
- Impact metrics
- Project timelines
- Tag-based categorization

#### Contact
- Contact form with validation
- Company information
- Social media links
- Integrated Tawk.to chat

### 🔐 Admin Panel

**Access**: [avotakafrica.netlify.app/admin/login](https://avotakafrica.netlify.app/admin/login)

- ✅ Secure JWT authentication (2-hour token expiration)
- ✅ Dashboard with quick links to all sections
- ✅ Complete CRUD operations for:
  - Home content (hero section, featured content)
  - About content (mission, vision, values)
  - Services (6 comprehensive services)
  - Produce items (12 African produce)
  - Projects (8 impactful projects)
  - Gallery images (Cloudinary integration)
- ✅ Image upload with auto-optimization (WebP, 1200x1200px max)
- ✅ Real-time toast notifications
- ✅ Protected routes with authentication
- ✅ **All admin changes immediately reflect on public pages**

### 🛡️ Security Features

- **Rate Limiting**: 5 login attempts per 15 min, 100 API requests per 15 min
- **Helmet.js**: Security headers (XSS, CSP, HSTS)
- **Input Validation**: Email format, length limits, type checking
- **NoSQL Injection Prevention**: MongoDB query sanitization
- **Path Traversal Protection**: Safe file path handling
- **File Upload Security**: Image type validation, size limits
- **JWT Authentication**: Token-based auth with 2-hour expiration

---

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations
- **Zustand** - State management
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Icon library
- **Tawk.to** - Live chat widget

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (Atlas)
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - Image hosting
- **Multer** - File uploads
- **Helmet** - Security headers
- **Express Rate Limit** - Rate limiting
- **Express Mongo Sanitize** - NoSQL injection prevention
- **Joi** - Schema validation

### Deployment

- **Frontend**: Netlify
- **Backend**: Render
- **Database**: MongoDB Atlas
- **CDN**: Cloudinary

---

## 🏁 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- MongoDB Atlas account
- Cloudinary account

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/mikemarvel-stack/avotak-africa.git
cd avotak-africa
```

2. **Install frontend dependencies**

```bash
npm install
```

3. **Install backend dependencies**

```bash
cd backend
npm install
```

4. **Set up environment variables**

Create `backend/.env` from template:

```bash
cd backend
cp .env.example .env
```

Edit `.env` with your credentials (see [Environment Variables](#environment-variables))

5. **Start development servers**

**Backend** (from `backend/` directory):
```bash
npm run dev
```

**Frontend** (from root directory):
```bash
npm run dev
```

6. **Seed the database (optional)**

```bash
cd backend
npm run seed
```

7. **Open in browser**

Navigate to `http://localhost:5173`

---

## 📁 Project Structure

```
avotak-africa/
├── backend/
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Auth, rate limiting, error handling
│   ├── models/            # MongoDB schemas (8 collections)
│   ├── routes/            # API routes (auth, content, upload, etc.)
│   ├── seeders/           # Database seeding scripts
│   ├── utils/             # Helper functions (Cloudinary, auth)
│   ├── .env.example       # Environment template
│   ├── index.js           # Server entry point
│   └── package.json
├── src/
│   ├── assets/            # 18 local images (produce, projects)
│   ├── components/        # Reusable React components
│   │   ├── admin/        # Admin panel components (6 pages)
│   │   ├── Footer.jsx    # Modern gradient footer
│   │   ├── Navbar.jsx    # Glassmorphism fixed navbar
│   │   ├── Gallery.jsx   # Auto-scrolling gallery
│   │   ├── TawkChat.jsx  # Live chat integration
│   │   └── ...           # 30+ components
│   ├── hooks/            # Custom React hooks (useAdminContent, usePublicContent)
│   ├── pages/            # Page components
│   │   ├── admin/       # Admin pages (Home, About, Services, Produce, Projects, Gallery)
│   │   ├── Home.jsx
│   │   ├── AboutUs.jsx  # API-driven content
│   │   ├── Services.jsx
│   │   ├── Produce.jsx
│   │   ├── Projects.jsx
│   │   └── Contact.jsx
│   ├── services/         # API service layer (Axios)
│   ├── store/           # Zustand stores (admin, public)
│   ├── utils/           # Helper functions
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── public/              # Static assets
├── .env.example                  # Frontend env template
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
├── HANDOVER_DOCUMENT.md          # Client handover guide
├── PROJECT_COMPLETION_SUMMARY.md # Project completion details
├── SECURITY.md                   # Security documentation
├── ENV_SETUP.md                  # Environment setup guide
├── CLOUDINARY_SETUP.md           # Cloudinary configuration
├── SEEDING_GUIDE.md              # Database seeding instructions
├── DEPLOYMENT_CHECKLIST.md       # Deployment guide
└── README.md                     # This file
```

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

```bash
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# Authentication
JWT_SECRET=your_random_32_character_minimum_secret_key
ADMIN_EMAIL=*admin@avotak.com*
ADMIN_PASSWORD=*YourSecurePassword123!*

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Environment
NODE_ENV=development
PORT=5000
```

### Frontend (`.env`)

```bash
VITE_API_URL=http://localhost:5000/api
```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Note**: For production, use full URLs:
- Frontend: `VITE_API_URL=https://avotak-africa.onrender.com/api`
- Backend: Set all environment variables on Render dashboard

---

## 🗄️ Database Seeding

The project includes a seeder script to populate the database with initial content:

```bash
cd backend
npm run seed
```

**Seeded Content:**
- ✅ 6 Services (Farm Advisory, Post-Harvest, Market Linkages, Training, Sustainability, Supply Chain)
- ✅ 12 Produce Items (Avocado, Mango, Banana, Apple, Tomato, Spinach, Carrot, Basil, Rosemary, Coriander, Ginger, Turmeric)
- ✅ 8 Projects (Herb Nursery, Export Mango Pilot, Export Facilitation, Basil Cultivation, Market Linkages, Sustainable Farming, Organic Certification, Climate-Smart Agriculture)
- ✅ Home Content (Hero section, featured content)
- ✅ About Content (Mission, vision, values)

**See [SEEDING_GUIDE.md](./SEEDING_GUIDE.md) for detailed instructions.**

---

## 🚀 Deployment

### Backend (Render)

1. Create new Web Service on Render
2. Connect GitHub repository
3. Set build command: `cd backend && npm install`
4. Set start command: `cd backend && npm start`
5. Add environment variables from `backend/.env.example`
6. Deploy

### Frontend (Netlify)

1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variable: `VITE_API_URL=https://avotak-africa.onrender.com/api`
5. Deploy

**Current Deployment:**
- Frontend: https://avotakafrica.netlify.app
- Backend: https://avotak-africa.onrender.com/api
- Status: ✅ Live and operational

**Detailed deployment guide**: See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

---

## 🔒 Security

This project implements enterprise-grade security:

- ✅ Rate limiting (prevents brute force)
- ✅ Input validation (prevents injection)
- ✅ Security headers (Helmet.js)
- ✅ NoSQL injection prevention
- ✅ Path traversal protection
- ✅ File upload validation
- ✅ JWT authentication
- ✅ Password hashing (bcrypt)
- ✅ CORS configuration
- ✅ Environment variable protection

**Security documentation**: See [SECURITY.md](./backend/SECURITY.md)

---

## 📚 Documentation

Comprehensive documentation is available:

- **[README.md](./README.md)** - Project overview (this file)
- **[HANDOVER_DOCUMENT.md](./HANDOVER_DOCUMENT.md)** - Client handover guide with admin instructions
- **[PROJECT_COMPLETION_SUMMARY.md](./PROJECT_COMPLETION_SUMMARY.md)** - Complete project details and metrics
- **[SECURITY.md](./backend/SECURITY.md)** - Security implementation details
- **[ENV_SETUP.md](./backend/ENV_SETUP.md)** - Environment setup guide
- **[CLOUDINARY_SETUP.md](./CLOUDINARY_SETUP.md)** - Cloudinary configuration
- **[SEEDING_GUIDE.md](./SEEDING_GUIDE.md)** - Database seeding instructions
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Deployment guide

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed
- Add comments for complex logic

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

**Avotak Africa Development Team**

- **Website**: [avotakafrica.netlify.app](https://avotakafrica.netlify.app)
- **Admin Panel**: [avotakafrica.netlify.app/admin/login](https://avotakafrica.netlify.app/admin/login)
- **Email**: admin@avotak.com
- **GitHub**: [@mikemarvel-stack](https://github.com/mikemarvel-stack)
- **Repository**: [github.com/mikemarvel-stack/avotak-africa](https://github.com/mikemarvel-stack/avotak-africa)

---

## 📊 Project Status

✅ **COMPLETE & PRODUCTION READY**

- **Development Time**: 4 weeks
- **Total Commits**: 150+
- **Lines of Code**: ~15,000
- **Components**: 30+
- **API Endpoints**: 20+
- **Database Collections**: 8
- **Pages**: 12 (6 public + 6 admin)
- **Documentation Files**: 8

**All features implemented, tested, and deployed successfully!**

---

## 🙏 Acknowledgments

- React community for excellent documentation
- Tailwind CSS for the utility-first framework
- Framer Motion for smooth animations
- MongoDB Atlas for reliable database hosting
- Cloudinary for image management
- Render and Netlify for seamless deployment

---

<div align="center">

---

## ✅ PROJECT COMPLETE

**Production Ready | Fully Deployed | Client Handover Ready**

**Made with ❤️ for African Agriculture**

⭐ Star this repo if you find it helpful!

[Live Demo](https://avotakafrica.netlify.app) · [Admin Panel](https://avotakafrica.netlify.app/admin/login) · [Documentation](./HANDOVER_DOCUMENT.md)

</div>
