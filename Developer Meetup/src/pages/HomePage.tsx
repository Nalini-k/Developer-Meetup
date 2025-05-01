import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar, Users, Video, UserCheck, Search, Laptop } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import MeetupCard from '../components/meetups/MeetupCard';
import DeveloperCard from '../components/developers/DeveloperCard';
import { useMeetups } from '../context/MeetupContext';
import { mockUsers } from '../data/mockData';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { meetups } = useMeetups();
  
  // Get upcoming meetups (sorted by date)
  const upcomingMeetups = [...meetups]
    .filter(meetup => new Date(meetup.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);
  
  // Featured developers (random selection)
  const featuredDevelopers = mockUsers.slice(0, 4);
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-purple-800 flex items-center">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Connect with Developers. Grow your Network.
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-10">
              Join a community of developers sharing knowledge and building connections through virtual and in-person meetups.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate('/meetups')}
                rightIcon={<ArrowRight className="h-5 w-5" />}
              >
                Explore Meetups
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                onClick={() => navigate('/register')}
              >
                Join Community
              </Button>
            </div>
            
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 transform hover:-translate-y-1 transition-transform duration-300">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-white" />
                <h3 className="text-white font-semibold mb-1">Meetups</h3>
                <p className="text-purple-100 text-sm">Attend events that match your interests</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 transform hover:-translate-y-1 transition-transform duration-300">
                <Video className="h-8 w-8 mx-auto mb-2 text-white" />
                <h3 className="text-white font-semibold mb-1">Host Online</h3>
                <p className="text-purple-100 text-sm">Create and host virtual gatherings</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 transform hover:-translate-y-1 transition-transform duration-300">
                <UserCheck className="h-8 w-8 mx-auto mb-2 text-white" />
                <h3 className="text-white font-semibold mb-1">Connect</h3>
                <p className="text-purple-100 text-sm">Build your professional network</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 transform hover:-translate-y-1 transition-transform duration-300">
                <Laptop className="h-8 w-8 mx-auto mb-2 text-white" />
                <h3 className="text-white font-semibold mb-1">Learn</h3>
                <p className="text-purple-100 text-sm">Discover new skills and technologies</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-gray-950 to-transparent"></div>
      </section>
      
      {/* Upcoming Meetups Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Upcoming Meetups
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Connect with developers at these upcoming events
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/meetups')}
              rightIcon={<ArrowRight className="h-5 w-5" />}
            >
              View All
            </Button>
          </div>
          
          {upcomingMeetups.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
              <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                No upcoming meetups
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Be the first to host a developer meetup!
              </p>
              <Button
                onClick={() => navigate('/meetups/create')}
              >
                Host a Meetup
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingMeetups.map(meetup => (
                <MeetupCard key={meetup.id} meetup={meetup} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Featured Developers Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Connect with Developers
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Discover developers with similar interests and skills
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/developers')}
              rightIcon={<ArrowRight className="h-5 w-5" />}
            >
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDevelopers.map(developer => (
              <DeveloperCard key={developer.id} developer={developer} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              All the Features You Need
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              DevMeetup provides everything you need to connect with developers and grow your professional network
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg border border-gray-200 dark:border-gray-800 text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Calendar Integration
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Never miss a meeting with Google Calendar and Outlook integration. Add events directly to your personal calendar.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg border border-gray-200 dark:border-gray-800 text-center">
              <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Video className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Virtual Meetups
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Host or join virtual meetups through Zoom, Google Meet, or Microsoft Teams with one-click access.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg border border-gray-200 dark:border-gray-800 text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Developer Profiles
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Create a detailed profile showcasing your skills, interests, and achievements to connect with like-minded developers.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-purple-600">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Connect with Developers?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Join our community today and start building meaningful connections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="accent"
                onClick={() => navigate('/register')}
              >
                Create Account
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                onClick={() => navigate('/meetups')}
              >
                Browse Meetups
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;