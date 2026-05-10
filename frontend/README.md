# Rabbit MERN eCommerce

Clean MERN eCommerce app with a Vite React frontend and an Express/MongoDB backend.

## Structure

```text
Backend/
  config/
  controllers/
  data/
  Middleware/
  models/
  routes/
  seeder.js
  server.js
public/
scripts/
src/
  components/
  context/
  pages/
  services/
```

## Setup

```bash
npm install
cd Backend
npm install
cd ..
npm run dev
```

Frontend runs on `http://localhost:5173`.
Backend runs on `http://localhost:9000`.

## Environment

Create `.env` files from the examples:

```bash
copy .env.example .env
copy Backend\.env.example Backend\.env
```

Set `Backend/.env` values:

```env
PORT=9000
MONGO_URI=mongodb://127.0.0.1:27017/mern2_backend
JWT_SECRET=replace_with_a_long_random_secret
FRONTEND_URL=http://localhost:5173
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

Leave Razorpay keys empty for local demo payment mode.

## Seeder

```bash
cd Backend
npm run seed
```

Seed users:

- Admin: `admin@example.com` / `password123`
- User: `user@example.com` / `password123`

## API Highlights

- `POST /api/users/register`
- `POST /api/users/login`
- `GET /api/users/profile`
- `GET /api/products?search=shirt&page=1&limit=8`
- `POST /api/products` admin
- `POST /api/products/:id/reviews`
- `GET /api/wishlist`
- `POST /api/wishlist`
- `POST /api/orders`
- `GET /api/orders/mine`
- `GET /api/orders` admin
- `POST /api/payments/create-order`
- `POST /api/payments/verify`
