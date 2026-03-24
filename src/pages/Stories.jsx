import { useState } from 'react';
import StoryCard from '../components/features/StoryCard.jsx';
import { motion, AnimatePresence } from 'motion/react';

export default function Stories() {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Workplace', 'College', 'Relationship', 'Social Media'];

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
    },
    {
      id: 4,
      name: "Riya",
      city: "Hyderabad",
      category: "College",
      emoji: "🎒",
      quote: "They made a fake profile using my pictures.",
      full_story: "Someone from my batch created a fake Instagram account using my photos and started messaging guys from other colleges. I was getting weird requests and didn't know why. GoGirl's action plan told me exactly how to report impersonation to Instagram and the cyber cell.",
      outcome: "Account taken down in 48 hours."
    },
    {
      id: 5,
      name: "Kavya",
      city: "Chennai",
      category: "Relationship",
      emoji: "💔",
      quote: "He threatened to leak my private photos.",
      full_story: "When I broke up with my ex, he said he would send our private photos to my family. I was terrified and felt completely trapped. The SOS section connected me to a helpline where a counselor explained my legal rights and helped me file an anonymous complaint.",
      outcome: "Police intervention. Photos deleted."
    },
    {
      id: 6,
      name: "Divya",
      city: "Pune",
      category: "Social Media",
      emoji: "💬",
      quote: "The comments section became a nightmare.",
      full_story: "I posted a video about a social issue, and suddenly hundreds of men were leaving abusive comments and rape threats. It was overwhelming. The self-care exercises helped me ground myself, and the reporting guide made it easy to mass-block and report the worst offenders.",
      outcome: "Comments restricted. Mental peace restored."
    }
  ];

  const filteredStories = filter === 'All' 
    ? stories 
    : stories.filter(s => s.category === filter);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6"
    >
      <div>
        <h2 className="font-display text-2xl text-plum mb-1 italic">You're not alone 🌸</h2>
        <p className="text-muted text-sm">Read stories from women who fought back.</p>
      </div>

      <div className="flex overflow-x-auto pb-2 -mx-4 px-4 gap-2 snap-x hide-scrollbar">
        {filters.map(f => (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={f}
            onClick={() => setFilter(f)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors snap-start ${
              filter === f 
                ? 'bg-primary text-white' 
                : 'bg-white text-plum shadow-sm hover:bg-primary-soft'
            }`}
          >
            {f}
          </motion.button>
        ))}
      </div>

      <motion.div layout className="flex flex-col gap-4">
        <AnimatePresence>
          {filteredStories.map(story => (
            <motion.div
              key={story.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            >
              <StoryCard story={story} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
