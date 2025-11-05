# Security Configuration Guide

## Environment Variables

All sensitive credentials must be stored in environment variables. Never commit `.env` files to version control.

### Required Environment Variables

```bash
# Database
MONGO_URI=your_mongodb_connection_string

# Authentication
JWT_SECRET=your_jwt_secret_minimum_32_characters
ADMIN_EMAIL=admin@avotak.com
ADMIN_PASSWORD=your_secure_password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Environment
NODE_ENV=production
PORT=5000
```

## Security Features Implemented

### 1. Rate Limiting
- Login attempts: 5 per 15 minutes
- API requests: 100 per 15 minutes

### 2. Input Validation
- Email format validation
- String length limits
- Type checking
- MongoDB ObjectId validation

### 3. Security Headers (Helmet)
- XSS protection
- Content Security Policy
- HSTS
- Frame protection

### 4. Data Sanitization
- MongoDB injection prevention
- NoSQL injection protection

### 5. Authentication
- JWT token-based auth
- Token expiration (2 hours)
- Protected routes

### 6. File Upload Security
- File type validation (images only)
- File size limits (10MB)

## Deployment Checklist

- [ ] Set all environment variables in production
- [ ] Use strong JWT_SECRET (min 32 characters)
- [ ] Use strong ADMIN_PASSWORD
- [ ] Enable HTTPS in production
- [ ] Set NODE_ENV=production
- [ ] Review CORS origins
- [ ] Enable database backups
- [ ] Set up monitoring and logging
- [ ] Review rate limits for your use case

## Security Best Practices

1. **Never commit credentials** - Use environment variables
2. **Rotate secrets regularly** - Change JWT_SECRET and passwords periodically
3. **Monitor logs** - Watch for suspicious activity
4. **Keep dependencies updated** - Run `npm audit` regularly
5. **Use HTTPS** - Always use SSL/TLS in production
6. **Backup database** - Regular automated backups
7. **Limit admin access** - Use strong passwords and 2FA if possible

## Reporting Security Issues

If you discover a security vulnerability, please email security@avotak.com
