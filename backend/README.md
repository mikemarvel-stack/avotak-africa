# Avotak Backend API

## Setup

1. Copy `.env.example` to `.env` and fill in your MongoDB URI and secrets.
2. Run `npm install` in the backend folder.
3. Start the server with `npm run dev` (for development) or `npm start` (for production).

## API Endpoints

### Auth
- `POST /api/auth/login` — { email, password } → { token }

### Dashboard (all require Bearer token)
- `GET /api/dashboard/orders` — list orders
- `POST /api/dashboard/orders` — add order
- `PUT /api/dashboard/orders/:id` — update order
- `DELETE /api/dashboard/orders/:id` — delete order
- `GET /api/dashboard/stats` — list stats
- `POST /api/dashboard/stats` — add stat
- `PUT /api/dashboard/stats/:id` — update stat
- `DELETE /api/dashboard/stats/:id` — delete stat
