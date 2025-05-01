import { User, Meetup, Notification } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Full Stack Developer with 5 years of experience in React, Node, and Python.',
    skills: ['React', 'TypeScript', 'Node.js', 'Python'],
    interests: ['Web Development', 'Machine Learning', 'DevOps'],
    location: 'San Francisco, CA',
    github: 'sarahchen',
    twitter: 'sarahchen',
    linkedin: 'sarahchen',
    website: 'https://sarahchen.dev',
    createdAt: new Date('2023-01-15')
  },
  {
    id: 'user2',
    name: 'Michael Johnson',
    email: 'michael@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Frontend Developer specializing in React and modern JavaScript.',
    skills: ['React', 'JavaScript', 'CSS', 'UI/UX'],
    interests: ['Frontend Development', 'Design Systems', 'Accessibility'],
    location: 'Austin, TX',
    github: 'michaelj',
    twitter: 'michaelj',
    linkedin: 'michaelj',
    createdAt: new Date('2023-02-10')
  },
  {
    id: 'user3',
    name: 'Aisha Patel',
    email: 'aisha@example.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Backend Engineer with focus on scalable systems and databases.',
    skills: ['Java', 'Spring', 'PostgreSQL', 'AWS'],
    interests: ['Distributed Systems', 'Database Design', 'Cloud Architecture'],
    location: 'Seattle, WA',
    github: 'aishap',
    linkedin: 'aishap',
    createdAt: new Date('2023-03-05')
  },
  {
    id: 'user4',
    name: 'David Kim',
    email: 'david@example.com',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'DevOps Engineer passionate about automation and infrastructure as code.',
    skills: ['Kubernetes', 'Docker', 'Terraform', 'CI/CD'],
    interests: ['Cloud Infrastructure', 'Automation', 'Site Reliability'],
    location: 'New York, NY',
    github: 'davidkim',
    linkedin: 'davidkim',
    createdAt: new Date('2023-02-20')
  }
];

