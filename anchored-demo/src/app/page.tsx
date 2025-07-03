'use client'

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Lucide icons to avoid hydration mismatches
const Anchor = dynamic(() => import('lucide-react').then(mod => mod.Anchor), { ssr: false });
const QrCode = dynamic(() => import('lucide-react').then(mod => mod.QrCode), { ssr: false });
const Sparkles = dynamic(() => import('lucide-react').then(mod => mod.Sparkles), { ssr: false });

const AnchoredDemo = () => {
  const [currentStep, setCurrentStep] = useState('landing');
  const [selectedMood, setSelectedMood] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Simple mood options
  const moodOptions = [
    { emoji: '😌', label: 'Peaceful' },
    { emoji: '💪', label: 'Strong' },
    { emoji: '🤗', label: 'Hopeful' },
    { emoji: '😔', label: 'Struggling' },
    { emoji: '🙏', label: 'Grateful' },
    { emoji: '❤️', label: 'Loved' },
    { emoji: '🤔', label: 'Searching' },
    { emoji: '✨', label: 'Joyful' }
  ];

  const renderLanding = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <div className="text-6xl mb-4">⚓</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">ANCHORED</h1>
          <p className="text-gray-600 mb-4">Live Experience</p>
          <div className="text-sm text-gray-500 border-t pt-4">
            &ldquo;We have this hope as an anchor for the soul, firm and secure.&rdquo;<br/>
            <em>- Hebrews 6:19</em>
          </div>
        </div>
        
        <div className="text-white text-center">
          <QrCode className="w-16 h-16 mx-auto mb-4 opacity-75" />
          <p className="text-lg mb-6">Tap your phone to this card or scan QR code</p>
          <button 
            onClick={() => setCurrentStep('mood')}
            className="bg-white text-blue-900 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2 mx-auto"
          >
            <Sparkles className="w-5 h-5" />
            Share How You Feel
          </button>
        </div>
      </div>
    </div>
  );

  const renderMoodSelection = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="text-center mb-8">
          <Anchor className="w-16 h-16 mx-auto text-purple-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">How are you feeling today?</h1>
          <p className="text-gray-600">Choose the emoji that best represents your heart right now</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {moodOptions.map((mood) => (
              <button
                key={mood.emoji}
                onClick={() => {
                  setSelectedMood(mood.emoji);
                  setCurrentStep('complete');
                }}
                className="p-6 rounded-xl border-2 border-gray-200 hover:border-purple-300 transition-all text-center hover:scale-105 hover:shadow-lg"
              >
                <div className="text-5xl mb-2">{mood.emoji}</div>
                <div className="font-semibold text-gray-800">{mood.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderComplete = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center text-white">
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-8xl">{selectedMood}</span>
          <div className="text-8xl">⚓</div>
        </div>
        <h1 className="text-4xl font-bold mb-4">You Are Anchored!</h1>
        <p className="text-xl mb-8 text-blue-200">
          Thank you for sharing your heart with the community
        </p>
        
        <div className="bg-white/10 backdrop-blur rounded-xl p-8 mb-8">
          <h3 className="text-2xl font-semibold mb-4">Your feeling today:</h3>
          <div className="text-6xl mb-4">{selectedMood}</div>
          <div className="text-xl text-blue-200">
            {moodOptions.find(m => m.emoji === selectedMood)?.label}
          </div>
        </div>

        <button
          onClick={() => {
            setCurrentStep('landing');
            setSelectedMood('');
          }}
          className="bg-white text-purple-900 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
        >
          Experience Again
        </button>
      </div>
    </div>
  );

  const steps = {
    landing: renderLanding,
    mood: renderMoodSelection,
    complete: renderComplete
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return steps[currentStep]();
};

export default function Page() {
  return <AnchoredDemo />;
}
