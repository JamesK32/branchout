'use client';

import React, { useState, useEffect, useRef } from 'react';

// SpotlightCard Component
interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className = '', spotlightColor = 'rgba(22, 122, 95, 0.25)' }) => {
  const divRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    divRef.current.style.setProperty('--mouse-x', `${x}px`);
    divRef.current.style.setProperty('--mouse-y', `${y}px`);
    divRef.current.style.setProperty('--spotlight-color', spotlightColor);
  };

  return (
    <div 
      ref={divRef} 
      onMouseMove={handleMouseMove} 
      className={`spotlight-card ${className}`}
      style={{
        position: 'relative',
        borderRadius: '2rem',
        border: '1px solid rgba(22, 122, 95, 0.2)',
        backgroundColor: '#167a5f',
        overflow: 'hidden',
        '--mouse-x': '50%',
        '--mouse-y': '50%',
        '--spotlight-color': spotlightColor
      } as React.CSSProperties & { '--mouse-x': string; '--mouse-y': string; '--spotlight-color': string }}
    >
      <div
        style={{
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 80%)',
          opacity: 0,
          transition: 'opacity 0.5s ease',
          pointerEvents: 'none'
        }}
        className="spotlight-overlay"
      />
      <div style={{ position: 'relative', zIndex: 10 }}>
        {children}
      </div>
      <style jsx>{`
        .spotlight-card:hover .spotlight-overlay,
        .spotlight-card:focus-within .spotlight-overlay {
          opacity: 0.6 !important;
        }
      `}</style>
    </div>
  );
};

// CardNav Component
interface CardNavProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  scrollToSection: (sectionId: string) => void;
}

