import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import Textarea from '../components/ui/Textarea.jsx';
import Loader from '../components/ui/Loader.jsx';
import ActionSteps from '../components/features/ActionSteps.jsx';
import { getActionPlan } from '../lib/gemini.js';
import { motion } from 'motion/react';

export default function ActionPlan() {
  const location = useLocation();
  const state = location.state || null;

  const [severity, setSeverity] = useState(state?.severity || 'MODERATE');
  const [situation, setSituation] = useState(state?.situation || '');
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState(null);
  const [error, setError] = useState('');

  const severities = ['NOT HARMFUL', 'MILD', 'MODERATE', 'SEVERE'];

  useEffect(() => {
    if (state?.severity && state?.situation) {
      generatePlan(state.severity, state.situation);
    }
  }, [state]);

  const generatePlan = async (sev, sit) => {
    if (!sit.trim()) {
      setError('Please describe the situation.');
      return;
    }
    setError('');
    setLoading(true);
    setSteps(null);

    const res = await getActionPlan({ severity: sev, situation: sit });
    
    setLoading(false);
    if (res.error) {
      setError(res.error);
    } else {
      setSteps(res);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6"
    >
      <div>
        <h2 className="font-display text-2xl text-plum mb-1">Your Action Plan</h2>
        <p className="text-muted text-sm">Practical steps to protect yourself.</p>
      </div>

      {state && (
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <span className="text-sm text-muted">Based on analysis:</span>
          <Badge severity={state.severity} />
        </motion.div>
      )}

      {!state && !steps && !loading && (
        <motion.div 
          initial={{ scale: 0.98 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-plum">Severity Level</label>
            <div className="flex flex-wrap gap-2">
              {severities.map(s => (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  key={s}
                  onClick={() => setSeverity(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    severity === s 
                      ? 'bg-primary text-white' 
                      : 'bg-primary-soft text-primary hover:bg-primary/20'
                  }`}
                >
                  {s}
                </motion.button>
              ))}
            </div>
          </div>
          <Textarea
            label="Briefly describe the situation"
            rows={3}
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            error={error}
          />
          <Button fullWidth onClick={() => generatePlan(severity, situation)}>Generate Plan</Button>
        </motion.div>
      )}

      {loading && <Loader text="Creating a safe plan for you..." />}

      {steps && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <ActionSteps steps={steps} />
        </motion.div>
      )}
    </motion.div>
  );
}
