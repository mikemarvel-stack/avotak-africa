# 🌱 Database Seeding Guide

## Quick Start

Populate your database with default content:

```bash
cd backend
npm run seed
```

## What Gets Seeded

### ✅ Services (6 items)
- Farm Advisory & Consulting
- Post-Harvest Handling & Quality Management
- Market Linkages & Export Facilitation
- Training & Capacity Building
- Sustainability & Climate-Smart Agriculture
- Supply Chain & Value Addition Support

### ✅ Projects (4 items)
- Hass Avocado Export Program
- Kent Mango Quality Improvement
- Fresh Basil Production for Export
- Organic Ginger Certification Project

### ✅ Produce (12 items)
- Fruits: Avocado, Mango, Banana, Apple
- Vegetables: Tomato, Spinach, Carrot
- Herbs: Basil, Rosemary, Coriander
- Spices: Ginger, Turmeric

### ✅ Home Content
- Hero title and subtitle

### ✅ About Content
- Company title and description

## When to Run Seeder

### First Time Setup
```bash
cd backend
npm run seed
```

### After Database Reset
If you clear your database or switch environments:
```bash
cd backend
npm run seed
```

### Production Deployment
Run once after initial deployment to Render:
```bash
# SSH into Render or use Render Shell
cd backend
npm run seed
```

## Important Notes

⚠️ **Warning**: The seeder will:
- Delete ALL existing Services, Projects, and Produce
- Insert fresh data from the seed file
- Update Home and About content

💡 **Tip**: Only run this on a fresh database or when you want to reset to defaults.

## Customizing Seed Data

Edit the seed file:
```bash
backend/seeders/seedData.js
```

Then run:
```bash
npm run seed
```

## Troubleshooting

### Connection Error
```
❌ Error: connect ECONNREFUSED
```
**Solution**: Check your `MONGO_URI` in `.env`

### Authentication Failed
```
❌ Error: Authentication failed
```
**Solution**: Verify MongoDB credentials in `.env`

### Module Not Found
```
❌ Error: Cannot find module
```
**Solution**: Run `npm install` in backend directory

## Manual Seeding via Admin Panel

Instead of using the seeder, you can:
1. Login to admin panel
2. Navigate to each section (Services, Projects, Produce)
3. Add items manually
4. Upload images via Cloudinary

This gives you more control but takes longer.

---

**Need help?** Check the main [README.md](../README.md)
