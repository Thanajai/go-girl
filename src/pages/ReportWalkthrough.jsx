import { useState } from 'react';
import { getReportingSteps } from '../lib/gemini.js';
import Loader from '../components/ui/Loader.jsx';
import Button from '../components/ui/Button.jsx';
import { ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ReportWalkthrough() {
  const [platform, setPlatform] = useState('');
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState(null);
  const [error, setError] = useState('');

  const platforms = ['Instagram', 'WhatsApp', 'Twitter/X', 'Snapchat', 'Telegram', 'Other'];

  const handleSelect = async (p) => {
    setPlatform(p);
    setLoading(true);
    setError('');
    setSteps(null);

    const res = await getReportingSteps({ platform: p });
    
    setLoading(false);
    if (res.error) {
      setError(res.error);
    } else {
      setSteps(res);
    }
  };

  const renderStepText = (text) => {
    // Simple URL detection
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    if (text.match(urlRegex)) {
      const parts = text.split(urlRegex);
      return parts.map((part, i) => {
        if (part.match(urlRegex)) {
          return <a key={i} href={part} target="_blank" rel="noreferrer" className="text-primary underline font-medium">{part}</a>;
        }
        return part;
      });
    }
    return text;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6"
    >
      <div>
        <h2 className="font-display text-2xl text-plum mb-1">How to report</h2>
        <p className="text-muted text-sm">Step-by-step guide for each platform</p>
      </div>

      <motion.div 
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white rounded-2xl shadow-sm p-5"
      >
        <h3 className="text-sm font-medium text-plum mb-3">Select a platform:</h3>
        <div className="flex flex-wrap gap-2">
          {platforms.map(p => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={p}
              onClick={() => handleSelect(p)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                platform === p 
                  ? 'bg-primary text-white' 
                  : 'bg-soft text-plum hover:bg-primary-soft'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {loading && <Loader text={`Getting latest reporting steps for ${platform}...`} />}

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <AnimatePresence mode="wait">
        {steps && !loading && (
          <motion.div 
            key={platform}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="flex flex-col gap-4"
          >
            <h3 className="font-display text-xl text-plum mb-2">Reporting on {platform}</h3>
            
            {steps.map((step, index) => {
              const isCyberCrime = step.toLowerCase().includes('cybercrime.gov.in');
              return (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={index} 
                  className="bg-white rounded-2xl p-5 shadow-sm flex gap-4"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-soft text-primary flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-sm text-plum leading-relaxed">
                      {renderStepText(step)}
                    </p>
                    {isCyberCrime && (
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="mt-3"
                        onClick={() => window.open('https://cybercrime.gov.in', '_blank')}
                      >
                        → Open portal
                      </Button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-soft rounded-2xl p-5 mt-4"
      >
        <h3 className="font-semibold text-plum mb-3">After reporting online, you can also:</h3>
        <ul className="text-sm text-plum space-y-3">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <span>File an FIR at your local cyber crime cell</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <span>Contact NCW for legal assistance: <a href="tel:7827170170" className="font-semibold underline">7827170170</a></span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5">•</span>
            <span>Call the national cybercrime helpline: <a href="tel:1930" className="font-semibold underline">1930</a></span>
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
}
