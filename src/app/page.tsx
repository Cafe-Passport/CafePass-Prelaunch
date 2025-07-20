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
      <section className="w-full max-w-4xl text-center pt-16 pb-12 px-4">
        <div className="relative w-48 h-16 mx-auto mb-8">
          <Image 
            src="/logo.svg" 
            alt="CafePass Logo" 
            fill
            className="object-contain"
            priority
          />
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-lime-500 mb-6">
          Discover & Support Local Cafés
        </h1>
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
                    {userCount !== null ? `${userCount}+ people already joined` : 'Join the movement'}
                  </p>
                )}
              </div>
              <Link 
                href="/coffee-drinkers-waitlist"
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
                    {cafeCount !== null ? `${cafeCount}+ cafés already joined` : 'Partner with us'}
                  </p>
                )}
              </div>
              <Link 
                href="/cafe-partners-waitlist"
                className="block w-full bg-lime-600 hover:bg-lime-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center"
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      </section>

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
      <section className="w-full max-w-4xl px-4 py-16">
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
      </section>

      {/* Why Join */}
      <section className="w-full max-w-4xl px-4 py-12">
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
      </section>

      {/* Testimonials */}
      <section className="w-full max-w-3xl px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-lime-900 mb-12">What People Are Saying</h2>
        <div className="bg-white p-8 rounded-xl shadow-md"> 
          <blockquote className="text-center">
            <p className="text-xl italic text-lime-800 mb-4">&quot;CafePass has helped us connect with so many new customers who are passionate about great coffee. The digital loyalty system is a game-changer!&quot;</p>
            <footer className="font-semibold text-lime-900">— Sarah M., Café Owner</footer>
          </blockquote>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-lime-50 py-16 mt-8">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-lime-900 mb-6">Ready to Join the Movement?</h2>
          <p className="text-xl text-lime-800 mb-8">Be part of Toronto&apos;s premier coffee community</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/coffee-drinkers-waitlist"
              className="bg-lime-600 hover:bg-lime-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors text-center"
            >
              Join as a Coffee Lover
            </Link>
            <Link 
              href="/cafe-partners-waitlist"
              className="bg-white hover:bg-gray-50 text-lime-700 font-semibold py-3 px-8 rounded-lg border-2 border-lime-600 transition-colors text-center"
            >
              Join as a Café
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-lime-800 py-12 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">CafePass</h3>
              <p className="text-lime-200">Discover & Support Local Cafés</p>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <div className="mb-4 text-lime-200">
                Contact: <a href="mailto:cafepassto@gmail.com" className="text-white hover:underline">cafepassto@gmail.com</a>
              </div>
              <div className="flex gap-6">
                <a 
                  href="https://www.instagram.com/cafepass.ca/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white hover:text-amber-lime-200 transition-colors"
                  aria-label="Instagram"
                >
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.linkedin.com/company/cafe-pass/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white hover:text-lime-200 transition-colors"
                  aria-label="LinkedIn"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-amber-700 mt-8 pt-8 text-center text-amber-200">
            <p>© {new Date().getFullYear()} CafePass. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
