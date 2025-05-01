import React from 'react';
import { Link } from 'react-router-dom';
import { Code } from 'lucide-react';
import Layout from '../components/layout/Layout';
import LoginForm from '../components/auth/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <div className="flex justify-center mb-6">
                <Link to="/" className="flex items-center">
                  <Code className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  <span className="text-xl font-bold text-gray-900 dark:text-white ml-2">DevMeetup</span>
                </Link>
              </div>
              
              <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
                Welcome Back
              </h1>
              
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;