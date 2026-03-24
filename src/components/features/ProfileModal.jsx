import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Mail, History, LogOut, ShieldCheck, Sparkles } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase.js';
import { useAuth } from '../../hooks/useAuth.js';
import ConfirmModal from '../ui/ConfirmModal.jsx';

export default function ProfileModal({ isOpen, onClose }) {
  const { user, signOut, isDemoMode } = useAuth();
  const [profile, setProfile] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSignOutConfirmOpen, setIsSignOutConfirmOpen] = useState(false);

  useEffect(() => {
    if (isOpen && user) {
      fetchProfileAndLogs();
    }
  }, [isOpen, user]);

  const fetchProfileAndLogs = async () => {
    setLoading(true);
    try {
      if (isDemoMode) {
        // Fetch from localStorage for demo mode
        const saved = localStorage.getItem('gogirl_demo_logs');
        if (saved) {
          setLogs(JSON.parse(saved).slice(0, 5));
        }
        setProfile({ nickname: user.user_metadata?.nickname || 'Demo User' });
      } else if (isSupabaseConfigured) {
        // Fetch profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profileData) setProfile(profileData);

        // Fetch recent logs
        const { data: logsData } = await supabase
          .from('evidence_logs')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);
        
        if (logsData) setLogs(logsData);
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white w-full max-w-md rounded-3xl shadow-xl overflow-hidden flex flex-col max-h-[80vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-soft flex justify-between items-center bg-primary-soft/30">
              <h2 className="font-display text-xl text-plum flex items-center gap-2">
                <ShieldCheck className="text-primary" size={24} />
                Your Profile
              </h2>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/50 text-muted transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Basic Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-soft rounded-2xl">
                  <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold shadow-inner">
                    {user?.email?.[0].toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-plum leading-tight flex items-center gap-1.5">
                      {profile?.nickname || user?.user_metadata?.nickname || 'GoGirl Member'}
                      {isDemoMode && <Sparkles size={14} className="text-secondary" />}
                    </h3>
                    <p className="text-muted text-sm flex items-center gap-1 mt-1">
                      <Mail size={14} />
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Previous Logs */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-plum flex items-center gap-2 px-1">
                  <History size={16} className="text-primary" />
                  Recent Evidence Logs
                </h4>
                
                <div className="space-y-2">
                  {loading ? (
                    <div className="animate-pulse space-y-2">
                      {[1, 2].map(i => (
                        <div key={i} className="h-16 bg-soft rounded-xl w-full" />
                      ))}
                    </div>
                  ) : logs.length > 0 ? (
                    logs.map(log => (
                      <div key={log.id} className="p-3 bg-white border border-soft rounded-xl shadow-sm hover:border-primary/30 transition-colors">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary-soft px-2 py-0.5 rounded-full">
                            {log.platform}
                          </span>
                          <span className="text-[10px] text-muted">
                            {new Date(log.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-xs text-plum line-clamp-1 italic">
                          "{log.description}"
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 bg-soft rounded-2xl border border-dashed border-muted/30">
                      <p className="text-xs text-muted">No logs recorded yet.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-soft bg-soft/30">
              <button
                onClick={() => setIsSignOutConfirmOpen(true)}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-white border border-red-100 text-red-500 font-semibold text-sm hover:bg-red-50 transition-colors shadow-sm"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>

      <ConfirmModal
        isOpen={isSignOutConfirmOpen}
        onClose={() => setIsSignOutConfirmOpen(false)}
        onConfirm={() => {
          signOut();
          onClose();
        }}
        title="Sign Out?"
        message="Are you sure you want to sign out? You will need to log back in to see your evidence."
        confirmText="Sign Out"
        cancelText="Cancel"
      />
    </>
  );
}
