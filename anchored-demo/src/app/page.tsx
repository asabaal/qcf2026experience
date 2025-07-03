'use client'

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const Anchor = dynamic(() => import('lucide-react').then(mod => mod.Anchor), { ssr: false });
const Sparkles = dynamic(() => import('lucide-react').then(mod => mod.Sparkles), { ssr: false });
const Calendar = dynamic(() => import('lucide-react').then(mod => mod.Calendar), { ssr: false });
const Users = dynamic(() => import('lucide-react').then(mod => mod.Users), { ssr: false });

const ComingSoonPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just show success - could integrate with email service later
    setSubmitted(true);
    console.log('Email submitted:', email);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Logo & Title */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Anchor className="w-16 h-16 text-yellow-400" />
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                ANCHORED
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-300 mb-4">
              A Revolutionary Live Community Experience
            </p>
            <div className="text-sm text-gray-400 italic">
              "We have this hope as an anchor for the soul, firm and secure." - Hebrews 6:19
            </div>
          </div>

          {/* Coming Soon Badge */}
          <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/50 rounded-full px-6 py-3 mb-8">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="font-semibold text-yellow-200">Coming Soon</span>
          </div>

          {/* Description */}
          <div className="max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Where Technology Serves Soul
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Experience the future of human connection. Share your heart, create together, 
              and discover the anchor that holds us all. A live, interactive experience 
              that transforms strangers into community.
            </p>
          </div>

          {/* Features Preview */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Live Community</h3>
              <p className="text-sm text-gray-300">Connect with dozens of people in real-time</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">AI-Powered</h3>
              <p className="text-sm text-gray-300">Smart assistance helps create something beautiful together</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <Calendar className="w-8 h-8 text-green-400 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">QCF 2026</h3>
              <p className="text-sm text-gray-300">Premiering at the Quarterly Christian Fellowship conference</p>
            </div>
          </div>

          {/* Email Signup */}
          {!submitted ? (
            <div className="max-w-md mx-auto">
              <p className="text-gray-300 mb-4">
                Be the first to experience ANCHORED:
              </p>
              <form onSubmit={handleEmailSubmit} className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
                >
                  Notify Me
                </button>
              </form>
            </div>
          ) : (
            <div className="max-w-md mx-auto bg-green-500/20 border border-green-500/50 rounded-lg p-6">
              <div className="text-green-400 font-semibold mb-2">Thank you!</div>
              <p className="text-green-200">We'll notify you when ANCHORED launches.</p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-16 text-sm text-gray-400">
            <p>Built with ❤️ for meaningful human connection</p>
            <div className="mt-4 space-x-6">
              <a href="/demo" className="hover:text-white transition-colors">Demo</a>
              <a href="/admin" className="hover:text-white transition-colors">Admin</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HomePage() {
  return <ComingSoonPage />;
}