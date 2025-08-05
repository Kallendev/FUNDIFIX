# 🛠️ FundiFix - Handyman Booking Platform

**FundiFix** is a full-stack MERN (MongoDB, Express, React, Node.js) web application that connects clients with local fundis (handymen) for various services. It includes real-time chat, secure authentication (JWT/Clerk), admin dashboard, MPESA payments, job posting, and fundi profiles.

## 🚀 Live Demo

> *Coming soon on Vercel & Render* ✨

---

## 📁 Folder Structure

```
/fundifix
├── client       # React (Vite) Frontend - TSX
│   ├── src
│   └── ...
├── server       # Express Backend - TypeScript
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   └── ...
```

---

## 🧰 Tech Stack

### 🖥️ Frontend (client/)

* React + Vite + TypeScript
* Tailwind CSS + shadcn/ui
* Axios
* Clerk (Auth)
* Zustand (State Management)
* React Router DOM
* Socket.io-client

### 🧪 Backend (server/)

* Node.js + Express
* MongoDB + Mongoose
* JWT (Authentication)
* Socket.io (Chat)
* dotenv, cors, nodemon

---

## 🔐 Authentication

* **Clerk**: Frontend login, session management.
* **JWT**: Backend route protection (admin & user).
* Roles: `admin`, `client`, `fundi`.

---

## 💵 MPESA Integration

* Payments handled through MPESA Daraja API.
* Users can pay for services and receive receipts.

---

## 💬 Real-Time Chat

* Built using Socket.io.
* One-on-one communication between clients and fundis.

---

## 🎯 Key Features

* ✅ Secure Auth (JWT + Clerk)
* 🧰 Post jobs & assign fundis
* 📂 Fundi profiles with skills & ratings
* 🧾 MPESA payments with receipts
* 💬 Real-time Chat via Socket.io
* 🛠️ Admin dashboard
* 🔍 Search & filter fundis/jobs
* 🌐 Multi-school/department structure (if used in institutions)

---

## ⚙️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/fundifix.git
cd fundifix
```

### 2. Install dependencies

```bash
npm install          # Root
npm install --filter client
npm install --filter server
```

### 3. Setup environment variables

Create a `.env` file in `/server`:

```env
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
CLERK_SECRET_KEY=your_clerk_secret
MPESA_CONSUMER_KEY=xxx
MPESA_CONSUMER_SECRET=xxx
CALLBACK_URL=https://your-server.com/callback
```

---

## 💻 Run Locally

### Backend

```bash
cd server
pnpm dev
```

### Frontend

```bash
cd client
pnpm dev
```

---

## 🧪 Sample APIs

| Method | Route                 | Description            | Protected        |
| ------ | --------------------- | ---------------------- | ---------------- |
| POST   | `/api/auth/login`     | User login             | ❌                |
| GET    | `/api/jobs/`          | Get all jobs           | ✅                |
| POST   | `/api/jobs/`          | Create job             | ✅ (Client/Admin) |
| POST   | `/api/payments/mpesa` | Initiate MPESA payment | ✅                |
| GET    | `/api/fundis/:id`     | Get fundi profile      | ✅                |

---

## 📦 Deployment

* **Frontend**: Vercel
* **Backend**: Render or Railway
* **Database**: MongoDB Atlas
* **Env**: Separate for dev/prod

---

## 🧠 Lessons Learned

* Integrating Clerk + JWT for frontend/backend auth sync.
* Handling real-time chat in TSX with Socket.io.
* Designing reusable shadcn/ui components.

---

## 📸 Screenshots

> Add screenshots of key pages (Login, Dashboard, Fundi Profile, Chat, MPESA Payment)

---

## 🧑‍💻 Team

Built with ❤️ by:
---

## 📝 License

MIT License




