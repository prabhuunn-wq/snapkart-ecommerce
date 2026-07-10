# 🛒 SnapCart — Full-Stack E-Commerce Application

SnapCart is a complete, production-style e-commerce platform built from scratch with a modern MERN-inspired stack (MongoDB, Express, React, Node.js) using TypeScript throughout. It includes real payment processing, admin management, and a fully responsive dark-themed UI.

![SnapCart](https://img.shields.io/badge/status-active-success)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)

---

## 🌟 Live Demo

- **Frontend:** [Add Vercel link after deployment]
- **Backend API:** [Add Render link after deployment]

---

## 📸 Screenshots

> Add screenshots here after deployment — homepage, product page, cart, checkout, admin dashboard

---

## ✨ Features

### Customer Features
- 🔐 User authentication (JWT-based register/login)
- 🛍️ Browse 120+ products across 6 categories
- 🔍 Real-time product search
- 🎯 Filter by category, brand, and price range
- 📊 Sort by price and rating
- ❤️ Wishlist with persistent storage
- 🛒 Shopping cart with quantity management
- 💳 Real payment integration via Razorpay (test mode)
- 📦 Order history with cancellation support
- 👤 User profile with saved shipping address
- ⭐ Product ratings and discount pricing
- 📱 Fully responsive design

### Admin Features
- 📋 Admin dashboard with product management
- ➕ Add / edit / delete products
- 🔒 Role-based access control (customer vs admin)

### Technical Highlights
- 🔒 JWT authentication with protected routes
- 🔑 Password hashing with bcrypt
- ✅ Payment signature verification (HMAC SHA256)
- 🎨 Fully typed with TypeScript (frontend + backend)
- 🌐 RESTful API architecture
- 📄 Pagination on product listing pages
- 🎭 Toast notifications for user feedback

---

## 🛠️ Tech Stack

**Frontend**
- React 19 + TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Hot Toast
- Lucide React (icons)

**Backend**
- Node.js + Express + TypeScript
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- Razorpay (payment gateway)

**Database**
- MongoDB Atlas (cloud)

---

## 📂 Project Structure

E-Commerce Website/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route-level pages
│   │   ├── context/        # Auth, Cart, Wishlist context
│   │   ├── services/       # Axios API instance
│   │   └── types/          # TypeScript interfaces
│   └── package.json
│
├── server/                 # Express backend
│   ├── src/
│   │   ├── controllers/    # Route logic
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Auth middleware
│   │   └── index.ts        # App entry point
│   └── package.json
│
└── README.md



---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Razorpay account (test mode)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/snapcart.git
cd snapcart
```

2. Install backend dependencies
```bash
cd server
npm install
```

3. Install frontend dependencies
```bash
cd ../client
npm install
```

4. Set up environment variables (see below)

5. Run the backend
```bash
cd server
npm run dev
```

6. Run the frontend
```bash
cd client
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 🔑 Environment Variables

**server/.env**


PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

**client/.env**

> ⚠️ Never commit `.env` files. Both are excluded via `.gitignore`.

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile` | Get user profile (protected) |
| PUT | `/api/auth/address` | Update saved address (protected) |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create product (admin only) |
| PUT | `/api/products/:id` | Update product (admin only) |
| DELETE | `/api/products/:id` | Delete product (admin only) |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Create order (protected) |
| GET | `/api/orders/myorders` | Get user's orders (protected) |
| PUT | `/api/orders/:id/cancel` | Cancel an order (protected) |

### Payment
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/payment/create-order` | Create Razorpay order |
| POST | `/api/payment/verify` | Verify payment signature |

---

## 🧑‍💻 Author

**Prabhu Rajagopal**
Full-stack web development student, building projects as part of a self-directed 25 Projects learning series.

- GitHub: [github.com/prabhuunn-wq](https://github.com/prabhuunn-wq)

---

## 📄 License

This project is open source and available for learning purposes.