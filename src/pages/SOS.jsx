import { useState } from 'react';
import { Phone } from 'lucide-react';
import SOSCard from '../components/features/SOSCard.jsx';
import { motion } from 'motion/react';

export default function SOS() {
  const [checks, setChecks] = useState({
    c1: false, c2: false, c3: false, c4: false, c5: false, c6: false
  });

  const checkCount = Object.values(checks).filter(Boolean).length;
  const isReady = checkCount === 6;

  const toggleCheck = (id) => {
    setChecks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6"
    >
      <div>
        <h2 className="font-display text-2xl text-plum mb-1">Get help now</h2>
        <p className="text-muted text-sm">You don't have to face this alone.</p>
      </div>

      <motion.div 
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-primary-soft rounded-2xl p-5 border border-primary/20"
      >
        <p className="text-plum font-semibold mb-3 text-center">If you are in immediate danger, call 112</p>
        <motion.a 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          href="tel:112" 
          className="flex items-center justify-center gap-2 w-full bg-primary text-white py-3 rounded-full font-bold text-lg hover:bg-primary/90 transition-colors shadow-sm"
        >
          <Phone size={20} /> Call 112
        </motion.a>
      </motion.div>

      <div className="flex flex-col gap-3">
        <h3 className="font-semibold text-plum mb-1">Helplines & Resources</h3>
        
        <SOSCard 
          title="National Cyber Crime Portal" 
          desc="Report cybercrime officially" 
          contact="cybercrime.gov.in" 
          isLink={true} 
        />
        <SOSCard 
          title="NCW Helpline" 
          desc="National Commission for Women · Free legal support" 
          contact="7827170170" 
          isLink={false} 
        />
        <SOSCard 
          title="iCall (TISS)" 
          desc="Free mental health counselling · Mon–Sat 8am–10pm" 
          contact="9152987821" 
          isLink={false} 
        />
        <SOSCard 
          title="Vandrevala Foundation" 
          desc="24/7 emotional support · Completely confidential" 
          contact="18602662345" 
          isLink={false} 
        />
        <SOSCard 
          title="Cyber Peace Foundation" 
          desc="Cyber safety and support" 
          contact="cyberpeace.org" 
          isLink={true} 
        />
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl p-5 shadow-sm mt-2"
      >
        <h3 className="font-semibold text-plum mb-4">Before you report — evidence checklist</h3>
        
        <div className="flex flex-col gap-3 mb-6">
          {[
            { id: 'c1', text: 'Screenshot all messages with timestamps visible' },
            { id: 'c2', text: 'Screenshot the person\'s profile (name, photo, URL)' },
            { id: 'c3', text: 'Note the exact dates and times of each incident' },
            { id: 'c4', text: 'Save any voice notes or images sent' },
            { id: 'c5', text: 'Write down any witnesses who saw it happen' },
            { id: 'c6', text: 'Download data from platform (Settings → Privacy)' }
          ].map(item => (
            <motion.label 
              whileHover={{ x: 5 }}
              key={item.id} 
              className="flex items-start gap-3 cursor-pointer group"
              onClick={() => toggleCheck(item.id)}
            >
              <div className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                checks[item.id] ? 'bg-secondary border-secondary' : 'border-muted group-hover:border-primary'
              }`}>
                {checks[item.id] && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-white text-xs">✓</motion.span>}
              </div>
              <span className={`text-sm transition-colors ${checks[item.id] ? 'text-muted line-through' : 'text-plum'}`}>
                {item.text}
              </span>
            </motion.label>
          ))}
        </div>

        <div className="w-full bg-soft rounded-full h-2.5 mb-2 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(checkCount / 6) * 100}%` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`h-2.5 rounded-full ${isReady ? 'bg-secondary' : 'bg-primary'}`} 
          />
        </div>
        <motion.p 
          animate={{ scale: isReady ? [1, 1.05, 1] : 1 }}
          transition={{ duration: 0.3 }}
          className={`text-xs font-semibold text-center ${isReady ? 'text-secondary' : 'text-muted'}`}
        >
          {isReady ? "You're ready to report 💪" : `${checkCount} of 6 steps complete`}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
