import React, { useState } from 'react';
import { Search, HelpCircle, MessageSquare, FileQuestion, Send, Mail, Phone, MapPin, Clock } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Card, { CardTitle, CardContent } from '../components/ui/Card';

const SupportPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<{ 
    text: string; 
    isUser: boolean;
    timestamp: Date; 
  }[]>([
    {
      text: 'Hi there! How can I help you today?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  
  // Handle chat submission
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!chatMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      text: chatMessage,
      isUser: true,
      timestamp: new Date()
    };
    
    setChatMessages(prev => [...prev, userMessage]);
    setChatMessage('');
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse = {
        text: 'Thanks for your message! Our support team will get back to you soon. In the meantime, you might find helpful information in our FAQs below.',
        isUser: false,
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);
  };
  
  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // FAQ data
  const faqs = [
    {
      id: 1,
      question: 'How do I create a meetup?',
      answer: 'To create a meetup, log in to your account, click on the "Host a Meetup" button in the navigation bar, and fill out the meetup details form. You can choose between in-person or virtual meetups, set a date and time, and add technologies relevant to your event.'
    },
    {
      id: 2,
      question: 'Can I join a virtual meetup without creating an account?',
      answer: 'No, you need to create an account and RSVP to attend virtual meetups. This helps organizers manage attendees and ensures you receive updates about the event.'
    },
    {
      id: 3,
      question: 'How do I update my profile information?',
      answer: 'To update your profile, click on your avatar in the top-right corner, select "My Profile" from the dropdown menu, and then edit your details on the profile page. Don\'t forget to save your changes when you\'re done.'
    },
    {
      id: 4,
      question: 'Is there a limit to how many meetups I can attend?',
      answer: 'No, there\'s no limit to how many meetups you can attend. You can RSVP to as many events as you\'d like, but we encourage you to only attend those you genuinely plan to participate in.'
    },
    {
      id: 5,
      question: 'How can I integrate meetups with my calendar?',
      answer: 'When viewing a meetup page, click the "Add to Calendar" button. This will generate a link to add the event to your Google Calendar. We also plan to add support for other calendar platforms in the future.'
    },
    {
      id: 6,
      question: 'What video conferencing platforms are supported for virtual meetups?',
      answer: 'Currently, we support Zoom, Google Meet, and Microsoft Teams for virtual meetups. When creating a virtual meetup, you can select your preferred platform and provide the meeting URL.'
    }
  ];
  
  // Filter FAQs based on search query
  const filteredFaqs = searchQuery
    ? faqs.filter(
        faq => 
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-purple-600 text-white py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <HelpCircle className="h-16 w-16 mx-auto mb-6 text-purple-200" />
            <h1 className="text-4xl font-bold mb-6">
              How Can We Help You?
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              Get answers to your questions and connect with our support team.
            </p>
            <div className="relative max-w-xl mx-auto">
              <Input
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="h-5 w-5" />}
                className="bg-white/10 border-white/20 text-white placeholder:text-purple-200"
                fullWidth
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Support Options */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Chat Support */}
            <Card>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center mr-3">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <CardTitle>Chat Support</CardTitle>
              </div>
              
              <CardContent>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg h-80 overflow-y-auto mb-4 p-4">
                  {chatMessages.map((message, index) => (
                    <div 
                      key={index}
                      className={`mb-3 ${message.isUser ? 'text-right' : 'text-left'}`}
                    >
                      <div 
                        className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                          message.isUser 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                        }`}
                      >
                        {message.text}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <form onSubmit={handleChatSubmit} className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    fullWidth
                  />
                  <Button 
                    type="submit"
                    variant="primary"
                    disabled={!chatMessage.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            {/* Contact Info */}
            <Card>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full flex items-center justify-center mr-3">
                  <FileQuestion className="h-5 w-5" />
                </div>
                <CardTitle>Contact Information</CardTitle>
              </div>
              
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                      Get in Touch
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Email Support</p>
                          <a href="mailto:support@devmeetup.com" className="text-purple-600 dark:text-purple-400 hover:underline">
                            support@devmeetup.com
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Phone Support</p>
                          <a href="tel:+1-800-123-4567" className="text-purple-600 dark:text-purple-400 hover:underline">
                            +1 (800) 123-4567
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Headquarters</p>
                          <address className="not-italic text-gray-700 dark:text-gray-300">
                            123 Developer Way<br />
                            San Francisco, CA 94105<br />
                            United States
                          </address>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Support Hours</p>
                          <div className="text-gray-700 dark:text-gray-300">
                            <p>Monday - Friday: 9:00 AM - 8:00 PM ET</p>
                            <p>Saturday: 10:00 AM - 6:00 PM ET</p>
                            <p>Sunday: 12:00 PM - 5:00 PM ET</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Priority Support
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      For urgent technical issues or business inquiries, contact our priority support line:
                    </p>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Priority Line</p>
                        <a href="tel:+1-888-999-8888" className="text-purple-600 dark:text-purple-400 hover:underline">
                          +1 (888) 999-8888
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Response Time
                    </h3>
                    <ul className="text-gray-600 dark:text-gray-400 space-y-2">
                      <li>• Email Support: Within 24 hours</li>
                      <li>• Chat Support: Real-time during business hours</li>
                      <li>• Priority Support: Within 2 hours</li>
                      <li>• Social Media: Within 4 hours</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* FAQs Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <FileQuestion className="h-12 w-12 mx-auto mb-3 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                No results found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We couldn't find any FAQs matching your search. Try different keywords or ask us directly.
              </p>
            </div>
          ) : (
            <div className="space-y-6 max-w-4xl mx-auto">
              {filteredFaqs.map(faq => (
                <div key={faq.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                  <details className="group">
                    <summary className="flex justify-between items-center cursor-pointer p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {faq.question}
                      </h3>
                      <span className="ml-6 flex-shrink-0 text-gray-500 dark:text-gray-400 group-open:rotate-180 transition-transform">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 pt-2 text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </div>
                  </details>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Still Need Help?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Our support team is here to help you with any questions or issues you might have.
            </p>
            <Button size="lg" as="a" href="mailto:support@devmeetup.com">
              Contact Support
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SupportPage;