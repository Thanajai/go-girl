import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  disabled = false, 
  fullWidth = false,
  className = '',
  ...props 
}) {
  const baseStyles = "btn-text inline-flex items-center justify-center rounded-xl transition-all duration-300 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-accent text-white shadow-[0_0_20px_rgba(255,78,141,0.3)] hover:shadow-[0_0_30px_rgba(255,78,141,0.5)]",
    secondary: "glass-card gradient-border text-secondary hover:shadow-[0_0_20px_rgba(0,242,255,0.3)]",
    ghost: "bg-transparent text-primary hover:bg-primary/10",
    danger: "bg-coral/10 text-coral hover:bg-coral/20"
  };

  const sizes = {
    sm: "text-xs px-4 py-2",
    md: "text-sm px-6 py-3",
    lg: "text-base px-8 py-4"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <motion.button
      whileHover={disabled || loading ? {} : { scale: 1.02 }}
      whileTap={disabled || loading ? {} : { scale: 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], widthClass, className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex gap-1.5 items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
}
