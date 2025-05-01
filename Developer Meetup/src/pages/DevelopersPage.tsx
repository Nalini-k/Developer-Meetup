import React from 'react';
import Layout from '../components/layout/Layout';
import DevelopersList from '../components/developers/DevelopersList';

const DevelopersPage: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Connect with Developers
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Discover and connect with developers who share your interests
            </p>
          </div>
          
          <DevelopersList />
        </div>
      </div>
    </Layout>
  );
};

export default DevelopersPage;