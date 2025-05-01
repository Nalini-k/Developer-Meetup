import React from 'react';
import Layout from '../components/layout/Layout';
import ProfileForm from '../components/profile/ProfileForm';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              My Profile
            </h1>
            
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 md:p-8">
              <ProfileForm />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;