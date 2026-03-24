import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasDismissed = localStorage.getItem('gogirl_install_dismissed');
    if (hasDismissed) return;

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Show banner 3 seconds after the event fires
      setTimeout(() => {
        setIsVisible(true);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsVisible(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('gogirl_install_dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-20 left-4 right-4 z-50 max-w-md mx-auto"
        >
          <div className="relative p-[1px] rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(247,37,133,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-r from-[#f72585] via-[#7209b7] to-[#3a0ca3] opacity-90"></div>
            <div className="relative bg-[#0d0d1a]/90 backdrop-blur-md rounded-2xl p-4 flex items-center gap-4">
              <div className="flex-1">
                <h3 className="text-white font-display font-semibold text-lg">GoGirl</h3>
                <p className="text-white/80 text-sm">Works offline · Feels like an app</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleInstall}
                  className="bg-gradient-to-r from-[#f72585] to-[#7209b7] text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg active:scale-95 transition-transform"
                >
                  Install
                </button>
                <button
                  onClick={handleDismiss}
                  className="p-2 text-white/60 hover:text-white transition-colors"
                  aria-label="Dismiss"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
