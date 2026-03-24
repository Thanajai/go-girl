import { useState } from 'react';
import Textarea from '../components/ui/Textarea.jsx';
import Button from '../components/ui/Button.jsx';
import Loader from '../components/ui/Loader.jsx';
import SeverityResult from '../components/features/SeverityResult.jsx';
import { classifyMessage } from '../lib/gemini.js';
import { motion } from 'motion/react';

export default function Detect() {
  const [message, setMessage] = useState('');
  const [platform, setPlatform] = useState('WhatsApp');
  const [duration, setDuration] = useState('Just once');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const platforms = ['Instagram', 'WhatsApp', 'Twitter/X', 'Snapchat', 'Telegram', 'College Forum', 'LinkedIn', 'Other'];
  const durations = ['Just once', 'A few times', 'Weeks', 'Months'];

  const handleAnalyze = async () => {
    if (!message.trim()) {
      setError('Please describe what happened.');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);

    const res = await classifyMessage({ message, platform, duration });
    
    setLoading(false);
    if (res.error) {
      setError(res.error);
    } else {
      setResult(res);
    }
  };

  const loadDemo = () => {
    setMessage("A senior at my college has been sending me unsolicited messages saying I owe him a date because he helped me with assignments. When I ignored him, he started tagging me in mocking posts in our college group saying I'm leading guys on. Others are adding to it. I feel humiliated and scared to go to college.");
    setPlatform('WhatsApp');
    setDuration('Weeks');
    setError('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6"
    >
      <div>
        <h2 className="font-display text-2xl text-plum mb-1">Is this harassment?</h2>
        <p className="text-muted text-sm">Describe what happened. No judgment here.</p>
      </div>

      <motion.div 
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-5"
      >
        <Textarea
          label="What happened?"
          rows={5}
          placeholder="e.g. My colleague keeps sending me voice notes late at night saying I should 'give him a chance'. When I asked him to stop, he told everyone I'm being rude..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          error={error}
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-plum">Where did this happen?</label>
          <select 
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full rounded-xl bg-soft border border-transparent p-3 text-sm font-body text-plum focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
          >
            {platforms.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-plum">How long has this been happening?</label>
          <div className="flex flex-wrap gap-2">
            {durations.map(d => (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={d}
                onClick={() => setDuration(d)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  duration === d 
                    ? 'bg-primary text-white' 
                    : 'bg-primary-soft text-primary hover:bg-primary/20'
                }`}
              >
                {d}
              </motion.button>
            ))}
          </div>
        </div>

        {loading ? (
          <Loader text="Reading your situation with care..." />
        ) : (
          <div className="flex flex-col items-center gap-3 mt-2">
            <Button fullWidth onClick={handleAnalyze}>Analyze</Button>
            <button onClick={loadDemo} className="text-xs text-muted underline hover:text-primary transition-colors">
              See an example →
            </button>
          </div>
        )}
      </motion.div>

      {result && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <SeverityResult result={result} situation={message} platform={platform} />
        </motion.div>
      )}
    </motion.div>
  );
}
