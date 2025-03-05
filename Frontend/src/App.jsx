import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/Loginpage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import PostPage from './pages/PostPage';
import MessagesPage from './pages/MessagesPage';
import CreatePostPage from './pages/CreatePostPage';
import NotificationsPage from './pages/NotificationsPAge';
import Header from './components/Header';
import './App.css';
import Settings from './pages/settings';
import PrivacyPolicyPage from './pages/PrivacyPolicy';
import TermsOfServicePage from './pages/TermsofService';
import HelpSupportPage from './pages/Help&Support';
import OTPVerification from './pages/OTP';
import AdminPage from './pages/AdminPage';
import SearchResults from './pages/SearchResults';

const App = () => {
  return (
    <>
    
      <Header/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/create-post" element={<CreatePostPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicyPage />} />
        <Route path="/TermsofService" element={<TermsOfServicePage />} />
        <Route path="/Help&Support" element={<HelpSupportPage />} />
        <Route path="/otp" element={< OTPVerification/>} />
        <Route path="/admin" element={<AdminPage/>}/>
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </>
  );
};

export default App;