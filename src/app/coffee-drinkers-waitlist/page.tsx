'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

export default function CoffeeDrinkersWaitlist() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', isError: false });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email) {
      setMessage({ text: 'Please enter your email', isError: true });
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage({ text: 'Please enter a valid email address', isError: true });
      return;
    }

    setIsSubmitting(true);
    setMessage({ text: '', isError: false });

    try {
      const { error } = await supabase
        .from('users_waitlist')
        .insert([
          { 
            name: name || null, 
            email: email,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;
      
      setMessage({ 
        text: 'Thank you for joining our waitlist! We\'ll be in touch soon with updates.', 
        isError: false 
      });
      
      // Reset form
      setEmail('');
      setName('');
      
      // Redirect to home after delay
      setTimeout(() => {
        router.push('/?success=waitlist_joined');
      }, 3000);
      
    } catch (error) {
      console.error('Error:', error);
      setMessage({ 
        text: error instanceof Error ? error.message : 'An error occurred. Please try again.', 
        isError: true 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-lime-100 to-lime-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-lime-900 mb-2">Join Our Coffee Lovers Waitlist</h1>
          <p className="text-lime-800">Be the first to know when we launch in your area!</p>
        </div>
        
        {message.text && (
          <div 
            className={`mb-6 p-4 rounded-md ${message.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-lime-900">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-lime-300 text-lime-900 rounded-md shadow-sm focus:outline-none focus:ring-lime-500 focus:border-lime-500"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-lime-900">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-lime-300 text-lime-900 rounded-md shadow-sm focus:outline-none focus:ring-lime-500 focus:border-lime-500"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isSubmitting ? 'bg-lime-400' : 'bg-lime-600 hover:bg-lime-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500`}
            >
              {isSubmitting ? 'Joining...' : 'Join Waitlist'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-lime-600">
            Are you a cafe owner?{' '}
            <button 
              onClick={() => router.push('/cafe-partners-waitlist')}
              className="font-medium text-lime-800 hover:text-lime-900 underline"
            >
              Join our cafe partners waitlist
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
