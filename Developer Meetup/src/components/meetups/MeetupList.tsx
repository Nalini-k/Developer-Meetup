import React, { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import MeetupCard from './MeetupCard';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { useMeetups } from '../../context/MeetupContext';
import { Meetup } from '../../types';
import { technologies, locations } from '../../data/mockData';

const MeetupList: React.FC = () => {
  const { meetups, isLoading } = useMeetups();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMeetups, setFilteredMeetups] = useState<Meetup[]>([]);
  const [selectedTechnology, setSelectedTechnology] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let result = [...meetups];
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        meetup => 
          meetup.title.toLowerCase().includes(query) || 
          meetup.description.toLowerCase().includes(query) ||
          meetup.technologies.some(tech => tech.toLowerCase().includes(query))
      );
    }
    
    // Apply technology filter
    if (selectedTechnology) {
      result = result.filter(
        meetup => meetup.technologies.includes(selectedTechnology)
      );
    }
    
    // Apply location filter
    if (selectedLocation) {
      result = result.filter(
        meetup => meetup.location.includes(selectedLocation)
      );
    }
    
    // Apply meetup type filter
    if (selectedType === 'virtual') {
      result = result.filter(meetup => meetup.isVirtual);
    } else if (selectedType === 'in-person') {
      result = result.filter(meetup => !meetup.isVirtual);
    }
    
    // Sort by date (newest first)
    result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    setFilteredMeetups(result);
  }, [meetups, searchQuery, selectedTechnology, selectedLocation, selectedType]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <div className="flex-grow">
          <Input
            placeholder="Search meetups by title, description, or technology..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="h-5 w-5" />}
            fullWidth
          />
        </div>
        
        <button
          onClick={toggleFilters}
          className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <Filter className="h-5 w-5 mr-2" />
          <span>Filters</span>
          <SlidersHorizontal className="h-4 w-4 ml-2" />
        </button>
      </div>
      
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <Select
            label="Technology"
            options={[
              { value: '', label: 'All Technologies' },
              ...technologies.map(tech => ({ value: tech, label: tech }))
            ]}
            value={selectedTechnology}
            onChange={setSelectedTechnology}
            fullWidth
          />
          
          <Select
            label="Location"
            options={[
              { value: '', label: 'All Locations' },
              ...locations.map(loc => ({ value: loc, label: loc }))
            ]}
            value={selectedLocation}
            onChange={setSelectedLocation}
            fullWidth
          />
          
          <Select
            label="Meetup Type"
            options={[
              { value: '', label: 'All Types' },
              { value: 'virtual', label: 'Virtual Only' },
              { value: 'in-person', label: 'In-Person Only' }
            ]}
            value={selectedType}
            onChange={setSelectedType}
            fullWidth
          />
        </div>
      )}
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      ) : filteredMeetups.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No meetups found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeetups.map(meetup => (
            <MeetupCard key={meetup.id} meetup={meetup} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MeetupList;