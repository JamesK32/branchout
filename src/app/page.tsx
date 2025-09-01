'use client';

import React, { useState, useEffect, useMemo } from 'react';

export default function Home() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    year_of_study: 'Freshman',
    school: 'Boston College'
  });

  const rotatingWords = useMemo(() => [
    'study buddy', 'coffee addict', 'night owl', 'gym partner', 'foodie friend',
    'adventure seeker', 'creative soul', 'future roommate', 'ski buddy', 'hiking buddy',
    'camper', 'bandmate', 'concert wingman', 'diner buddy', 'debater', 'co-founder',
    'road trip copilot', 'pickleball partner', 'yoga buddy', 'trivia mate',
    'karaoke buddy', 'intramural teammate', 'familiar stranger', 'coffee companion',
    'study group partner', 'lunch buddy', 'movie night friend', 'gaming partner',
    'travel companion', 'fitness buddy', 'creative collaborator'
  ], []);

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * rotatingWords.length);
      } while (nextIndex === currentWordIndex && rotatingWords.length > 1);
      setCurrentWordIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentWordIndex, rotatingWords.length]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          year_of_study: 'Freshman',
          school: 'Boston College'
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#eeebe3' }}>
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img 
                src="/Logo Full.png" 
                alt="BranchOut" 
                style={{ height: '40px', width: 'auto' }}
                onError={(e) => {
                  // Fallback to text if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <span className="text-xl font-bold text-green-600 hidden">BranchOut</span>
            </div>
            <button 
              className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition-colors"
              style={{ backgroundColor: '#167a5f' }}
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl p-12 shadow-lg text-center mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
            Meet a{' '}
            <span 
              className="text-green-600"
              style={{
                minWidth: '450px',
                maxWidth: '700px',
                display: 'inline-block',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                color: '#167a5f'
              }}
            >
              {rotatingWords[currentWordIndex]}
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join intimate dinners with 4-5 BC students you've never met. Your next best friend could be a stranger.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <span className="text-3xl font-bold" style={{ color: '#167a5f' }}>
              Boston College students branching out 🚀
            </span>
          </div>
        </div>

        {/* Waitlist Form */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-8">Join the Waitlist</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="John"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year of Study *</label>
              <select
                name="year_of_study"
                value={formData.year_of_study}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="Freshman">Freshman</option>
                <option value="Sophomore">Sophomore</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
                <option value="Graduate">Graduate</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="(617) 555-0123"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">School</label>
              <input
                type="text"
                name="school"
                value={formData.school}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="john.doe@bc.edu"
              />
            </div>

            {submitStatus === 'success' && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 text-center">
                  🎉 Thanks for joining! We'll be in touch when BranchOut launches.
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-center">
                  Something went wrong. Please try again.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 transform cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              style={{ backgroundColor: '#167a5f' }}
            >
              {isSubmitting ? 'Joining...' : 'Join Waitlist'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
