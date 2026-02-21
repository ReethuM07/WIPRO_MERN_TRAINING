# DoConnect

DoConnect is a full-stack MERN-based technical Q&A platform where users can ask questions, post answers, like responses, comment, resolve questions, and chat in real time. Admins can manage users and approve or reject content.

---

## Features

User Features:
- Register & Login
- Ask Questions
- Browse Questions
- Answer Questions
- Like Answers
- Comment on Answers
- Mark Questions as Resolved
- Delete Own Content
- Real-time Private Chat
- Personal Dashboard

Admin Features:
- Admin Dashboard with Statistics
- Approve / Reject Questions
- Approve / Reject Answers
- Manage Users (Activate / Deactivate)
- Change User Roles
- Delete Questions & Answers

---

##Project Structure

```
capstone-doconnect/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── answerController.js
│   │   ├── authController.js
│   │   ├── questionController.js
│   │   └── userController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │   
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Question.js
│   │   ├── Answer.js
│   │   ├── Comment.js
│   │   ├── Chat.js
│   │   ├── Notification.js
|   |   └── Like.js
│   │
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── answerRoutes.js
│   │   ├── authRoutes.js
│   │   ├── chatRoutes.js
│   │   ├── questionRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── test/
│   │
│   ├── utils/
│   │   ├── constants.js
│   │   ├── emailService.js
│   │   └──  validation.js
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   └── doconnectpic.jpg
│   │   │
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   │   ├── AdminDashboard.js
│   │   │   │   ├── ApproveContent.js
│   │   │   │   ├── ManageAnswers.js
│   │   │   │   ├── ManageQuestions.js
│   │   │   │   └── ManageUsers.js
│   │   │   │
│   │   │   ├── auth/
│   │   │   │   ├── Login.js
│   │   │   │   └── Register.js
│   │   │   │
│   │   │   ├── common/
│   │   │   │   ├── Chat.js
│   │   │   │   ├── Footer.js
│   │   │   │   ├── Header.js
│   │   │   │   ├── LoadingSpinner.js
│   │   │   │   └── SearchBar.js
│   │   │   │
│   │   │   └── user/
│   │   │       ├── AskQuestion.js
│   │   │       ├── MyQuestions.js
│   │   │       ├── QuestionDetail.js
│   │   │       ├── QuestionList.js
│   │   │       └── UserDashboard.js
│   │   │
│   │   ├── services/
│   │   │   ├── adminApi.js
│   │   │   ├── answerApi.js
│   │   │   ├── api.js
│   │   │   ├── auth.js
│   │   │   ├── chatApi.js
│   │   │   ├── chatService.js
│   │   │   └── questionApi.js
│   │   │
│   │   ├── utils/
│   │   │   └── constants.js
│   │   │
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   │
│   ├── package.json
│   └── README.md
│
└── README.md
```

---

## Setup Instructions

### Backend Setup

```
cd backend
npm install
npm node.js
```

Create a `.env` file inside backend:

```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/doconnect
MONGODB_URI_TEST=mongodb://127.0.0.1:27017/doconnect_test
JWT_SECRET=doconnect123
EMAIL_SERVICE=gmail
EMAIL_USER=reethugowda07@gmail.com
EMAIL_PASS=ztcafjgnimeodftm
```

Backend runs at:
http://localhost:5000

---

### Frontend Setup

```
cd frontend
npm install
npm start
```

Frontend runs at:
http://localhost:3000

---

## Author

Reethu M  
MERN Stack Capstone Project
