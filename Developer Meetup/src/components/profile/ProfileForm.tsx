import React, { useState, useEffect } from 'react';
import { User, Mail, MapPin, Link as LinkIcon, Github, Twitter, Linkedin, Globe, Save } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { useAuth } from '../../context/AuthContext';

const ProfileForm: React.FC = () => {
  const { user, updateProfile, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  
  // Form fields
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [github, setGithub] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [website, setWebsite] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [interestInput, setInterestInput] = useState('');
  
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setBio(user.bio || '');
      setLocation(user.location || '');
      setGithub(user.github || '');
      setTwitter(user.twitter || '');
      setLinkedin(user.linkedin || '');
      setWebsite(user.website || '');
      setSkills(user.skills || []);
      setInterests(user.interests || []);
    }
  }, [user]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await updateProfile({
        name,
        bio,
        location,
        github,
        twitter,
        linkedin,
        website,
        skills,
        interests
      });
      
      if (success) {
        setSuccessMessage('Profile updated successfully');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError('Failed to update profile');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };
  
  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };
  
  const addInterest = () => {
    if (interestInput.trim() && !interests.includes(interestInput.trim())) {
      setInterests([...interests, interestInput.trim()]);
      setInterestInput('');
    }
  };
  
  const removeInterest = (interest: string) => {
    setInterests(interests.filter(i => i !== interest));
  };
  
  if (authLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      
      {successMessage && (
        <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-3 rounded-md text-sm">
          {successMessage}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Input
            id="name"
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            leftIcon={<User className="h-5 w-5" />}
          />
        </div>
        
        <div>
          <Input
            id="email"
            label="Email"
            value={user?.email || ''}
            fullWidth
            disabled
            leftIcon={<Mail className="h-5 w-5" />}
            helperText="Email cannot be changed"
          />
        </div>
      </div>
      
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
          Bio
        </label>
        <div className="relative">
          <textarea
            id="bio"
            rows={4}
            placeholder="Tell us about yourself, your expertise, and what you're looking to learn..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
      </div>
      
      <div>
        <Input
          id="location"
          label="Location"
          placeholder="City, Country"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
          leftIcon={<MapPin className="h-5 w-5" />}
        />
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-4">
          Social Profiles
        </h3>
        
        <div className="space-y-4">
          <Input
            id="github"
            label="GitHub Username"
            placeholder="yourusername"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            fullWidth
            leftIcon={<Github className="h-5 w-5" />}
          />
          
          <Input
            id="twitter"
            label="Twitter Username"
            placeholder="yourusername"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            fullWidth
            leftIcon={<Twitter className="h-5 w-5" />}
          />
          
          <Input
            id="linkedin"
            label="LinkedIn Username"
            placeholder="yourusername"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            fullWidth
            leftIcon={<Linkedin className="h-5 w-5" />}
          />
          
          <Input
            id="website"
            label="Personal Website"
            placeholder="https://yourwebsite.com"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            fullWidth
            leftIcon={<Globe className="h-5 w-5" />}
          />
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
          Skills
        </h3>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {skills.map(skill => (
            <Badge 
              key={skill} 
              variant="primary"
              isDismissable
              onDismiss={() => removeSkill(skill)}
            >
              {skill}
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-2">
          <div className="flex-grow">
            <Input
              id="skill-input"
              placeholder="Add a skill (e.g., React, Python, AWS)"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              fullWidth
            />
          </div>
          
          <Button
            type="button"
            variant="secondary"
            onClick={addSkill}
            disabled={!skillInput.trim()}
          >
            Add
          </Button>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
          Interests
        </h3>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {interests.map(interest => (
            <Badge 
              key={interest} 
              variant="accent"
              isDismissable
              onDismiss={() => removeInterest(interest)}
            >
              {interest}
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-2">
          <div className="flex-grow">
            <Input
              id="interest-input"
              placeholder="Add an interest (e.g., Web Development, Machine Learning)"
              value={interestInput}
              onChange={(e) => setInterestInput(e.target.value)}
              fullWidth
            />
          </div>
          
          <Button
            type="button"
            variant="accent"
            onClick={addInterest}
            disabled={!interestInput.trim()}
          >
            Add
          </Button>
        </div>
      </div>
      
      <div className="pt-4 flex justify-end">
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          leftIcon={<Save className="h-5 w-5" />}
        >
          Save Profile
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;