// Mock Meetups
export const mockMeetups: Meetup[] = [
  {
    id: 'meetup1',
    title: 'React Advanced Techniques Workshop',
    description: 'Join us for an in-depth workshop on advanced React patterns, performance optimization, and state management strategies. We will cover render props, custom hooks, context API best practices, and more.',
    date: new Date('2025-04-15T18:00:00'),
    location: 'TechHub, San Francisco',
    isVirtual: false,
    technologies: ['React', 'JavaScript', 'Redux'],
    hostId: 'user1',
    attendees: ['user1', 'user2', 'user4'],
    maxAttendees: 30,
    image: 'https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=600',
    createdAt: new Date('2025-03-01')
  },
  {
    id: 'meetup2',
    title: 'Cloud Native Applications with Kubernetes',
    description: 'This meetup will focus on best practices for building and deploying cloud-native applications using Kubernetes. We will demonstrate how to set up a cluster, deploy applications, and implement auto-scaling.',
    date: new Date('2025-04-20T14:00:00'),
    location: 'Online',
    isVirtual: true,
    meetUrl: 'https://zoom.us/j/1234567890',
    platform: 'zoom',
    technologies: ['Kubernetes', 'Docker', 'Cloud', 'DevOps'],
    hostId: 'user4',
    attendees: ['user1', 'user3', 'user4'],
    maxAttendees: 50,
    image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=600',
    createdAt: new Date('2025-03-05')
  },
  {
    id: 'meetup3',
    title: 'Frontend Performance Optimization',
    description: 'Learn practical techniques to improve the performance of your web applications. We will cover bundle optimization, lazy loading, caching strategies, and tools for measuring performance metrics.',
    date: new Date('2025-04-25T17:30:00'),
    location: 'Dev Studio, Austin',
    isVirtual: false,
    technologies: ['JavaScript', 'Web Performance', 'Webpack'],
    hostId: 'user2',
    attendees: ['user2', 'user1'],
    maxAttendees: 25,
    image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600',
    createdAt: new Date('2025-03-10')
  },
  {
    id: 'meetup4',
    title: 'Database Design for Scalable Applications',
    description: 'This session will cover database design principles for building applications that can scale to millions of users. Topics include indexing strategies, sharding, replication, and choosing the right database for your use case.',
    date: new Date('2025-04-28T19:00:00'),
    location: 'Online',
    isVirtual: true,
    meetUrl: 'https://teams.microsoft.com/l/meetup-join/123456',
    platform: 'microsoft-teams',
    technologies: ['Databases', 'PostgreSQL', 'MongoDB', 'Scaling'],
    hostId: 'user3',
    attendees: ['user3', 'user4'],
    maxAttendees: 40,
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600',
    createdAt: new Date('2025-03-15')
  },
  {
    id: 'meetup5',
    title: 'Machine Learning for Developers',
    description: 'An introductory workshop on machine learning concepts for software developers. Learn how to integrate ML models into your applications and understand the fundamentals of data processing for ML.',
    date: new Date('2025-05-05T18:30:00'),
    location: 'AI Hub, Seattle',
    isVirtual: false,
    technologies: ['Machine Learning', 'Python', 'TensorFlow'],
    hostId: 'user1',
    attendees: ['user1', 'user3'],
    maxAttendees: 35,
    image: 'https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=600',
    createdAt: new Date('2025-03-20')
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif1',
    userId: 'user1',
    message: 'Your "React Advanced Techniques Workshop" meetup has 3 new attendees!',
    read: false,
    type: 'event_update',
    relatedMeetupId: 'meetup1',
    createdAt: new Date('2025-03-25')
  },
  {
    id: 'notif2',
    userId: 'user1',
    message: 'New meetup "Cloud Native Applications with Kubernetes" might interest you based on your skills',
    read: true,
    type: 'new_meetup',
    relatedMeetupId: 'meetup2',
    createdAt: new Date('2025-03-06')
  },
  {
    id: 'notif3',
    userId: 'user2',
    message: 'Reminder: Your "Frontend Performance Optimization" meetup is in 2 days',
    read: false,
    type: 'reminder',
    relatedMeetupId: 'meetup3',
    createdAt: new Date('2025-04-23')
  },
  {
    id: 'notif4',
    userId: 'user3',
    message: 'You have a new attendee for "Database Design for Scalable Applications"',
    read: false,
    type: 'event_update',
    relatedMeetupId: 'meetup4',
    createdAt: new Date('2025-04-20')
  },
  {
    id: 'notif5',
    userId: 'user2',
    message: 'Welcome to DevMeetup! Complete your profile to get personalized meetup suggestions',
    read: true,
    type: 'system',
    createdAt: new Date('2025-02-10')
  }
];

// Technology options for filtering and selecting
export const technologies = [
  'JavaScript', 'TypeScript', 'React', 'Vue', 'Angular', 'Svelte',
  'Node.js', 'Python', 'Django', 'Flask', 'Java', 'Spring',
  'C#', '.NET', 'Ruby', 'Ruby on Rails', 'PHP', 'Laravel',
  'Go', 'Rust', 'Swift', 'Kotlin', 'AWS', 'Azure',
  'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'DevOps', 
  'Machine Learning', 'Artificial Intelligence', 'Data Science',
  'Blockchain', 'Web3', 'Security', 'Testing', 'GraphQL',
  'REST API', 'Microservices', 'Databases', 'PostgreSQL', 
  'MongoDB', 'Redis', 'Elasticsearch', 'RabbitMQ', 'Kafka'
];

// Locations for filtering meetups
export const locations = [
  'San Francisco, CA', 'Austin, TX', 'Seattle, WA', 'New York, NY',
  'Chicago, IL', 'Boston, MA', 'Los Angeles, CA', 'Denver, CO',
  'Atlanta, GA', 'Portland, OR', 'Washington, DC', 'Toronto, ON',
  'London, UK', 'Berlin, DE', 'Paris, FR', 'Amsterdam, NL',
  'Dublin, IE', 'Sydney, AU', 'Tokyo, JP', 'Singapore, SG',
  'Remote', 'Online'
];