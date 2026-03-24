import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, FolderOpen, BookOpen, Menu } from 'lucide-react';
import { useState } from 'react';
import Modal from '../ui/Modal.jsx';
import { motion } from 'motion/react';

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const tabs = [
    { name: 'Home', path: '/home', icon: Home },
    { name: 'Detect', path: '/detect', icon: Search },
    { name: 'Evidence', path: '/evidence', icon: FolderOpen },
    { name: 'Stories', path: '/stories', icon: BookOpen },
  ];

  const handleMoreClick = () => {
    setIsMoreOpen(true);
  };

  const navigateAndClose = (path) => {
    setIsMoreOpen(false);
    navigate(path);
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-soft shadow-[0_-4px_20px_rgba(0,0,0,0.02)] z-40 pb-safe">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            const Icon = tab.icon;
            return (
              <motion.button
                whileTap={{ scale: 0.9 }}
                key={tab.name}
                onClick={() => navigate(tab.path)}
                className="flex flex-col items-center justify-center w-16 h-full relative"
              >
                <Icon
                  size={24}
                  className={`mb-1 transition-colors ${
                    isActive ? 'text-primary' : 'text-muted'
                  }`}
                />
                <span
                  className={`text-[10px] font-medium ${
                    isActive ? 'text-primary' : 'text-muted'
                  }`}
                >
                  {tab.name}
                </span>
                {isActive && (
                  <motion.div 
                    layoutId="nav-indicator"
                    className="absolute bottom-1 w-1 h-1 rounded-full bg-primary" 
                  />
                )}
              </motion.button>
            );
          })}
          
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleMoreClick}
            className="flex flex-col items-center justify-center w-16 h-full relative"
          >
            <Menu
              size={24}
              className={`mb-1 transition-colors ${
                isMoreOpen ? 'text-primary' : 'text-muted'
              }`}
            />
            <span
              className={`text-[10px] font-medium ${
                isMoreOpen ? 'text-primary' : 'text-muted'
              }`}
            >
              More
            </span>
            {isMoreOpen && (
              <motion.div 
                layoutId="nav-indicator"
                className="absolute bottom-1 w-1 h-1 rounded-full bg-primary" 
              />
            )}
          </motion.button>
        </div>
      </nav>

      <Modal isOpen={isMoreOpen} onClose={() => setIsMoreOpen(false)} title="More Resources">
        <div className="flex flex-col gap-3 mt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigateAndClose('/self-care')}
            className="w-full text-left p-4 rounded-xl bg-soft text-plum font-medium hover:bg-primary-soft transition-colors"
          >
            💛 Self-Care Exercises
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigateAndClose('/sos')}
            className="w-full text-left p-4 rounded-xl bg-primary-soft text-plum font-medium hover:bg-primary hover:text-white transition-colors"
          >
            🆘 SOS & Helplines
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigateAndClose('/report')}
            className="w-full text-left p-4 rounded-xl bg-secondary-soft text-plum font-medium hover:bg-secondary hover:text-white transition-colors"
          >
            📋 Report Walkthrough
          </motion.button>
        </div>
      </Modal>
    </>
  );
}