const CardNav: React.FC<CardNavProps> = ({ currentPage, setCurrentPage, scrollToSection }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  const handleNavClick = (page: string) => {
    setCurrentPage(page);
    setIsExpanded(false);
  };

  const handleSectionClick = (page: string, section: string) => {
    setCurrentPage(page);
    setIsExpanded(false);
    setTimeout(() => {
      scrollToSection(section);
    }, 100);
  };

  const navItems = [
    {
      label: "Connect",
      bgColor: "#167a5f",
      textColor: "#fff",
      page: "connect",
      links: [
        { label: "Join Waitlist", section: "waitlist" },
        { label: "How it Works", section: "how-it-works" }
      ]
    },
    {
      label: "About",
      bgColor: "#145a47",
      textColor: "#fff", 
      page: "about",
      links: [
        { label: "Our Story", section: "our-story" },
        { label: "Feedback", section: "feedback" }
      ]
    },
    {
      label: "Support",
      bgColor: "#0f4538",
      textColor: "#fff",
      page: "support",
      links: [
        { label: "FAQ", section: "faq" },
        { label: "Contact", section: "contact" }
      ]
    }
  ];

  return (
    <div style={{
      position: 'absolute',
      top: '2rem',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '90%',
      maxWidth: '800px',
      zIndex: 99
    }}>
      <nav 
        style={{
          height: isExpanded ? '260px' : '60px',
          backgroundColor: '#fff',
          border: '0.5px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '0.75rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          position: 'relative',
          overflow: 'hidden',
          transition: 'height 0.4s ease'
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.5rem 1rem',
          zIndex: 2
        }}>
          <div 
            onClick={toggleMenu}
            style={{
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              padding: '8px'
            }}
          >
            <div style={{
              width: '30px',
              height: '2px',
              backgroundColor: '#167a5f',
              transition: 'transform 0.25s ease',
              transform: isExpanded ? 'translateY(4px) rotate(45deg)' : 'none'
            }} />
            <div style={{
              width: '30px',
              height: '2px', 
              backgroundColor: '#167a5f',
              transition: 'transform 0.25s ease',
              transform: isExpanded ? 'translateY(-4px) rotate(-45deg)' : 'none'
            }} />
          </div>

          <div 
            onClick={() => setCurrentPage('landing')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
          >
            <img 
              src="/Logo Full.png" 
              alt="BranchOut" 
              style={{ 
                height: '40px', 
                width: 'auto'
              }}
            />
          </div>

          <button
            onClick={() => setCurrentPage('onboarding')}
            style={{
              backgroundColor: '#167a5f',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              padding: '0.5rem 1rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Get Started
          </button>
        </div>

        {isExpanded && (
          <div style={{
            position: 'absolute',
            left: '0.5rem',
            right: '0.5rem',
            top: '70px',
            bottom: '0.5rem',
            display: 'flex',
            gap: '12px'
          }}>
            {navItems.map((item, idx) => (
              <div
                key={idx}
                style={{
                  flex: 1,
                  backgroundColor: item.bgColor,
                  color: item.textColor,
                  borderRadius: '0.5rem',
                  padding: '12px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div 
                  style={{ 
                    fontSize: '22px', 
                    fontWeight: '400',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleNavClick(item.page)}
                >
                  {item.label}
                </div>
                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {item.links.map((link, i) => (
                    <button
                      key={i}
                      onClick={() => handleSectionClick(item.page, link.section)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'inherit',
                        fontSize: '16px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        padding: '4px 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      ↗ {link.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
};

// Main App Component
const BranchOutApp = () => {
  const [currentPage, setCurrentPage] = useState('landing');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Landing Page Component
  const LandingPage = () => {
    const [displayText, setDisplayText] = useState('');
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);

    const rotatingWords = [
      "stranger",
      "buddy",
      "friend",
      "partner",
      "mentor",
      "classmate",
      "roommate",
      "connection",
      "study buddy",
      "coffee addict",
      "night owl",
      "gym partner",
      "foodie friend",
      "adventure seeker",
      "creative soul",
      "future roommate",
      "ski buddy",
      "hiking buddy",
      "camper",
      "bandmate",
      "concert wingman",
      "diner buddy",
      "debater",
      "co-founder",
      "road trip copilot",
      "pickleball partner",
      "yoga buddy",
      "trivia mate",
      "karaoke buddy",
      "intramural teammate",
      "familiar stranger"
    ];

    useEffect(() => {
      const currentWord = rotatingWords[currentWordIndex];
      let timeoutId: NodeJS.Timeout;

      if (isTyping) {
        if (displayText.length < currentWord.length) {
          timeoutId = setTimeout(() => {
            setDisplayText(currentWord.slice(0, displayText.length + 1));
          }, 100);
        } else {
          timeoutId = setTimeout(() => {
            setIsTyping(false);
          }, 2000);
        }
      } else {
        if (displayText.length > 0) {
          timeoutId = setTimeout(() => {
            setDisplayText(displayText.slice(0, -1));
          }, 50);
        } else {
          // Pick a random word that's different from the current one
          let nextIndex;
          do {
            nextIndex = Math.floor(Math.random() * rotatingWords.length);
          } while (nextIndex === currentWordIndex && rotatingWords.length > 1);
          setCurrentWordIndex(nextIndex);
          setIsTyping(true);
        }
      }

      return () => clearTimeout(timeoutId);
    }, [displayText, currentWordIndex, isTyping, rotatingWords]);

    return (
      <div className="min-h-screen flex flex-col relative" style={{ backgroundColor: '#eeebe3' }}>
        <CardNav currentPage={currentPage} setCurrentPage={setCurrentPage} scrollToSection={scrollToSection} />
        
        <main className="flex-1 flex items-center justify-center px-6 relative z-10" style={{ paddingTop: '120px' }}>
          <div className="text-center max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-12 shadow-lg mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-6">
                <span className="font-normal text-gray-700">Meet a </span>
                <div 
                  className="inline-block font-bold"
                  style={{ 
                    color: '#167a5f', 
                    minWidth: '450px',
                    maxWidth: '700px',
                    textAlign: 'left',
                    height: '1.2em',
                    display: 'inline-flex',
                    alignItems: 'center',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden'
                  }}
                >
                  {displayText}
                  <span 
                    className="animate-pulse"
                    style={{ 
                      borderRight: '3px solid #167a5f',
                      marginLeft: '2px'
                    }}
                  >
                    &nbsp;
                  </span>
                </div>
              </h1>
              <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed mb-8">
                Join intimate dinners with 4-5 BC students you've never met. 
                Your next best friend could be a stranger.
              </p>
            </div>

            <div style={{ width: '300px', margin: '0 auto' }}>
              <SpotlightCard>
                <button 
                  onClick={() => setCurrentPage('onboarding')}
                  className="px-12 py-4 rounded-full text-white font-semibold text-lg transition-all duration-300 hover:scale-105 transform w-full"
                  style={{ background: 'transparent' }}
                >
                  Get Started
                </button>
              </SpotlightCard>
            </div>
          </div>
        </main>

        <footer className="p-6 text-center relative z-10">
          <p className="text-sm" style={{ color: '#167a5f' }}>
            Connecting Strangers • Boston College • bcbranchout@gmail.com
          </p>
        </footer>
      </div>
    );
  };

  // Connect Page
  const ConnectPage = () => {
    const [waitlistCount, setWaitlistCount] = useState(73);

    useEffect(() => {
      const fetchWaitlistCount = async () => {
        try {
          const response = await fetch('/api/waitlist');
          const data = await response.json();
          if (data.count !== undefined) {
            setWaitlistCount(data.count);
          }
        } catch (error) {
          console.error('Error fetching waitlist count:', error);
        }
      };

      fetchWaitlistCount();
    }, []);

    return (
      <div className="min-h-screen" style={{ backgroundColor: '#fff' }}>
        <CardNav currentPage={currentPage} setCurrentPage={setCurrentPage} scrollToSection={scrollToSection} />
        
        {/* Waitlist Section - Cream Background */}
        <div id="waitlist" className="pt-32 px-6 relative z-10" style={{ backgroundColor: '#eeebe3' }}>
          <div className="text-center max-w-lg mx-auto py-20">
            <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
              <div className="text-8xl font-bold mb-4" style={{ color: '#167a5f' }}>
                {waitlistCount}
              </div>
              <div className="text-center mb-2">
                <span className="text-3xl font-bold" style={{ color: '#167a5f' }}>
                  Boston College students branching out
                </span>
                <span className="text-3xl ml-2">🚀</span>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 mb-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Share with others to get BranchOut to your campus faster!
              </h3>
              <p className="text-gray-700 mb-6">
                The more students who join, the sooner we can start hosting amazing dinners.
              </p>
              
              <div className="space-y-4">
                <SpotlightCard>
                  <button className="w-full py-3 px-6 text-white rounded-full font-semibold" style={{ background: 'transparent' }}>
                    Share on Social Media
                  </button>
                </SpotlightCard>
                <button className="w-full py-3 px-6 border-2 border-gray-400 text-gray-700 rounded-full font-semibold hover:border-gray-600 transition-colors">
                  Copy Referral Link
                </button>
              </div>
            </div>

            <div className="text-sm text-gray-700">
              <p>We'll text you when dinners are ready to launch at BC!</p>
              <p className="mt-2">Expected launch: <span className="font-semibold text-gray-800">2-3 weeks</span></p>
            </div>
          </div>
        </div>

        {/* How it Works Section - White Background */}
        <div id="how-it-works" className="px-6 relative z-10 py-20" style={{ backgroundColor: '#fff' }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white py-8 px-8 rounded-lg" style={{ backgroundColor: '#167a5f' }}>
                How it Works
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-gray-50 rounded-lg p-6 text-center border">
                <div className="w-12 h-12 rounded-full text-white font-bold text-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#167a5f' }}>1</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Tell us when you're free</h3>
                <p className="text-gray-700">
                  Sign up and submit your availability for the week by choosing from BranchOut's available time slots.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 text-center border">
                <div className="w-12 h-12 rounded-full text-white font-bold text-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#167a5f' }}>2</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">We match you with strangers</h3>
                <p className="text-gray-700">
                  Our matching system connects you with 3-5 BC students you don't know. We'll text you once your group is ready.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 text-center border">
                <div className="w-12 h-12 rounded-full text-white font-bold text-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#167a5f' }}>3</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">You hangout</h3>
                <p className="text-gray-700">
                  Meet up! It's casual, no rules, just vibes. Meet new people, share a laugh, and form connections.
                </p>
              </div>
            </div>

            <div className="text-center">
              <SpotlightCard className="inline-block">
                <button 
                  onClick={() => setCurrentPage('onboarding')}
                  className="px-8 py-3 text-white font-semibold rounded-full"
                  style={{ background: 'transparent' }}
                >
                  Join the Waitlist!
                </button>
              </SpotlightCard>
            </div>
          </div>
        </div>

        {/* Mission Statement - Cream Background */}
        <div className="px-6 py-20" style={{ backgroundColor: '#eeebe3' }}>
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Creating slow moments, providing the opportunity to create new connections.
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                College is full of interesting people. Yet our generation faces a loneliness epidemic. 
                BranchOut creates intentional spaces for authentic connection.
              </p>
            </div>
          </div>
        </div>

        {/* Footer - Updated Design */}
        <div className="py-16 text-center text-white relative" style={{ backgroundColor: '#167a5f' }}>
          {/* Decorative circles */}
          <div className="absolute top-8 right-20 w-4 h-4 bg-pink-400 rounded-full opacity-80"></div>
          <div className="absolute top-12 right-8 w-2 h-2 bg-white rounded-full opacity-60"></div>
          
          <h2 className="text-4xl font-bold mb-8">Meet strangers. Expand your perspectives.</h2>
          <SpotlightCard className="inline-block" spotlightColor="rgba(255, 255, 255, 0.25)">
            <button 
              onClick={() => setCurrentPage('onboarding')}
              className="px-8 py-3 text-gray-900 font-semibold rounded-lg bg-white"
            >
              Meet People Now!
            </button>
          </SpotlightCard>
          
          <div className="mt-8 text-sm opacity-80">
            Connecting Strangers • Boston College • bcbranchout@gmail.com
          </div>
        </div>
      </div>
    );
  };

  // About Page
  const AboutPage = () => (
    <div className="min-h-screen" style={{ backgroundColor: '#fff' }}>
      <CardNav currentPage={currentPage} setCurrentPage={setCurrentPage} scrollToSection={scrollToSection} />
      
      {/* Our Story Section - Cream Background */}
      <div id="our-story" className="pt-32 px-6 relative z-10 py-20" style={{ backgroundColor: '#eeebe3' }}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-16 text-center text-gray-800">About Us</h1>
          
          <div className="bg-white rounded-lg p-8 mb-8">
            <p className="text-xl text-gray-800 mb-8 text-center">
              Our team is made up of college students who have experienced our generation's disconnect first-hand.
            </p>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-48 h-48 bg-gray-300 rounded-lg flex items-center justify-center">
                <span className="text-gray-600">[James Photo]</span>
              </div>
              
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4" style={{ color: '#167a5f' }}>James Koonce</h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  I'm surrounded by great people in college, but still find myself feeling disconnected. 
                  Without an easy, natural way to meet new people on campus, BranchOut didn't just feel 
                  like a good idea — it felt necessary.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Section - White Background */}
      <div id="feedback" className="px-6 py-20" style={{ backgroundColor: '#fff' }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16" style={{ color: '#167a5f', fontStyle: 'italic' }}>
            Early Feedback!
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-50 rounded-lg p-6 shadow-lg border">
              <h3 className="font-bold mb-4" style={{ color: '#167a5f' }}>BC '27</h3>
              <p className="text-gray-700 mb-4">
                "It was fun and I enjoyed my group! I'd hang out with them again if the opportunity came up. 
                Definitely people I wouldn't have met otherwise."
              </p>
              <p className="text-gray-500 text-sm">-Anonymous Student</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 shadow-lg border">
              <h3 className="font-bold mb-4" style={{ color: '#167a5f' }}>BC '25</h3>
              <p className="text-gray-700 mb-4">
                "I think one reason why so many BC people love retreats like Kairos is that they can make 
                genuine friends with people they never would've met before and this app does that!"
              </p>
              <p className="text-gray-500 text-sm">-Anonymous Student</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 shadow-lg border">
              <h3 className="font-bold mb-4" style={{ color: '#167a5f' }}>BC '26</h3>
              <p className="text-gray-700 mb-4">
                "BranchOut helped me expand my social circle. It gave me the chance to meet people outside 
                of my immediate friend group."
              </p>
              <p className="text-gray-500 text-sm">-Anonymous Student</p>
            </div>
          </div>


        </div>
      </div>

        {/* Footer - Updated Design */}
        <div className="py-16 text-center text-white relative" style={{ backgroundColor: '#167a5f' }}>
          {/* Decorative circles */}
          <div className="absolute top-8 right-20 w-4 h-4 bg-pink-400 rounded-full opacity-80"></div>
          <div className="absolute top-12 right-8 w-2 h-2 bg-white rounded-full opacity-60"></div>
          
          <h2 className="text-4xl font-bold mb-8">Meet strangers. Expand your perspectives.</h2>
          <SpotlightCard className="inline-block" spotlightColor="rgba(255, 255, 255, 0.25)">
            <button 
              onClick={() => setCurrentPage('onboarding')}
              className="px-8 py-3 text-gray-900 font-semibold rounded-lg bg-white"
            >
              Meet People Now!
            </button>
          </SpotlightCard>
          
          <div className="mt-8 text-sm opacity-80">
            Connecting Strangers • Boston College • bcbranchout@gmail.com
          </div>
        </div>
    </div>
  );

  // Support Page
  const SupportPage = () => (
    <div className="min-h-screen" style={{ backgroundColor: '#fff' }}>
      <CardNav currentPage={currentPage} setCurrentPage={setCurrentPage} scrollToSection={scrollToSection} />
      
      {/* FAQ Section - Cream Background */}
      <div id="faq" className="pt-32 px-6 relative z-10 py-20" style={{ backgroundColor: '#eeebe3' }}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-16 text-center text-gray-800">
            Frequently Asked Questions
          </h1>

          <div className="space-y-8 mb-16">
            <div className="bg-white rounded-lg p-6 border">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Is this safe?</h3>
              <p className="text-gray-700">
                Yes! We ensure meetups only include students at your school. Your information is 
                only used to match you and send a group text.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Who will I meet?</h3>
              <p className="text-gray-700">
                Students you don't already know — we check your contacts to avoid repeats.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Where do we meet?</h3>
              <p className="text-gray-700">
                Meetups are in campus dining halls, creating a social dining vibe.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border">
              <h3 className="text-xl font-bold mb-4 text-gray-800">What if I'm not free this week?</h3>
              <p className="text-gray-700">
                No worries! Signups open every week — just join next time. We want to fit into your schedule.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Does it cost anything?</h3>
              <p className="text-gray-700">
                Nope! We just want to help you meet cool people. Our goal is to better connect our college communities.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section - Green Background */}
      <div id="contact" className="px-6 py-20" style={{ backgroundColor: '#167a5f' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-white">
            Get in Touch
          </h2>
          
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-lg text-gray-700 mb-6">
              Have questions? Want to get involved? We'd love to hear from you.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl">📧</span>
                <span className="text-lg font-semibold" style={{ color: '#167a5f' }}>
                  bcbranchout@gmail.com
                </span>
              </div>
              
              <div className="text-gray-600">
                <p>Expected launch: <span className="font-semibold">2-3 weeks</span></p>
                <p className="mt-2">Boston College • Connecting Strangers</p>
              </div>
            </div>

            <SpotlightCard className="inline-block">
              <button 
                onClick={() => setCurrentPage('onboarding')}
                className="px-8 py-3 text-white font-semibold rounded-full"
                style={{ background: 'transparent' }}
              >
                Join the Movement!
              </button>
            </SpotlightCard>
          </div>
        </div>
      </div>

      {/* Footer - Updated Design */}
      <div className="py-16 text-center text-white relative" style={{ backgroundColor: '#167a5f' }}>
        {/* Decorative circles */}
        <div className="absolute top-8 right-20 w-4 h-4 bg-pink-400 rounded-full opacity-80"></div>
        <div className="absolute top-12 right-8 w-2 h-2 bg-white rounded-full opacity-60"></div>
        
        <h2 className="text-4xl font-bold mb-8">Meet strangers. Expand your perspectives.</h2>
        <SpotlightCard className="inline-block" spotlightColor="rgba(255, 255, 255, 0.25)">
          <button 
            onClick={() => setCurrentPage('onboarding')}
            className="px-8 py-3 text-gray-900 font-semibold rounded-lg bg-white"
          >
            Meet People Now!
          </button>
        </SpotlightCard>
        
        <div className="mt-8 text-sm opacity-80">
          Connecting Strangers • Boston College • bcbranchout@gmail.com
        </div>
      </div>
    </div>
  );

  // Onboarding Page
  const OnboardingPage = () => {
    const [formData, setFormData] = useState({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      year_of_study: '',
      school: 'Boston College'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
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

        const result = await response.json();

        if (response.ok) {
          setSubmitStatus('success');
          setTimeout(() => {
            setCurrentPage('connect');
            setTimeout(() => scrollToSection('waitlist'), 100);
          }, 2000);
        } else {
          setSubmitStatus('error');
        }
      } catch (error) {
        console.error('Submission error:', error);
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#eeebe3' }}>
        
        <header className="p-6 flex items-center relative z-10">
          <button 
            onClick={() => setCurrentPage('landing')}
            className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#167a5f" strokeWidth="2">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          <div className="flex items-center">
            <img 
              src="/Logo Full.png" 
              alt="BranchOut" 
              style={{ 
                height: '40px', 
                width: 'auto'
              }}
            />
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-6 relative z-10">
          <div className="max-w-md mx-auto w-full">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4" style={{ color: '#167a5f' }}>Join BranchOut</h2>
              <p className="text-gray-600">Tell us a bit about yourself to get started</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
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
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select your year</option>
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

              <SpotlightCard>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full text-white font-semibold text-lg transition-all duration-300 hover:scale-105 transform cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  style={{ background: 'transparent' }}
                >
                  {isSubmitting ? 'Joining...' : 'Continue'}
                </button>
              </SpotlightCard>
            </form>
          </div>
        </main>
      </div>
    );
  };

  // Render current page
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'connect':
        return <ConnectPage />;
      case 'about':
        return <AboutPage />;
      case 'support':
        return <SupportPage />;
      case 'onboarding':
        return <OnboardingPage />;
      default:
        return <LandingPage />;
    }
  };

  return renderCurrentPage();
};

export default BranchOutApp;

