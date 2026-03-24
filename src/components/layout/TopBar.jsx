import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { LogOut, User, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import ProfileModal from '../features/ProfileModal.jsx';
import ConfirmModal from '../ui/ConfirmModal.jsx';

export default function TopBar() {
  const { user, signOut } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSignOutConfirmOpen, setIsSignOutConfirmOpen] = useState(false);

  return (
    <>
      <motion.header 
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 right-0 h-14 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.03)] z-40"
      >
        <div className="flex justify-between items-center h-full max-w-md mx-auto px-4">
          <Link to="/home" className="text-xl font-display font-semibold text-primary italic flex items-center gap-1.5">
            <ShieldCheck size={24} className="text-primary" />
            GoGirl
          </Link>
          
          <div>
            {user ? (
              <div className="flex items-center gap-3">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsProfileOpen(true)}
                  className="w-8 h-8 rounded-full bg-primary-soft flex items-center justify-center text-primary font-bold text-sm border border-primary/20 shadow-sm"
                >
                  {user.email ? user.email[0].toUpperCase() : <User size={16} />}
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.1, color: '#F27D26' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsSignOutConfirmOpen(true)}
                  className="text-muted hover:text-primary transition-colors"
                  aria-label="Sign out"
                >
                  <LogOut size={20} />
                </motion.button>
              </div>
            ) : (
              <Link to="/login" className="text-sm font-semibold text-primary hover:underline">
                Login
              </Link>
            )}
          </div>
        </div>
      </motion.header>

      <ProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
      />

      <ConfirmModal
        isOpen={isSignOutConfirmOpen}
        onClose={() => setIsSignOutConfirmOpen(false)}
        onConfirm={signOut}
        title="Sign Out?"
        message="Are you sure you want to sign out of GoGirl? You'll need to sign back in to access your evidence logs."
        confirmText="Sign Out"
        cancelText="Stay Logged In"
      />
    </>
  );
}
