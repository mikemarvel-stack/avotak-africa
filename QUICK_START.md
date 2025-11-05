# 🚀 Quick Start Guide

## What Changed?

### ✨ New Features
1. **Tawk.to Chat** - Now visible on ALL user pages (Home, About, Services, Produce, Projects, Contact)
2. **Security Hardening** - Rate limiting, input validation, security headers
3. **Better Documentation** - Security guides and deployment checklists

### 🔒 Security Improvements
- Rate limiting (prevents brute force)
- Input validation (prevents injection)
- Security headers (Helmet)
- NoSQL injection prevention
- Path traversal fixes
- Credentials removed from code

## 🏃 Quick Setup

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Set Environment Variables

Create `backend/.env` from template:
```bash
cd backend
cp .env.example .env
```

Edit `.env` with your values:
```bash
JWT_SECRET=<generate_with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
ADMIN_PASSWORD=YourSecurePassword123!
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Start Development

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
npm run dev
```

### 4. Test Tawk Chat

Visit any page and look for the green chat button in the bottom-right corner.

## 📦 New Files Created

```
backend/
├── middleware/
│   ├── rateLimiter.js      # Rate limiting config
│   └── csrf.js             # CSRF protection (not enabled yet)
├── SECURITY.md             # Security documentation
├── ENV_SETUP.md            # Environment setup guide
└── .env.example            # Updated template (no credentials)

root/
├── SECURITY_FIXES_SUMMARY.md  # Complete list of fixes
├── DEPLOYMENT_CHECKLIST.md    # Deployment guide
└── QUICK_START.md             # This file
```

## 🔧 Modified Files

### Backend
- `index.js` - Added security middleware
- `routes/auth.js` - Added validation
- `routes/content.js` - Added schema validation
- `routes/userRoutes.js` - Added input validation
- `routes/gallery.js` - Already had validation
- `routes/upload.js` - Already had file type validation
- `package.json` - Added security packages

### Frontend
- `src/App.jsx` - Added TawkChat component

### Scripts
- `scripts/debug-capture.mjs` - Fixed path traversal
- `scripts/collect-console.mjs` - Fixed path traversal

## ⚡ Quick Tests

### Test Tawk Chat
```bash
# Start frontend
npm run dev

# Visit http://localhost:5173
# Check bottom-right for green chat button
```

### Test Rate Limiting
```bash
# Try 6 login attempts (6th should fail)
for i in {1..6}; do
  curl -X POST http://localhost:5000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@test.com","password":"wrong"}'
  echo "\nAttempt $i"
done
```

### Test Security Headers
```bash
curl -I http://localhost:5000/api/health
# Look for X-Content-Type-Options, X-Frame-Options, etc.
```

## 🚀 Deploy to Production

### Backend (Render)
1. Set environment variables in Render dashboard
2. Push to GitHub: `git push origin main`
3. Render auto-deploys

### Frontend (Netlify)
1. Push to GitHub: `git push origin main`
2. Netlify auto-deploys

## 📚 Documentation

- **SECURITY.md** - Security features and best practices
- **ENV_SETUP.md** - Detailed environment setup
- **SECURITY_FIXES_SUMMARY.md** - All fixes implemented
- **DEPLOYMENT_CHECKLIST.md** - Step-by-step deployment

## ⚠️ Important Notes

1. **Must install dependencies**: `cd backend && npm install`
2. **Must set environment variables** in production (Render)
3. **JWT_SECRET must be 32+ characters** for security
4. **ADMIN_PASSWORD must be strong** (12+ chars, mixed case, numbers, symbols)
5. **Tawk.to loads automatically** - no config needed

## 🆘 Troubleshooting

### Tawk Chat Not Showing
- Check browser console for errors
- Verify TawkChat component imported in App.jsx
- Clear browser cache

### Backend Won't Start
- Check `.env` file exists in backend directory
- Verify all required env vars are set
- Check MongoDB connection string

### Rate Limit Errors
- Wait 15 minutes for reset
- Or adjust limits in `backend/middleware/rateLimiter.js`

### Dependencies Missing
```bash
cd backend
npm install
```

## 🎯 Next Steps

1. ✅ Install dependencies
2. ✅ Set environment variables
3. ✅ Test locally
4. ✅ Deploy to production
5. ✅ Verify Tawk chat on all pages
6. ✅ Test security features

## 📞 Support

- Check logs in Render/Netlify dashboards
- Review browser console for frontend errors
- Check backend logs for API errors

---

**Ready to deploy?** Follow the [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

**Need security details?** Read [SECURITY_FIXES_SUMMARY.md](./SECURITY_FIXES_SUMMARY.md)
