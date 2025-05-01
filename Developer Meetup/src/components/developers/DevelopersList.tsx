import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import DeveloperCard from './DeveloperCard';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { User } from '../../types';
import { mockUsers } from '../../data/mockData';
import { technologies } from '../../data/mockData';

const DevelopersList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedInterest, setSelectedInterest] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredDevelopers, setFilteredDevelopers] = useState<User[]>(mockUsers);
  
  // Effect to filter developers based on search and filters
  useEffect(() => {
    let result = [...mockUsers];
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        dev => 
          dev.name.toLowerCase().includes(query) || 
          (dev.bio && dev.bio.toLowerCase().includes(query)) ||
          dev.skills.some(skill => skill.toLowerCase().includes(query)) ||
          dev.interests.some(interest => interest.toLowerCase().includes(query))
      );
    }
    
    // Apply skill filter
    if (selectedSkill) {
      result = result.filter(
        dev => dev.skills.includes(selectedSkill)
      );
    }
    
    // Apply interest filter
    if (selectedInterest) {
      result = result.filter(
        dev => dev.interests.includes(selectedInterest)
      );
    }
    
    setFilteredDevelopers(result);
  }, [searchQuery, selectedSkill, selectedInterest]);
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  // Get unique interests from all developers
  const interests = Array.from(
    new Set(
      mockUsers.flatMap(dev => dev.interests)
    )
  ).sort();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <div className="flex-grow">
          <Input
            placeholder="Search developers by name, skills, or interests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="h-5 w-5" />}
            fullWidth
          />
        </div>
        
        <Button
          variant="outline"
          onClick={toggleFilters}
          leftIcon={<Filter className="h-5 w-5" />}
        >
          Filters
        </Button>
      </div>
      
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
          <Select
            label="Filter by Skill"
            options={[
              { value: '', label: 'All Skills' },
              ...technologies.map(tech => ({ value: tech, label: tech }))
            ]}
            value={selectedSkill}
            onChange={setSelectedSkill}
            fullWidth
          />
          
          <Select
            label="Filter by Interest"
            options={[
              { value: '', label: 'All Interests' },
              ...interests.map(interest => ({ value: interest, label: interest }))
            ]}
            value={selectedInterest}
            onChange={setSelectedInterest}
            fullWidth
          />
        </div>
      )}
      
      {filteredDevelopers.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No developers found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDevelopers.map(developer => (
            <DeveloperCard key={developer.id} developer={developer} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DevelopersList;