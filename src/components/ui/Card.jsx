import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

export default function Card({ 
  children, 
  accent = 'none', 
  hover = false, 
  padding = 'p-6',
  className = '',
  ...props 
}) {
  const accents = {
    none: "",
    rose: "border-l-4 border-l-primary",
    sage: "border-l-4 border-l-secondary",
    peach: "border-l-4 border-l-accent",
    plum: "border-l-4 border-l-plum"
  };

  return (
    <motion.div 
      whileHover={hover ? { scale: 1.02, y: -2 } : {}}
      whileTap={hover ? { scale: 0.98 } : {}}
      className={cn(
        "glass-card gradient-border rounded-2xl transition-all duration-300",
        hover ? "cursor-pointer hover:shadow-[0_8px_32px_rgba(255,78,141,0.1)]" : "",
        accents[accent],
        padding,
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
