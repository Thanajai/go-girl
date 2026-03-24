import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card.jsx';
import InstallBanner from '../components/InstallBanner.jsx';
import { motion } from 'motion/react';

export default function Home() {
  const navigate = useNavigate();

  const stories = [
    {
      id: 1,
      name: "Priya",
      city: "Mumbai",
      category: "College",
      emoji: "👩🏽‍🎓",
      quote: "I didn't know what was happening to me had a name.",
      full_story: "A senior started sharing edited photos of me in our college group chat as 'jokes'. I laughed it off for weeks because everyone else was. But I stopped going to certain classes. I stopped posting on Instagram. GoGirl helped me see it was image-based harassment — and that I had options.",
      outcome: "Reported to college ICC. Senior issued warning."
    },
    {
      id: 2,
      name: "Ananya",
      city: "Delhi",
      category: "Workplace",
      emoji: "👩🏽‍💻",
      quote: "The screenshots I kept saved everything.",
      full_story: "My manager used to send me messages on WhatsApp after midnight — nothing explicitly inappropriate but always about how I 'stood out' and should 'spend time' with him. I used GoGirl's evidence log for 3 weeks. When I went to HR, I had dates, times, screenshots. They couldn't dismiss it.",
      outcome: "HR inquiry opened. Manager reassigned."
    },
    {
      id: 3,
      name: "Meera",
      city: "Bangalore",
      category: "Social Media",
      emoji: "📱",
      quote: "I thought I was overreacting. I wasn't.",
      full_story: "A guy from Twitter found my college, my neighborhood, my daily routine from my public posts. He started showing up in places. When I told friends, they said I was being dramatic. GoGirl classified it as severe — cyber-stalking. That word gave me the courage to file a police complaint.",
      outcome: "FIR filed under IT Act Section 67."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="flex flex-col gap-6"
    >
      <InstallBanner />
      <motion.div variants={itemVariants} className="bg-soft rounded-2xl p-5">
        <h2 className="font-display text-2xl text-plum mb-1">Hi there 🌸</h2>
        <p className="text-muted text-sm">What do you need today?</p>
      </motion.div>

      <motion.div variants={containerVariants} className="grid grid-cols-2 gap-3">
        <motion.div variants={itemVariants}>
          <Card accent="rose" hover onClick={() => navigate('/detect')} padding="p-4" className="h-full">
            <div className="text-2xl mb-2">🔍</div>
            <h3 className="font-semibold text-plum text-sm mb-1">Is this harassment?</h3>
            <p className="text-xs text-muted leading-tight">Paste a message, get instant analysis</p>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card accent="sage" hover onClick={() => navigate('/action-plan')} padding="p-4" className="h-full">
            <div className="text-2xl mb-2">📋</div>
            <h3 className="font-semibold text-plum text-sm mb-1">What should I do?</h3>
            <p className="text-xs text-muted leading-tight">Step-by-step action plan</p>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card accent="peach" hover onClick={() => navigate('/evidence')} padding="p-4" className="h-full">
            <div className="text-2xl mb-2">📁</div>
            <h3 className="font-semibold text-plum text-sm mb-1">Document evidence</h3>
            <p className="text-xs text-muted leading-tight">Safely log what happened</p>
          </Card>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          animate={{ 
            boxShadow: ["0px 0px 0px rgba(242, 125, 38, 0)", "0px 0px 15px rgba(242, 125, 38, 0.3)", "0px 0px 0px rgba(242, 125, 38, 0)"]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="rounded-2xl"
        >
          <Card accent="plum" hover onClick={() => navigate('/sos')} padding="p-4" className="h-full">
            <div className="text-2xl mb-2">🆘</div>
            <h3 className="font-semibold text-plum text-sm mb-1">I need help now</h3>
            <p className="text-xs text-muted leading-tight">Helplines & emergency contacts</p>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants} className="mt-2">
        <div className="flex justify-between items-end mb-4">
          <h3 className="font-display text-xl text-plum">Stories from women like you</h3>
          <button onClick={() => navigate('/stories')} className="text-xs font-semibold text-primary hover:underline">
            Read more →
          </button>
        </div>
        
        <div className="flex overflow-x-auto pb-4 -mx-4 px-4 gap-4 snap-x">
          {stories.map(story => (
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              key={story.id} 
              className="min-w-[280px] snap-center cursor-pointer"
              onClick={() => navigate('/stories')}
            >
              <div className="bg-soft rounded-xl p-4 h-full flex flex-col">
                <p className="font-display italic text-primary text-lg leading-tight mb-3 flex-1">
                  "{story.quote}"
                </p>
                <p className="text-xs text-muted font-medium">
                  {story.name}, {story.city}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
