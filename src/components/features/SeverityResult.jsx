import { motion } from 'motion/react';
import Badge from '../ui/Badge.jsx';
import Button from '../ui/Button.jsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';
import { useState } from 'react';
import Modal from '../ui/Modal.jsx';
import { useEvidence } from '../../hooks/useEvidence.js';

export default function SeverityResult({ result, situation, platform }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addLog } = useEvidence();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const getSupportiveNote = (severity) => {
    switch (severity) {
      case 'NOT HARMFUL':
        return "Sometimes things just feel off. Trust your instincts — you came here for a reason.";
      case 'MILD':
        return "Even 'small' things deserve to be taken seriously. You were right to check.";
      case 'MODERATE':
        return "This is real. What you're feeling is valid. You don't have to handle this alone.";
      case 'SEVERE':
        return "You are brave for seeking help. Please know there are people and laws to protect you.";
      default:
        return "We are here for you.";
    }
  };

  const handleSaveEvidence = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    
    setIsSaving(true);
    const { error } = await addLog({
      platform,
      description: situation,
      severity: result.severity,
      gemini_reason: result.reason
    });
    
    setIsSaving(false);
    if (!error) {
      setSaved(true);
    } else {
      alert("Failed to save evidence: " + error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4 mt-6"
    >
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted">Analysis Result:</span>
        <Badge severity={result.severity} />
      </div>

      <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-l-accent">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted mb-2">What GoGirl sees</h4>
        <p className="font-display italic text-plum text-lg leading-relaxed">
          "{result.reason}"
        </p>
      </div>

      <div className="bg-soft rounded-2xl p-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">You are not wrong to feel this way</h4>
        <p className="text-plum font-medium mb-3">{result.validation}</p>
        <p className="text-sm text-muted">{getSupportiveNote(result.severity)}</p>
      </div>

      <div className="flex flex-col gap-3 mt-2">
        <Button 
          fullWidth 
          onClick={() => navigate('/action-plan', { state: { severity: result.severity, situation, platform } })}
        >
          Get my action plan →
        </Button>
        <Button 
          variant="secondary" 
          fullWidth 
          onClick={handleSaveEvidence}
          disabled={saved || isSaving}
          loading={isSaving}
        >
          {saved ? "✓ Saved to evidence log" : "Save to evidence log"}
        </Button>
      </div>

      <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} title="Login Required">
        <p className="text-plum mb-4">You need to be logged in to save evidence securely.</p>
        <Button fullWidth onClick={() => navigate('/login', { state: { from: '/detect' } })}>
          Go to Login
        </Button>
      </Modal>
    </motion.div>
  );
}
