'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';
import Footer from '@/components/Footer';

export default function CoffeeDrinkersWaitlist() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', isError: false });
  const router = useRouter();



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


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
      
      setEmail('');
      setName('');
      
      setTimeout(() => {
        router.push('/?success=waitlist_joined');
      }, 3000);
      
    } catch (error: unknown) {
      console.error('Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An error occurred. Please try again.';
      setMessage({ 
        text: errorMessage,
        isError: true 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="bg-gradient-to-b from-lime-50 to-lime-100">
   <div>
          {/* Hero Section */}
          <div className="max-w-6xl mx-auto px-4 py-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-lime-900 mb-4">Welcome to CafePass</h1>
            <p className="text-xl text-lime-800 max-w-3xl mx-auto mb-12">
              Your passport to Toronto&apos;s best independent coffee shops. Discover hidden gems, earn rewards, and support local businesses with every cup.
            </p>
            
            {/* Sign-up Stats */}
            {/* <div className="mt-8">
              <div className="flex justify-center gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-lime-900">
                    {loadingCounts ? (
                      <div className="h-8 w-16 bg-lime-100 rounded animate-pulse"></div>
                    ) : (
                      <span>{userCount || 0}</span>
                    )}
                  </div>
                  <p className="text-lime-700">Coffee Lovers</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-lime-900">
                    {loadingCounts ? (
                      <div className="h-8 w-16 bg-lime-100 rounded animate-pulse"></div>
                    ) : (
                      <span>{cafeCount || 0}</span>
                    )}
                  </div>
                  <p className="text-lime-700">Cafés</p>
                </div>
              </div>
            </div> */}
          </div>
           {/* Waitlist Form Section */}
      <div className="py-16 ">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-lime-900 mb-2">Join Our Waitlist</h2>
            <p className="text-lime-800">Be the first to know when we launch in your neighborhood!</p>
          </div>
      
          {message.text && (
            <div className={`mb-6 p-4 rounded-md ${message.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-lime-300 text-lime-900 rounded-md shadow-sm focus:outline-none focus:ring-lime-500 focus:border-lime-500"
                placeholder="Your name (optional)"
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
                onClick={() => router.push('/cafe-partners')}
                className="font-medium text-lime-800 hover:text-lime-900 underline"
              >
                Join our cafe partners waitlist
              </button>
            </p>
          </div>
        </div>
      </div>
   </div>
          

          {/* Benefits Section */}
          <div className="bg-white py-16">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-lime-900 mb-12">Why Coffee Lovers Choose Us</h2>
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="bg-lime-50 p-6 rounded-xl">
                  <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-6 h-6 text-lime-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-lime-900 text-center mb-2">Exclusive Access</h3>
                  <p className="text-lime-700 text-center">Get early access to our app and be among the first to explore Toronto&apos;s best coffee spots.</p>
                </div>
                <div className="bg-lime-50 p-6 rounded-xl">
                  <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-6 h-6 text-lime-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-lime-900 text-center mb-2">Earn Rewards</h3>
                  <p className="text-lime-700 text-center">Collect points with every purchase and enjoy free drinks at your favorite local cafes.</p>
                </div>
                <div className="bg-lime-50 p-6 rounded-xl">
                  <div className="w-12 h-12 bg-lime-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-6 h-6 text-lime-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-lime-900 text-center mb-2">Support Local</h3>
                  <p className="text-lime-700 text-center">Your membership helps sustain independent coffee shops in the Toronto area.</p>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="py-16 bg-lime-50">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-lime-900 mb-12">How It Works</h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-lime-700">1</span>
                  </div>
                  <h3 className="text-xl font-semibold text-lime-900 mb-2">Sign Up</h3>
                  <p className="text-lime-700">Join our waitlist to get early access to the CafePass app.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-lime-700">2</span>
                  </div>
                  <h3 className="text-xl font-semibold text-lime-900 mb-2">Download & Explore</h3>
                  <p className="text-lime-700">Get the app and discover amazing local coffee shops near you.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-lime-700">3</span>
                  </div>
                  <h3 className="text-xl font-semibold text-lime-900 mb-2">Earn & Enjoy</h3>
                  <p className="text-lime-700">Collect points with every purchase and redeem free drinks.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

     

      <Footer />
    </div>
  );
}
