Shop Management System

A full-stack **Sweet Shop Management System** built using modern web technologies.
This project allows users to browse and purchase sweets, while admins can manage inventory through a secure admin panel.

The application demonstrates **clean backend architecture**, **JWT-based authentication**, **role-based authorization**, **modern React UI**, and **comprehensive automated testing**.

---

## 🚀 Features

### 👤 User Features

* User registration & login
* Secure JWT authentication
* View all available sweets
* Search sweets by name, category, and price
* Purchase sweets (automatically disabled when out of stock)

### 🛠️ Admin Features

* Add new sweets with image upload
* Update sweet details
* Restock sweets
* Soft-delete sweets
* Admin-only protected routes

---

## 🧰 Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Multer + Cloudinary (image upload)
* Jest + Supertest (testing)

### Frontend

* React (Vite)
* Tailwind CSS
* React Router
* Axios
* React Hot Toast

---

## 🌐 Live Deployment

* **Frontend (Vercel)**
  👉 [https://sweet-shop-management-wine.vercel.app/](https://sweet-shop-management-wine.vercel.app/)

* **Backend (Render)**
  👉 [https://sweet-shop-management-backend-ugpn.onrender.com/](https://sweet-shop-management-backend-ugpn.onrender.com/)

---

## 📁 Project Structure

```
Sweet-shop-management
│
├── screenshots
│
├── sweet-shop-backend
│   ├── src
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── tests
│   │   └── app.js
│   ├── server.js
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
├── sweet-shop-frontend
│   ├── src
│   │   ├── component
│   │   ├── pages
│   │   ├── auth
│   │   └── api
│   ├── public
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

---

## 🔐 API Endpoints

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

### Sweets (Protected)

* `POST /api/sweets` (Admin)
* `GET /api/sweets`
* `GET /api/sweets/search`
* `PUT /api/sweets/:id` (Admin)
* `DELETE /api/sweets/:id` (Admin)

### Inventory (Protected)

* `POST /api/sweets/:id/purchase`
* `POST /api/sweets/:id/restock` (Admin)

---

## 🧪 Test-Driven Development (TDD)

### Approach Used

While the application functionality was largely implemented first, **Test-Driven Development principles were applied and reinforced during backend stabilization and validation**.

The testing process followed the **Red → Green → Refactor** philosophy conceptually:

### 🔴 Red (Test Design)

* Designed unit and integration tests covering:

  * User registration & login
  * Role-based access control (admin vs user)
  * Sweet creation, retrieval, and search
  * Purchase, restock, and delete operations
  * Edge cases (out-of-stock purchase, unauthorized access)

### 🟢 Green (Implementation)

* Backend controllers and routes were implemented and adjusted until all tests passed successfully.
* Failing tests guided missing logic, validation checks, and authorization fixes.

### 🔵 Refactor

* Improved validation logic
* Centralized error handling
* Ensured all tests pass consistently after refactoring

Although commits were not strictly written test-first initially, the **final automated test suite fully validates the system behavior**, ensuring correctness, regression safety, and high confidence in the application.

---

## ✅ Test Report

All backend tests are executed using **Jest + Supertest** with **MongoDB Memory Server**.

```
PASS  Auth API
PASS  Sweet API
```

### Coverage Includes:

* Authentication & authorization
* CRUD operations
* Inventory updates
* Admin-only access
* Edge cases & error handling

---

## 🎨 UI & UX

* Sweet shop / restaurant themed design
* Responsive layout
* Modern card-based UI
* Hover effects and transitions
* Toast notifications for actions
* Dedicated admin panel
* Clean and accessible user experience

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/ADDI014/Sweet-shop-management.git
cd Sweet-shop-management
```

---

### 2️⃣ Backend Setup

```bash
cd sweet-shop-backend
npm install
```

Create `.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd sweet-shop-frontend
npm install
npm run dev
```

---

## 🤖 My AI Usage

AI tools were used as **development assistants**, not as replacements for understanding or ownership.

### Tools Used

* ChatGPT (OpenAI)

### How AI Was Used

* Brainstorming API endpoint structures
* Debugging MongoDB, Mongoose, and Express issues
* Improving Tailwind CSS UI and layout
* Writing and refining test cases
* Validating JWT authentication and role-based access patterns

### Reflection

AI significantly improved development speed by reducing boilerplate and accelerating debugging.
All suggestions were reviewed, modified, and implemented manually to ensure correctness, maintainability, and ownership of the final solution.

---

## 📸 Screenshots

Screenshots of the application (Dashboard, Admin Panel, Authentication, and Test Results) are available in the `/screenshots` folder.
