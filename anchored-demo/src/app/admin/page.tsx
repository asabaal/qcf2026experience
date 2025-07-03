'use client'

import React, { useState, useEffect } from 'react';
import { supabase, type Participant } from '../../lib/supabase';

const AdminDashboard = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [moodCounts, setMoodCounts] = useState<Record<string, number>>({});
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const moodLabels: Record<string, string> = {
    '😌': 'Peaceful',
    '💪': 'Strong', 
    '🤗': 'Hopeful',
    '😔': 'Struggling',
    '🙏': 'Grateful',
    '❤️': 'Loved',
    '🤔': 'Searching',
    '✨': 'Joyful'
  };

  useEffect(() => {
    loadParticipants();
    
    // Set up real-time subscription
    const subscription = supabase
      .channel('admin-participants')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'participants'
        },
        () => {
          console.log('🔄 Participants changed');
          loadParticipants();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const loadParticipants = async () => {
    try {
      const { data, error } = await supabase
        .from('participants')
        .select('*')
        .order('joined_at', { ascending: false });

      if (error) {
        console.error('Error loading participants:', error);
        return;
      }

      setParticipants(data || []);
      
      // Calculate mood counts
      const counts: Record<string, number> = {};
      (data || []).forEach(p => {
        counts[p.mood_emoji] = (counts[p.mood_emoji] || 0) + 1;
      });
      setMoodCounts(counts);
      setLastUpdate(new Date());

      console.log('👥 Loaded participants:', data?.length, 'Mood counts:', counts);
    } catch (error) {
      console.error('Failed to load participants:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <span className="text-4xl">⚓</span>
              ANCHORED Admin Dashboard
            </h1>
            <p className="text-gray-400">Live Presentation Monitor</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Last Update</div>
            <div className="text-lg">
              {mounted ? lastUpdate.toLocaleTimeString() : '--:--:--'}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Participants */}
        <div className="bg-blue-600 rounded-xl p-6 text-center">
          <div className="text-4xl font-bold">{participants.length}</div>
          <div className="text-blue-200">Total Participants</div>
        </div>

        {/* Most Popular Mood */}
        <div className="bg-purple-600 rounded-xl p-6 text-center">
          <div className="text-3xl">
            {Object.entries(moodCounts).sort(([,a], [,b]) => b - a)[0]?.[0] || '😌'}
          </div>
          <div className="text-purple-200">Most Popular Mood</div>
        </div>

        {/* Session Status */}
        <div className="bg-green-600 rounded-xl p-6 text-center">
          <div className="text-2xl">✅</div>
          <div className="text-green-200">Live & Active</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mood Distribution */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Mood Distribution</h2>
          <div className="space-y-3">
            {Object.entries(moodLabels).map(([emoji, label]) => {
              const count = moodCounts[emoji] || 0;
              const percentage = participants.length > 0 ? (count / participants.length) * 100 : 0;
              
              return (
                <div key={emoji} className="flex items-center gap-3">
                  <span className="text-2xl w-8">{emoji}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{label}</span>
                      <span className="font-mono">{count} ({percentage.toFixed(0)}%)</span>
                    </div>
                    <div className="bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Feed */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Live Participant Feed</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {participants.length === 0 ? (
              <div className="text-gray-400 text-center py-8">
                <div className="text-4xl mb-2">👋</div>
                <div>Waiting for participants...</div>
                <div className="text-sm mt-2">Share the demo link to get started!</div>
              </div>
            ) : (
              participants.slice(0, 20).map((participant, index) => (
                <div
                  key={participant.id}
                  className="bg-gray-700 rounded-lg p-3 flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{participant.mood_emoji}</span>
                    <div>
                      <div className="font-medium">
                        {moodLabels[participant.mood_emoji] || 'Unknown'}
                      </div>
                      <div className="text-xs text-gray-400">
                        {mounted ? new Date(participant.joined_at).toLocaleTimeString() : '--:--:--'}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">#{index + 1}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => window.open('/demo', '_blank')}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg transition-colors"
          >
            🚀 Open Demo App
          </button>
          <button
            onClick={loadParticipants}
            className="bg-green-600 hover:bg-green-700 px-4 py-3 rounded-lg transition-colors"
          >
            🔄 Refresh Data
          </button>
          <button
            onClick={() => window.open('/', '_blank')}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-3 rounded-lg transition-colors"
          >
            🏠 View Homepage
          </button>
        </div>
      </div>

      {/* Debug Info */}
      <div className="mt-8 bg-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Debug Info</h2>
        <div className="text-sm text-gray-400 space-y-1 font-mono">
          <div>Total Participants: {participants.length}</div>
          <div>Last Update: {mounted ? lastUpdate.toISOString() : 'Loading...'}</div>
          <div>Environment: {process.env.NODE_ENV}</div>
          <div className="mt-2 text-green-400">
            ✅ Real-time connection active
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AdminPage() {
  return <AdminDashboard />;
}
