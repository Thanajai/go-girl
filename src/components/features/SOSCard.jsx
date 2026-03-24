import { Phone, ExternalLink, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function SOSCard({ title, desc, contact, isLink }) {
  const handleCall = () => {
    window.location.href = `tel:${contact}`;
  };

  const handleWhatsApp = () => {
    const cleanNumber = contact.replace(/[^\d\+]/g, '');
    const waNumber = cleanNumber.startsWith('0') ? '91' + cleanNumber.slice(1) : (cleanNumber.length === 10 ? '91' + cleanNumber : cleanNumber);
    window.open(`https://wa.me/${waNumber}`, '_blank');
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-l-primary flex justify-between items-center gap-4"
    >
      <div className="flex-1">
        <h3 className="font-semibold text-plum">{title}</h3>
        <p className="text-xs text-muted mt-0.5">{desc}</p>
      </div>
      <div className="flex gap-2">
        {isLink ? (
          <motion.a 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href={`https://${contact}`}
            target="_blank"
            rel="noreferrer"
            className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-soft text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
          >
            <ExternalLink size={18} />
          </motion.a>
        ) : (
          <>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCall}
              className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-soft text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              title="Call"
            >
              <Phone size={18} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleWhatsApp}
              className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors"
              title="WhatsApp"
            >
              <MessageCircle size={18} />
            </motion.button>
          </>
        )}
      </div>
    </motion.div>
  );
}
