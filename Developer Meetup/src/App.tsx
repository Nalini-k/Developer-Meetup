import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { MeetupProvider } from './context/MeetupContext';
import { NotificationProvider } from './context/NotificationContext';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MeetupsPage from './pages/MeetupsPage';
import MeetupDetailPage from './pages/MeetupDetailPage';
import CreateMeetupPage from './pages/CreateMeetupPage';
import ProfilePage from './pages/ProfilePage';
import DevelopersPage from './pages/DevelopersPage';
import AboutPage from './pages/AboutPage';
import CareersPage from './pages/CareersPage';
import SupportPage from './pages/SupportPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MeetupProvider>
          <NotificationProvider>
            <Router>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/meetups" element={<MeetupsPage />} />
                <Route path="/meetups/:id" element={<MeetupDetailPage />} />
                <Route path="/meetups/create" element={<CreateMeetupPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/developers" element={<DevelopersPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/support" element={<SupportPage />} />
              </Routes>
            </Router>
          </NotificationProvider>
        </MeetupProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;