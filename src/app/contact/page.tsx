"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";


export default function CafePartnersWaitlist() {
  interface FormData {
    email: string;
    cafe: string;
  }

  const [formData, setFormData] = useState<FormData>({
    email: "",
    cafe: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", isError: false });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Ensure Supabase client is properly initialized
      if (!supabase) {
        throw new Error("Supabase client not initialized");
      }

      // Basic validation
      if (!formData.email?.trim() || !formData.cafe?.trim()) {
        throw new Error("Please fill in all required fields");
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        throw new Error("Please enter a valid email address");
      }

      setIsSubmitting(true);
      setMessage({ text: "", isError: false });

      // Prepare data with proper types
      const submissionData = {
        email: formData.email.trim(),
        cafe: formData.cafe.trim(),
        created_at: new Date().toISOString(),
      };

      // Log submission data for debugging
      console.log("Submitting data:", submissionData);

      const { error } = await supabase.from("partners_waitlist").insert({ // Changed table name to 'partners_waitlist'
        cafe: formData.cafe.trim(), // Use 'cafe' instead of 'cafe_name'
        email: formData.email.trim(),
        created_at: new Date().toISOString(),
      });

      if (error) {
        console.error("Supabase error:", error);
        throw new Error(
          error.message || "Failed to submit form. Please try again."
        );
      }

      setMessage({
        text: "Thank you for your interest in partnering with us! Our team will contact you shortly.",
        isError: false,
      });

      // Reset form
      setFormData({
        email: "",
        cafe: "",
      });

      // Redirect to home after delay
      setTimeout(() => {
        router.push("/?success=partner_request_submitted");
      }, 3000);
    } catch (error) {
      console.error("Form submission error:", error);
      let errorMessage = "An unexpected error occurred. Please try again.";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      setMessage({
        text: errorMessage,
        isError: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-amber-50 to-lime-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-lime-900 mb-6">
            Grow Your Cafe Business with CafePass
          </h1>
          <p className="text-lime-800">
            Join Toronto&apos;s premier coffee shop network and connect with thousands of coffee lovers.
            Increase your visibility, boost sales, and build a loyal customer base.
          </p>
         
        </div>
         {/* Partner Form Section */}

         <div id="partner-form" className="py-16 bg-lime-50">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
              <div className="text-center mb-8">
                <h2 className=" text-3xl font-bold text-lime-900 mb-2">
                  Ready to Grow Your Cafe?
                </h2>
                <p className="text-lime-800">
                  &quot;Joining CafePass was one of the best decisions we&apos;ve made. Our customer base has grown by 40% since we joined, and the community of coffee lovers is amazing!&quot;
                </p>
              </div>

              {message.text && (
                <div className={`mb-6 p-4 rounded-md ${message.isError ? 'bg-red-50 text-red-700' : 'bg-lime-50 text-lime-700'}`}>
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-1">
                  <div>
                    <label
                      htmlFor="cafe"
                      className="block text-sm font-medium text-lime-900 "
                    >
                      Cafe Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="cafe"
                      name="cafe"
                      type="text"
                      required
                      value={formData.cafe}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-lime-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-lime-500 text-gray-900"
                      placeholder="Your cafe's name"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-1">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-lime-900"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-lime-300 rounded-md shadow-sm focus:outline-none focus:ring-lime-500 focus:border-lime-500 text-gray-900 "
                      placeholder="your.email@cafe.com"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isSubmitting ? "bg-lime-400" : "bg-lime-600 hover:bg-lime-700"
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500`}
                  >
                    {isSubmitting ? "Submitting..." : "Join as a Partner"}
                  </button>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-lime-600">
                  Looking to join as a coffee lover?{" "}
                  <button
                    onClick={() => router.push("/coffee-fans")}
                    className="font-medium text-lime-800 hover:text-lime-900 underline"
                  >
                    Join our coffee lovers waitlist
                  </button>
                </p>
              </div>
            </div>
          </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-lime-900 mb-4">Why Partner With Us?</h2>
            <p className="text-xl text-lime-700 max-w-3xl mx-auto">
              We help independent cafes thrive in a competitive market
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-lime-50 p-8 rounded-xl">
              <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-lime-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center text-lime-900 mb-3">Increased Visibility</h3>
              <p className="text-lime-700 text-center">Get discovered by thousands of coffee lovers actively looking for their next favorite spot.</p>
            </div>

            <div className="bg-lime-50 p-8 rounded-xl">
              <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-lime-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center text-lime-900 mb-3">Boosted Sales</h3>
              <p className="text-lime-700 text-center">Increase your average customer spend with our rewards program and exclusive offers.</p>
            </div>

            <div className="bg-lime-50 p-8 rounded-xl">
              <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-lime-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center text-lime-900 mb-3">Loyal Community</h3>
              <p className="text-lime-700 text-center">Build lasting relationships with coffee enthusiasts who value quality and local businesses.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-lime-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-lime-900 mb-4">How It Works</h2>
            <p className="text-xl text-lime-700 max-w-3xl mx-auto">
              Joining our network is simple and risk-free
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-lime-700">1</span>
              </div>
              <h3 className="text-xl text-lime-900 font-semibold mb-2">Apply to Join</h3>
              <p className="text-lime-700">Fill out our simple application form to get started.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-lime-700">2</span>
              </div>
              <h3 className="text-xl font-semibold text-lime-900 mb-2">Onboard with Us</h3>
              <p className="text-lime-700">Our team will guide you through the setup process.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-lime-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-lime-700">3</span>
              </div>
              <h3 className="text-xl font-semibold text-lime-900 mb-2">Start Growing</h3>
              <p className="text-lime-700">Welcome new customers and grow your business.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-lime-900 mb-4">What Our Partners Say</h2>
            <p className="text-xl text-lime-700">
              Join hundreds of cafes already growing with CafePass
            </p>
          </div>

          <div className="bg-lime-50 p-8 rounded-xl shadow-sm">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mx-auto md:mx-0">
                  <span className="text-2xl font-bold text-lime-700">&quot;</span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 md:ml-6">
                <blockquote>
                  <p className="text-xl font-medium text-lime-900">
                    Since joining CafePass, we&apos;ve seen a 30% increase in new customers. The app brings in coffee lovers who truly appreciate quality and are excited to try new places.
                  </p>
                </blockquote>
                <div className="mt-4">
                  <p className="text-base font-medium text-lime-900">Sarah Chen</p>
                  <p className="text-base text-lime-600">Owner, The Daily Grind</p>
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