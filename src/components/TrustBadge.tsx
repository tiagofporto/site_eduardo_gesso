import React from 'react';
import { Award, ShieldCheck, CheckCircle, Users } from 'lucide-react';

interface TrustBadgeProps {
  variant?: 'compact' | 'full' | 'hero';
  className?: string;
}

export default function TrustBadge({ variant = 'compact', className = '' }: TrustBadgeProps) {
  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-white shadow-sm ${className}`}>
        <Award size={14} className="text-azul-claro animate-pulse" />
        <span className="text-[11px] sm:text-xs font-sans font-medium tracking-wide">
          Empresa Certificada & Atendimento Profissional
        </span>
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <div className={`inline-flex items-center gap-3 p-3.5 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 shadow-lg text-left ${className}`}>
        <div className="w-10 h-10 rounded-full bg-azul-claro/10 text-azul-claro flex items-center justify-center shrink-0">
          <ShieldCheck size={22} className="stroke-[1.75]" />
        </div>
        <div>
          <span className="text-white text-xs font-semibold tracking-wider uppercase block">
            Garantia & Certificação
          </span>
          <span className="text-white/70 text-xs font-sans mt-0.5 block leading-normal">
            Serviço técnico homologado com garantia por escrito.
          </span>
        </div>
      </div>
    );
  }

  // Variant Full (ideal for inside/below the form card)
  return (
    <div className={`p-5 rounded-lg bg-azul-gelo/30 border border-linha/50 text-left ${className}`}>
      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-full bg-azul-profundo/10 text-azul-profundo flex items-center justify-center shrink-0">
          <Award size={20} className="stroke-[2] text-azul-medio" />
        </div>
        <div className="flex-1">
          <h4 className="font-serif font-bold text-sm text-azul-profundo leading-tight">
            Selo de Confiança Eduardo Gesso
          </h4>
          <p className="text-tinta-suave text-xs font-sans mt-1 leading-relaxed">
            Nossa equipe técnica é totalmente homologada, com mais de 19 anos de experiência comprovada em Sertãozinho e região. Oferecemos visita e orçamento sem custo, além de garantia estendida e conformidade rígida com a LGPD.
          </p>
          
          <div className="grid grid-cols-2 gap-2 mt-4 pt-3.5 border-t border-linha/50">
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-azul-profundo font-semibold uppercase tracking-wider">
              <CheckCircle size={12} className="text-azul-claro" />
              Empresa Certificada
            </div>
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-azul-profundo font-semibold uppercase tracking-wider">
              <Users size={12} className="text-azul-claro" />
              Equipe Profissional
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
