"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

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
    <div className="min-h-screen bg-lime-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-lime-900 mb-2">
            Partner With Us
          </h1>
          <p className="text-lime-800">
            Join our network of premium coffee shops and reach more customers
          </p>
        </div>

        {message.text && (
          <div
            className={`mb-6 p-4 rounded-md ${
              message.isError
                ? "bg-red-50 text-red-700"
                : "bg-lime-50 text-lime-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-1">
            <div>
              <label
                htmlFor="cafe"
                className="block text-sm font-medium text-lime-900"
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
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isSubmitting ? "bg-lime-400" : "bg-lime-600 hover:bg-lime-700"
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
              onClick={() => router.push("partners_waitlist")}
              className="font-medium text-lime-800 hover:text-lime-900 underline"
            >
              Join our coffee lovers waitlist
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}