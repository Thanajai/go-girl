import TopBar from './TopBar.jsx';
import BottomNav from './BottomNav.jsx';
import OfflineBanner from '../OfflineBanner.jsx';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, ShieldCheck, Heart, Flower } from 'lucide-react';
import { useRef } from 'react';

export default function PageWrapper({ children }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  // Parallax effects for side elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div ref={containerRef} className="min-h-screen bg-bg flex flex-col relative overflow-x-hidden">
      <OfflineBanner />
      {/* Decorative Side Elements - Visible only on larger screens */}
      <div className="hidden lg:block fixed inset-0 pointer-events-none z-0">
        {/* Left Side Decorative Column */}
        <div className="absolute left-0 top-0 bottom-0 w-[calc(50%-250px)] flex flex-col items-center justify-around py-20 px-10">
          <motion.div 
            style={{ y: y1, rotate }}
            className="text-primary/20"
          >
            <Flower size={80} />
          </motion.div>
          
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-secondary/20"
          >
            <Heart size={60} fill="currentColor" />
          </motion.div>

          <motion.div 
            style={{ y: y2 }}
            className="text-plum/10"
          >
            <ShieldCheck size={100} />
          </motion.div>
        </div>

        {/* Right Side Decorative Column */}
        <div className="absolute right-0 top-0 bottom-0 w-[calc(50%-250px)] flex flex-col items-center justify-around py-20 px-10">
          <motion.div 
            animate={{ 
              rotate: [0, 360]
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="text-accent/20"
          >
            <Sparkles size={120} />
          </motion.div>

          <motion.div 
            style={{ y: y1 }}
            className="text-primary/15"
          >
            <Flower size={100} />
          </motion.div>

          <motion.div 
            animate={{ 
              scale: [0.9, 1.1, 0.9],
              x: [0, 20, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="text-secondary/20"
          >
            <Heart size={80} />
          </motion.div>
        </div>

        {/* Background Blobs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -left-20 top-1/4 w-96 h-96 bg-primary-soft/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -right-20 bottom-1/4 w-[500px] h-[500px] bg-secondary-soft/20 rounded-full blur-3xl"
        />

        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + '%', 
              y: '110%',
              opacity: Math.random() * 0.5 + 0.1
            }}
            animate={{ 
              y: '-10%',
              x: (Math.random() * 100) + '%'
            }}
            transition={{ 
              duration: 15 + Math.random() * 10, 
              repeat: Infinity, 
              delay: i * 2,
              ease: "linear" 
            }}
            className="absolute w-2 h-2 rounded-full bg-primary/10 blur-[1px]"
          />
        ))}
      </div>

      <TopBar />
      <main className="flex-1 pt-14 pb-24 max-w-md mx-auto w-full px-4 relative z-10">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
