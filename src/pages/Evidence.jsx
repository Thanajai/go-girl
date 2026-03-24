import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { useEvidence } from '../hooks/useEvidence.js';
import EvidenceCard from '../components/features/EvidenceCard.jsx';
import Button from '../components/ui/Button.jsx';
import Modal from '../components/ui/Modal.jsx';
import Textarea from '../components/ui/Textarea.jsx';
import { ShieldAlert, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Evidence() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { logs, loading, fetchLogs, addLog, deleteLog } = useEvidence();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Manual add state
  const [platform, setPlatform] = useState('WhatsApp');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('MODERATE');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: '/evidence' } });
    } else {
      fetchLogs();
    }
  }, [user, navigate, fetchLogs]);

  const handleManualAdd = async () => {
    if (!description.trim()) return;
    setIsSaving(true);
    await addLog({
      platform,
      description,
      severity,
      gemini_reason: 'Manually logged by user.'
    });
    setIsSaving(false);
    setIsModalOpen(false);
    setDescription('');
  };

  if (!user) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-6 relative min-h-full"
    >
      <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <h2 className="font-display text-2xl text-plum mb-1 flex items-center gap-2">
          Your Evidence Log <ShieldAlert size={20} className="text-primary" />
        </h2>
        <p className="text-muted text-sm">Securely documented incidents.</p>
      </motion.div>

      {loading && logs.length === 0 ? (
        <div className="flex justify-center py-10">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : logs.length === 0 ? (
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          className="flex flex-col items-center justify-center py-12 text-center"
        >
          <div className="w-24 h-24 mb-6 relative">
            <div className="absolute inset-0 bg-primary-soft rounded-[40%_60%_70%_30%/40%_70%_30%_60%] animate-[spin_8s_linear_infinite]" />
            <ShieldAlert size={40} className="absolute inset-0 m-auto text-primary" />
          </div>
          <p className="text-plum font-medium mb-2">Nothing logged yet.</p>
          <p className="text-muted text-sm mb-6 max-w-[200px]">Start by analyzing a message or add one manually.</p>
          <Button onClick={() => navigate('/detect')}>Analyze a message</Button>
        </motion.div>
      ) : (
        <motion.div layout className="flex flex-col gap-4">
          <AnimatePresence>
            {logs.map(log => (
              <motion.div
                key={log.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              >
                <EvidenceCard log={log} onDelete={deleteLog} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-20 right-4 w-14 h-14 bg-primary text-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors z-30"
      >
        <Plus size={24} />
      </motion.button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Log Evidence Manually">
        <div className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-plum">Platform</label>
            <select 
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full rounded-xl bg-soft border border-transparent p-3 text-sm font-body text-plum focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
            >
              {['Instagram', 'WhatsApp', 'Twitter/X', 'Snapchat', 'Telegram', 'College Forum', 'LinkedIn', 'Other'].map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <Textarea
            label="Description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What happened?"
          />

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-plum">Severity</label>
            <div className="flex flex-wrap gap-2">
              {['NOT HARMFUL', 'MILD', 'MODERATE', 'SEVERE'].map(s => (
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

          <Button 
            fullWidth 
            onClick={handleManualAdd} 
            loading={isSaving}
            disabled={!description.trim()}
            className="mt-2"
          >
            Save directly
          </Button>
        </div>
      </Modal>
    </motion.div>
  );
}
