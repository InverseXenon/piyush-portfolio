import { useState, useEffect, useMemo } from 'react';
import emailjs from '@emailjs/browser';
import { FaLinkedin, FaGithub, FaInstagram, FaBars, FaTimes, FaDownload, FaExternalLinkAlt, FaEye, FaCode, FaBrain, FaRocket, FaAward, FaEnvelope, FaPhone, FaMapMarkerAlt, FaKeyboard, FaClock, FaChartLine, FaTrophy, FaBullseye, FaPlay, FaRedo, FaHistory } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import confetti from 'canvas-confetti';
import './index.css';

// Custom Hook for Media Query


// Animation Variants
const sectionVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};



function App() {
  const [theme, setTheme] = useState('dark');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userCount, setUserCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);


  // Typing Speed Test States
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [inputText, setInputText] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [sessionRecords, setSessionRecords] = useState([]);



  const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "Technology is advancing rapidly in today's world.",
    "Learning to type faster improves productivity significantly.",
    "Practice makes perfect in all aspects of life.",
    "Programming requires both logic and creativity.",
    "Artificial intelligence is transforming various industries.",
    "Good communication skills are essential for success.",
    "Innovation drives progress in modern society.",
    "Education opens doors to countless opportunities.",
    "Perseverance is the key to achieving goals."
  ];

  // Memoized project data for better performance
  const projects = useMemo(() => [
    {
      id: 1,
      title: 'Research Collaboration Hub',
      description: 'Constructed real-time collaborative text editor using Quill.js and WebSocket technology, supporting 15+ simultaneous users with operational transformation algorithms.',
      details: 'Built for seamless research collaboration with conflict-free document synchronization, eliminating editing conflicts by 100%. Features secure Clerk OAuth authentication with role-based permissions managing 30+ researcher accounts.',
      technologies: ['React.js', 'Quill.js', 'WebSocket', 'Node.js', 'MongoDB', 'Clerk Auth'],
      github: 'https://github.com/InverseXenon/collaborato',
      demo: null,
      image: '/collaborative-research-placeholder.png',
      impact: '15+ simultaneous users',
      category: 'Full-Stack Development',
      metrics: ['100% conflict elimination', '30+ user accounts', '15+ concurrent users']
    },
    {
      id: 2,
      title: 'Women\'s Safety Application',
      description: 'Crafted location-based safety application for Syrus Hackathon, securing judge recognition among 50+ competing teams with mobile-first design.',
      details: 'Assembled responsive user interface achieving 100% compatibility across 12+ devices. Integrated geolocation APIs with Leaflet.js for real-time location tracking, decreasing emergency response time by 30%.',
      technologies: ['React.js', 'Leaflet.js', 'Node.js', 'Express.js', 'MongoDB', 'Geolocation APIs'],
      github: 'https://github.com/InverseXenon/Astitva',
      demo: null,
      image: '/astitva-safety-placeholder.jpg',
      impact: 'Top 50+ teams recognition',
      category: 'Full-Stack Development',
      metrics: ['100% device compatibility', '30% faster response time', '12+ devices tested']
    },
    {
      id: 3,
      title: 'Deepfake Detection System',
      description: 'Analyzed 800+ video frames from FaceForensics++ dataset using OpenCV preprocessing, extracting 50+ facial features per frame with 85% detection accuracy.',
      details: 'Delivered end-to-end web application with React.js frontend and Flask REST API backend, processing 100+ video uploads during testing. Optimized CNN-LSTM neural network achieving 92% precision rate.',
      technologies: ['Python', 'OpenCV', 'Keras', 'TensorFlow', 'React.js', 'Flask'],
      github: 'https://github.com/InverseXenon/deepfake-detector-frontend',
      githubBackend: 'https://github.com/InverseXenon/deepfake-detector-backend',
      demo: null,
      image: '/deepfake-detector-placeholder.jpg',
      impact: '85% accuracy achieved',
      category: 'AI/Machine Learning',
      metrics: ['800+ frames analyzed', '85% detection accuracy', '92% precision rate']
    }
  ], []);

  const generateRandomText = () => {
    // Select 2-3 random sentences for a good typing challenge
    const numSentences = Math.floor(Math.random() * 2) + 2; // 2 or 3 sentences
    let selectedSentences = [];
    
    for (let i = 0; i < numSentences; i++) {
      const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
      if (!selectedSentences.includes(randomSentence)) {
        selectedSentences.push(randomSentence);
      }
    }
    
    return selectedSentences.join(' ');
  };

  useEffect(() => {
    const storedRecords = sessionStorage.getItem('typingRecords');
    if (storedRecords) {
      setSessionRecords(JSON.parse(storedRecords));
    }
  }, []);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const userInterval = setInterval(() => {
      setUserCount((prev) => (prev < 50 ? prev + 1 : 50));
    }, 50);

          return () => {
        clearInterval(userInterval);
      };
  }, []);

  useEffect(() => {
    const storedCount = localStorage.getItem('visitorCount');
    const newCount = storedCount ? parseInt(storedCount) + 1 : 1;
    setVisitorCount(newCount);
    localStorage.setItem('visitorCount', newCount.toString());
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        name: e.target.name.value,
        email: e.target.email.value,
        message: e.target.message.value,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
      .then(() => alert('Message sent successfully!'))
      .catch((error) => {
        console.error('Failed to send message:', error);
        alert('Failed to send message. Please try again.');
      });
    e.target.reset();
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const startGame = () => {
    const randomText = generateRandomText();
    setCurrentText(randomText);
    setGameStarted(true);
    setGameOver(false);
    setInputText('');
    setWpm(0);
    setAccuracy(0);
    setStartTime(Date.now());
  };

  const handleInputChange = (e) => {
    if (!gameStarted || gameOver) return;
    const value = e.target.value;
    setInputText(value);

    // Calculate real-time WPM and accuracy
    if (value.length > 0) {
      const currentTime = Date.now();
      const timeTaken = (currentTime - startTime) / 1000 / 60; // in minutes
      const wordsTyped = value.trim().split(/\s+/).length;
      const realTimeWpm = timeTaken > 0 ? Math.round(wordsTyped / timeTaken) : 0;
      setWpm(realTimeWpm);

      // Calculate real-time accuracy
      let correctChars = 0;
      for (let i = 0; i < Math.min(value.length, currentText.length); i++) {
        if (value[i] === currentText[i]) {
          correctChars++;
        }
      }
      const realTimeAccuracy = value.length > 0 ? Math.round((correctChars / value.length) * 100) : 100;
      setAccuracy(realTimeAccuracy);
    }

    // Check if test is complete
    if (value === currentText) {
      setGameOver(true);
      const endTime = Date.now();
      const timeTaken = (endTime - startTime) / 1000 / 60;
      const words = currentText.split(/\s+/).length;
      const finalWpm = Math.round(words / timeTaken);
      setWpm(finalWpm);

      let correctChars = 0;
      for (let i = 0; i < currentText.length; i++) {
        if (value[i] === currentText[i]) {
          correctChars++;
        }
      }
      const finalAccuracy = Math.round((correctChars / currentText.length) * 100);
      setAccuracy(finalAccuracy);

      const newRecord = { 
        wpm: finalWpm, 
        accuracy: finalAccuracy, 
        timestamp: new Date().toLocaleString(),
        timeTaken: Math.round((endTime - startTime) / 1000)
      };
      const updatedRecords = [...sessionRecords, newRecord].slice(-5);
      setSessionRecords(updatedRecords);
      sessionStorage.setItem('typingRecords', JSON.stringify(updatedRecords));

      // Celebration for excellent performance
      if (finalWpm >= 40 && finalAccuracy >= 90) {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B']
        });
      } else if (finalWpm >= 30) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setInputText('');
    setWpm(0);
    setAccuracy(0);
    setCurrentText('');
  };

  const handlePaste = (e) => {
    e.preventDefault();
    alert('Pasting is not allowed! Please type the text manually.');
  };

  const renderText = () => {
    return currentText.split('').map((char, index) => {
      let className = '';
      if (index < inputText.length) {
        className = inputText[index] === char ? 'text-green-500' : 'text-red-500';
      }
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  const handleProjectKeyDown = (e, project) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(project);
    }
  };



  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="flex flex-col items-center space-y-4">
          <div className="loader" role="status" aria-label="Loading"></div>
          <p className="text-white text-lg font-medium">Loading Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen overflow-x-hidden ${theme === 'dark' ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-indigo-900' : 'bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50'} text-${theme === 'dark' ? 'white' : 'gray-900'} font-sans transition-all duration-500`}>
      <nav className={`fixed top-0 w-full ${theme === 'dark' ? 'bg-slate-900/95 border-slate-700/50' : 'bg-white/95 border-gray-200/50'} backdrop-blur-lg shadow-lg z-20 border-b`}>
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Piyush Patil
                </h1>
              </div>
            </div>
            <div className="flex items-center lg:hidden space-x-2">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'} transition-all duration-300 transform hover:scale-110`}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
              <button
                onClick={toggleMenu}
                className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-100 hover:bg-gray-200'} transition-all duration-300 text-xl`}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              >
                {menuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              {['Home', 'About', 'Experience', 'Skills', 'Projects', 'Achievements', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase().replace('-', '')}`} 
                  className={`relative py-2 px-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${theme === 'dark' ? 'hover:bg-slate-800 hover:text-blue-400' : 'hover:bg-gray-100 hover:text-blue-600'} group`}
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'} transition-all duration-300 transform hover:scale-110`}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </div>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`lg:hidden ${theme === 'dark' ? 'bg-slate-900/95' : 'bg-white/95'} backdrop-blur-lg border-t ${theme === 'dark' ? 'border-slate-700/50' : 'border-gray-200/50'}`}
          >
            <div className="flex flex-col items-center space-y-4 py-6">
              {['Home', 'About', 'Experience', 'Skills', 'Projects', 'Achievements', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase().replace('-', '')}`} 
                  className={`py-2 px-4 rounded-lg font-medium transition-all duration-300 ${theme === 'dark' ? 'hover:bg-slate-800 hover:text-blue-400' : 'hover:bg-gray-100 hover:text-blue-600'}`}
                  onClick={toggleMenu}
                >
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      <motion.section
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-1/4 left-1/4 w-64 h-64 ${theme === 'dark' ? 'bg-blue-500/10' : 'bg-blue-500/5'} rounded-full blur-3xl animate-pulse`}></div>
          <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 ${theme === 'dark' ? 'bg-purple-500/10' : 'bg-purple-500/5'} rounded-full blur-3xl animate-pulse delay-1000`}></div>
        </div>

        <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full relative z-10">
          <motion.div variants={childVariants} className="mb-8">
            <div className="relative inline-block">
              <motion.h1 
                className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Piyush Patil
              </motion.h1>
              <motion.div 
                className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-lg"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
            
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              AI & Data Science Innovator
            </motion.h2>
            
            <motion.p 
              className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Building the future with innovative web applications and cutting-edge AI solutions. 
              Passionate about creating impactful technology that solves real-world problems.
            </motion.p>
          </motion.div>

          <motion.div 
            variants={childVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          >
            <motion.a
              href="/New_Piyush_Resume.pdf"
              download
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload className="text-lg" />
              Download Resume
              <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.a>
            
            <motion.a
              href="#projects"
              className={`group inline-flex items-center gap-3 px-8 py-4 border-2 border-blue-500 hover:bg-blue-500 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${theme === 'dark' ? 'text-blue-400 hover:text-white' : 'text-blue-600 hover:text-white'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEye className="text-lg" />
              View Projects
            </motion.a>
          </motion.div>

          <motion.div 
            variants={childVariants}
            className="flex justify-center items-center space-x-6 mb-8"
          >
            {[
              { icon: FaLinkedin, href: "https://www.linkedin.com/in/piyush-patil-2665a3251/", color: "hover:text-blue-500" },
              { icon: FaGithub, href: "https://github.com/InverseXenon", color: "hover:text-gray-400" },
              { icon: FaInstagram, href: "https://www.instagram.com/pee.you.shhh/", color: "hover:text-pink-500" }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-3xl transition-all duration-300 transform hover:scale-125 ${social.color}`}
                whileHover={{ y: -5 }}
                aria-label={`Visit ${social.icon.name} profile`}
              >
                <social.icon />
              </motion.a>
            ))}
          </motion.div>

          <motion.div 
            variants={childVariants}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'} backdrop-blur-sm border ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'}`}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">
              Portfolio Visitors: <span className="font-bold text-blue-500">{visitorCount}</span>
            </span>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className={`w-6 h-10 border-2 ${theme === 'dark' ? 'border-gray-400' : 'border-gray-600'} rounded-full flex justify-center`}>
            <div className={`w-1 h-3 ${theme === 'dark' ? 'bg-gray-400' : 'bg-gray-600'} rounded-full mt-2 animate-bounce`}></div>
          </div>
        </motion.div>
      </motion.section>

      {/* Enhanced About Section */}
      <motion.section
        id="about"
        className="py-20 relative"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl w-full">
          <motion.div variants={childVariants} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={childVariants} className="relative">
              <div className="relative w-80 h-80 mx-auto">
                <img 
                  src="/Piyush.jpg" 
                  alt="Piyush Patil" 
                  className="w-full h-full object-cover rounded-2xl shadow-2xl" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl"></div>
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-lg"></div>
              </div>
            </motion.div>
            
            <motion.div variants={childVariants} className="space-y-6">
              <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'} backdrop-blur-sm border ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'} shadow-lg`}>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                  <FaBrain className="text-blue-500" />
                  Education & Excellence
                </h3>
                                 <p className="text-gray-300 leading-relaxed">
                   Third-year B.Tech student in <span className="text-blue-400 font-semibold">Artificial Intelligence & Data Science</span> at VESIT, Mumbai, 
                   maintaining a strong <span className="text-purple-400 font-semibold">CGPA of 8.55</span>.
                 </p>
              </div>
              
              <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'} backdrop-blur-sm border ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'} shadow-lg`}>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                  <FaAward className="text-purple-500" />
                  Certifications & Skills
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Certified in <span className="text-blue-400 font-semibold">Google Cloud Skills Boost</span>, 
                  <span className="text-purple-400 font-semibold"> AWS Academy Machine Learning</span>, and 
                  <span className="text-blue-400 font-semibold"> Deep Learning Fundamentals</span>.
                </p>
              </div>
              
              <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'} backdrop-blur-sm border ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'} shadow-lg`}>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                  <FaRocket className="text-green-500" />
                  Innovation & Impact
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Passionate hackathon participant with <span className="text-green-400 font-semibold">top 8 ranking</span> out of 200+ teams. 
                  Built solutions impacting <span className="text-purple-400 font-semibold">50+ users</span> across multiple projects.
                </p>
              </div>
              
              <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'} backdrop-blur-sm border ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'} shadow-lg`}>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
                  <FaCode className="text-yellow-500" />
                  Leadership & Community
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  PR Head at <span className="text-yellow-400 font-semibold">VESIT eSports</span>, boosting event participation by 
                  <span className="text-green-400 font-semibold"> 30%</span> and organizing tournaments for 100+ participants.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
              </motion.section>

      {/* Professional Experience Section */}
      <motion.section
        id="experience"
        className="py-20 relative"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl w-full">
          <motion.div variants={childVariants} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Professional Experience
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              Hands-on experience in full-stack development and cutting-edge technology solutions
            </p>
          </motion.div>
          
          <div className="space-y-8">
            {/* Experience 1 */}
            <motion.div 
              variants={childVariants}
              className={`p-8 rounded-2xl ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'} backdrop-blur-sm border ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'} shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-blue-400">Frontend Developer Intern</h3>
                  <p className="text-xl text-gray-300 mt-1">IDMS Infotech</p>
                  <p className="text-gray-400">Mumbai, India</p>
                </div>
                <div className="text-right mt-4 lg:mt-0">
                  <p className="text-purple-400 font-semibold">June 2025 – Present</p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full mt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm font-medium">Current Position</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Architected Company Registration Form with React.js featuring tabbed interface and validation, <span className="text-blue-400 font-semibold">reducing data entry time by 40%</span></p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Engineered Minutes of Meeting application with real-time audio streaming and transcription, <span className="text-purple-400 font-semibold">processing 100+ hours of audio data</span></p>
                </div>
              </div>
            </motion.div>

            {/* Experience 2 */}
            <motion.div 
              variants={childVariants}
              className={`p-8 rounded-2xl ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'} backdrop-blur-sm border ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'} shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-blue-400">Project Development Intern</h3>
                  <p className="text-xl text-gray-300 mt-1">Panache Digilife</p>
                  <p className="text-gray-400">Mumbai, India</p>
                </div>
                <div className="text-right mt-4 lg:mt-0">
                  <p className="text-purple-400 font-semibold">Jan. 2025 – Present</p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full mt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-400 text-sm font-medium">Current Position</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Deployed ESP32-based IoT air quality monitoring system tracking <span className="text-green-400 font-semibold">9 environmental metrics from 2 sensors with 99.2% uptime</span></p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Accelerated Firebase database performance through strategic indexing, <span className="text-purple-400 font-semibold">reducing query response time by 15% for 50+ concurrent users</span></p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Enhanced Skills Section */}
      <motion.section
        id="skills"
        className={`py-20 relative ${theme === 'dark' ? 'bg-slate-900/30' : 'bg-gray-50/30'}`}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl w-full">
          <motion.div variants={childVariants} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Technical Skills
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              Technologies I'm actively learning and improving - honest skill assessment
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
              <span>Skill Level:</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
              </div>
              <span>2-3/5 (Intermediate)</span>
            </div>
          </motion.div>
          
                     <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
             {/* Programming Languages */}
             <motion.div 
               variants={childVariants} 
               className={`group p-6 rounded-2xl ${theme === 'dark' ? 'bg-slate-800/50 hover:bg-slate-800/70' : 'bg-white/50 hover:bg-white/70'} backdrop-blur-sm border ${theme === 'dark' ? 'border-slate-700 hover:border-blue-500/50' : 'border-gray-200 hover:border-blue-400/50'} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
             >
               <div className="flex items-center gap-3 mb-4">
                 <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                   <FaCode className="text-white text-lg" />
                 </div>
                 <h3 className="text-lg font-bold">Languages</h3>
               </div>
               <div className="space-y-2">
                 {[
                   { name: 'Python', level: 3 },
                   { name: 'JavaScript', level: 3 },
                   { name: 'Java', level: 2 },
                   { name: 'TypeScript', level: 2 },
                   { name: 'C', level: 2 },
                   { name: 'HTML5', level: 3 },
                   { name: 'CSS3', level: 3 },
                   { name: 'SQL', level: 2 }
                 ].map((skill, index) => (
                   <div key={index} className="flex items-center justify-between">
                     <span className="text-gray-300 text-sm">{skill.name}</span>
                     <div className="flex space-x-1">
                       {[...Array(5)].map((_, i) => (
                         <div 
                           key={i} 
                           className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i < skill.level ? 'bg-blue-500 shadow-sm shadow-blue-500/50' : 'bg-gray-600'}`}
                         />
                       ))}
                     </div>
                   </div>
                 ))}
               </div>
             </motion.div>

             {/* Frameworks & Libraries */}
             <motion.div 
               variants={childVariants} 
               className={`group p-6 rounded-2xl ${theme === 'dark' ? 'bg-slate-800/50 hover:bg-slate-800/70' : 'bg-white/50 hover:bg-white/70'} backdrop-blur-sm border ${theme === 'dark' ? 'border-slate-700 hover:border-purple-500/50' : 'border-gray-200 hover:border-purple-400/50'} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
             >
               <div className="flex items-center gap-3 mb-4">
                 <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                   <FaRocket className="text-white text-lg" />
                 </div>
                 <h3 className="text-lg font-bold">Frameworks</h3>
               </div>
               <div className="space-y-2">
                 {[
                   { name: 'React.js', level: 3 },
                   { name: 'Flask', level: 3 },
                   { name: 'Node.js', level: 1 },
                   { name: 'Express.js', level: 1 },
                   { name: 'TensorFlow', level: 3 },
                   { name: 'scikit-learn', level: 2 },
                   { name: 'OpenCV', level: 3 },
                   { name: 'Quill.js', level: 2 }
                 ].map((skill, index) => (
                   <div key={index} className="flex items-center justify-between">
                     <span className="text-gray-300 text-sm">{skill.name}</span>
                     <div className="flex space-x-1">
                       {[...Array(5)].map((_, i) => (
                         <div 
                           key={i} 
                           className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i < skill.level ? 'bg-purple-500 shadow-sm shadow-purple-500/50' : 'bg-gray-600'}`}
                         />
                       ))}
                     </div>
                   </div>
                 ))}
               </div>
             </motion.div>

             {/* Databases & Cloud */}
             <motion.div 
               variants={childVariants} 
               className={`group p-6 rounded-2xl ${theme === 'dark' ? 'bg-slate-800/50 hover:bg-slate-800/70' : 'bg-white/50 hover:bg-white/70'} backdrop-blur-sm border ${theme === 'dark' ? 'border-slate-700 hover:border-green-500/50' : 'border-gray-200 hover:border-green-400/50'} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
             >
               <div className="flex items-center gap-3 mb-4">
                 <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                   <FaBrain className="text-white text-lg" />
                 </div>
                 <h3 className="text-lg font-bold">Databases & Cloud</h3>
               </div>
               <div className="space-y-2">
                 {[
                   { name: 'MongoDB', level: 3 },
                   { name: 'Firebase', level: 3 },
                   { name: 'MySQL', level: 2 },
                   { name: 'AWS', level: 2 },
                   { name: 'Pandas', level: 3 },
                   { name: 'NumPy', level: 3 }
                 ].map((skill, index) => (
                   <div key={index} className="flex items-center justify-between">
                     <span className="text-gray-300 text-sm">{skill.name}</span>
                     <div className="flex space-x-1">
                       {[...Array(5)].map((_, i) => (
                         <div 
                           key={i} 
                           className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i < skill.level ? 'bg-green-500 shadow-sm shadow-green-500/50' : 'bg-gray-600'}`}
                         />
                       ))}
                     </div>
                   </div>
                 ))}
               </div>
             </motion.div>

             {/* Development Tools */}
             <motion.div 
               variants={childVariants} 
               className={`group p-6 rounded-2xl ${theme === 'dark' ? 'bg-slate-800/50 hover:bg-slate-800/70' : 'bg-white/50 hover:bg-white/70'} backdrop-blur-sm border ${theme === 'dark' ? 'border-slate-700 hover:border-yellow-500/50' : 'border-gray-200 hover:border-yellow-400/50'} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
             >
               <div className="flex items-center gap-3 mb-4">
                 <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                   <FaCode className="text-white text-lg" />
                 </div>
                 <h3 className="text-lg font-bold">Dev Tools</h3>
               </div>
               <div className="space-y-2">
                 {[
                   { name: 'Git', level: 3 },
                   { name: 'GitHub', level: 3 },
                   { name: 'VS Code', level: 3 },
                   { name: 'WebSocket', level: 2 },
                   { name: 'REST APIs', level: 2 },
                   { name: 'Socket.IO', level: 2 }
                 ].map((skill, index) => (
                   <div key={index} className="flex items-center justify-between">
                     <span className="text-gray-300 text-sm">{skill.name}</span>
                     <div className="flex space-x-1">
                       {[...Array(5)].map((_, i) => (
                         <div 
                           key={i} 
                           className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i < skill.level ? 'bg-yellow-500 shadow-sm shadow-yellow-500/50' : 'bg-gray-600'}`}
                         />
                       ))}
                     </div>
                   </div>
                 ))}
               </div>
             </motion.div>
           </div>

                     {/* Professional Metrics */}
           <motion.div variants={childVariants} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
             {[
               { label: 'Video Frames Analyzed', value: '800+', icon: FaBrain, desc: 'AI Model Training' },
               { label: 'Concurrent Users', value: '15+', icon: FaRocket, desc: 'Real-time Collaboration' },
               { label: 'Audio Hours Processed', value: '100+', icon: FaCode, desc: 'Transcription System' },
               { label: 'Detection Accuracy', value: '85%', icon: FaAward, desc: 'Deepfake Detection' }
             ].map((stat, index) => (
               <div key={index} className="text-center">
                 <div className="flex justify-center mb-3">
                   <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                     <stat.icon className="text-white text-2xl" />
                   </div>
                 </div>
                 <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                   {stat.value}
                 </div>
                 <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                 <div className="text-gray-500 text-xs">{stat.desc}</div>
               </div>
             ))}
           </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="projects"
        className="py-16 sm:py-20 pt-20 sm:pt-24 relative projects-bg-glow"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
          <motion.div variants={childVariants} className="text-center mb-20">
            <h2 className="text-5xl sm:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Interactive showcase of my development journey - hover to explore each project
            </p>
          </motion.div>

          {/* Interactive Project Stats */}
          <motion.div variants={childVariants} className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 max-w-4xl mx-auto">
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-blue-500/50">
                <span className="text-2xl font-bold text-white">{userCount}+</span>
              </div>
              <p className="text-gray-400 font-medium">Users Impacted</p>
            </div>
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-purple-500/50">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <p className="text-gray-400 font-medium">Major Projects</p>
            </div>
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-green-500/50">
                <span className="text-2xl font-bold text-white">85%</span>
              </div>
              <p className="text-gray-400 font-medium">Success Rate</p>
            </div>
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-yellow-500/50">
                <span className="text-2xl font-bold text-white">24/7</span>
              </div>
              <p className="text-gray-400 font-medium">Learning Mode</p>
            </div>
          </motion.div>
          {/* Revolutionary 3D Project Showcase */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={childVariants}
                className="group relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <Tilt
                  tiltMaxAngleX={15}
                  tiltMaxAngleY={15}
                  scale={1.02}
                  transitionSpeed={450}
                  className="h-full"
                >
                  <div 
                    className={`relative h-[28rem] rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 transform group-hover:scale-105 ${theme === 'dark' ? 'bg-gradient-to-br from-slate-800/90 to-slate-900/90' : 'bg-gradient-to-br from-white/90 to-gray-100/90'} backdrop-blur-lg border ${theme === 'dark' ? 'border-slate-700/50 group-hover:border-blue-500/50' : 'border-gray-200/50 group-hover:border-blue-400/50'} shadow-xl group-hover:shadow-2xl group-hover:shadow-blue-500/20`}
                    onClick={() => openModal(project)}
                    onKeyDown={(e) => handleProjectKeyDown(e, project)}
                    tabIndex={0}
                    role="button"
                    aria-label={`View details of ${project.title}`}
                  >
                    {/* Project Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                                             {/* Floating Category Badge */}
                       <div className="absolute top-4 right-4 z-10">
                         <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                           project.category === 'Full-Stack Development' ? 'bg-blue-500/80 text-blue-100' :
                           'bg-purple-500/80 text-purple-100'
                         } backdrop-blur-sm`}>
                           {project.category}
                         </span>
                       </div>
                      
                      {/* Overlay Icons */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                          <FaEye className="text-white text-2xl" />
                        </div>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6 h-56 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                          {project.description}
                        </p>
                      </div>
                      
                      {/* Technology Stack */}
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech, techIndex) => (
                            <span 
                              key={techIndex}
                              className={`px-2 py-1 text-xs rounded-md ${theme === 'dark' ? 'bg-slate-700 text-slate-300' : 'bg-gray-200 text-gray-700'} transition-all duration-300 group-hover:bg-blue-500 group-hover:text-white`}
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="px-2 py-1 text-xs rounded-md bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                              +{project.technologies.length - 3} more
                            </span>
                          )}
                        </div>
                        
                        {/* Impact Metric */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Impact:</span>
                          <span className="text-sm font-semibold text-blue-400">{project.impact}</span>
                        </div>
                      </div>
                    </div>

                    
                  </div>
                </Tilt>
              </motion.div>
            ))}




          </div>
        </div>
      </motion.section>

      <motion.section
        id="achievements"
        className="py-16 sm:py-20 pt-20 sm:pt-24"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl w-full">
          <motion.div variants={childVariants} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Achievements & Recognition
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              Awards and recognitions that showcase my commitment to excellence
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              variants={childVariants} 
              className={`group p-8 rounded-2xl ${theme === 'dark' ? 'bg-slate-800/50 hover:bg-slate-800/70' : 'bg-white/50 hover:bg-white/70'} backdrop-blur-sm border ${theme === 'dark' ? 'border-slate-700 hover:border-yellow-500/50' : 'border-gray-200 hover:border-yellow-400/50'} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <FaAward className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-yellow-400">1st Place</h3>
                  <p className="text-gray-400 text-sm">2023</p>
                </div>
              </div>
              <h4 className="text-lg font-semibold mb-3">Awakening the Scientist 2023</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                First place winner for air purifier enhancement project demonstrating <span className="text-yellow-400 font-semibold">measurable environmental impact</span>
              </p>
            </motion.div>

            <motion.div 
              variants={childVariants} 
              className={`group p-8 rounded-2xl ${theme === 'dark' ? 'bg-slate-800/50 hover:bg-slate-800/70' : 'bg-white/50 hover:bg-white/70'} backdrop-blur-sm border ${theme === 'dark' ? 'border-slate-700 hover:border-blue-500/50' : 'border-gray-200 hover:border-blue-400/50'} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <FaAward className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-400">1st Place</h3>
                  <p className="text-gray-400 text-sm">2025</p>
                </div>
              </div>
              <h4 className="text-lg font-semibold mb-3">Deep Reads 2025</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Winner of technical presentation competition showcasing <span className="text-blue-400 font-semibold">PEGASUS model for automated text summarization</span>
              </p>
            </motion.div>

            <motion.div 
              variants={childVariants} 
              className={`group p-8 rounded-2xl ${theme === 'dark' ? 'bg-slate-800/50 hover:bg-slate-800/70' : 'bg-white/50 hover:bg-white/70'} backdrop-blur-sm border ${theme === 'dark' ? 'border-slate-700 hover:border-green-500/50' : 'border-gray-200 hover:border-green-400/50'} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <FaBrain className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-400">Top 5 Finalist</h3>
                  <p className="text-gray-400 text-sm">2025</p>
                </div>
              </div>
              <h4 className="text-lg font-semibold mb-3">Hack-AI-Thon 2025</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Developed AI-powered ERP system with <span className="text-green-400 font-semibold">Retrieval-Augmented Generation for intelligent data retrieval</span>
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="mini-game"
        className="py-16 sm:py-20 pt-20 sm:pt-24 relative"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl w-full">
          <motion.div variants={childVariants} className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-transparent">
              Typing Speed Challenge
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-600 mx-auto rounded-full"></div>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              Test your typing speed and accuracy with our interactive challenge
            </p>
          </motion.div>

          <motion.div 
            variants={childVariants} 
            className={`relative p-8 rounded-2xl ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'} backdrop-blur-sm border ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'} shadow-xl`}
          >
            {!gameStarted && !gameOver && (
              <div className="text-center space-y-6">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                    <FaKeyboard className="text-white text-3xl" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold">Ready to Test Your Speed?</h3>
                <p className="text-gray-400 max-w-lg mx-auto leading-relaxed">
                  Type the displayed text as quickly and accurately as possible. 
                  You'll get real-time feedback on your words per minute (WPM) and accuracy percentage.
                </p>
                <div className="grid md:grid-cols-3 gap-4 my-8">
                  <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-100'} text-center`}>
                    <FaClock className="text-2xl text-blue-500 mx-auto mb-2" />
                    <p className="font-semibold">Time-based</p>
                    <p className="text-sm text-gray-400">Complete the text</p>
                  </div>
                  <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-100'} text-center`}>
                    <FaChartLine className="text-2xl text-green-500 mx-auto mb-2" />
                    <p className="font-semibold">Real-time Stats</p>
                    <p className="text-sm text-gray-400">WPM & Accuracy</p>
                  </div>
                  <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-100'} text-center`}>
                    <FaTrophy className="text-2xl text-yellow-500 mx-auto mb-2" />
                    <p className="font-semibold">Track Progress</p>
                    <p className="text-sm text-gray-400">Session records</p>
                  </div>
                </div>
                <button
                  onClick={startGame}
                  className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <FaPlay className="inline mr-2" />
                  Start Typing Challenge
                  <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            )}

            {(gameStarted || gameOver) && (
              <div className="space-y-6">
                {/* Real-time Stats */}
                {gameStarted && !gameOver && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-100'} text-center`}>
                      <FaClock className="text-blue-500 mx-auto mb-1" />
                      <p className="text-sm text-gray-400">Time</p>
                      <p className="font-bold">{Math.floor((Date.now() - startTime) / 1000)}s</p>
                    </div>
                    <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-100'} text-center`}>
                      <FaChartLine className="text-green-500 mx-auto mb-1" />
                      <p className="text-sm text-gray-400">WPM</p>
                      <p className="font-bold">{wpm}</p>
                    </div>
                    <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-100'} text-center`}>
                      <FaBullseye className="text-purple-500 mx-auto mb-1" />
                      <p className="text-sm text-gray-400">Accuracy</p>
                      <p className="font-bold">{accuracy}%</p>
                    </div>
                    <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-100'} text-center`}>
                      <FaKeyboard className="text-orange-500 mx-auto mb-1" />
                      <p className="text-sm text-gray-400">Progress</p>
                      <p className="font-bold">{Math.round((inputText.length / currentText.length) * 100)}%</p>
                    </div>
                  </div>
                )}

                {/* Text Display */}
                <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-gray-50'} border-2 ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'}`}>
                  <div className="font-mono text-lg leading-relaxed">
                    {renderText()}
                  </div>
                </div>

                                 {/* Input Area */}
                 <div className="relative">
                   <textarea
                     value={inputText}
                     onChange={handleInputChange}
                     onPaste={handlePaste}
                     placeholder="Start typing the text above..."
                     className={`w-full p-4 rounded-xl font-mono text-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${theme === 'dark' ? 'bg-slate-700 text-white placeholder-gray-400 border-slate-600' : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300'} border-2`}
                     disabled={gameOver}
                     autoFocus={gameStarted}
                   />
                   {gameStarted && !gameOver && (
                     <div className="absolute top-2 right-2">
                       <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                     </div>
                   )}
                 </div>

                 {/* Submit Early Button */}
                 {gameStarted && !gameOver && inputText.length > 0 && (
                   <div className="flex justify-center">
                     <button
                       onClick={() => {
                         // Force complete the test with current progress
                         setGameOver(true);
                         const endTime = Date.now();
                         const timeTaken = (endTime - startTime) / 1000 / 60;
                         const wordsTyped = inputText.trim().split(/\s+/).length;
                         const finalWpm = Math.round(wordsTyped / timeTaken);
                         setWpm(finalWpm);

                         // Calculate final accuracy based on typed text
                         let correctChars = 0;
                         for (let i = 0; i < Math.min(inputText.length, currentText.length); i++) {
                           if (inputText[i] === currentText[i]) {
                             correctChars++;
                           }
                         }
                         const finalAccuracy = inputText.length > 0 ? Math.round((correctChars / inputText.length) * 100) : 0;
                         setAccuracy(finalAccuracy);

                         const newRecord = { 
                           wpm: finalWpm, 
                           accuracy: finalAccuracy, 
                           timestamp: new Date().toLocaleString(),
                           timeTaken: Math.round((endTime - startTime) / 1000),
                           incomplete: true
                         };
                         const updatedRecords = [...sessionRecords, newRecord].slice(-5);
                         setSessionRecords(updatedRecords);
                         sessionStorage.setItem('typingRecords', JSON.stringify(updatedRecords));

                         // Celebration for good early submission
                         if (finalWpm >= 25 && finalAccuracy >= 85) {
                           confetti({
                             particleCount: 80,
                             spread: 60,
                             origin: { y: 0.6 },
                           });
                         }
                       }}
                       className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                     >
                       <FaPlay className="inline mr-2 rotate-90" />
                       Submit Early
                     </button>
                   </div>
                 )}

                {/* Game Complete */}
                {gameOver && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6 p-6 rounded-xl bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20"
                  >
                    <div className="flex justify-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                        <FaTrophy className="text-white text-2xl" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold">Challenge Complete!</h3>
                    
                    <div className="grid md:grid-cols-2 gap-6 max-w-md mx-auto">
                      <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} shadow-lg`}>
                        <FaChartLine className="text-green-500 text-2xl mx-auto mb-2" />
                        <p className="text-2xl font-bold text-green-500">{wpm}</p>
                        <p className="text-sm text-gray-400">Words per Minute</p>
                      </div>
                      <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} shadow-lg`}>
                        <FaBullseye className="text-blue-500 text-2xl mx-auto mb-2" />
                        <p className="text-2xl font-bold text-blue-500">{accuracy}%</p>
                        <p className="text-sm text-gray-400">Accuracy</p>
                      </div>
                    </div>

                    {wpm >= 40 && accuracy >= 90 && (
                      <div className="text-center">
                        <p className="text-yellow-400 font-semibold mb-2">🎉 Excellent Performance!</p>
                        <p className="text-sm text-gray-400">You're a typing champion!</p>
                      </div>
                    )}
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={resetGame}
                        className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                      >
                        <FaRedo className="inline mr-2" />
                        Try Again
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* Session Records */}
            {sessionRecords.length > 0 && (
              <motion.div 
                variants={childVariants}
                className="mt-8 pt-6 border-t border-gray-600"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FaHistory className="text-blue-500" />
                  Recent Attempts
                </h3>
                                 <div className="grid gap-3">
                   {sessionRecords.slice(-3).reverse().map((record, index) => (
                     <div key={index} className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-slate-700/30' : 'bg-gray-100'} flex justify-between items-center`}>
                       <div>
                         <p className="font-semibold flex items-center gap-2">
                           Attempt #{sessionRecords.length - index}
                           {record.incomplete && (
                             <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full">
                               Early Submit
                             </span>
                           )}
                         </p>
                         <p className="text-sm text-gray-400">{record.timestamp}</p>
                       </div>
                       <div className="text-right">
                         <p className="font-bold text-green-500">{record.wpm} WPM</p>
                         <p className="text-sm text-blue-500">{record.accuracy}% accuracy</p>
                       </div>
                     </div>
                   ))}
                 </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.section>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={`p-4 sm:p-6 rounded-lg max-w-md sm:max-w-lg w-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'} overflow-y-auto max-h-[90vh]`}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-4">{selectedProject.title}</h3>
              <p className="mb-4 text-sm sm:text-base">{selectedProject.description}</p>
              <p className="mb-4 text-sm sm:text-base">{selectedProject.details}</p>
              <div className="flex flex-col space-y-2 mb-4">
                {selectedProject.github && (
                  <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500 flex items-center text-sm sm:text-base">
                    <FaGithub className="mr-1" /> {selectedProject.githubBackend ? 'Frontend' : 'GitHub'}
                  </a>
                )}
                {selectedProject.githubBackend && (
                  <a href={selectedProject.githubBackend} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500 flex items-center text-sm sm:text-base">
                    <FaGithub className="mr-1" /> Backend
                  </a>
                )}
              </div>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm sm:text-base"
                aria-label="Close project details modal"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Contact Section */}
      <motion.section
        id="contact"
        className="py-20 relative"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl w-full">
          <motion.div variants={childVariants} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Let's Connect
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              Ready to collaborate on your next project? Let's turn your ideas into reality
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div variants={childVariants} className="space-y-8">
              <div className={`p-8 rounded-2xl ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'} backdrop-blur-sm border ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'} shadow-lg`}>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <FaEnvelope className="text-blue-500" />
                  Get In Touch
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <FaEnvelope className="text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <a 
                        href="mailto:piyushpatil1741@gmail.com" 
                        className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
                      >
                        piyushpatil1741@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <FaPhone className="text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Phone</p>
                      <p className="text-white font-medium">+91-9405302470</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <FaMapMarkerAlt className="text-white" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Location</p>
                      <p className="text-white font-medium">Mumbai, India</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-600">
                  <p className="text-gray-400 mb-4">Follow me on social media</p>
                  <div className="flex space-x-4">
                    {[
                      { icon: FaLinkedin, href: "https://www.linkedin.com/in/piyush-patil-2665a3251/", color: "hover:text-blue-500", label: "LinkedIn" },
                      { icon: FaGithub, href: "https://github.com/InverseXenon", color: "hover:text-gray-400", label: "GitHub" },
                      { icon: FaInstagram, href: "https://www.instagram.com/pee.you.shhh/", color: "hover:text-pink-500", label: "Instagram" }
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 ${social.color}`}
                        whileHover={{ y: -3 }}
                        aria-label={`Visit ${social.label} profile`}
                      >
                        <social.icon className="text-xl" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div variants={childVariants}>
              <div className={`p-8 rounded-2xl ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white/50'} backdrop-blur-sm border ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'} shadow-lg`}>
                <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
                
                <form onSubmit={sendEmail} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        className={`w-full p-4 rounded-xl ${theme === 'dark' ? 'bg-slate-700/50 border-slate-600 text-white placeholder-gray-400' : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500'} border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                        required
                        aria-label="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        className={`w-full p-4 rounded-xl ${theme === 'dark' ? 'bg-slate-700/50 border-slate-600 text-white placeholder-gray-400' : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500'} border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                        required
                        aria-label="Enter your email"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Project Discussion"
                      className={`w-full p-4 rounded-xl ${theme === 'dark' ? 'bg-slate-700/50 border-slate-600 text-white placeholder-gray-400' : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500'} border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                      aria-label="Enter subject"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      placeholder="Tell me about your project ideas..."
                      rows="6"
                      className={`w-full p-4 rounded-xl ${theme === 'dark' ? 'bg-slate-700/50 border-slate-600 text-white placeholder-gray-400' : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500'} border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none`}
                      required
                      aria-label="Enter your message"
                    ></textarea>
                  </div>
                  
                  <motion.button
                    type="submit"
                    className="w-full py-4 px-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Send message"
                  >
                    <FaEnvelope />
                    Send Message
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className={`py-8 ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-gray-100/50'} backdrop-blur-sm border-t ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'}`}>
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl w-full">
          <div className="text-center">
            <p className="text-gray-400">
              © 2025 Piyush Patil. Built with ❤️ using React.js and Tailwind CSS.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Designed to inspire and connect. Let's build something amazing together.
            </p>
          </div>
        </div>
      </footer>

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="scroll-top-button"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  );
}

export default App;