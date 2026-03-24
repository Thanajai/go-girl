import { useState, useCallback, useEffect } from 'react';
import { supabase } from '../lib/supabase.js';
import { useAuth } from './useAuth.js';

export function useEvidence() {
  const { user } = useAuth();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLogs = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('evidence_logs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setLogs(data || []);
    } catch (err) {
      console.error('Error fetching logs:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const addLog = async (logData) => {
    if (!user) return { error: 'Not logged in' };
    setLoading(true);
    
    try {
      const { data, error: insertError } = await supabase
        .from('evidence_logs')
        .insert([{ ...logData, user_id: user.id }])
        .select();

      if (insertError) throw insertError;
      setLogs((prev) => [data[0], ...prev]);
      return { data: data[0] };
    } catch (err) {
      console.error('Error adding log:', err);
      return { error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteLog = async (id) => {
    if (!user) return { error: 'Not logged in' };
    setLoading(true);

    try {
      const { error: deleteError } = await supabase
        .from('evidence_logs')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (deleteError) throw deleteError;
      setLogs((prev) => prev.filter((log) => log.id !== id));
      return { success: true };
    } catch (err) {
      console.error('Error deleting log:', err);
      return { error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { logs, loading, error, fetchLogs, addLog, deleteLog };
}
