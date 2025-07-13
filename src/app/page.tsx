"use client";
import { useState, useEffect } from "react"; // Import useEffect
import { supabase } from "../lib/supabaseClient"; // Changed import path
import {
  UserGroupIcon,
  QrCodeIcon,
  ArrowTrendingUpIcon,
  MapPinIcon,
  TicketIcon,
  ChartBarIcon,
  UsersIcon,
  CalendarIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
// Removed: import { FaInstagram, FaLinkedin } from "react-icons/fa";

export default function App() { // Changed to App for consistency with React export
  // State to manage the active tab: 'cafes' or 'users'
  const [activeTab, setActiveTab] = useState<'cafes' | 'users'>('cafes');

  // Cafe Partner Waitlist form state
  const [formCafes, setFormCafes] = useState({
    cafe: "",
    email: "",
    beta: false,
  });
  const [submittedCafes, setSubmittedCafes] = useState(false);
  const [loadingCafes, setLoadingCafes] = useState(false);

  // Coffee Drinker (User) Waitlist form state
  const [formUsers, setFormUsers] = useState({
    name: "",
    email: "",
    beta: false,
  });
  const [submittedUsers, setSubmittedUsers] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // New state variables for sign-up counts
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
        .select('*', { count: 'exact', head: true }); // Use head: true for count only

      if (cafeError) {
        console.error("Error fetching cafe count:", cafeError);
      } else {
        setCafeCount(cafes);
      }

      // Fetch user count
      const { count: users, error: userError } = await supabase
        .from("users_waitlist") // Make sure this table name matches your Supabase table
        .select('*', { count: 'exact', head: true }); // Use head: true for count only

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

  // useEffect to fetch counts on component mount
  useEffect(() => {
    fetchCounts();
  }, []); // Empty dependency array means this runs once on mount

  // Handle input changes for Cafes form
  const handleChangeCafes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormCafes((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle input changes for Users form
  const handleChangeUsers = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormUsers((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submit for Cafes
  const handleSubmitCafes = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingCafes(true);
    try {
      const { error } = await supabase
        .from("partners_waitlist") // Target table for cafes
        .insert([
          { cafe: formCafes.cafe, email: formCafes.email, beta: formCafes.beta }
        ]);

      if (error) {
        console.error("Error submitting cafe form:", error);
        // Using a simple div for alerts instead of window.alert()
        document.getElementById('cafe-alert-message')!.innerText = "Something went wrong with the cafe submission. Please try again.";
        setLoadingCafes(false);
        return;
      }
      setSubmittedCafes(true);
      fetchCounts(); // Re-fetch counts after successful submission
    } catch (err) {
      console.error("Unexpected error submitting cafe form:", err);
      document.getElementById('cafe-alert-message')!.innerText = "Unexpected error. Please try again.";
    } finally {
      setLoadingCafes(false);
    }
  };

  // Handle form submit for Users
  const handleSubmitUsers = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingUsers(true);
    try {
      const { error } = await supabase
        .from("users_waitlist") // **IMPORTANT**: This should be your Supabase table for coffee drinkers
        .insert([
          { name: formUsers.name, email: formUsers.email, beta: formUsers.beta }
        ]);

      if (error) {
        console.error("Error submitting user form:", error);
        // Using a simple div for alerts instead of window.alert()
        document.getElementById('user-alert-message')!.innerText = "Something went wrong with your submission. Please try again.";
        setLoadingUsers(false);
        return;
      }
      setSubmittedUsers(true);
      fetchCounts(); // Re-fetch counts after successful submission
    } catch (err) {
      console.error("Unexpected error submitting user form:", err);
      document.getElementById('user-alert-message')!.innerText = "Unexpected error. Please try again.";
    } finally {
      setLoadingUsers(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-yellow-50 to-white min-h-screen w-full flex flex-col items-center font-sans">
      {/* Hero Section */}
      <section className="w-full max-w-2xl text-center pt-16 pb-8 px-4">
        <img src="logo.svg" alt="Logo" className="mx-auto w-60 mb-6 rounded-md" />
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-4">Get Discovered by More Coffee Lovers in Toronto</h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-6">
          Join our city-wide café passport program and drive foot traffic with zero upfront cost.
        </p>
        <div className="bg-white/90 rounded-xl shadow-lg p-6 mx-auto max-w-md">
          {/* Tab Switcher */}
          <div className="flex justify-center mb-4">
            <button
              className={`px-4 py-2 rounded-t-lg font-semibold transition-colors border-b-2 ${activeTab === 'users' ? 'text-lime-700 border-lime-500 bg-white' : 'text-gray-500 border-transparent bg-lime-50'}`}
              onClick={() => setActiveTab('users')}
              type="button"
            >
              Coffee Drinker Waitlist
            </button>
            <button
              className={`px-4 py-2 rounded-t-lg font-semibold transition-colors border-b-2 ${activeTab === 'cafes' ? 'text-lime-700 border-lime-500 bg-white' : 'text-gray-500 border-transparent bg-lime-50'}`}
              onClick={() => setActiveTab('cafes')}
              type="button"
            >
              Cafes Partner Waitlist
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'cafes' ? (
            // Cafe Form
            submittedCafes ? (
              <div className="text-lime-700 font-medium">Thank you! We&apos;ll be in touch soon.</div>
            ) : (
              <form className="flex flex-col gap-3" onSubmit={handleSubmitCafes}>
                <input
                  name="cafe"
                  value={formCafes.cafe}
                  onChange={handleChangeCafes}
                  required
                  placeholder="Café Name"
                  className="px-3 py-2 border border-lime-300 rounded focus:outline-none focus:ring-2 focus:ring-lime-400 text-gray-900 bg-white w-full"
                />
                <input
                  name="email"
                  type="email"
                  value={formCafes.email}
                  onChange={handleChangeCafes}
                  required
                  placeholder="Email"
                  className="px-3 py-2 border border-lime-300 rounded focus:outline-none focus:ring-2 focus:ring-lime-400 text-gray-900 bg-white w-full"
                />
                <label className="flex items-center gap-2 text-lime-600 text-sm mt-1">
                  <input
                    type="checkbox"
                    name="beta"
                    checked={formCafes.beta}
                    onChange={handleChangeCafes}
                    className="accent-lime-600"
                  />
                  I&apos;m interested in beta testing / featured launch listing
                </label>
                <button
                  type="submit"
                  className="bg-lime-500 text-white font-semibold py-2 px-4 rounded hover:bg-lime-600 transition-colors w-full mt-2"
                  disabled={loadingCafes}
                >
                  {loadingCafes ? "Submitting..." : "Reserve My Spot"}
                </button>
                <div id="cafe-alert-message" className="text-red-500 text-sm mt-2"></div> {/* Alert message div */}
              </form>
            )
          ) : (
            // User Form
            submittedUsers ? (
              <div className="text-lime-700 font-medium">Thank you! We&apos;ll be in touch soon.</div>
            ) : (
              <form className="flex flex-col gap-3" onSubmit={handleSubmitUsers}>
                <input
                  name="name"
                  value={formUsers.name}
                  onChange={handleChangeUsers}
                  required
                  placeholder="Your Name"
                  className="px-3 py-2 border border-lime-300 rounded focus:outline-none focus:ring-2 focus:ring-lime-400 text-gray-900 bg-white w-full"
                />
                <input
                  name="email"
                  type="email"
                  value={formUsers.email}
                  onChange={handleChangeUsers}
                  required
                  placeholder="Email"
                  className="px-3 py-2 border border-lime-300 rounded focus:outline-none focus:ring-2 focus:ring-lime-400 text-gray-900 bg-white w-full"
                />
                <label className="flex items-center gap-2 text-lime-600 text-sm mt-1">
                  <input
                    type="checkbox"
                    name="beta"
                    checked={formUsers.beta}
                    onChange={handleChangeUsers}
                    className="accent-lime-600"
                  />
                  I&apos;m interested in beta testing and early access
                </label>
                <button
                  type="submit"
                  className="bg-lime-500 text-white font-semibold py-2 px-4 rounded hover:bg-lime-600 transition-colors w-full mt-2"
                  disabled={loadingUsers}
                >
                  {loadingUsers ? "Submitting..." : "Join the Waitlist"}
                </button>
                <div id="user-alert-message" className="text-red-500 text-sm mt-2"></div> {/* Alert message div */}
              </form>
            )
          )}
        </div>
        {/* Progress bar / counter */}
        <div className="flex items-center justify-center gap-2 mt-4 text-gray-800">
          <SparklesIcon className="w-5 h-5 text-lime-500" />
          <span className="font-semibold">
            {loadingCounts ? "Loading sign-ups..." : (
              <>
                {cafeCount !== null && userCount !== null ? (
                  <>
                    <span className="text-lime-700">{cafeCount}</span> cafes and <span className="text-lime-700">{userCount}</span> coffee drinkers have signed up!
                  </>
                ) : (
                  "reserve yours now!"
                )}
              </>
            )}
          </span>
        </div>
        {/* Launch date */}
        <div className="flex items-center justify-center gap-2 mt-1 text-gray-700 text-sm">
          <CalendarIcon className="w-4 h-4" />
          Official public launch: <span className="ml-1 font-medium">Fall 2025</span>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full max-w-4xl px-4 py-8">
        <h2 className="text-2xl text-gray-900 font-bold mb-6 text-center">How It Works</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-8">
          <div className="flex-1 flex flex-col items-center">
            <UserGroupIcon className="w-12 h-12 text-lime-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Partner with Us</h3>
            <p className="text-center text-gray-700">List your café and feature your signature drink.</p>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <QrCodeIcon className="w-12 h-12 text-lime-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Customers Check In</h3>
            <p className="text-center text-gray-700">They scan a QR code at your shop or stamp their physical pass.</p>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <ArrowTrendingUpIcon className="w-12 h-12 text-lime-600 mb-2" />
            <h3 className="font-semibold text-gray-900">You Get More Visits</h3>
            <p className="text-center text-gray-700">We promote your café to our growing base of coffee explorers.</p>
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="w-full max-w-4xl px-4 py-8">
        <h2 className="text-2xl text-gray-900 font-bold mb-6 text-center">Why Join Coffee Pass?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <TicketIcon className="w-8 h-8 text-lime-600" />
            <span className="text-gray-700">Free Promotion to Toronto coffee drinkers</span>
          </div>
          <div className="flex items-center gap-3">
            <MapPinIcon className="w-8 h-8 text-lime-600" />
            <span className="text-gray-700">Placement on Our Curated Map</span>
          </div>
          <div className="flex items-center gap-3 ">
            <ChartBarIcon className="w-8 h-8 text-lime-600" />
            <span className="text-gray-700">Digital Loyalty System to replace paper cards</span>
          </div>
          <div className="flex items-center gap-3">
            <UsersIcon className="w-8 h-8 text-lime-600" />
            <span className="text-gray-700">Community Support from other indie café owners</span>
          </div>
          <div className="flex items-center gap-3">
            <ArrowTrendingUpIcon className="w-8 h-8 text-lime-600" />
            <span className="text-gray-700">Access to Analytics and customer trends</span>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full max-w-3xl px-4 py-8">
        <h2 className="text-2xl text-gray-900 font-bold mb-6 text-center">Testimonials</h2>
        <blockquote className="bg-lime-50 border-l-4 border-lime-400 p-4 rounded">
          <p className="italic text-gray-900">“You will be featured in the launch”</p>
          <footer className="text-right text-lime-900 font-semibold mt-2 ">— New café owner</footer>
        </blockquote>
      </section>

      {/* What You'll Get as a Launch Partner */}
      <section className="w-full max-w-3xl px-4 py-8">
        <h2 className="text-2xl text-gray-900 font-bold mb-6 text-center">What You&apos;ll Get as a Launch Partner</h2>
        <ul className="list-disc pl-8 space-y-2 text-gray-800">
          <li>Priority listing on our homepage</li>
          <li>Customized QR code signage</li>
          <li>Access to early analytics dashboard</li>
          <li>Invites to exclusive launch events</li>
          <li>Cross-promotion on our social media</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="w-full bg-lime-100 py-12 mt-8  text-center text-gray-800">
        <div className="mb-2">Contact: <a href="mailto:cafepassto@gmail.com" className="underline">cafepassto@gmail.com</a></div>
        <div className="flex justify-center gap-6 text-lg">
          {/* Replaced FaInstagram with text */}
          <a href="https://www.instagram.com/cafepass.ca/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-green-700">Instagram</a>
          {/* Replaced FaLinkedin with text */}
          <a href="https://www.linkedin.com/company/cafe-pass/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-green-700">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}
