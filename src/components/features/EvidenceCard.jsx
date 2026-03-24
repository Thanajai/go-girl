import { useState } from 'react';
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import Badge from '../ui/Badge.jsx';
import { motion, AnimatePresence } from 'motion/react';

export default function EvidenceCard({ log, onDelete }) {
  const [expanded, setExpanded] = useState(false);

  const date = new Date(log.created_at).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });

  return (
    <motion.div 
      layout
      className="bg-white rounded-2xl p-5 shadow-sm border border-soft overflow-hidden"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-xs font-medium text-muted mb-1">{date}</p>
          <div className="flex gap-2 items-center">
            <Badge label={log.platform} color="bg-primary-soft text-primary" />
            <Badge severity={log.severity} />
          </div>
        </div>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            if(window.confirm('Are you sure you want to delete this log?')) {
              onDelete(log.id);
            }
          }}
          className="p-2 text-muted hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
        >
          <Trash2 size={16} />
        </motion.button>
      </div>

      <div className="mt-3">
        <motion.p layout className={`text-sm text-plum ${!expanded ? 'line-clamp-2' : ''}`}>
          {log.description}
        </motion.p>
        
        <AnimatePresence>
          {expanded && log.gemini_reason && (
            <motion.div 
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="p-3 bg-soft rounded-xl border-l-2 border-primary overflow-hidden"
            >
              <p className="text-xs font-display italic text-plum">
                "{log.gemini_reason}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs font-semibold text-primary mt-2 hover:underline"
        >
          {expanded ? (
            <>Show less <ChevronUp size={14} /></>
          ) : (
            <>Show more <ChevronDown size={14} /></>
          )}
        </button>
      </div>
    </motion.div>
  );
}
