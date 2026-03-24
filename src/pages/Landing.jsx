import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button.jsx';
import { ChevronRight } from 'lucide-react';

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-6">
      <div className="aurora-bg" />
      <div className="floating-blob -top-20 -right-20 opacity-30" />
      <div className="floating-blob bottom-0 -left-20 opacity-20" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 w-full max-w-md flex flex-col items-center text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-2"
        >
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">🌸 GoGirl</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-plum leading-tight"
        >
          Every girl deserves to feel <span className="gradient-text">safe</span> online.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-muted body-text max-w-sm"
        >
          GoGirl helps you understand harassment, document evidence, and find support — without judgment.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-4 w-full"
        >
          <span className="px-4 py-2 glass-card gradient-border rounded-full text-xs font-medium text-plum shadow-sm hover-lift">🔍 AI Harassment Detector</span>
          <span className="px-4 py-2 glass-card gradient-border rounded-full text-xs font-medium text-plum shadow-sm hover-lift">📁 Evidence Logger</span>
          <span className="px-4 py-2 glass-card gradient-border rounded-full text-xs font-medium text-plum shadow-sm hover-lift">💛 Support & Stories</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full flex flex-col gap-4"
        >
          <Link to="/signup" className="w-full">
            <Button fullWidth size="lg" className="group">
              <span className="flex items-center gap-2">
                Get Started
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </Link>
          <Link to="/login" className="w-full">
            <Button variant="secondary" fullWidth>I have an account</Button>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-xs text-dim font-medium tracking-wide"
        >
          Free · Private · Made for women in India
        </motion.p>
      </div>
    </div>
  );
}
