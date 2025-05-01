import React from 'react';
import { Code, Users, Lightbulb, Globe, Heart, ArrowRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-purple-600 text-white py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Code className="h-16 w-16 mx-auto mb-6 text-purple-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About DevMeetup
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              Building a vibrant community for developers to connect, learn, and grow together.
            </p>
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              DevMeetup was created with a simple yet powerful mission: to break down the barriers that isolate developers and foster a community where knowledge sharing and networking happen naturally. We believe that the best innovations come from diverse perspectives and collaborative environments.
            </p>
            <div className="flex justify-center">
              <div className="w-24 h-1 bg-purple-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Our Values
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Community First
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We prioritize building a supportive, inclusive community where every developer feels welcome and valued.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Continuous Learning
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We believe in the power of lifelong learning and create spaces for developers to share knowledge and skills.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Global Perspective
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We embrace diversity of thought, background, and experience, connecting developers across borders.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Story Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
              Our Story
            </h2>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg mb-6">
                DevMeetup began in 2023 when a group of passionate developers recognized a common challenge: despite being part of a digital industry, many developers felt isolated in their professional journeys. While online forums and social media provided some connection, there was a clear need for more meaningful, face-to-face interactions with peers.
              </p>
              
              <p className="text-lg mb-6">
                What started as local gatherings in coffee shops quickly grew into organized meetups across multiple cities. As the community expanded, we built this platform to connect developers globally, enabling both virtual and in-person events that cater to various technologies, interests, and skill levels.
              </p>
              
              <p className="text-lg mb-6">
                Today, DevMeetup hosts thousands of events yearly, connecting developers across the globe. From workshop sessions on emerging technologies to informal networking events, our platform continues to evolve with the needs of the developer community.
              </p>
              
              <p className="text-lg">
                Our journey is just beginning, and we're excited to continue growing alongside the amazing community of developers who make DevMeetup what it is today.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Meet Our Team
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Alex Chen" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  Alex Chen
                </h3>
                <p className="text-purple-600 dark:text-purple-400 mb-4">
                  Founder & CEO
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Former software engineer with a passion for building communities. Alex founded DevMeetup to help developers connect and grow together.
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Sarah Johnson" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  Sarah Johnson
                </h3>
                <p className="text-purple-600 dark:text-purple-400 mb-4">
                  CTO
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Full-stack developer with extensive experience in building scalable platforms. Sarah leads the technical development of DevMeetup.
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Michael Rodriguez" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  Michael Rodriguez
                </h3>
                <p className="text-purple-600 dark:text-purple-400 mb-4">
                  Head of Community
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Community builder and developer advocate. Michael works to ensure DevMeetup creates meaningful connections within the developer ecosystem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-purple-600 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Heart className="h-16 w-16 mx-auto mb-6 text-purple-200" />
            <h2 className="text-3xl font-bold mb-6">
              Join Our Community
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Ready to connect with fellow developers and build your network? Join DevMeetup today and be part of a vibrant community of tech professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button
                  size="lg"
                  variant="accent"
                >
                  Sign Up Free
                </Button>
              </Link>
              <Link to="/meetups">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                  rightIcon={<ArrowRight className="h-5 w-5" />}
                >
                  Browse Meetups
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;