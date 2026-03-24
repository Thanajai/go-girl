import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';
import Button from '../components/ui/Button.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, ChevronRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { enableDemoMode } = useAuth();

  const from = location.state?.from || '/home';

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!isSupabaseConfigured || !supabase) {
        throw new Error("Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment variables.");
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        if (signInError.message.includes('Invalid login credentials')) {
          throw new Error("Invalid email or password. Please try again.");
        } else if (signInError.message.includes('Email not confirmed')) {
          throw new Error("Please verify your email address before logging in.");
        }
        throw signInError;
      }

      navigate(from, { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-4 py-12">
      <div className="aurora-bg" />
      <div className="floating-blob -bottom-20 -right-20 opacity-20" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[400px] space-y-8"
      >
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block">
            <h1 className="text-4xl gradient-text">GoGirl</h1>
          </Link>
          <p className="text-muted font-medium tracking-wide">Welcome back</p>
          <p className="text-dim text-sm">Continue your journey of healing</p>
        </div>

        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card gradient-border rounded-3xl p-8 space-y-6"
        >
          <h2 className="text-2xl text-center">Sign in</h2>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-coral/10 border border-coral/20 text-coral p-3 rounded-xl text-sm text-center"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary group-focus-within:text-primary transition-colors" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full input-field rounded-xl py-3 pl-11 pr-4 text-sm text-plum placeholder:text-dim"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-medium text-muted">Password</label>
                <button type="button" className="text-xs text-secondary hover:text-primary transition-colors">Forgot password?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary group-focus-within:text-primary transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full input-field rounded-xl py-3 pl-11 pr-12 text-sm text-plum placeholder:text-dim"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-dim hover:text-muted transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              fullWidth 
              loading={loading} 
              className="mt-2 group"
            >
              <span className="flex items-center gap-2">
                Sign in
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </form>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#120a10] px-2 text-dim tracking-widest">OR</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <button className="glass-card gradient-border rounded-xl py-3 px-4 flex items-center justify-center gap-3 text-sm font-medium hover:shadow-[0_0_20px_rgba(0,242,255,0.15)] transition-all">
              <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
              Continue with Google
            </button>
          </div>

          <div className="space-y-4 text-center">
            <p className="text-sm text-muted">
              Don't have an account?{' '}
              <Link to="/signup" className="text-secondary hover:text-primary transition-colors font-semibold">
                Sign up
              </Link>
            </p>
            <Link to="/home" className="inline-block text-xs text-dim hover:text-muted transition-colors">
              Continue without account →
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
