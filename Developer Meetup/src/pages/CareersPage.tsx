import React from 'react';
import { Briefcase, Award, Heart, Coffee, ArrowRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import { Link } from 'react-router-dom';

const CareersPage: React.FC = () => {
  // Mock job openings
  const jobOpenings = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'San Francisco, CA / Remote',
      type: 'Full-time',
      description: 'We\'re looking for an experienced full stack developer to help build and scale our platform as we expand our global community of developers.'
    },
    {
      id: 2,
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      description: 'Join our design team to create beautiful, intuitive experiences that help developers connect and collaborate through our platform.'
    },
    {
      id: 3,
      title: 'Community Manager',
      department: 'Community',
      location: 'New York, NY / Remote',
      type: 'Full-time',
      description: 'Help grow and nurture our developer community by organizing virtual and in-person events and building meaningful relationships.'
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'Join our infrastructure team to ensure our platform is reliable, scalable, and secure for our growing community of developers.'
    }
  ];
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-purple-600 text-white py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Briefcase className="h-16 w-16 mx-auto mb-6 text-purple-200" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our Team
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              Help us build the future of developer connections and community.
            </p>
            <Button 
              size="lg"
              variant="accent"
              as="a"
              href="#openings"
            >
              View Open Positions
            </Button>
          </div>
        </div>
      </section>
      
      {/* Our Culture Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Culture
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              At DevMeetup, we're building more than just a platform — we're creating a global community of developers who learn, connect, and grow together. Our team shares a passion for technology and community building.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                alt="Team collaboration" 
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Collaborative Environment
                  </h3>
                  <p className="text-gray-200">
                    We work together across teams to solve complex problems and build innovative solutions.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src="https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                alt="Team discussion" 
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Remote-First Culture
                  </h3>
                  <p className="text-gray-200">
                    We embrace flexible work arrangements while maintaining strong connections across our global team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-16">
            Benefits & Perks
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Competitive Compensation
              </h3>
              <ul className="text-gray-600 dark:text-gray-400 space-y-2">
                <li>Competitive salary packages</li>
                <li>Equity options for all employees</li>
                <li>401(k) matching program</li>
                <li>Performance-based bonuses</li>
              </ul>
            </Card>
            
            <Card className="text-center">
              <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Health & Wellness
              </h3>
              <ul className="text-gray-600 dark:text-gray-400 space-y-2">
                <li>Comprehensive health insurance</li>
                <li>Mental health support</li>
                <li>Wellness stipend</li>
                <li>Flexible PTO policy</li>
                <li>Paid parental leave</li>
              </ul>
            </Card>
            
            <Card className="text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <Coffee className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Growth & Development
              </h3>
              <ul className="text-gray-600 dark:text-gray-400 space-y-2">
                <li>Learning & development budget</li>
                <li>Conference attendance</li>
                <li>Internal tech talks and workshops</li>
                <li>Career advancement opportunities</li>
                <li>Mentorship programs</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Current Openings Section */}
      <section id="openings" className="py-16 md:py-24 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-16">
            Current Openings
          </h2>
          
          {jobOpenings.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
              <Briefcase className="h-12 w-12 mx-auto mb-3 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                No positions currently available
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We don't have any open positions at the moment, but check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {jobOpenings.map(job => (
                <div key={job.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex flex-wrap justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="primary">
                            {job.department}
                          </Badge>
                          <Badge variant="secondary">
                            {job.location}
                          </Badge>
                          <Badge variant="outline">
                            {job.type}
                          </Badge>
                        </div>
                      </div>
                      <Link to={`/careers/${job.id}`}>
                        <Button rightIcon={<ArrowRight className="h-5 w-5" />}>
                          Apply Now
                        </Button>
                      </Link>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {job.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-purple-600 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Don't See the Right Fit?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              We're always looking for talented individuals to join our team. Send us your resume, and we'll keep you in mind for future opportunities.
            </p>
            <Button
              size="lg"
              variant="accent"
              as="a"
              href="mailto:careers@devmeetup.com"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CareersPage;