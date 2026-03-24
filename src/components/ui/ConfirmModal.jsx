import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, X } from 'lucide-react';
import Button from './Button.jsx';

export default function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Are you sure?", 
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "danger" 
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-plum/20 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden p-6"
        >
          <div className="flex flex-col items-center text-center gap-4">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
              type === 'danger' ? 'bg-red-50 text-red-500' : 'bg-primary-soft text-primary'
            }`}>
              <AlertTriangle size={28} />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-display text-xl text-plum font-semibold">{title}</h3>
              <p className="text-muted text-sm px-2">{message}</p>
            </div>

            <div className="flex flex-col w-full gap-2 mt-2">
              <Button 
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                fullWidth
                className={type === 'danger' ? 'bg-red-500 hover:bg-red-600' : ''}
              >
                {confirmText}
              </Button>
              <button 
                onClick={onClose}
                className="w-full p-3 rounded-xl text-muted font-medium text-sm hover:bg-soft transition-colors"
              >
                {cancelText}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
