import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';

export default function InstallBanner() {
  const [prompt, setPrompt] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('gogirl-install-dismissed');
    if (dismissed) return;

    const handler = (e) => {
      e.preventDefault();
      setPrompt(e);
      setTimeout(() => setVisible(true), 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!prompt) return;
    prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === 'accepted') setVisible(false);
  };

  const handleDismiss = () => {
    setVisible(false);
    localStorage.setItem('gogirl-install-dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-20 left-4 right-4 z-50 rounded-2xl p-4
                     flex items-center gap-3 shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, #f72585, #7209b7)',
            boxShadow: '0 0 30px rgba(247,37,133,0.4)'
          }}
        >
          <div className="text-2xl">🌸</div>
          <div className="flex-1">
            <p className="text-white font-bold text-sm">
              Add GoGirl to your homescreen
            </p>
            <p className="text-white/70 text-xs mt-0.5">
              Works offline · Feels like an app
            </p>
          </div>
          <button
            onClick={handleInstall}
            className="bg-white text-[#f72585] font-bold text-xs 
                       px-3 py-1.5 rounded-full flex items-center gap-1
                       hover:scale-105 transition-transform"
          >
            <Download size={12}/> Install
          </button>
          <button
            onClick={handleDismiss}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X size={16}/>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
