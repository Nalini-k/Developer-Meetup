import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Github, Twitter, Linkedin, Globe } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { User } from '../../types';

interface DeveloperCardProps {
  developer: User;
}

const DeveloperCard: React.FC<DeveloperCardProps> = ({ developer }) => {
  return (
    <Card isHoverable className="h-full flex flex-col">
      <div className="flex flex-col items-center mb-4">
        {developer.avatar ? (
          <img 
            src={developer.avatar} 
            alt={developer.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-md"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-teal-500 flex items-center justify-center text-white text-xl font-semibold shadow-md">
            {developer.name.split(' ').map(n => n[0]).join('')}
          </div>
        )}
        
        <Link to={`/developers/${developer.id}`} className="block mt-4 group">
          <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {developer.name}
          </h3>
        </Link>
        
        {developer.location && (
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mt-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{developer.location}</span>
          </div>
        )}
      </div>
      
      {developer.bio && (
        <p className="text-gray-600 dark:text-gray-300 text-sm text-center mb-4 line-clamp-3">
          {developer.bio}
        </p>
      )}
      
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Skills
        </h4>
        <div className="flex flex-wrap gap-2 justify-center">
          {developer.skills.slice(0, 5).map((skill, index) => (
            <Badge key={index} variant="primary" size="sm">
              {skill}
            </Badge>
          ))}
          {developer.skills.length > 5 && (
            <Badge variant="default" size="sm">
              +{developer.skills.length - 5} more
            </Badge>
          )}
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Interests
        </h4>
        <div className="flex flex-wrap gap-2 justify-center">
          {developer.interests.slice(0, 3).map((interest, index) => (
            <Badge key={index} variant="accent" size="sm">
              {interest}
            </Badge>
          ))}
          {developer.interests.length > 3 && (
            <Badge variant="default" size="sm">
              +{developer.interests.length - 3} more
            </Badge>
          )}
        </div>
      </div>
      
      <div className="flex space-x-3 justify-center mb-4 mt-auto">
        {developer.github && (
          <a 
            href={`https://github.com/${developer.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <Github className="h-5 w-5" />
          </a>
        )}
        
        {developer.twitter && (
          <a 
            href={`https://twitter.com/${developer.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
          >
            <Twitter className="h-5 w-5" />
          </a>
        )}
        
        {developer.linkedin && (
          <a 
            href={`https://linkedin.com/in/${developer.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-600"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        )}
        
        {developer.website && (
          <a 
            href={developer.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400"
          >
            <Globe className="h-5 w-5" />
          </a>
        )}
      </div>
      
      <Link to={`/developers/${developer.id}`} className="block w-full">
        <Button variant="outline" fullWidth>
          View Profile
        </Button>
      </Link>
    </Card>
  );
};

export default DeveloperCard;