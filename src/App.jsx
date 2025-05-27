import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { FaLinkedin, FaGithub, FaInstagram, FaBars, FaTimes } from 'react-icons/fa';
import './index.css';

function App() {
  const [theme, setTheme] = useState('dark');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userCount, setUserCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // Simulate Loading
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  // Theme Toggle with Animation
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Scroll-to-Top Visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate User and Project Count
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

  // EmailJS Form Submission
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
      .catch(() => alert('Failed to send message. Please try again.'));
    e.target.reset();
  };

  // Open/Close Modal
  const openModal = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  // Toggle Hamburger Menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
      {/* Navigation Bar - Glassmorphism with Hamburger */}
      <nav className={`fixed top-0 w-full ${theme === 'dark' ? 'bg-opacity-30 bg-gray-800' : 'bg-opacity-30 bg-gray-200'} backdrop-blur-md shadow-lg z-20`}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">Piyush Patil</h1>
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
              <a href="#projects" className="hover:text-blue-400 transition">Projects</a>
              <a href="#achievements" className="hover:text-blue-400 transition">Achievements</a>
              <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
              <button onClick={toggleTheme} className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'} transition transform hover:rotate-180 duration-300`}>
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {menuOpen && (
          <div className={`lg:hidden ${theme === 'dark' ? 'bg-opacity-90 bg-gray-800' : 'bg-opacity-90 bg-gray-200'} backdrop-blur-md`}>
            <div className="flex flex-col items-center space-y-4 py-4">
              <a href="#home" className="hover:text-blue-400 transition" onClick={toggleMenu}>Home</a>
              <a href="#about" className="hover:text-blue-400 transition" onClick={toggleMenu}>About</a>
              <a href="#skills" className="hover:text-blue-400 transition" onClick={toggleMenu}>Skills</a>
              <a href="#projects" className="hover:text-blue-400 transition" onClick={toggleMenu}>Projects</a>
              <a href="#achievements" className="hover:text-blue-400 transition" onClick={toggleMenu}>Achievements</a>
              <a href="#contact" className="hover:text-blue-400 transition" onClick={toggleMenu}>Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Removed Hire Me */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        <div className="absolute inset-0 circuit-pattern opacity-20"></div>
        <div className="text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 typewriter">
            Piyush Patil | AI & Data Science Innovator
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl mb-4">
            Building the future with innovative web and AI solutions.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 fade-in">
            Let’s create something impactful together!
          </p>
          <div className="mt-6">
            <a href="/Piyush_Resume.pdf" download className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition">
              Download Resume
            </a>
          </div>
        </div>
      </section>

      {/* About Section with Photo Placeholder */}
      <section id="about" className="py-20 pt-24">
  <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
    <h2 className="text-4xl font-bold mb-8 text-center">About Me</h2>
    <div className="flex flex-col md:flex-row items-center gap-8">
      <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
        <img src="/Piyush.jpg" alt="Piyush Patil" className="w-full h-full object-cover rounded-lg neon-border" />
      </div>
      <div className="flex-1">
        <p className="text-lg">
          I’m a third-year B.Tech student in Artificial Intelligence & Data Science at VESIT, Mumbai, with a CGPA of 8.61.
          I’m currently interning at Panache Digilife, where I’m spearheading an IoT-based Air Quality Monitoring System using sensors, Firebase, and machine learning, achieving an accuracy of 85%.
          I’ve earned certifications from Google Cloud Skills Boost (Cloud Computing Fundamentals, GenAI) and AWS Academy (Machine Learning Foundations), along with a Fundamentals of Deep Learning certification.
          As a passionate participant in hackathons, I ranked in the top 8 out of 200+ teams at the Syrus Hackathon 2025 with my Women’s Services Platform and developed a real-time text editor for the Invictus Hackathon 2025, impacting 30+ users.
          I also serve as the PR Head and Tournament Organizer for VESIT eSports, where I’ve boosted event participation by 30% through strategic promotion on Instagram and Discord, and coordinated 5+ tournaments for over 100 participants.
          My interests lie in web development, AI, and backend systems, and I’m always eager to tackle challenging projects that drive innovation.
        </p>
      </div>
    </div>
  </div>
</section>

      {/* Skills Section - Card Layout */}
      <section id="skills" className="py-20 pt-24">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
          <h2 className="text-4xl font-bold mb-8 text-center">Skills</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className={`p-6 rounded-lg shadow-lg transform hover:scale-105 transition ${theme === 'dark' ? 'bg-opacity-50 bg-gray-700' : 'bg-opacity-50 bg-gray-300'}`}>
              <h3 className="text-xl font-semibold mb-2">Languages</h3>
              <p>Python, Java, JavaScript, C, HTML5/CSS3</p>
            </div>
            <div className={`p-6 rounded-lg shadow-lg transform hover:scale-105 transition ${theme === 'dark' ? 'bg-opacity-50 bg-gray-700' : 'bg-opacity-50 bg-gray-300'}`}>
              <h3 className="text-xl font-semibold mb-2">Frameworks & Libraries</h3>
              <p>React.js, Flask, Quill, OpenMap</p>
            </div>
            <div className={`p-6 rounded-lg shadow-lg transform hover:scale-105 transition ${theme === 'dark' ? 'bg-opacity-50 bg-gray-700' : 'bg-opacity-50 bg-gray-300'}`}>
              <h3 className="text-xl font-semibold mb-2">Databases & Tools</h3>
              <p>MongoDB, Clerk, Git, GitHub, Firebase</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section with Stats Counter */}
      <section id="projects" className="py-20 pt-24">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
          <h2 className="text-4xl font-bold mb-8 text-center">Projects</h2>
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="text-center">
              <p className="text-4xl font-bold counter">{userCount}+</p>
              <p>Users Impacted</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold counter">{projectCount}</p>
              <p>Projects Completed</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className={`p-6 rounded-lg shadow-lg transform hover:scale-105 transition cursor-pointer ${theme === 'dark' ? 'bg-opacity-50 bg-gray-700' : 'bg-opacity-50 bg-gray-300'}`} onClick={() => openModal({
              title: 'Research Collaboration Hub',
              description: 'Built a real-time text editor using React.js and Quill for Invictus Hackathon 2025. Integrated Clerk for secure authentication. Locally deployed, impacted 30+ users.',
              details: 'This project was developed during a 48-hour hackathon, focusing on seamless collaboration for research teams. It features real-time editing and secure user authentication.'
            })}>
              <h3 className="text-xl font-semibold mb-2">Research Collaboration Hub</h3>
              <p>Built a real-time text editor using React.js and Quill for Invictus Hackathon 2025.</p>
            </div>
            <div className={`p-6 rounded-lg shadow-lg transform hover:scale-105 transition cursor-pointer ${theme === 'dark' ? 'bg-opacity-50 bg-gray-700' : 'bg-opacity-50 bg-gray-300'}`} onClick={() => openModal({
              title: 'Women’s Services Platform',
              description: 'Developed a safety platform using React.js and OpenMap, reaching finals at Syrus Hackathon 2025. Tested by 20+ participants.',
              details: 'An all-in-one platform for women’s safety, featuring location-based services and emergency contacts. Ranked top 8 out of 200+ teams.'
            })}>
              <h3 className="text-xl font-semibold mb-2">Women’s Services Platform</h3>
              <p>Developed a safety platform using React.js and OpenMap for Syrus Hackathon 2025.</p>
            </div>
            <div className={`p-6 rounded-lg shadow-lg transform hover:scale-105 transition cursor-pointer ${theme === 'dark' ? 'bg-opacity-50 bg-gray-700' : 'bg-opacity-50 bg-gray-300'}`} onClick={() => openModal({
              title: 'Deepfake Detection Model',
              description: 'Created a CNN-based model in Python, achieving 82% accuracy in detecting deepfakes.',
              details: 'Utilized convolutional neural networks to identify manipulated media, with a focus on video and image analysis. Achieved high accuracy through extensive training.'
            })}>
              <h3 className="text-xl font-semibold mb-2">Deepfake Detection Model</h3>
              <p>Created a CNN-based model in Python, achieving 82% accuracy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section with Slower Carousel */}
      <section id="achievements" className="py-20 pt-24">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
          <h2 className="text-4xl font-bold mb-8 text-center">Achievements</h2>
          <div className="relative overflow-hidden">
            <div className="flex animate-slide-slow">
              <div className={`flex-none w-full sm:w-1/2 md:w-1/3 p-4 ${theme === 'dark' ? 'bg-opacity-50 bg-gray-700' : 'bg-opacity-50 bg-gray-300'} rounded-lg shadow-lg mx-2`}>
                <h3 className="text-xl font-semibold mb-2">Syrus Hackathon 2025</h3>
                <p>Ranked top 8 out of 200+ teams for Women’s Services Platform.</p>
              </div>
              <div className={`flex-none w-full sm:w-1/2 md:w-1/3 p-4 ${theme === 'dark' ? 'bg-opacity-50 bg-gray-700' : 'bg-opacity-50 bg-gray-300'} rounded-lg shadow-lg mx-2`}>
                <h3 className="text-xl font-semibold mb-2">Certifications</h3>
                <p>Google Cloud Skills Boost, AWS Academy, Deep Learning.</p>
              </div>
              <div className={`flex-none w-full sm:w-1/2 md:w-1/3 p-4 ${theme === 'dark' ? 'bg-opacity-50 bg-gray-700' : 'bg-opacity-50 bg-gray-300'} rounded-lg shadow-lg mx-2`}>
                <h3 className="text-xl font-semibold mb-2">Awakening the Scientist 2022</h3>
                <p>Winner, recognized among 100+ participants.</p>
              </div>
              {/* Duplicate for Seamless Looping */}
              <div className={`flex-none w-full sm:w-1/2 md:w-1/3 p-4 ${theme === 'dark' ? 'bg-opacity-50 bg-gray-700' : 'bg-opacity-50 bg-gray-300'} rounded-lg shadow-lg mx-2`}>
                <h3 className="text-xl font-semibold mb-2">Syrus Hackathon 2025</h3>
                <p>Ranked top 8 out of 200+ teams for Women’s Services Platform.</p>
              </div>
              <div className={`flex-none w-full sm:w-1/2 md:w-1/3 p-4 ${theme === 'dark' ? 'bg-opacity-50 bg-gray-700' : 'bg-opacity-50 bg-gray-300'} rounded-lg shadow-lg mx-2`}>
                <h3 className="text-xl font-semibold mb-2">Certifications</h3>
                <p>Google Cloud Skills Boost, AWS Academy, Deep Learning.</p>
              </div>
              <div className={`flex-none w-full sm:w-1/2 md:w-1/3 p-4 ${theme === 'dark' ? 'bg-opacity-50 bg-gray-700' : 'bg-opacity-50 bg-gray-300'} rounded-lg shadow-lg mx-2`}>
                <h3 className="text-xl font-semibold mb-2">Awakening the Scientist 2022</h3>
                <p>Winner, recognized among 100+ participants.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-30">
          <div className={`p-6 rounded-lg max-w-lg w-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}>
            <h3 className="text-2xl font-bold mb-4">{selectedProject.title}</h3>
            <p className="mb-4">{selectedProject.description}</p>
            <p className="mb-4">{selectedProject.details}</p>
            <button onClick={closeModal} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">Close</button>
          </div>
        </div>
      )}

      {/* Contact Section with Social Media Icons */}
      <section id="contact" className="py-20 pt-24">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
          <h2 className="text-4xl font-bold mb-8 text-center">Contact</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
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
            </div>
            <div className="flex-1">
              <form onSubmit={sendEmail} className="space-y-4">
                <input type="text" name="name" placeholder="Your Name" className={`w-full p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-900'}`} required />
                <input type="email" name="email" placeholder="Your Email" className={`w-full p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-900'}`} required />
                <textarea name="message" placeholder="Your Message" className={`w-full p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-900'} h-32`} required></textarea>
                <button type="submit" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll-to-Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 p-4 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg transition"
        >
          ↑
        </button>
      )}
    </div>
  );
}

export default App;