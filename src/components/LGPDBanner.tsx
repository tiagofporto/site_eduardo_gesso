import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Cookie, ChevronRight } from 'lucide-react';

interface LGPDBannerProps {
  onOpenPolicy: () => void;
}

export default function LGPDBanner({ onOpenPolicy }: LGPDBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted the privacy/LGPD consent
    const consent = localStorage.getItem('eduardo_gesso_lgpd_consent');
    if (!consent) {
      // Delay visibility slightly for a premium feel
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('eduardo_gesso_lgpd_consent', 'accepted');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md bg-azul-profundo/98 border border-white/10 p-5 rounded-lg shadow-2xl z-[150] text-left text-white backdrop-blur-md"
        >
          <div className="flex gap-4 items-start mb-4">
            <div className="w-10 h-10 rounded-full bg-azul-claro/10 text-azul-claro flex items-center justify-center shrink-0 mt-0.5">
              <Cookie size={20} />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm tracking-wide text-white">Privacidade & LGPD</h4>
              <p className="text-xs text-white/70 leading-relaxed mt-1">
                Usamos cookies e formulários para oferecer orçamento personalizado e melhorar sua experiência. Ao prosseguir, você concorda com nossos termos.
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between gap-4 pt-2 border-t border-white/5">
            <button
              onClick={onOpenPolicy}
              className="text-xs font-semibold text-azul-claro hover:text-white transition-colors cursor-pointer flex items-center gap-1 group"
            >
              Ler Política
              <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={handleAccept}
              className="bg-azul-claro hover:bg-azul-claro/90 text-azul-profundo font-bold text-xs px-5 py-2 rounded shadow transition-all cursor-pointer"
            >
              Aceitar e Fechar
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
