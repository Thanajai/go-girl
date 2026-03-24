import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

export default function Textarea({ 
  label, 
  error, 
  className = '', 
  ...props 
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && <label className="text-xs font-medium text-muted ml-1">{label}</label>}
      <motion.textarea
        whileFocus={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "w-full rounded-xl input-field p-4 text-sm text-plum placeholder:text-dim resize-none min-h-[120px]",
          error ? 'border-coral/50 focus:border-coral focus:ring-coral/20' : ''
        )}
        {...props}
      />
      {error && <span className="text-xs text-coral ml-1">{error}</span>}
    </div>
  );
}
