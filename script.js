import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, User, Briefcase, FileText, Code, Send, 
  Phone, Mail, Linkedin, MapPin, Menu, X 
} from 'lucide-react';

const PortfolioWebsite = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredSection, setHoveredSection] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    const loadingTimer = setTimeout(() => setIsLoading(false), 2000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(loadingTimer);
    };
  }, []);

  const sections = [
    { key: 'home', icon: Home, label: 'Home' },
    { key: 'about', icon: User, label: 'About' },
    { key: 'experience', icon: Briefcase, label: 'Experience' },
    { key: 'education', icon: FileText, label: 'Education' },
    { key: 'projects', icon: Code, label: 'Projects' },
    { key: 'contact', icon: Send, label: 'Contact' }
  ];

  const renderSection = () => {
    const sectionComponents = {
      home: <HomeSection />,
      about: <AboutSection />,
      experience: <ExperienceSection />,
      education: <EducationSection />,
      projects: <ProjectsSection />,
      contact: <ContactSection />
    };
    return sectionComponents[activeSection];
  };

  const NavButton = ({ section, label, icon: Icon }) => (
    <motion.button
      onClick={() => {
        setActiveSection(section);
        setIsMobileMenuOpen(false);
      }}
      onMouseEnter={() => !isMobile && setHoveredSection(label)}
      onMouseLeave={() => !isMobile && setHoveredSection(null)}
      className={`relative p-3 mb-4 rounded-lg group ${
        activeSection === section 
          ? 'bg-blue-500 text-white' 
          : 'text-gray-500 hover:bg-gray-200'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon />
      {hoveredSection === label && !isMobile && (
        <motion.span 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute left-full ml-2 bg-black text-white text-xs px-2 py-1 rounded"
        >
          {label}
        </motion.span>
      )}
    </motion.button>
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Mobile Menu Toggle */}
      {isMobile && (
        <div className="fixed top-4 right-4 z-50">
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      )}

      {/* Sidebar Navigation */}
      <nav className={`
        ${isMobile 
          ? `fixed inset-0 bg-white z-40 flex flex-col items-center justify-center transition-transform transform 
             ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`
          : 'w-20 bg-white shadow-lg flex flex-col items-center py-8'
        }`}
      >
        {sections.map(({ key, icon, label }) => (
          <NavButton 
            key={key} 
            section={key} 
            label={label} 
            icon={icon} 
          />
        ))}
      </nav>

      {/* Main Content Area */}
      <main className={`
        flex-1 p-4 md:p-8 overflow-y-auto 
        ${isMobile ? 'mt-16' : ''} 
        ${isMobileMenuOpen && isMobile ? 'opacity-50' : ''}
      `}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};
