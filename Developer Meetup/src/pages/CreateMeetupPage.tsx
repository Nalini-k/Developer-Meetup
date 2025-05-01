import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Layout from '../components/layout/Layout';
import CreateMeetupForm from '../components/meetups/CreateMeetupForm';

const CreateMeetupPage: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation */}
          <div className="mb-6">
            <Link to="/meetups" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Meetups
            </Link>
          </div>
          
          {/* Content */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 md:p-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Host a Developer Meetup
              </h1>
              
              <CreateMeetupForm />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateMeetupPage;