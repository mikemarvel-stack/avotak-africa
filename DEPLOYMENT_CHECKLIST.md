# 🚀 Deployment Checklist

## Pre-Deployment

- [x] All security fixes implemented
- [x] Tawk.to chat added to all pages
- [x] Dependencies updated
- [x] Code committed to Git
- [ ] Environment variables documented
- [ ] Backend dependencies installed

## Backend Deployment (Render)

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Set Environment Variables in Render

Go to Render Dashboard → Your Service → Environment

Add these variables:

```bash
# Required - Generate new secure values
JWT_SECRET=<run: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
ADMIN_PASSWORD=<create_strong_password>

# Database
MONGO_URI=mongodb+srv://kenforestlimited_db_user:Avotak%402025@avotak.abwrwar.mongodb.net/?appName=avotak

# Admin
ADMIN_EMAIL=admin@avotak.com

# Cloudinary (from your dashboard)
CLOUDINARY_CLOUD_NAME=<your_value>
CLOUDINARY_API_KEY=<your_value>
CLOUDINARY_API_SECRET=<your_value>

# Environment
NODE_ENV=production
PORT=5000
```

### 3. Deploy
```bash
git push origin main
```

Render will auto-deploy from GitHub.

### 4. Verify Backend
```bash
# Check health
curl https://avotak-africa.onrender.com/api/health

# Should return: {"status":"ok"}
```

## Frontend Deployment (Netlify)

### 1. Update Environment Variables (if needed)

In Netlify Dashboard → Site Settings → Environment Variables:

```bash
VITE_API_URL=https://avotak-africa.onrender.com
```

### 2. Deploy

Netlify auto-deploys from GitHub on push to main.

### 3. Verify Frontend
Visit: https://avotakafrica.netlify.app

Check:
- [ ] All pages load correctly
- [ ] Tawk.to chat appears on all pages (green button bottom-right)
- [ ] Admin login works
- [ ] API calls work (check browser console)

## Post-Deployment Testing

### 1. Test Tawk Chat
- [ ] Visit Home page - chat visible
- [ ] Visit About page - chat visible
- [ ] Visit Services page - chat visible
- [ ] Visit Produce page - chat visible
- [ ] Visit Projects page - chat visible
- [ ] Visit Contact page - chat visible
- [ ] Click chat button - widget opens
- [ ] Send test message - works

### 2. Test Security Features

#### Rate Limiting
```bash
# Try 6 rapid login attempts
for i in {1..6}; do
  curl -X POST https://avotak-africa.onrender.com/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@test.com","password":"wrong"}'
  echo "\nAttempt $i"
  sleep 1
done
```
Expected: 6th attempt returns 429 (Too Many Requests)

#### Security Headers
```bash
curl -I https://avotak-africa.onrender.com/api/health
```
Expected headers:
- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN
- Strict-Transport-Security: max-age=...

#### Input Validation
```bash
# Invalid email format
curl -X POST https://avotak-africa.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"not-an-email","password":"test"}'
```
Expected: 400 Bad Request

### 3. Test Admin Panel
- [ ] Login at /login with admin credentials
- [ ] Access /admin/dashboard
- [ ] Test CRUD operations on Produce
- [ ] Test CRUD operations on Projects
- [ ] Test CRUD operations on Services
- [ ] Verify changes reflect on public pages

### 4. Test Public Pages
- [ ] Home page loads with content
- [ ] About page displays correctly
- [ ] Services page shows all services
- [ ] Produce page shows all products with filtering
- [ ] Projects page displays all projects
- [ ] Contact form works

## Monitoring

### Check Logs
- Render: Dashboard → Logs
- Netlify: Dashboard → Deploys → Deploy log

### Monitor for Issues
- [ ] No 500 errors in logs
- [ ] API response times acceptable
- [ ] No security warnings
- [ ] Rate limiting working (check for 429 responses)

## Rollback Plan

If issues occur:

### Backend (Render)
```bash
# Revert to previous commit
git revert HEAD
git push origin main
```

### Frontend (Netlify)
- Go to Netlify Dashboard
- Deploys → Click previous successful deploy
- Click "Publish deploy"

## Security Verification

- [ ] No credentials in code
- [ ] Environment variables set in production
- [ ] HTTPS enabled (automatic on Render/Netlify)
- [ ] Rate limiting active
- [ ] Input validation working
- [ ] Security headers present
- [ ] MongoDB connection secure

## Performance Check

- [ ] Frontend loads in < 3 seconds
- [ ] API responses < 1 second
- [ ] Images load properly
- [ ] No console errors
- [ ] Mobile responsive

## Final Checks

- [ ] All pages accessible
- [ ] Tawk chat visible everywhere
- [ ] Admin panel functional
- [ ] No broken links
- [ ] Contact form works
- [ ] Gallery displays correctly
- [ ] Navigation works
- [ ] Footer displays correctly

## Documentation

- [ ] README.md updated
- [ ] SECURITY.md reviewed
- [ ] ENV_SETUP.md followed
- [ ] SECURITY_FIXES_SUMMARY.md reviewed

## Support

If you encounter issues:

1. Check Render logs for backend errors
2. Check Netlify logs for frontend errors
3. Check browser console for client errors
4. Verify environment variables are set
5. Ensure dependencies are installed
6. Check MongoDB connection

## Success Criteria

✅ Backend deployed and healthy
✅ Frontend deployed and accessible
✅ Tawk.to chat visible on all pages
✅ Security features active
✅ Admin panel working
✅ Public pages displaying correctly
✅ No critical errors in logs

---

**Deployment Date**: _____________

**Deployed By**: _____________

**Status**: ⬜ Success  ⬜ Issues  ⬜ Rolled Back

**Notes**:
