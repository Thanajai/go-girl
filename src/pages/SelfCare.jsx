import { useState } from 'react';
import { getSelfCareMessage } from '../lib/gemini.js';
import Loader from '../components/ui/Loader.jsx';
import Button from '../components/ui/Button.jsx';
import Modal from '../components/ui/Modal.jsx';
import { motion } from 'motion/react';

export default function SelfCare() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [timerOpen, setTimerOpen] = useState(false);
  const [timerState, setTimerState] = useState('idle'); // idle, inhale, hold, exhale

  const moods = [
    { label: 'Overwhelmed', emoji: '😰' },
    { label: 'Angry', emoji: '😤' },
    { label: 'Scared', emoji: '😨' },
    { label: 'Sad', emoji: '😢' },
    { label: 'Numb', emoji: '😶' }
  ];

  const handleMoodSelect = async (mood) => {
    setLoading(true);
    setError('');
    setResult(null);
    
    const res = await getSelfCareMessage({ mood });
    
    setLoading(false);
    if (res.error) {
      setError(res.error);
    } else {
      setResult(res);
    }
  };

  const startTimer = () => {
    setTimerOpen(true);
    setTimerState('inhale');
    
    let cycle = 0;
    const runCycle = () => {
      if (cycle >= 3) {
        setTimerState('idle');
        return;
      }
      
      setTimerState('inhale');
      setTimeout(() => {
        setTimerState('hold');
        setTimeout(() => {
          setTimerState('exhale');
          setTimeout(() => {
            cycle++;
            runCycle();
          }, 8000); // Exhale 8s
        }, 7000); // Hold 7s
      }, 4000); // Inhale 4s
    };
    
    runCycle();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6"
    >
      <div>
        <h2 className="font-display text-2xl text-plum mb-1">Take care of yourself 💛</h2>
        <p className="text-muted text-sm">It's okay to not be okay right now.</p>
      </div>

      <motion.div 
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white rounded-2xl shadow-sm p-5"
      >
        <h3 className="font-semibold text-plum mb-4">How are you feeling right now?</h3>
        <div className="grid grid-cols-2 gap-3">
          {moods.map(m => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={m.label}
              onClick={() => handleMoodSelect(m.label)}
              className="flex items-center gap-2 p-3 rounded-xl bg-soft hover:bg-primary-soft transition-colors text-left"
            >
              <span className="text-2xl">{m.emoji}</span>
              <span className="font-medium text-plum text-sm">{m.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {loading && <Loader text="Finding the right words for you..." />}

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      {result && !loading && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="bg-soft rounded-2xl p-6 shadow-sm border border-primary-soft"
        >
          <p className="font-display italic text-plum text-lg leading-relaxed mb-6">
            "{result.message}"
          </p>
          <div className="bg-secondary-soft rounded-xl p-4 border-l-4 border-secondary">
            <h4 className="text-xs font-bold uppercase tracking-wider text-secondary mb-2">Right now, try this:</h4>
            <p className="text-plum font-medium text-sm">{result.action}</p>
          </div>
        </motion.div>
      )}

      <div className="flex flex-col gap-4 mt-2">
        <h3 className="font-display text-xl text-plum">Grounding exercises</h3>
        
        <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-2xl p-5 shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌬️</span>
            <div>
              <h4 className="font-semibold text-plum">4-7-8 Breathing</h4>
              <p className="text-xs text-muted">Inhale 4s · Hold 7s · Exhale 8s · Repeat 3x</p>
            </div>
          </div>
          <Button variant="secondary" size="sm" onClick={startTimer}>Start timer</Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-3">
          <span className="text-2xl">👁️</span>
          <div>
            <h4 className="font-semibold text-plum">5-4-3-2-1 Grounding</h4>
            <p className="text-xs text-muted">Name 5 things you see, 4 you hear, 3 you can touch, 2 you smell, 1 you taste</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-3">
          <span className="text-2xl">✍️</span>
          <div>
            <h4 className="font-semibold text-plum">Write it out</h4>
            <p className="text-xs text-muted">Sometimes just naming what happened helps. Open Notes on your phone and write for 5 minutes.</p>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-soft rounded-2xl p-5 mt-2"
      >
        <h3 className="font-semibold text-plum mb-3">Remember your rights</h3>
        <p className="text-sm text-muted mb-2">In India, online harassment is illegal under:</p>
        <ul className="text-sm text-plum space-y-2">
          <li><span className="font-semibold">· IT Act Section 66A</span> (offensive messages)</li>
          <li><span className="font-semibold">· IT Act Section 67</span> (obscene content)</li>
          <li><span className="font-semibold">· IPC Section 354D</span> (stalking)</li>
          <li><span className="font-semibold">· IPC Section 509</span> (words/gestures insulting modesty)</li>
        </ul>
      </motion.div>

      <Modal isOpen={timerOpen} onClose={() => setTimerOpen(false)} title="4-7-8 Breathing">
        <div className="flex flex-col items-center justify-center py-10">
          <motion.div 
            animate={{ 
              scale: timerState === 'inhale' ? 1.5 : timerState === 'hold' ? 1.5 : timerState === 'exhale' ? 1 : 1,
              backgroundColor: timerState === 'inhale' ? '#F27D26' : timerState === 'hold' ? '#4A3B52' : timerState === 'exhale' ? '#E4A853' : '#E4E3E0'
            }}
            transition={{ duration: timerState === 'inhale' ? 4 : timerState === 'exhale' ? 8 : 1 }}
            className={`w-32 h-32 rounded-full flex items-center justify-center text-white text-2xl font-bold`}
          >
            {timerState === 'idle' ? 'Ready' : timerState.toUpperCase()}
          </motion.div>
          <p className="mt-12 text-muted text-center max-w-[200px]">
            {timerState === 'inhale' && 'Breathe in through your nose for 4 seconds'}
            {timerState === 'hold' && 'Hold your breath for 7 seconds'}
            {timerState === 'exhale' && 'Exhale completely through your mouth for 8 seconds'}
            {timerState === 'idle' && 'Close when finished'}
          </p>
        </div>
      </Modal>
    </motion.div>
  );
}
