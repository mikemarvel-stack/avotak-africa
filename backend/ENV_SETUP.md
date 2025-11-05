# Environment Setup Guide

## Local Development Setup

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update `.env` with your credentials:
```bash
# Database - Get from MongoDB Atlas
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# Authentication - Generate strong secrets
JWT_SECRET=your_random_32_character_minimum_secret_key
ADMIN_EMAIL=admin@avotak.com
ADMIN_PASSWORD=YourSecurePassword123!

# Cloudinary - Get from cloudinary.com dashboard
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Environment
NODE_ENV=development
PORT=5000
```

## Production Deployment (Render)

### Setting Environment Variables on Render

1. Go to your Render dashboard
2. Select your backend service
3. Navigate to "Environment" tab
4. Add the following environment variables:

```
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret_min_32_chars
ADMIN_EMAIL=admin@avotak.com
ADMIN_PASSWORD=your_secure_production_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=production
PORT=5000
```

### Security Recommendations

1. **JWT_SECRET**: Generate using:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

2. **ADMIN_PASSWORD**: Use a strong password with:
   - Minimum 12 characters
   - Mix of uppercase, lowercase, numbers, symbols
   - Not used anywhere else

3. **MongoDB**: 
   - Use MongoDB Atlas with IP whitelist
   - Enable authentication
   - Use strong database password

4. **Cloudinary**:
   - Keep API secrets secure
   - Enable upload presets with restrictions
   - Set file size limits

## Installing New Dependencies

After adding security packages, install them:

```bash
cd backend
npm install
```

New packages added:
- `helmet` - Security headers
- `express-rate-limit` - Rate limiting
- `express-mongo-sanitize` - NoSQL injection prevention
- `csurf` - CSRF protection

## Verifying Setup

1. Start the backend:
```bash
npm run dev
```

2. Check health endpoint:
```bash
curl http://localhost:5000/api/health
```

3. Test login with rate limiting:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@avotak.com","password":"your_password"}'
```

## Troubleshooting

### "JWT_SECRET is not defined"
- Ensure `.env` file exists in backend directory
- Check that `JWT_SECRET` is set in `.env`
- Restart the server after changing `.env`

### "MONGO_URI is not defined"
- Verify MongoDB connection string in `.env`
- Check MongoDB Atlas IP whitelist
- Ensure database user has correct permissions

### Rate limit errors
- Rate limits reset after 15 minutes
- Adjust limits in `middleware/rateLimiter.js` if needed

## Next Steps

1. Install dependencies: `npm install`
2. Set up environment variables
3. Test locally: `npm run dev`
4. Deploy to production
5. Set production environment variables
6. Test production deployment
