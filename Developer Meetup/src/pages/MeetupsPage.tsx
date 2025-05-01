import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Layout from '../components/layout/Layout';
import MeetupList from '../components/meetups/MeetupList';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const MeetupsPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Developer Meetups
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Discover and join meetups with fellow developers
              </p>
            </div>
            
            {isAuthenticated ? (
              <Link to="/meetups/create">
                <Button leftIcon={<Plus className="h-5 w-5" />}>
                  Host a Meetup
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button leftIcon={<Plus className="h-5 w-5" />}>
                  Log in to Host
                </Button>
              </Link>
            )}
          </div>
          
          <MeetupList />
        </div>
      </div>
    </Layout>
  );
};

export default MeetupsPage;