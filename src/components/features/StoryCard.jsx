import { useState } from 'react';
import { motion } from 'motion/react';
import Badge from '../ui/Badge.jsx';

export default function StoryCard({ story }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-soft">
      <div className="flex items-start gap-4 mb-4">
        <div className="text-4xl">{story.emoji}</div>
        <div>
          <h3 className="font-semibold text-plum">{story.name}, {story.city}</h3>
          <Badge label={story.category} color="bg-secondary-soft text-secondary mt-1" />
        </div>
      </div>

      <p className="font-display italic text-primary text-lg leading-snug mb-3">
        "{story.quote}"
      </p>

      <motion.div
        initial={false}
        animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="text-sm text-muted leading-relaxed mb-4">
          {story.full_story}
        </p>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary-soft text-secondary rounded-full text-xs font-semibold">
          ✓ {story.outcome}
        </div>
      </motion.div>

      <button 
        onClick={() => setExpanded(!expanded)}
        className="text-sm font-semibold text-primary mt-3 hover:underline"
      >
        {expanded ? "Hide story" : "Read her story →"}
      </button>
    </div>
  );
}
