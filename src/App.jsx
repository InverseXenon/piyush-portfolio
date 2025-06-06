import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { FaLinkedin, FaGithub, FaInstagram, FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import confetti from 'canvas-confetti';
import './index.css';

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

const popUpVariants = {
  hidden: { opacity: 0, x: -50, scale: 0.8, rotate: -5 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.4, ease: 'easeOut', type: 'spring', stiffness: 100 },
    boxShadow: '0 10px 20px rgba(0, 0, 255, 0.2)'
  },
  exit: { opacity: 0, x: -50, scale: 0.8, rotate: -5, transition: { duration: 0.3, ease: 'easeIn' } },
};

const dotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
};

const lineVariants = {
  hidden: { height: 0 },
  visible: {
    height: '100%',
    transition: { duration: 1.5, ease: 'easeInOut' }
  },
};

function App() {
  const [theme, setTheme] = useState('dark');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userCount, setUserCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);
  const [hoveredProject, setHoveredProject] = useState(null);

  // Typing Speed Test States
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [inputText, setInputText] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [sessionRecords, setSessionRecords] = useState([]);

  const words = [
    'apple', 'blue', 'cat', 'dog', 'elephant', 'forest', 'green', 'house', 'ice', 'jump',
    'kite', 'lion', 'moon', 'nest', 'ocean', 'park', 'queen', 'river', 'sun', 'tree',
    'umbrella', 'violet', 'water', 'xray', 'yellow', 'zebra', 'bird', 'cloud', 'dance', 'echo'
  ];

  const project1 = {
    title: 'Collaborative Research Paper Drafter',
    description: 'Built a real-time text editor using React.js and Quill for Invictus Hackathon 2025. Integrated Clerk for secure authentication. Locally deployed, impacted 30+ users.',
    details: 'This project was developed during a 48-hour hackathon, focusing on seamless collaboration for research teams. It features real-time editing and secure user authentication.',
    github: 'https://github.com/InverseXenon/collaborato',
    demo: null,
    image: '/collaborative-research-placeholder.jpg'
  };

  const project2 = {
    title: 'Astitva - Women’s Services Platform',
    description: 'Developed a safety platform using React.js and OpenMap for Syrus Hackathon 2025. Tested by 20+ participants.',
    details: 'An all-in-one platform for women’s safety, featuring location-based services and emergency contacts. Ranked top 8 out of 200+ teams.',
    github: 'https://github.com/InverseXenon/Astitva',
    demo: null,
    image: '/astitva-safety-placeholder.jpg'
  };

  const project3 = {
    title: 'Deepfake Detection Model',
    description: 'Created a CNN-based model in Python, achieving 82% accuracy in detecting deepfakes.',
    details: 'Utilized convolutional neural networks to identify manipulated media, with a focus on video and image analysis. Achieved high accuracy through extensive training.',
    github: 'https://github.com/InverseXenon/deepfake-detector-frontend',
    githubBackend: 'https://github.com/InverseXenon/deepfake-detector-backend',
    demo: null,
    image: '/deepfake-detector-placeholder.jpg'
  };

  const generateRandomText = () => {
    let text = '';
    for (let i = 0; i < 10; i++) {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      text += randomWord + (i < 9 ? ' ' : '');
    }
    return text;
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
    const projectInterval = setInterval(() => {
      setProjectCount((prev) => (prev < 3 ? prev + 1 : 3));
    }, 500);
    return () => {
      clearInterval(userInterval);
      clearInterval(projectInterval);
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
    setHoveredProject(null);
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

    if (value === currentText) {
      setGameOver(true);
      const endTime = Date.now();
      const timeTaken = (endTime - startTime) / 1000 / 60;
      const words = currentText.split(/\s+/).length;
      const calculatedWpm = Math.round(words / timeTaken);
      setWpm(calculatedWpm);

      let correctChars = 0;
      for (let i = 0; i < currentText.length; i++) {
        if (value[i] === currentText[i]) {
          correctChars++;
        }
      }
      const calculatedAccuracy = Math.round((correctChars / currentText.length) * 100);
      setAccuracy(calculatedAccuracy);

      const newRecord = { wpm: calculatedWpm, accuracy: calculatedAccuracy, timestamp: new Date().toLocaleString() };
      const updatedRecords = [...sessionRecords, newRecord].slice(-5);
      setSessionRecords(updatedRecords);
      sessionStorage.setItem('typingRecords', JSON.stringify(updatedRecords));

      if (calculatedWpm > 50) {
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
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-blue-900' : 'bg-gradient-to-br from-gray-100 via-gray-200 to-blue-100'} text-${theme === 'dark' ? 'white' : 'gray-900'} font-sans transition-all duration-500`}>
      <nav className={`fixed top-0 w-full ${theme === 'dark' ? 'bg-opacity-30 bg-gray-800' : 'bg-opacity-30 bg-gray-200'} backdrop-blur-md shadow-lg z-20`}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">Piyush Patil </h1>
            </div>
            <div className="flex items-center lg:hidden">
              <button onClick={toggleTheme} className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'} transition transform hover:rotate-180 duration-300 mr-4`}>
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
              <button onClick={toggleMenu} className="text-2xl focus:outline-none">
                {menuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
            <div className="hidden lg:flex lg:items-center lg:space-x-4">
              <a href="#home" className="hover:text-blue-400 transition">Home</a>
              <a href="#about" className="hover:text-blue-400 transition">About</a>
              <a href="#skills" className="hover:text-blue-400 transition">Skills</a>
              <a href="#projects" className="hover:text-blue-400 transition">Major Projects</a>
              <a href="#achievements" className="hover:text-blue-400 transition">Achievements</a>
              <a href="#mini-game" className="hover:text-blue-400 transition">Mini-Game</a>
              <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
              <button onClick={toggleTheme} className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'} transition transform hover:rotate-180 duration-300`}>
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </div>
        {menuOpen && (
          <div className={`lg:hidden ${theme === 'dark' ? 'bg-opacity-90 bg-gray-800' : 'bg-opacity-90 bg-gray-200'} backdrop-blur-md`}>
            <div className="flex flex-col items-center space-y-4 py-4">
              <a href="#home" className="hover:text-blue-400 transition" onClick={toggleMenu}>Home</a>
              <a href="#about" className="hover:text-blue-400 transition" onClick={toggleMenu}>About</a>
              <a href="#skills" className="hover:text-blue-400 transition" onClick={toggleMenu}>Skills</a>
              <a href="#projects" className="hover:text-blue-400 transition" onClick={toggleMenu}>Major Projects</a>
              <a href="#achievements" className="hover:text-blue-400 transition" onClick={toggleMenu}>Achievements</a>
              <a href="#mini-game" className="hover:text-blue-400 transition" onClick={toggleMenu}>Mini-Game</a>
              <a href="#contact" className="hover:text-blue-400 transition" onClick={toggleMenu}>Contact</a>
            </div>
          </div>
        )}
      </nav>

      <motion.section
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 px-2"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center px-2 sm:px-4 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
          <motion.div variants={childVariants}>
            <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-2 fade-zoom-glow leading-tight">
              Piyush Patil 
            </h2>
            <br />
            <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 fade-zoom-glow-delayed leading-tight">
                AI & Data Science Innovator
            </h3>
          </motion.div>
          <motion.p variants={childVariants} className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-4 leading-relaxed">
            Building the future with innovative web and AI solutions.
          </motion.p>
          <motion.p variants={childVariants} className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-400 fade-in">
            Let’s create something impactful together!
          </motion.p>
          <motion.div variants={childVariants} className="mt-6">
            <a href="/New_Piyush_Resume.pdf" download className="inline-block px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition text-sm sm:text-base">
              Download Resume
            </a>
          </motion.div>
          <motion.div variants={childVariants} className="mt-4 text-xs sm:text-sm text-gray-400">
            Visitors: <span className="font-bold">{visitorCount}</span>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="about"
        className="py-20 pt-24"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full text-center">
          <motion.h2 variants={childVariants} className="text-4xl font-bold mb-8">About Me</motion.h2>
          <div className="flex flex-col items-center gap-8">
            <motion.div variants={childVariants} className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
              <img src="/Piyush.jpg" alt="Piyush Patil" className="w-full h-full object-cover rounded-lg neon-border mx-auto" />
            </motion.div>
            <motion.div variants={childVariants} className="max-w-3xl">
              <p className="text-lg">
                I’m a third-year B.Tech student in Artificial Intelligence & Data Science at VESIT, Mumbai, with a CGPA of 8.61.
                I’ve earned certifications from Google Cloud Skills Boost (Cloud Computing Fundamentals, GenAI), AWS Academy (Machine Learning Foundations), and a Fundamentals of Deep Learning certification.
                As a passionate hackathon participant, I ranked in the top 8 out of 200+ teams at the Syrus Hackathon 2025 with my Women’s Services Platform (Astitva) and developed a real-time text editor for the Invictus Hackathon 2025, impacting 30+ users.
                I also completed a Deepfake Detection Model project in early 2025, focusing on media analysis with CNNs.
                I serve as the PR Head and Tournament Organizer for VESIT eSports, where I’ve boosted event participation by 30% through strategic promotion on Instagram and Discord, coordinating 5+ tournaments for over 100 participants.
                My interests lie in web development, AI, and backend systems, and I’m always eager to tackle challenging projects that drive innovation.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="skills"
        className="py-20 pt-24"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
          <motion.h2 variants={childVariants} className="text-4xl font-bold mb-8 text-center">Skills</motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div variants={childVariants} className={`p-6 rounded-lg shadow-lg transform hover:scale-105 transition ${theme === 'dark' ? 'bg-opacity-50 bg-gray-700' : 'bg-opacity-50 bg-gray-300'}`}>
              <h3 className="text-xl font-semibold mb-2">Languages</h3>
              <p>Python, Java, JavaScript, C, HTML5/CSS3</p>
            </motion.div>
            <motion.div variants={childVariants} className={`p-6 rounded-lg shadow-lg transform hover:scale-105 transition ${theme === 'dark' ? 'bg-opacity-50 bg-gray-700' : 'bg-opacity-50 bg-gray-300'}`}>
              <h3 className="text-xl font-semibold mb-2">Frameworks & Libraries</h3>
              <p>React.js, Flask, Quill, OpenMap, Pandas</p>
            </motion.div>
            <motion.div variants={childVariants} className={`p-6 rounded-lg shadow-lg transform hover:scale-105 transition ${theme === 'dark' ? 'bg-opacity-50 bg-gray-700' : 'bg-opacity-50 bg-gray-300'}`}>
              <h3 className="text-xl font-semibold mb-2">Databases & Tools</h3>
              <p>MongoDB, Clerk, Git, GitHub, Firebase, Tableau</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="projects"
        className="py-20 pt-24 relative projects-bg-glow"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
          <motion.h2 variants={childVariants} className="text-4xl font-bold mb-8 text-center">Major Projects</motion.h2>
          <motion.div variants={childVariants} className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <p className="text-4xl font-bold counter">{userCount}+</p>
              <p>Users Impacted</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold counter">{projectCount}</p>
              <p>Projects Completed</p>
            </div>
          </motion.div>
          <div className="relative max-w-5xl mx-auto">
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 w-1 glow-line"
              variants={lineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            ></motion.div>

            {/* Project 1: Collaborative Research Paper Drafter */}
            <motion.div
              variants={childVariants}
              className="relative mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-center sm:justify-start"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 flex items-center justify-center"
                variants={dotVariants}
              >
                <div className={`w-6 h-6 rounded-full ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-400'} animate-pulse sparkle transition-all duration-300 ${hoveredProject === 'research-hub' ? 'scale-150 shadow-lg shadow-blue-600/70' : ''}`}></div>
              </motion.div>
              <Tilt tiltMaxAngleX={25} tiltMaxAngleY={25} scale={1.05} transitionSpeed={450}>
                <div
                  className={`w-full sm:w-96 p-4 rounded-lg shadow-lg cursor-pointer ${theme === 'dark' ? 'bg-opacity-50 bg-gray-700' : 'bg-opacity-50 bg-gray-300'} sm:ml-12`}
                  onMouseEnter={() => setHoveredProject('research-hub')}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => openModal(project1)}
                  onKeyDown={(e) => handleProjectKeyDown(e, project1)}
                  tabIndex={0}
                >
                  <h3 className="text-lg font-semibold">Collaborative Research Paper Drafter</h3>
                  <p className="text-sm text-gray-400">March 2, 2025</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="tech-badge tech-badge-react">React.js</span>
                    <span className="tech-badge tech-badge-quill">Quill</span>
                    <span className="tech-badge tech-badge-clerk">Clerk</span>
                  </div>
                </div>
              </Tilt>
              <AnimatePresence>
                {hoveredProject === 'research-hub' && (
                  <motion.div
                    variants={popUpVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute left-0 sm:left-[calc(50%+12rem)] top-full sm:top-0 mt-4 sm:mt-0 z-10 w-full sm:w-96"
                  >
                    <div className={`p-4 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}>
                      <img src="/collaborative-research-placeholder.png" alt="Collaborative Research Paper Drafter" className="w-full h-32 object-cover rounded-lg mb-2" />
                      <p className="text-sm">Real-time text editor with secure authentication.</p>
                      <a href="https://github.com/InverseXenon/collaborato" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500 flex items-center text-sm mt-2">
                        <FaGithub className="mr-1" /> GitHub
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Project 2: Astitva - Women’s Services Platform */}
            <motion.div
              variants={childVariants}
              className="relative mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-center sm:justify-end"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 flex items-center justify-center"
                variants={dotVariants}
              >
                <div className={`w-6 h-6 rounded-full ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-400'} animate-pulse sparkle transition-all duration-300 ${hoveredProject === 'astitva' ? 'scale-150 shadow-lg shadow-blue-600/70' : ''}`}></div>
              </motion.div>
              <Tilt tiltMaxAngleX={25} tiltMaxAngleY={25} scale={1.05} transitionSpeed={450}>
                <div
                  className={`w-full sm:w-96 p-4 rounded-lg shadow-lg cursor-pointer ${theme === 'dark' ? 'bg-opacity-50 bg-gray-700' : 'bg-opacity-50 bg-gray-300'} sm:mr-12`}
                  onMouseEnter={() => setHoveredProject('astitva')}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => openModal(project2)}
                  onKeyDown={(e) => handleProjectKeyDown(e, project2)}
                  tabIndex={0}
                >
                  <h3 className="text-lg font-semibold">Astitva - Women’s Services Platform</h3>
                  <p className="text-sm text-gray-400">March 29, 2025</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="tech-badge tech-badge-react">React.js</span>
                    <span className="tech-badge tech-badge-openmap">OpenMap</span>
                  </div>
                </div>
              </Tilt>
              <AnimatePresence>
                {hoveredProject === 'astitva' && (
                  <motion.div
                    variants={popUpVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute left-0 sm:left-auto sm:right-[calc(50%+12rem)] top-full sm:top-0 mt-4 sm:mt-0 z-10 w-full sm:w-96"
                  >
                    <div className={`p-4 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}>
                      <img src="/astitva-safety-placeholder.jpg" alt="Astitva - Women’s Services Platform" className="w-full h-32 object-cover rounded-lg mb-2" />
                      <p className="text-sm">Safety platform with location-based services.</p>
                      <a href="https://github.com/InverseXenon/Astitva" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500 flex items-center text-sm mt-2">
                        <FaGithub className="mr-1" /> GitHub
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Project 3: Deepfake Detection Model */}
            <motion.div
              variants={childVariants}
              className="relative mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-center sm:justify-start"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 flex items-center justify-center"
                variants={dotVariants}
              >
                <div className={`w-6 h-6 rounded-full ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-400'} animate-pulse sparkle transition-all duration-300 ${hoveredProject === 'deepfake' ? 'scale-150 shadow-lg shadow-blue-600/70' : ''}`}></div>
              </motion.div>
              <Tilt tiltMaxAngleX={25} tiltMaxAngleY={25} scale={1.05} transitionSpeed={450}>
                <div
                  className={`w-full sm:w-96 p-4 rounded-lg shadow-lg cursor-pointer ${theme === 'dark' ? 'bg-opacity-50 bg-gray-700' : 'bg-opacity-50 bg-gray-300'} sm:ml-12`}
                  onMouseEnter={() => setHoveredProject('deepfake')}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => openModal(project3)}
                  onKeyDown={(e) => handleProjectKeyDown(e, project3)}
                  tabIndex={0}
                >
                  <h3 className="text-lg font-semibold">Deepfake Detection Model</h3>
                  <p className="text-sm text-gray-400">Early 2025</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="tech-badge tech-badge-python">Python</span>
                    <span className="tech-badge tech-badge-react">React.js</span>
                  </div>
                </div>
              </Tilt>
              <AnimatePresence>
                {hoveredProject === 'deepfake' && (
                  <motion.div
                    variants={popUpVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute left-0 sm:left-[calc(50%+12rem)] top-full sm:top-0 mt-4 sm:mt-0 z-10 w-full sm:w-96"
                  >
                    <div className={`p-4 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}>
                      <img src="/deepfake-detector-placeholder.jpg" alt="Deepfake Detection Model" className="w-full h-32 object-cover rounded-lg mb-2" />
                      <p className="text-sm">CNN-based model with 82% accuracy.</p>
                      <div className="flex flex-col space-y-2 mt-2">
                        <a href="https://github.com/InverseXenon/deepfake-detector-frontend" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500 flex items-center text-sm">
                          <FaGithub className="mr-1" /> Frontend
                        </a>
                        <a href="https://github.com/InverseXenon/deepfake-detector-backend" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500 flex items-center text-sm">
                          <FaGithub className="mr-1" /> Backend
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="achievements"
        className="py-20 pt-24"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
          <motion.h2 variants={childVariants} className="text-4xl font-bold mb-8 text-center">Achievements</motion.h2>
          <div className="relative overflow-hidden">
            <div className="flex animate-slide-slow">
              <motion.div variants={childVariants} className={`flex-none w-full sm:w-1/2 md:w-1/3 p-4 ${theme === 'dark' ? 'bg-opacity-50 bg-gray-700' : 'bg-opacity-50 bg-gray-300'} rounded-lg shadow-lg mx-2`}>
                <h3 className="text-xl font-semibold mb-2">Syrus Hackathon 2025</h3>
                <p>Ranked top 8 out of 200+ teams for Astitva - Women’s Services Platform.</p>
              </motion.div>
              <motion.div variants={childVariants} className={`flex-none w-full sm:w-1/2 md:w-1/3 p-4 ${theme === 'dark' ? 'bg-opacity-50 bg-gray-700' : 'bg-opacity-50 bg-gray-300'} rounded-lg shadow-lg mx-2`}>
                <h3 className="text-xl font-semibold mb-2">Certifications</h3>
                <p>Google Cloud Skills Boost, AWS Academy, Deep Learning.</p>
              </motion.div>
              <motion.div variants={childVariants} className={`flex-none w-full sm:w-1/2 md:w-1/3 p-4 ${theme === 'dark' ? 'bg-opacity-50 bg-gray-700' : 'bg-opacity-50 bg-gray-300'} rounded-lg shadow-lg mx-2`}>
                <h3 className="text-xl font-semibold mb-2">Awakening the Scientist 2022</h3>
                <p>Winner, recognized among 100+ participants.</p>
              </motion.div>
              <motion.div variants={childVariants} className={`flex-none w-full sm:w-1/2 md:w-1/3 p-4 ${theme === 'dark' ? 'bg-opacity-50 bg-gray-700' : 'bg-opacity-50 bg-gray-300'} rounded-lg shadow-lg mx-2`}>
                <h3 className="text-xl font-semibold mb-2">Syrus Hackathon 2025</h3>
                <p>Ranked top 8 out of 200+ teams for Astitva - Women’s Services Platform.</p>
              </motion.div>
              <motion.div variants={childVariants} className={`flex-none w-full sm:w-1/2 md:w-1/3 p-4 ${theme === 'dark' ? 'bg-opacity-50 bg-gray-700' : 'bg-opacity-50 bg-gray-300'} rounded-lg shadow-lg mx-2`}>
                <h3 className="text-xl font-semibold mb-2">Certifications</h3>
                <p>Google Cloud Skills Boost, AWS Academy, Deep Learning.</p>
              </motion.div>
              <motion.div variants={childVariants} className={`flex-none w-full sm:w-1/2 md:w-1/3 p-4 ${theme === 'dark' ? 'bg-opacity-50 bg-gray-700' : 'bg-opacity-50 bg-gray-300'} rounded-lg shadow-lg mx-2`}>
                <h3 className="text-xl font-semibold mb-2">Awakening the Scientist 2022</h3>
                <p>Winner, recognized among 100+ participants.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="mini-game"
        className="py-20 pt-24"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
          <motion.h2 variants={childVariants} className="text-4xl font-bold mb-8 text-center">Typing Speed Test</motion.h2>
          <motion.div variants={childVariants} className={`p-4 sm:p-6 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-opacity-50 bg-gray-700' : 'bg-opacity-50 bg-gray-300'}`}>
            {!gameStarted && !gameOver && (
              <div className="text-center">
                <p className="mb-4 text-sm sm:text-base">Test your typing speed by typing the random words below as fast as you can! Pasting is disabled.</p>
                <button onClick={startGame} className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition text-sm sm:text-base">
                  Start Test
                </button>
              </div>
            )}
            {(gameStarted || gameOver) && (
              <div className="space-y-4">
                <div className="p-2 sm:p-4 bg-gray-800 rounded-lg font-mono text-sm sm:text-lg whitespace-pre-wrap break-words">
                  {renderText()}
                </div>
                <textarea
                  value={inputText}
                  onChange={handleInputChange}
                  onPaste={handlePaste}
                  placeholder="Start typing here..."
                  className={`w-full p-2 sm:p-3 rounded-lg font-mono text-sm sm:text-lg h-24 sm:h-32 resize-none focus:outline-none ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-900'}`}
                  disabled={gameOver}
                />
                {gameOver && (
                  <div className="text-center space-y-4">
                    <h3 className="text-lg sm:text-xl font-semibold">Test Complete!</h3>
                    <p className="text-sm sm:text-base">WPM: {wpm}</p>
                    <p className="text-sm sm:text-base">Accuracy: {accuracy}%</p>
                    {wpm > 50 && (
                      <p className="text-sm sm:text-base text-yellow-400">🎉 Wow! You typed over 50 WPM! Enjoy the celebration!</p>
                    )}
                    <button onClick={resetGame} className="px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition text-sm sm:text-base">
                      Try Again
                    </button>
                  </div>
                )}
              </div>
            )}
            {sessionRecords.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">Session Records (Last 5)</h3>
                <div className="space-y-2">
                  {sessionRecords.map((record, index) => (
                    <div key={index} className={`p-3 sm:p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
                      <p className="text-sm sm:text-base">Attempt {index + 1} at {record.timestamp}</p>
                      <p className="text-sm sm:text-base">WPM: {record.wpm}, Accuracy: {record.accuracy}%</p>
                    </div>
                  ))}
                </div>
              </div>
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
              className={`p-6 rounded-lg max-w-lg w-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h3 className="text-2xl font-bold mb-4">{selectedProject.title}</h3>
              <p className="mb-4">{selectedProject.description}</p>
              <p className="mb-4">{selectedProject.details}</p>
              <div className="flex flex-col space-y-2 mb-4">
                {selectedProject.github && (
                  <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500 flex items-center">
                    <FaGithub className="mr-1" /> {selectedProject.githubBackend ? 'Frontend' : 'GitHub'}
                  </a>
                )}
                {selectedProject.githubBackend && (
                  <a href={selectedProject.githubBackend} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500 flex items-center">
                    <FaGithub className="mr-1" /> Backend
                  </a>
                )}
              </div>
              <button onClick={closeModal} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.section
        id="contact"
        className="py-20 pt-24"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
          <motion.h2 variants={childVariants} className="text-4xl font-bold mb-8 text-center">Contact</motion.h2>
          <div className="flex flex-col md:flex-row gap-8">
            <motion.div variants={childVariants} className="flex-1">
              <p className="text-lg mb-4">
                Email: <a href="mailto:piyushpatil1741@gmail.com" className="text-blue-400">piyushpatil1741@gmail.com</a><br />
                Phone: +91-9405302470<br />
                LinkedIn: <a href="https://www.linkedin.com/in/piyush-patil-2665a3251/" className="text-blue-400">Connect with me</a>
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="https://www.linkedin.com/in/piyush-patil-2665a3251/" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-blue-400 transition">
                  <FaLinkedin />
                </a>
                <a href="https://github.com/InverseXenon" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-blue-400 transition">
                  <FaGithub />
                </a>
                <a href="https://www.instagram.com/pee.you.shhh/" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-blue-400 transition">
                  <FaInstagram />
                </a>
              </div>
            </motion.div>
            <motion.div variants={childVariants} className="flex-1">
              <form onSubmit={sendEmail} className="space-y-4">
                <input type="text" name="name" placeholder="Your Name" className={`w-full p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-900'}`} required />
                <input type="email" name="email" placeholder="Your Email" className={`w-full p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-900'}`} required />
                <textarea name="message" placeholder="Your Message" className={`w-full p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-900'} h-32`} required></textarea>
                <button type="submit" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition">Send Message</button>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="scroll-top-button"
        >
          ↑
        </button>
      )}
    </div>
  );
}

export default App;
