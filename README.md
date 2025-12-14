
# 🍬 Sweet Shop Management System

A full-stack **Sweet Shop Management System** built using modern web technologies.  
This project allows users to browse and purchase sweets, while admins can manage inventory through a secure admin panel.

The application demonstrates **clean backend architecture**, **JWT-based authentication**, **role-based authorization**, **modern React UI**, and **comprehensive automated testing**.


## 🚀 Features

### 👤 User Features
- User registration & login
- Secure JWT authentication
- View all available sweets
- Search sweets by name, category, and price
- Purchase sweets (disabled automatically when out of stock)

### 🛠️ Admin Features
- Add new sweets with image upload
- Update sweet details
- Restock sweets
- Soft-delete sweets
- Admin-only protected routes

## 🧰 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer + Cloudinary (image upload)
- Jest + Supertest (testing)

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Axios
- React Hot Toast

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

---

## 🔐 API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Sweets (Protected)
- `POST /api/sweets` (Admin)
- `GET /api/sweets`
- `GET /api/sweets/search`
- `PUT /api/sweets/:id` (Admin)
- `DELETE /api/sweets/:id` (Admin)

### Inventory (Protected)
- `POST /api/sweets/:id/purchase`
- `POST /api/sweets/:id/restock` (Admin)

---

## 🧪 Test-Driven Development (TDD)

### Approach Used

Although the full application was implemented before finalizing commits, **Test-Driven Development principles were applied conceptually and reinforced afterward**.

The development process followed this pattern:

### 🔴 Red (Test Design)
- Designed unit and integration tests covering:
  - User registration & login
  - Role-based access (admin vs user)
  - Sweet creation, retrieval, search
  - Purchase, restock, and delete operations
  - Edge cases (out-of-stock, unauthorized access)

### 🟢 Green (Implementation)
- Backend controllers and routes were implemented to satisfy the test cases.
- Each failing test guided missing logic and validation fixes.

### 🔵 Refactor
- Improved controller validation
- Centralized error handling
- Ensured all tests pass consistently after refactoring

Although commits were not strictly tests-first initially, the **final test suite fully validates system behavior**, ensuring correctness, regression safety, and high confidence in the application.

---

## ✅ Test Report

All tests are executed using **Jest + Supertest** with **MongoDB Memory Server**.


PASS  Auth API
PASS  Sweet API


### Coverage Includes:
- Authentication
- CRUD operations
- Inventory updates
- Admin authorization
- Edge cases & error handling

---

## 🎨 UI & UX

- Sweet shop / restaurant themed design
- Responsive layout
- Modern cards and animations
- Toast notifications
- Separate admin panel
- Accessible & clean UI

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone <your-repo-url>
cd Sweet-shop-management
````

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
* Improving Tailwind UI and layout
* Writing and refining test cases
* Validating JWT and role-based access patterns

### Reflection

AI significantly improved development speed by reducing boilerplate and accelerating debugging.
All suggestions were reviewed, modified, and implemented manually to ensure correctness and maintainability.

---

## 📸 Screenshots

Screenshots of the application (Dashboard, Admin Panel, Auth, Tests) are available in the `/screenshots` folder.

---

## 🌐 Deployment






