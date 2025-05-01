import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Meetup, User } from '../types';
import { mockMeetups } from '../data/mockData';
import { useAuth } from './AuthContext';

interface MeetupContextType {
  meetups: Meetup[];
  isLoading: boolean;
  createMeetup: (meetupData: Omit<Meetup, 'id' | 'hostId' | 'attendees' | 'createdAt'>) => Promise<boolean>;
  updateMeetup: (id: string, meetupData: Partial<Meetup>) => Promise<boolean>;
  deleteMeetup: (id: string) => Promise<boolean>;
  attendMeetup: (id: string) => Promise<boolean>;
  leaveMeetup: (id: string) => Promise<boolean>;
  getUserMeetups: (userId: string) => Meetup[];
}

const MeetupContext = createContext<MeetupContextType | undefined>(undefined);

export const MeetupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [meetups, setMeetups] = useState<Meetup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // In a real app, this would fetch meetups from an API
    setMeetups(mockMeetups);
    setIsLoading(false);
  }, []);

  const createMeetup = async (
    meetupData: Omit<Meetup, 'id' | 'hostId' | 'attendees' | 'createdAt'>
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      if (!user) return false;
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newMeetup: Meetup = {
        ...meetupData,
        id: `meetup-${Date.now()}`,
        hostId: user.id,
        attendees: [user.id], // Host automatically attends
        createdAt: new Date()
      };
      
      setMeetups(prev => [...prev, newMeetup]);
      return true;
    } catch (error) {
      console.error('Create meetup error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateMeetup = async (id: string, meetupData: Partial<Meetup>): Promise<boolean> => {
    setIsLoading(true);
    try {
      if (!user) return false;
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMeetups(prev => 
        prev.map(meetup => 
          meetup.id === id 
            ? { ...meetup, ...meetupData } 
            : meetup
        )
      );
      return true;
    } catch (error) {
      console.error('Update meetup error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMeetup = async (id: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      if (!user) return false;
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const meetupToDelete = meetups.find(m => m.id === id);
      if (!meetupToDelete || meetupToDelete.hostId !== user.id) {
        return false;
      }
      
      setMeetups(prev => prev.filter(meetup => meetup.id !== id));
      return true;
    } catch (error) {
      console.error('Delete meetup error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const attendMeetup = async (id: string): Promise<boolean> => {
    try {
      if (!user) return false;
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setMeetups(prev => 
        prev.map(meetup => 
          meetup.id === id && !meetup.attendees.includes(user.id)
            ? { ...meetup, attendees: [...meetup.attendees, user.id] } 
            : meetup
        )
      );
      return true;
    } catch (error) {
      console.error('Attend meetup error:', error);
      return false;
    }
  };

  const leaveMeetup = async (id: string): Promise<boolean> => {
    try {
      if (!user) return false;
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setMeetups(prev => 
        prev.map(meetup => 
          meetup.id === id && meetup.hostId !== user.id
            ? { ...meetup, attendees: meetup.attendees.filter(id => id !== user.id) } 
            : meetup
        )
      );
      return true;
    } catch (error) {
      console.error('Leave meetup error:', error);
      return false;
    }
  };

  const getUserMeetups = (userId: string): Meetup[] => {
    return meetups.filter(meetup => 
      meetup.hostId === userId || meetup.attendees.includes(userId)
    );
  };

  return (
    <MeetupContext.Provider value={{ 
      meetups, 
      isLoading, 
      createMeetup, 
      updateMeetup, 
      deleteMeetup, 
      attendMeetup, 
      leaveMeetup, 
      getUserMeetups 
    }}>
      {children}
    </MeetupContext.Provider>
  );
};

export const useMeetups = (): MeetupContextType => {
  const context = useContext(MeetupContext);
  if (context === undefined) {
    throw new Error('useMeetups must be used within a MeetupProvider');
  }
  return context;
};