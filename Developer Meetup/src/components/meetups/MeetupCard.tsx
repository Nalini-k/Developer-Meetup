import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, ExternalLink, Video } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Meetup } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useMeetups } from '../../context/MeetupContext';

interface MeetupCardProps {
  meetup: Meetup;
}

const MeetupCard: React.FC<MeetupCardProps> = ({ meetup }) => {
  const { user } = useAuth();
  const { attendMeetup, leaveMeetup } = useMeetups();
  const [isAttending, setIsAttending] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (user && meetup.attendees.includes(user.id)) {
      setIsAttending(true);
    } else {
      setIsAttending(false);
    }
  }, [user, meetup.attendees]);

  const handleAttendance = async () => {
    if (!user) return;
    
    setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isUserHost = user && user.id === meetup.hostId;
  
  return (
    <Card isHoverable className="h-full flex flex-col">
      <div className="relative">
        <img 
          src={meetup.image || 'https://images.pexels.com/photos/3987020/pexels-photo-3987020.jpeg?auto=compress&cs=tinysrgb&w=600'} 
          alt={meetup.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-3 right-3 flex space-x-2">
          {meetup.isVirtual && (
            <Badge variant="primary" icon={<Video className="h-3 w-3" />}>
              Virtual
            </Badge>
          )}
          {isUserHost && (
            <Badge variant="accent">
              You're hosting
            </Badge>
          )}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-3 flex flex-wrap gap-2">
          {meetup.technologies.slice(0, 3).map((tech, index) => (
            <Badge key={index} variant="secondary" size="sm">
              {tech}
            </Badge>
          ))}
          {meetup.technologies.length > 3 && (
            <Badge variant="default" size="sm">
              +{meetup.technologies.length - 3} more
            </Badge>
          )}
        </div>
        
        <Link to={`/meetups/${meetup.id}`} className="block group">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {meetup.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {meetup.description}
        </p>
        
        <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2">
          <Calendar className="h-4 w-4 mr-2" />
          <span className="text-sm">{formatDate(meetup.date)} at {formatTime(meetup.date)}</span>
        </div>
        
        <div className="flex items-center text-gray-500 dark:text-gray-400 mb-3">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="text-sm">{meetup.location}</span>
        </div>
        
        <div className="flex items-center text-gray-500 dark:text-gray-400 mb-5">
          <Users className="h-4 w-4 mr-2" />
          <span className="text-sm">
            {meetup.attendees.length} attendee{meetup.attendees.length !== 1 ? 's' : ''}
            {meetup.maxAttendees ? ` (${meetup.maxAttendees - meetup.attendees.length} spots left)` : ''}
          </span>
        </div>
        
        <div className="mt-auto flex gap-3">
          {user ? (
            <Button
              variant={isAttending ? 'outline' : 'primary'}
              fullWidth
              onClick={handleAttendance}
              isLoading={isLoading}
              disabled={isUserHost} // Host can't leave their own meetup
            >
              {isUserHost ? 'You\'re hosting' : isAttending ? 'Cancel RSVP' : 'RSVP'}
            </Button>
          ) : (
            <Link to="/login" className="w-full">
              <Button variant="primary" fullWidth>
                Log in to RSVP
              </Button>
            </Link>
          )}
          
          <Link to={`/meetups/${meetup.id}`} className="flex-shrink-0">
            <Button 
              variant="outline" 
              leftIcon={<ExternalLink className="h-4 w-4" />}
            >
              Details
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default MeetupCard;