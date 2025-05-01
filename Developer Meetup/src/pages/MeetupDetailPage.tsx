import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, ArrowLeft, Edit, Trash2, AlertCircle, Video, ExternalLink } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import DeveloperCard from '../components/developers/DeveloperCard';
import { useMeetups } from '../context/MeetupContext';
import { useAuth } from '../context/AuthContext';
import { Meetup, User } from '../types';
import { mockUsers } from '../data/mockData';

const MeetupDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { meetups, attendMeetup, leaveMeetup, deleteMeetup } = useMeetups();
  const { user, isAuthenticated } = useAuth();
  const [meetup, setMeetup] = useState<Meetup | null>(null);
  const [host, setHost] = useState<User | null>(null);
  const [attendees, setAttendees] = useState<User[]>([]);
  const [isAttending, setIsAttending] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  useEffect(() => {
    if (id && meetups.length > 0) {
      const foundMeetup = meetups.find(m => m.id === id);
      if (foundMeetup) {
        setMeetup(foundMeetup);
        
        // Find host
        const meetupHost = mockUsers.find(u => u.id === foundMeetup.hostId);
        if (meetupHost) setHost(meetupHost);
        
        // Find attendees
        const meetupAttendees = mockUsers.filter(u => 
          foundMeetup.attendees.includes(u.id)
        );
        setAttendees(meetupAttendees);
        
        // Check if current user is attending
        if (user && foundMeetup.attendees.includes(user.id)) {
          setIsAttending(true);
        } else {
          setIsAttending(false);
        }
      } else {
        // Meetup not found
        navigate('/meetups');
      }
    }
  }, [id, meetups, user, navigate]);
  
  const handleAttendance = async () => {
    if (!user || !meetup) return;
    
    setIsActionLoading(true);
    try {
      if (isAttending) {
        await leaveMeetup(meetup.id);
        setIsAttending(false);
      } else {
        await attendMeetup(meetup.id);
        setIsAttending(true);
      }
    } catch (error) {
      console.error('Error updating attendance:', error);
    } finally {
      setIsActionLoading(false);
    }
  };
  
  const handleDelete = async () => {
    if (!meetup) return;
    
    setIsActionLoading(true);
    try {
      const success = await deleteMeetup(meetup.id);
      if (success) {
        navigate('/meetups');
      } else {
        // Handle error
        console.error('Failed to delete meetup');
      }
    } catch (error) {
      console.error('Error deleting meetup:', error);
    } finally {
      setIsActionLoading(false);
    }
  };
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getPlatformName = (platform?: 'zoom' | 'google-meet' | 'microsoft-teams') => {
    switch (platform) {
      case 'zoom': return 'Zoom';
      case 'google-meet': return 'Google Meet';
      case 'microsoft-teams': return 'Microsoft Teams';
      default: return 'Online Meeting';
    }
  };
  
  const isUserHost = user && meetup && user.id === meetup.hostId;
  
  // Add to calendar link
  const generateGoogleCalendarLink = () => {
    if (!meetup) return '';
    
    const startDate = new Date(meetup.date);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // Add 2 hours
    
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: meetup.title,
      details: meetup.description,
      location: meetup.location,
      dates: `${startDate.toISOString().replace(/-|:|\.\d+/g, '')}/${endDate.toISOString().replace(/-|:|\.\d+/g, '')}`
    });
    
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };
  
  if (!meetup) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </Layout>
    );
  }
  
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
          
          {/* Header */}
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="w-full md:w-2/3">
              <img 
                src={meetup.image || 'https://images.pexels.com/photos/3987020/pexels-photo-3987020.jpeg?auto=compress&cs=tinysrgb&w=1200'} 
                alt={meetup.title}
                className="w-full h-56 md:h-72 object-cover rounded-lg"
              />
            </div>
            
            <div className="w-full md:w-1/3">
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 h-full flex flex-col">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>{formatDate(meetup.date)}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{formatTime(meetup.date)}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    {meetup.isVirtual ? (
                      <>
                        <Video className="h-5 w-5 mr-2" />
                        <span>{getPlatformName(meetup.platform)} (Virtual)</span>
                      </>
                    ) : (
                      <>
                        <MapPin className="h-5 w-5 mr-2" />
                        <span>{meetup.location}</span>
                      </>
                    )}
                  </div>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Users className="h-5 w-5 mr-2" />
                    <span>
                      {meetup.attendees.length} attendee{meetup.attendees.length !== 1 ? 's' : ''}
                      {meetup.maxAttendees ? ` (${meetup.maxAttendees - meetup.attendees.length} spots left)` : ''}
                    </span>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-col gap-3">
                  {isAuthenticated ? (
                    <>
                      {isUserHost ? (
                        <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 p-3 rounded-md mb-2 flex items-center">
                          <AlertCircle className="h-5 w-5 mr-2" />
                          You're hosting this meetup
                        </div>
                      ) : (
                        <Button
                          variant={isAttending ? 'outline' : 'primary'}
                          fullWidth
                          onClick={handleAttendance}
                          isLoading={isActionLoading}
                        >
                          {isAttending ? 'Cancel RSVP' : 'RSVP to Attend'}
                        </Button>
                      )}
                    </>
                  ) : (
                    <Link to="/login" className="w-full">
                      <Button variant="primary" fullWidth>
                        Log in to RSVP
                      </Button>
                    </Link>
                  )}
                  
                  {meetup.isVirtual && meetup.meetUrl && isAttending && (
                    <a 
                      href={meetup.meetUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button 
                        variant="secondary" 
                        fullWidth
                        leftIcon={<ExternalLink className="h-5 w-5" />}
                      >
                        Join Meeting
                      </Button>
                    </a>
                  )}
                  
                  <a 
                    href={generateGoogleCalendarLink()} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button 
                      variant="outline" 
                      fullWidth
                      leftIcon={<Calendar className="h-5 w-5" />}
                    >
                      Add to Calendar
                    </Button>
                  </a>
                </div>
                
                {isUserHost && (
                  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Host Actions
                    </h3>
                    <div className="flex gap-3">
                      <Link to={`/meetups/${meetup.id}/edit`} className="flex-1">
                        <Button 
                          variant="outline" 
                          fullWidth
                          leftIcon={<Edit className="h-5 w-5" />}
                        >
                          Edit
                        </Button>
                      </Link>
                      
                      <Button 
                        variant="danger" 
                        className="flex-1"
                        leftIcon={<Trash2 className="h-5 w-5" />}
                        onClick={() => setShowDeleteConfirm(true)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {meetup.title}
                </h1>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {meetup.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <div className="prose dark:prose-invert max-w-none">
                  <p className="whitespace-pre-line">{meetup.description}</p>
                </div>
              </div>
              
              {/* Host Information */}
              {host && (
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Hosted by
                  </h2>
                  
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="flex-shrink-0">
                      {host.avatar ? (
                        <img 
                          src={host.avatar} 
                          alt={host.name}
                          className="w-24 h-24 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-teal-500 flex items-center justify-center text-white text-xl font-semibold">
                          {host.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-center md:text-left">
                      <Link to={`/developers/${host.id}`} className="group">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                          {host.name}
                        </h3>
                      </Link>
                      
                      {host.bio && (
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {host.bio.length > 150 ? `${host.bio.substring(0, 150)}...` : host.bio}
                        </p>
                      )}
                      
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {host.skills.slice(0, 5).map((skill, index) => (
                          <Badge key={index} variant="primary" size="sm">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Attendees */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Attendees ({attendees.length})
                </h2>
                
                {attendees.length === 0 ? (
                  <p className="text-gray-600 dark:text-gray-400 text-center py-4">
                    No attendees yet. Be the first to join!
                  </p>
                ) : (
                  <div className="space-y-6">
                    {attendees.map(attendee => (
                      <div key={attendee.id} className="flex items-center">
                        <div className="flex-shrink-0 mr-4">
                          {attendee.avatar ? (
                            <img 
                              src={attendee.avatar} 
                              alt={attendee.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-teal-500 flex items-center justify-center text-white text-sm font-semibold">
                              {attendee.name.split(' ').map(n => n[0]).join('')}
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <Link to={`/developers/${attendee.id}`} className="group">
                            <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">
                              {attendee.name}
                            </h3>
                          </Link>
                          
                          {attendee.id === meetup.hostId && (
                            <Badge variant="accent" size="sm">
                              Host
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Delete Confirmation Modal */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full mx-4">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Delete Meetup
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Are you sure you want to delete this meetup? This action cannot be undone.
                  </p>
                  <div className="flex justify-end gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setShowDeleteConfirm(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="danger"
                      onClick={handleDelete}
                      isLoading={isActionLoading}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MeetupDetailPage;