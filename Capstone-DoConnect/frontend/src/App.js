import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { isAuthenticated, isAdmin } from './services/auth';
import heroImage from './assets/doconnectpic.jpg';

import UserDashboard from './components/user/UserDashboard';
import AskQuestion from './components/user/AskQuestion';
import QuestionList from './components/user/QuestionList';
import QuestionDetail from './components/user/QuestionDetail';
import MyQuestions from './components/user/MyQuestions';

import AdminDashboard from './components/admin/AdminDashboard';
import ManageUsers from './components/admin/ManageUsers';
import ManageQuestions from './components/admin/ManageQuestions';
import ManageAnswers from './components/admin/ManageAnswers';
import ApproveContent from './components/admin/ApproveContent';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }

    if (adminOnly && !isAdmin()) {
        return <Navigate to="/user/dashboard" />;
    }

    return children;
};

const Home = () => (
    <div style={{ textAlign: 'center' }}>

        <h1 style={{
            fontWeight: 'bold',
            marginTop: '40px',
            marginBottom: '15px'
        }}>
            Welcome to DoConnect
        </h1>

        <p style={{
            fontSize: '18px',
            color: '#555',
            marginBottom: '30px'
        }}>
            A platform where technical questions are asked and answered.
        </p>

        <div style={{ width: '100%', overflow: 'hidden' }}>
            <img
                src={heroImage}
                alt="Discussion Illustration"
                style={{
                    width: '100%',
                    maxWidth: '900px',
                    borderRadius: '12px',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.08)'
                }}
            />
        </div>

        {!isAuthenticated() && (
            <div style={{ marginTop: '30px' }}>
                <p>Please login or register to continue.</p>
            </div>
        )}

    </div>
);



function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/questions" element={<QuestionList />} />
                <Route path="/questions/:id" element={<QuestionDetail />} />

                <Route path="/user/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
                <Route path="/user/ask" element={<ProtectedRoute><AskQuestion /></ProtectedRoute>} />
                <Route path="/user/questions" element={<ProtectedRoute><MyQuestions /></ProtectedRoute>} />

                <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/users" element={<ProtectedRoute adminOnly={true}><ManageUsers /></ProtectedRoute>} />
                <Route path="/admin/questions" element={<ProtectedRoute adminOnly={true}><ManageQuestions /></ProtectedRoute>} />
                <Route path="/admin/answers" element={<ProtectedRoute adminOnly={true}><ManageAnswers /></ProtectedRoute>} />
                <Route path="/admin/questions/pending" element={<ProtectedRoute adminOnly={true}><ApproveContent /></ProtectedRoute>} />
                <Route path="/admin/answers/pending" element={<ProtectedRoute adminOnly={true}><ApproveContent /></ProtectedRoute>} />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>

        </Router>
    );
}

export default App;