import { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Download, Check, Phone, MessageCircle, Copy } from 'lucide-react';
import Button from '../ui/Button.jsx';
import { useNavigate } from 'react-router-dom';

export default function ActionSteps({ steps }) {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  const handleSavePlan = () => {
    const planText = steps.map((step, index) => {
      return `Step ${index + 1}: ${step.title}\n${step.desc}\nResource: ${step.resource && step.resource !== 'NONE' ? step.resource : 'N/A'}\n`;
    }).join('\n');

    const blob = new Blob([planText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'GoGirl_Action_Plan.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex flex-col gap-4">
      {steps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-2xl p-5 shadow-sm flex gap-4"
        >
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
            {index + 1}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-plum mb-1">{step.title}</h3>
            <p className="text-sm text-muted mb-3">{step.desc}</p>
            
            {step.resource && step.resource !== 'NONE' && (
              <div className="flex flex-wrap gap-2 mt-2">
                {step.resource.includes('http') ? (
                  <button 
                    onClick={() => window.open(step.resource, '_blank')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary-soft text-secondary rounded-full text-xs font-semibold hover:bg-secondary/20 transition-colors"
                  >
                    {step.resource}
                    <ExternalLink size={12} />
                  </button>
                ) : (
                  (() => {
                    const phoneMatch = step.resource.match(/[\d\-\+\s]{8,}/);
                    if (phoneMatch) {
                      const cleanNumber = phoneMatch[0].replace(/[^\d\+]/g, '');
                      const waNumber = cleanNumber.startsWith('0') ? '91' + cleanNumber.slice(1) : (cleanNumber.length === 10 ? '91' + cleanNumber : cleanNumber);
                      return (
                        <>
                          <span className="text-xs text-muted self-center mr-1">{step.resource}</span>
                          <a 
                            href={`tel:${cleanNumber}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-soft text-primary rounded-full text-xs font-semibold hover:bg-primary/20 transition-colors"
                          >
                            <Phone size={12} /> Call
                          </a>
                          <a 
                            href={`https://wa.me/${waNumber}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold hover:bg-green-200 transition-colors"
                          >
                            <MessageCircle size={12} /> WhatsApp
                          </a>
                        </>
                      );
                    } else {
                      return (
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(step.resource);
                            alert('Copied to clipboard: ' + step.resource);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary-soft text-secondary rounded-full text-xs font-semibold hover:bg-secondary/20 transition-colors"
                        >
                          {step.resource}
                          <Copy size={12} />
                        </button>
                      );
                    }
                  })()
                )}
              </div>
            )}
          </div>
        </motion.div>
      ))}

      <div className="flex flex-col gap-3 mt-4">
        <Button fullWidth onClick={() => navigate('/report')}>
          Want to report this? →
        </Button>
        <Button variant="ghost" fullWidth onClick={handleSavePlan}>
          {saved ? (
            <span className="flex items-center justify-center gap-2">
              <Check size={16} /> Plan Saved
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Download size={16} /> Save this plan
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
