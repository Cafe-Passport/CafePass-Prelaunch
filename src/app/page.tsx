"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
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
import { FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Home() {
  // Form state
  const [form, setForm] = useState({
   
    cafe: "",
    email: "",
    
    beta: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submit (ready for Supabase integration)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase
        .from("partners_waitlist") // change to your table name
        .insert([
          { cafe: form.cafe, email: form.email, beta: form.beta }
        ]);

      if (error) {
        console.error(error);
        alert("Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-yellow-50 to-white min-h-screen w-full flex flex-col items-center font-sans">
      {/* Hero Section */}
      <section className="w-full max-w-2xl text-center pt-16 pb-8 px-4">
        <img src="/logo.svg" alt="Logo" className="mx-auto w-60 mb-6" />
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-4">Get Discovered by More Coffee Lovers in Toronto</h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-6">
          Join our city-wide café passport program and drive foot traffic with zero upfront cost.
        </p>
        <div className="bg-white/90 rounded-xl shadow-lg p-6 mx-auto max-w-md">
          <h2 className="text-xl text-gray-900 font-semibold mb-2">☕ Join the Waitlist or Apply to Partner</h2>
          {submitted ? (
            <div className="text-lime-700 font-medium">Thank you! We&apos;ll be in touch soon.</div>
          ) : (
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            
              <input 
                name="cafe" 
                value={form.cafe} 
                onChange={handleChange} 
                required 
                placeholder="Café Name" 
                className="px-3 py-2 border border-lime-300 rounded focus:outline-none focus:ring-2 focus:ring-lime-400 text-gray-900 bg-white w-full" 
              />
              <input 
                name="email" 
                type="email" 
                value={form.email} 
                onChange={handleChange} 
                required 
                placeholder="Email" 
                className="px-3 py-2 border border-lime-300 rounded focus:outline-none focus:ring-2 focus:ring-lime-400 text-gray-900 bg-white w-full" 
              />
              <label className="flex items-center gap-2 text-lime-600 text-sm mt-1">
                <input 
                  type="checkbox" 
                  name="beta" 
                  checked={form.beta} 
                  onChange={handleChange} 
                  className="accent-lime-600" 
                />
                I&apos;m interested in beta testing / featured launch listing
              </label>
              <button 
                type="submit" 
                className="bg-lime-500 text-white font-semibold py-2 px-4 rounded hover:bg-lime-600 transition-colors w-full mt-2" 
                disabled={loading}
              >
                {loading ? "Submitting..." : "Reserve My Spot"}
              </button>
            </form>
          )}
        </div>
        {/* Progress bar / counter */}
        <div className="flex items-center justify-center gap-2 mt-4 text-gray-800">
          <SparklesIcon className="w-5 h-5 text-lime-500" />
          <span className="font-semibold"> reserve yours now!</span>
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

        {/* <div className="flex flex-col gap-6">
          <blockquote className="bg-lime-50 border-l-4 border-lime-400 p-4 rounded">
            <p className="italic text-gray-900">“We saw a 30% bump in foot traffic after getting listed.”</p>
            <footer className="text-right text-lime-900 font-semibold mt-2 ">— Test Café (Beta Partner)</footer>
          </blockquote>
          <blockquote className="bg-lime-50 border-l-4 border-lime-400 p-4 rounded">
            <p className="italic text-gray-900">“We love how Coffee Pass helps us reach local coffee lovers without running ads.”</p>
            <footer className="text-right text-lime-900 font-semibold mt-2">— Local Beans, Kensington Market</footer>
          </blockquote>
        </div> */}
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
          <a href="https://www.instagram.com/cafepass.ca/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-green-700"><FaInstagram className="w-6 h-6" /></a>
          <a href="https://www.linkedin.com/company/cafe-pass/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-green-700"><FaLinkedin className="w-6 h-6" /></a>
          {/* <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:underline">TikTok</a> */}
        </div>
      </footer>
    </div>
  );
}
