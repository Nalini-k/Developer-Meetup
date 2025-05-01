export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  skills: string[];
  interests: string[];
  location?: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
  createdAt: Date;
}

export interface Meetup {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  isVirtual: boolean;
  meetUrl?: string;
  platform?: 'zoom' | 'google-meet' | 'microsoft-teams';
  technologies: string[];
  hostId: string;
  host?: User;
  attendees: string[];
  maxAttendees?: number;
  image?: string;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  read: boolean;
  type: 'event_update' | 'new_meetup' | 'reminder' | 'system';
  relatedMeetupId?: string;
  createdAt: Date;
}

export type ThemeMode = 'light' | 'dark';