# 🧑‍💻 Job Portal – MERN Stack Application  

A simple **Job Portal Application** built using **React (frontend), Express & MongoDB (backend), and Firebase (authentication)**.  
This project is part of the **MERN Developer Intern Task** and implements **CRUD functionality, authentication, role-based access, and search features**.  

![Banner](/banner.png) 
![LogIn](/login.png) 

---

## 📌 Table of Contents
- [Introduction](#-introduction)  
- [Features](#-features)  
- [Tech Stack](#-tech-stack)  
- [Installation](#-installation)  
- [Environment Variables](#-environment-variables)  
- [Usage](#-usage)  
- [Backend API Documentation](#-backend-api-documentation)  
- [Deployment](#-deployment)  
- [Troubleshooting](#-troubleshooting)  
- [Contributors](#-contributors)  
- [License](#-license)  

---

## 🚀 Introduction  

This is a **job portal application** where users can:  
- Register and log in with **email/password** or **Google authentication** (via Firebase).  
- Browse job listings.  
- Post jobs (authenticated users only).  
- Update or delete jobs **only if they are the job creator**.  
- Search jobs by **title (text search)** or **role (dropdown: Web Developer, Software Engineer, etc.)**.  
- Access **protected routes** for job details and job posting.  

The project is **mobile responsive** .  

 

---

## ✨ Features  

- 🔑 **Authentication**  
  - Firebase Email/Password login  
  - Google Login  
  - Twitter login (work in progress)  

- 📂 **Job Management (CRUD)**  
  - Create, Read, Update, Delete jobs  
  - Update/Delete only available to the **job creator**  

- 🔍 **Search Functionality**  
  - **Text Search** → filters by job title  
  - **Role Search** → dropdown filter (e.g., Web Developer, Software Engineer)  
  - Search requires clicking the search icon  

- 🔒 **Protected Routes**  
  - Job details and job posting require login  

- 📱 **Responsive Design**  
  - Mobile & desktop-friendly  

---

## 🛠️ Tech Stack  

- **Frontend**: React.JS 
- **Backend**:  Express.JS 
- **Database**: MongoDB  
- **Authentication**: Firebase Auth (Email/Password + Google login)  
- **Hosting**:  
  - Frontend → Firebase 
  - Backend → Vercel

---

## ⚙️ Installation  

Clone the repository:  

```bash
git clone https://github.com/ASSabbir/Job-portal
cd job-portal
```

### 🔹 Client (Frontend)  

```bash
cd Frontend
npm install
npm run dev
```

### 🔹 Server (Backend)  

```bash
cd backend
npm install
nodemon index.js
```

---

## 🔑 Environment Variables  

Create a `.env` file in both `client/` and `server/` directories.  

**Client (React):**  
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
```

**Server (Node/Express):**  
```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
```

---

## 📘 Usage  

1. Register or log in (via Firebase).  
2. View job listings.  
3. Post a new job (requires authentication).  
4. Update/Delete jobs (only if you are the job creator).  
5. Search jobs by title or role.  

---

## 📡 Backend API Documentation  

### 🔹 Authentication  

**Register User**  
```http
POST /api/auth/register
```
Body:  
```json
{
  "name": "Atik Al Sabbir",
  "email": "atiksabbir@gmail.com",
  "password": "123456"
}
```

**Login User**  
```http
POST /api/auth/login
```
Body:  
```json
{
  "email": "atiksabbir@gmail.com",
  "password": "123123"
}
```
Response:  
```json
{
  "token": "jwt_token_here"
}
```

---

### 🔹 Jobs (Protected Routes → Require JWT Token)  

**Create Job**  
```http
POST /api/jobs
```
3
**Get All Jobs**  
```http
GET /api/jobs
```

**Update Job** (only if creator)  
```http
PUT /api/jobs/:id
```

**Delete Job** (only if creator)  
```http
DELETE /api/jobs/:id
```

---

## 🌍 Deployment  

- **Frontend (React)** → [Firebase](https://job-portal-system-df17c.web.app/) 
- **Backend (Express)** → [Vercel](https://backend-dun-omega-67.vercel.app/)


---

## 🐛 Troubleshooting  

- **MongoDB connection error** → Check your `MONGO_URI` in `.env`.  
- **Firebase auth not working** → Verify Firebase config keys.  
- **CORS issues** → Ensure backend allows requests from your frontend domain.  

---

## 👥 Contributors  

- **Atik Al Sabbir** – Developer  

---

## 📜 License  

This project is licensed under the **MIT License**.  
