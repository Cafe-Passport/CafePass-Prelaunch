"use client";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import {
  UserGroupIcon,
  QrCodeIcon,
  MapPinIcon,
  TicketIcon,
  ChartBarIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { FadeInUp, Counter, TextReveal } from "@/components/Animations";

export default function Home() {
  // State variables for sign-up counts
  const [cafeCount, setCafeCount] = useState<number | null>(null);
  const [userCount, setUserCount] = useState<number | null>(null);
  const [loadingCounts, setLoadingCounts] = useState(true);
  
  // Function to fetch sign-up counts from Supabase
  const fetchCounts = async () => {
    setLoadingCounts(true);
    try {
      // Fetch cafe count
      const { count: cafes, error: cafeError } = await supabase
        .from("partners_waitlist")
        .select('*', { count: 'exact', head: true });

      if (cafeError) {
        console.error("Error fetching cafe count:", cafeError);
      } else {
        setCafeCount(cafes);
      }

      // Fetch user count
      const { count: users, error: userError } = await supabase
        .from("users_waitlist")
        .select('*', { count: 'exact', head: true });

      if (userError) {
        console.error("Error fetching user count:", userError);
      } else {
        setUserCount(users);
      }
    } catch (err) {
      console.error("Unexpected error fetching counts:", err);
    } finally {
      setLoadingCounts(false);
    }
  };

  // Fetch counts on component mount
  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <div className="bg-gradient-to-b from-lime-50 to-lime-100 min-h-screen w-full flex flex-col items-center font-sans">
      {/* Hero Section */}
      <FadeInUp className="w-full max-w-4xl text-center pt-16 pb-12 px-4">
        <div className="relative w-64  h-16 mx-auto mb-8">
          <Image 
            src="/logo.svg" 
            alt="CafePass Logo" 
            fill
            className="object-contain"
            priority
          />
        </div>
        <TextReveal 
          as="h1" 
          className="text-4xl sm:text-6xl font-extrabold text-lime-500 mb-6"
          from={{ opacity: 0, y: 30 }}
          to={{ opacity: 1, y: 0 }}
          delay={0.2}
          duration={1}
        >
          Discover & Support Local Cafés
        </TextReveal>
        <p className="text-xl sm:text-2xl text-lime-500 mb-10 max-w-3xl mx-auto">
          Join our community of coffee lovers and independent cafés in Toronto
        </p>
        
        {/* Waitlist Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">
          {/* Coffee Lovers Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
            <div className="p-8">
              <div className="bg-lime-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <UserGroupIcon className="w-8 h-8 text-lime-700" />
              </div>
              <h2 className="text-2xl font-bold text-lime-900 mb-4">Coffee Lovers</h2>
              <p className="text-lime-800 mb-6">
                Be the first to know when we launch. Get exclusive early access and special offers.
              </p>
              <div className="mb-6">
                {loadingCounts ? (
                  <div className="h-8 bg-lime-100 rounded animate-pulse"></div>
                ) : (
                  <p className="text-lime-700 font-medium">
                    {userCount !== null ? (
                      <>
                        <Counter value={userCount} className="font-bold" />+ people already joined
                      </>
                    ) : 'Join the movement'}
                  </p>
                )}
              </div>
              <Link 
                href="/coffee-fans"
                className="block w-full bg-lime-600 hover:bg-lime-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center"
              >
                Join Waitlist
              </Link>
            </div>
          </div>

          {/* Cafe Partners Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
            <div className="p-8">
              <div className="bg-lime-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <QrCodeIcon className="w-8 h-8 text-lime-700" />
              </div>
              <h2 className="text-2xl font-bold text-lime-900 mb-4">Café Owners</h2>
              <p className="text-lime-800 mb-6">
                Join our network of premium coffee shops and reach more customers in Toronto.
              </p>
              <div className="mb-6">
                {loadingCounts ? (
                  <div className="h-8 bg-lime-100 rounded animate-pulse"></div>
                ) : (
                  <p className="text-lime-700 font-medium">
                    {cafeCount !== null ? (
                      <>
                        <Counter value={cafeCount} className="font-bold" />+ cafés already joined
                      </>
                    ) : 'Partner with us'}
                  </p>
                )}
              </div>
              <Link 
                href="/cafe-partners"
                className="block w-full bg-lime-600 hover:bg-lime-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center"
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      </FadeInUp>

      {/* Progress bar / counter */}
      <div className="flex items-center justify-center gap-2 mt-8 text-lime-900">
        <SparklesIcon className="w-5 h-5 text-lime-600" />
        <span className="font-semibold">
          {loadingCounts ? "Loading sign-ups..." : (
            <>
              {cafeCount !== null && userCount !== null ? (
                <>
                  <span className="text-amber-700">{cafeCount}</span> cafes and <span className="text-amber-700">{userCount}</span> coffee drinkers have joined us!
                </>
              ) : (
                "Join our growing community today!"
              )}
            </>
          )}
        </span>
      </div>

      {/* How It Works Section */}
      <FadeInUp className="w-full max-w-4xl px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-lime-900 mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-lime-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserGroupIcon className="w-8 h-8 text-lime-700" />
            </div>
            <h3 className="text-xl font-semibold text-lime-900 mb-2">1. Sign Up</h3>
            <p className="text-lime-800">Join as a coffee lover or café owner</p>
          </div>
          <div className="text-center">
            <div className="bg-lime-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <QrCodeIcon className="w-8 h-8 text-lime-700" />
            </div>
            <h3 className="text-xl font-semibold text-lime-900 mb-2">2. Connect</h3>
            <p className="text-lime-800">Discover local cafés or reach new customers</p>
          </div>
          <div className="text-center">
            <div className="bg-lime-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <SparklesIcon className="w-8 h-8 text-lime-700" />
            </div>
            <h3 className="text-xl font-semibold text-lime-900 mb-2">3. Enjoy</h3>
            <p className="text-lime-800">Experience the best coffee Toronto has to offer</p>
          </div>
        </div>
      </FadeInUp>

      {/* Why Join */}
      <FadeInUp className="w-full max-w-4xl px-4 py-12" from={{ opacity: 0, y: 30, delay: 0.1 }}>
        <h2 className="text-3xl font-bold text-center text-lime-900 mb-12">Why Join CafePass?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="bg-lime-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
              <TicketIcon className="w-6 h-6 text-lime-700" />
            </div>
            <h3 className="text-lg font-semibold text-lime-900 text-center mb-2">Early Access</h3>
            <p className="text-lime-800 text-center">Get exclusive early access to our newest features</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="bg-lime-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
              <TicketIcon className="w-6 h-6 text-lime-700" />
            </div>
            <h3 className="text-lg font-semibold text-lime-900 text-center mb-2">Free Promotion</h3>
            <p className="text-lime-800 text-center">Get featured to our growing community of Toronto coffee enthusiasts</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="bg-lime-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
              <MapPinIcon className="w-6 h-6 text-lime-700" />
            </div>
            <h3 className="text-lg font-semibold text-lime-900 text-center mb-2">Curated Map</h3>
            <p className="text-lime-800 text-center">Be discovered on our interactive map of the best cafés in Toronto</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="bg-lime-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
              <ChartBarIcon className="w-6 h-6 text-lime-700" />
            </div>
            <h3 className="text-lg font-semibold text-lime-900 text-center mb-2">Digital Loyalty</h3>
            <p className="text-lime-800 text-center">Modern, paperless loyalty system for your customers</p>
          </div>
        </div>
      </FadeInUp>

      {/* Testimonials */}
      <FadeInUp className="w-full max-w-3xl px-4 py-12" from={{ opacity: 0, y: 30, delay: 0.2 }}>
        <h2 className="text-3xl font-bold text-center text-lime-900 mb-12">What People Are Saying</h2>
        <div className="bg-white p-8 rounded-xl shadow-md"> 
          <blockquote className="text-center">
            <p className="text-xl italic text-lime-800 mb-4">&quot;CafePass has helped us connect with so many new customers who are passionate about great coffee. The digital loyalty system is a game-changer!&quot;</p>
            <footer className="font-semibold text-lime-900">— Sarah M., Café Owner</footer>
          </blockquote>
        </div>
      </FadeInUp>

      {/* CTA Section */}
      <FadeInUp className="w-full bg-lime-50 py-16 mt-8" from={{ opacity: 0, y: 30, delay: 0.3 }}>
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-lime-900 mb-6">Ready to Join the Movement?</h2>
          <p className="text-xl text-lime-800 mb-8">Be part of Toronto&apos;s premier coffee community</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/coffee-fans"
              className="bg-lime-600 hover:bg-lime-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors text-center"
            >
              Join as a Coffee Lover
            </Link>
            <Link 
              href="/cafe-partners"
              className="bg-white hover:bg-gray-50 text-lime-700 font-semibold py-3 px-8 rounded-lg border-2 border-lime-600 transition-colors text-center"
            >
              Join as a Café
            </Link>
          </div>
        </div>
      </FadeInUp>

      {/* Footer */}
      <Footer />
    </div>
  );
}
