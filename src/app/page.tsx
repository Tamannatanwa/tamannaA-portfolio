'use client';
import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Home() {
  const [activeSection, setActiveSection] = useState('about');
  const [currentTitle, setCurrentTitle] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const titles = [
    'React Developer',
    'Web Developer',
    'Full Stack Developer',
    'Backend Developer',
    'Software Engineer', // Additional title
    'UI/UX Developer',   // Additional title
  ];

  const currentTitleWords = titles[currentTitle].split(' ');

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (!isDeleting) {
        if (currentWordIndex < currentTitleWords.length) {
          setCurrentWordIndex((prevIndex) => prevIndex + 1);
        } else {
          setIsDeleting(true);
        }
      } else {
        if (currentWordIndex > 0) {
          setCurrentWordIndex((prevIndex) => prevIndex - 1);
        } else {
          setIsDeleting(false);
          setCurrentTitle((prevTitle) => (prevTitle + 1) % titles.length);
        }
      }
    }, 300); // Adjust the typing speed (in ms)

    return () => clearInterval(typingInterval); // Clear interval on unmount
  }, [currentWordIndex, isDeleting, currentTitleWords]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop - 100 &&
            scrollPosition < offsetTop + offsetHeight - 100) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80; // Height of your navbar
      const elementPosition = element.offsetTop - navHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };


  return (
    <main className="bg-slate-900 min-h-screen text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-slate-900/90 backdrop-blur-sm z-50 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center space-x-2"
            >
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
              <span className="text-xl font-bold">Tamanna Tanwar</span>
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              {['about', 'skills', 'projects', 'contact'].map((item) => (
                <motion.button
                  key={item}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`capitalize ${
                    activeSection === item 
                      ? 'text-blue-400 font-medium' 
                      : 'text-gray-300'
                  }`}
                  onClick={() => scrollToSection(item)}
                >
                  {item}
                </motion.button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <motion.a
                whileHover={{ y: -3 }}
                href="https://github.com/Tamannatanwa"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                <FaGithub size={20} />
              </motion.a>
              <motion.a
                whileHover={{ y: -3 }}
                href="https://www.linkedin.com/in/tamanna-tanwar-67595828b/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                <FaLinkedinIn size={20} />
              </motion.a>
              <motion.a
                whileHover={{ y: -3 }}
                href="https://x.com/tamanna_tvar/communities"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                <FaTwitter size={20} />
              </motion.a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="min-h-screen pt-20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold mb-4">
              Hello, I&apos;m{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"> Tamanna</span>
              <p className="text-xl text-gray-400 mb-6">
              {currentTitleWords.slice(0, currentWordIndex).join(' ')}
            </p>
            </h1>
            <p className="text-xl text-gray-400 mb-6">
              Full Stack Developer passionate about creating interactive applications
            </p>
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium hover:opacity-90 transition-opacity"
                onClick={() => scrollToSection('contact')}
              >
                Hire Me
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border border-blue-500 rounded-lg font-medium hover:bg-blue-500/10 transition-colors"
                onClick={handleDownloadCV}
              >
                Download CV
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 100
            }}
            className="relative w-full h-[400px]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
            <div className="relative h-full flex items-center justify-center">
              <Image 
                src="/myImage/aboutSec.png"
                alt="Profile"
                width={300}
                height={300}
                className="rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-12 text-center"
          >
            Skills & Technologies
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'Tailwind CSS', 'GraphQL', 'AWS'].map((skill) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="bg-slate-800 p-6 rounded-lg text-center"
              >
                <h3 className="text-lg font-medium">{skill}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Section */}
      <section id="projects" className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-12 text-center"
          >
            Featured Projects
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((project) => (
              <motion.div
                key={project}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                className="bg-slate-800 rounded-lg overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src="/placeholder-project.jpg"
                    alt={`Project ${project}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Project {project}</h3>
                  <p className="text-gray-400 mb-4">
                    Description of your amazing project goes here
                  </p>
                  <div className="flex justify-between items-center">
                    <a 
                      href="#" 
                      className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
                    >
                      Live Demo
                    </a>
                    <a 
                      href="#" 
                      className="text-blue-400 hover:text-blue-300 flex items-center gap-2"
                    >
                      GitHub <FaGithub />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-12 text-center"
          >
            Get in Touch
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto bg-slate-800 rounded-lg p-6"
          >
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-medium"
                type="submit"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
      <footer className="w-full">
        <AnimatedFooterGrid />
        <div className="text-center py-4">
          <p className="text-gray-400">© {new Date().getFullYear()} Tamanna Tanwar. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}