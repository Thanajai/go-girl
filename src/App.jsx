import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import PageWrapper from './components/layout/PageWrapper.jsx';
import Landing from './pages/Landing.jsx';
import Home from './pages/Home.jsx';
import Detect from './pages/Detect.jsx';
import ActionPlan from './pages/ActionPlan.jsx';
import Evidence from './pages/Evidence.jsx';
import Stories from './pages/Stories.jsx';
import SelfCare from './pages/SelfCare.jsx';
import SOS from './pages/SOS.jsx';
import ReportWalkthrough from './pages/ReportWalkthrough.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Loader from './components/ui/Loader.jsx';

export default function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative">
      <div className="aurora-bg" />
      
      <AnimatePresence mode="wait">
        {isInitialLoading ? (
          <motion.div 
            key="initial-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
          >
            <Loader text="Preparing your safe space..." />
          </motion.div>
        ) : (
          <motion.div 
            key="app-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative z-10"
          >
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                <Route path="/home" element={<PageWrapper><Home /></PageWrapper>} />
                <Route path="/detect" element={<PageWrapper><Detect /></PageWrapper>} />
                <Route path="/action-plan" element={<PageWrapper><ActionPlan /></PageWrapper>} />
                <Route path="/evidence" element={<PageWrapper><Evidence /></PageWrapper>} />
                <Route path="/stories" element={<PageWrapper><Stories /></PageWrapper>} />
                <Route path="/self-care" element={<PageWrapper><SelfCare /></PageWrapper>} />
                <Route path="/sos" element={<PageWrapper><SOS /></PageWrapper>} />
                <Route path="/report" element={<PageWrapper><ReportWalkthrough /></PageWrapper>} />
              </Routes>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
