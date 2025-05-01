import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, FileText, Tag, Video, X } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Select from '../ui/Select';
import Badge from '../ui/Badge';
import { useMeetups } from '../../context/MeetupContext';
import { technologies, locations } from '../../data/mockData';

const CreateMeetupForm: React.FC = () => {
  const navigate = useNavigate();
  const { createMeetup } = useMeetups();
  const [isLoading, setIsLoading] = useState(false);
  const [isVirtual, setIsVirtual] = useState(false);
  const [formError, setFormError] = useState('');
  
  // Form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [customLocation, setCustomLocation] = useState('');
  const [meetUrl, setMeetUrl] = useState('');
  const [platform, setPlatform] = useState<'zoom' | 'google-meet' | 'microsoft-teams'>('zoom');
  const [maxAttendees, setMaxAttendees] = useState('');
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [techInput, setTechInput] = useState('');
  
  const handleTechAdd = () => {
    if (techInput && !selectedTechs.includes(techInput)) {
      setSelectedTechs([...selectedTechs, techInput]);
      setTechInput('');
    }
  };
  
  const handleTechRemove = (tech: string) => {
    setSelectedTechs(selectedTechs.filter(t => t !== tech));
  };
  
  const handleTechSelect = (tech: string) => {
    if (!selectedTechs.includes(tech)) {
      setSelectedTechs([...selectedTechs, tech]);
    }
    setTechInput('');
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    // Form validation
    if (!title || !description || !date || !time) {
      setFormError('Please fill in all required fields');
      return;
    }
    
    if (selectedTechs.length === 0) {
      setFormError('Please add at least one technology');
      return;
    }
    
    if (isVirtual && !meetUrl) {
      setFormError('Please enter a meeting URL for virtual meetups');
      return;
    }
    
    if (!isVirtual && !location && !customLocation) {
      setFormError('Please enter a location for in-person meetups');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Format date and time
      const meetupDate = new Date(`${date}T${time}`);
      
      // Determine final location
      const finalLocation = isVirtual
        ? 'Online'
        : location || customLocation;
      
      const success = await createMeetup({
        title,
        description,
        date: meetupDate,
        location: finalLocation,
        isVirtual,
        meetUrl: isVirtual ? meetUrl : undefined,
        platform: isVirtual ? platform : undefined,
        technologies: selectedTechs,
        maxAttendees: maxAttendees ? parseInt(maxAttendees, 10) : undefined
      });
      
      if (success) {
        navigate('/meetups');
      } else {
        setFormError('Failed to create meetup. Please try again.');
      }
    } catch (error) {
      console.error('Error creating meetup:', error);
      setFormError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {formError && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-3 rounded-md text-sm">
          {formError}
        </div>
      )}
      
      <div>
        <Input
          id="title"
          label="Meetup Title"
          placeholder="E.g., React Advanced Patterns Workshop"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
          leftIcon={<FileText className="h-5 w-5" />}
        />
      </div>
      
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
          Description
        </label>
        <div className="relative">
          <textarea
            id="description"
            rows={4}
            placeholder="Describe what your meetup is about, what attendees can expect to learn, and any prerequisites..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Input
            id="date"
            type="date"
            label="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            required
            leftIcon={<Calendar className="h-5 w-5" />}
            min={new Date().toISOString().split('T')[0]} // Min date is today
          />
        </div>
        
        <div>
          <Input
            id="time"
            type="time"
            label="Time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            fullWidth
            required
            leftIcon={<Clock className="h-5 w-5" />}
          />
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              checked={isVirtual}
              onChange={() => setIsVirtual(!isVirtual)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Virtual Meetup</span>
          </label>
        </div>
        
        {isVirtual ? (
          <div className="space-y-4">
            <div>
              <Input
                id="meetUrl"
                label="Meeting URL"
                placeholder="https://zoom.us/j/123456789"
                value={meetUrl}
                onChange={(e) => setMeetUrl(e.target.value)}
                fullWidth
                leftIcon={<Video className="h-5 w-5" />}
                required={isVirtual}
              />
            </div>
            
            <div>
              <Select
                id="platform"
                label="Platform"
                options={[
                  { value: 'zoom', label: 'Zoom' },
                  { value: 'google-meet', label: 'Google Meet' },
                  { value: 'microsoft-teams', label: 'Microsoft Teams' }
                ]}
                value={platform}
                onChange={(value) => setPlatform(value as 'zoom' | 'google-meet' | 'microsoft-teams')}
                fullWidth
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <Select
                id="location"
                label="Location"
                options={[
                  { value: '', label: 'Select a location or add custom below' },
                  ...locations.map(loc => ({ value: loc, label: loc }))
                ]}
                value={location}
                onChange={setLocation}
                fullWidth
              />
            </div>
            
            {!location && (
              <div>
                <Input
                  id="custom-location"
                  label="Custom Location"
                  placeholder="Enter address or venue name"
                  value={customLocation}
                  onChange={(e) => setCustomLocation(e.target.value)}
                  fullWidth
                  leftIcon={<MapPin className="h-5 w-5" />}
                  required={!isVirtual && !location}
                />
              </div>
            )}
          </div>
        )}
      </div>
      
      <div>
        <Input
          id="max-attendees"
          type="number"
          label="Maximum Attendees (Optional)"
          placeholder="Leave empty for unlimited"
          value={maxAttendees}
          onChange={(e) => setMaxAttendees(e.target.value)}
          fullWidth
          min="1"
          leftIcon={<Users className="h-5 w-5" />}
        />
      </div>
      
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200">
          Technologies
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {selectedTechs.map(tech => (
            <Badge 
              key={tech} 
              variant="secondary"
              isDismissable
              onDismiss={() => handleTechRemove(tech)}
            >
              {tech}
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-2">
          <div className="flex-grow">
            <div className="relative">
              <input
                list="tech-options"
                id="tech-input"
                placeholder="Add technologies or select from the list"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              <datalist id="tech-options">
                {technologies
                  .filter(tech => !selectedTechs.includes(tech))
                  .map(tech => (
                    <option key={tech} value={tech} />
                  ))}
              </datalist>
              <Tag className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            </div>
          </div>
          
          <Button
            type="button"
            variant="secondary"
            onClick={handleTechAdd}
            disabled={!techInput}
          >
            Add
          </Button>
        </div>
        
        <div className="mt-3 flex flex-wrap gap-2">
          {technologies
            .filter(tech => !selectedTechs.includes(tech) && tech.toLowerCase().includes(techInput.toLowerCase()))
            .slice(0, 10)
            .map(tech => (
              <Badge 
                key={tech} 
                variant="outline"
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => handleTechSelect(tech)}
              >
                {tech}
              </Badge>
            ))}
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/meetups')}
        >
          Cancel
        </Button>
        
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
        >
          Create Meetup
        </Button>
      </div>
    </form>
  );
};

export default CreateMeetupForm;