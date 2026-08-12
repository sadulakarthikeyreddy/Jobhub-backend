# JobHub Backend — REST API

Backend REST API for **JobHub**, a full-stack job portal built using Node.js, Express.js, and MongoDB.

The API provides authentication, role-based authorization, job management, company management, job applications, resume uploads, and admin functionality.

## 🚀 Live API

**Production Backend:**

https://jobhub-backend-46sj.onrender.com/

## 📂 Frontend

**Live Application:**

https://jobhub-frontend-sable.vercel.app/

**Frontend Repository:**

https://github.com/sadulakarthikeyreddy/Jobhub-frontend

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Multer
* Cloudinary
* dotenv
* CORS

---

## ✨ Features

### Authentication

* User registration
* User login
* JWT authentication
* Password hashing
* Protected routes
* Role-based authorization

### 👤 Candidate

* Manage profile
* Upload profile information
* Upload resume
* Browse jobs
* Apply for jobs
* View applications

### 🏢 Recruiter

* Create companies
* Update companies
* Create jobs
* Update jobs
* Manage jobs
* View applicants

### 👑 Admin

* Admin authentication
* Dashboard functionality
* Manage users
* Manage jobs
* Manage applications

### ☁️ Cloudinary

Cloudinary is used for:

* Resume storage
* Profile image uploads
* Company image uploads

---

## 📁 Project Structure

```text
jobhub-backend/
│
├── config/
│   ├── Cloudinary.js
│   └── db.js
│
├── controllers/
│   ├── admincontroller.js
│   ├── applicationController.js
│   ├── authController.js
│   ├── companyController.js
│   └── jobController.js
│
├── middleware/
│   ├── adminMiddleware.js
│   ├── authMiddleware.js
│   ├── upload.js
│   ├── uploadProfile.js
│   └── uploadResume.js
│
├── models/
│   ├── Application.js
│   ├── Company.js
│   ├── Job.js
│   └── User.js
│
├── routes/
│   ├── adminRoutes.js
│   ├── applicationRoutes.js
│   ├── authRoutes.js
│   ├── companyRoutes.js
│   └── jobRoutes.js
│
├── utils/
│
├── server.js
├── package.json
└── README.md
```

---

## 🔐 Authentication

JobHub uses **JSON Web Tokens (JWT)** for authentication.

The authentication flow is:

```text
Register
   ↓
Login
   ↓
JWT Token
   ↓
Protected API Request
   ↓
Authentication Middleware
   ↓
Authorized Resource
```

Passwords are securely hashed before being stored in the database.

---

## 👥 User Roles

The application supports different roles:

```text
Candidate
   │
   ├── Browse Jobs
   ├── Apply
   ├── Upload Resume
   └── View Applications

Recruiter
   │
   ├── Manage Companies
   ├── Create Jobs
   ├── Manage Jobs
   └── View Applicants

Admin
   │
   ├── Manage Users
   ├── Manage Jobs
   └── Manage Applications
```

---

## 📡 API Modules

The backend is organized into REST API modules.

### Authentication

```text
/auth
```

Handles:

* Registration
* Login
* Profile
* Authentication

### Jobs

```text
/jobs
```

Handles:

* Create jobs
* Get jobs
* Get job details
* Update jobs
* Delete/manage jobs

### Companies

```text
/companies
```

Handles:

* Create companies
* Get companies
* Update companies
* Manage company information

### Applications

```text
/applications
```

Handles:

* Submit applications
* View applications
* Manage applications
* Applicant information

### Admin

```text
/admin
```

Handles administrative functionality.

---

## ☁️ File Uploads

The backend uses:

* `multer`
* `multer-storage-cloudinary`
* Cloudinary

for handling uploaded files.

Supported uploads include:

* PDF resumes
* JPG images
* JPEG images
* PNG images

Uploaded files are stored remotely using Cloudinary rather than being stored permanently on the server.

---

## 🔑 Environment Variables

Create a `.env` file in the backend root directory.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Important:** Never upload your `.env` file to GitHub.

---

## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/sadulakarthikeyreddy/Jobhub-backend.git
```

### 2. Enter the project

```bash
cd Jobhub-backend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create:

```text
.env
```

and add the required MongoDB, JWT, and Cloudinary credentials.

### 5. Start the server

```bash
node server.js
```

For development, if nodemon is configured:

```bash
npm run dev
```

The local API will run on:

```text
http://localhost:5000
```

---

## 🚀 Deployment

The backend is deployed using **Render**.

Production API:

https://jobhub-backend-46sj.onrender.com/

The backend connects to:

* MongoDB Atlas
* Cloudinary

---

## 🔗 Related Projects

### Frontend

https://github.com/sadulakarthikeyreddy/Jobhub-frontend

### Live Application

https://jobhub-frontend-sable.vercel.app/

---

## 👨‍💻 Developer

**Karthik Reddy**

MERN Stack Full Stack Developer

GitHub:

https://github.com/sadulakarthikeyreddy

---

## 🎯 Project Highlights

This project demonstrates practical experience with:

* REST API development
* Node.js and Express.js
* MongoDB database integration
* JWT authentication
* Role-based access control
* File upload handling
* Cloudinary integration
* MVC-style backend architecture
* Frontend/API integration
* Production deployment
* Git and GitHub
