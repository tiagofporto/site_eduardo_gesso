import React, { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import StatsDashboard from './components/StatsDashboard';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import LGPDBanner from './components/LGPDBanner';
import TrustBadge from './components/TrustBadge';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  FileText, 
  Award, 
  Check, 
  Star, 
  ArrowRight, 
  Menu, 
  X, 
  MessageSquare
} from 'lucide-react';

// Interfaces
interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  cat: string;
  title: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=900&auto=format&fit=crop",
    alt: "Sanca de gesso com fita LED em sala de estar",
    cat: "sanca",
    title: "Sanca com LED — Residência Vila Nova"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=600&auto=format&fit=crop",
    alt: "Forro de drywall em quarto",
    cat: "forro",
    title: "Forro Drywall — Quarto Casal"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
    alt: "Moldura decorativa de gesso clássica",
    cat: "moldura",
    title: "Moldura Clássica — Sala de Jantar"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop",
    alt: "Forro de gesso em loja comercial",
    cat: "comercial",
    title: "Projeto Comercial — Loja Centro"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1618219740975-d40978bb7378?q=80&w=600&auto=format&fit=crop",
    alt: "Sanca de gesso em cozinha planejada",
    cat: "sanca",
    title: "Sanca em Nível — Cozinha"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=600&auto=format&fit=crop",
    alt: "Forro liso em home office",
    cat: "forro",
    title: "Forro Liso — Home Office"
  }
];

export default function App() {
  const WHATSAPP_NUMBER = "5516992415789";

  // Navigation state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Gallery filter state
  const [activeTab, setActiveTab] = useState('todos');

  // Lightbox state
  const [lightboxImg, setLightboxImg] = useState<GalleryItem | null>(null);

  // Privacy Policy state (LGPD)
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form inputs state
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [servico, setServico] = useState('');
  const [cidade, setCidade] = useState('');
  const [mensagem, setMensagem] = useState('');

  // Handle scroll to add background to header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Format phone number input (e.g. (16) 99241-5789)
  const handlePhoneChange = (value: string) => {
    // Remove non-digits
    const cleanValue = value.replace(/\D/g, "");
    
    // Apply Brazilian formatting
    let formatted = cleanValue;
    if (cleanValue.length > 0) {
      formatted = `(${cleanValue.substring(0, 2)}`;
    }
    if (cleanValue.length > 2) {
      formatted += `) ${cleanValue.substring(2, 7)}`;
    }
    if (cleanValue.length > 7) {
      formatted += `-${cleanValue.substring(7, 11)}`;
    }
    
    // Limit to 15 characters
    if (formatted.length <= 15) {
      setTelefone(formatted);
    }
  };

  // Handle Form Submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!nome || !telefone || !servico || !cidade) {
      showToast('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    let texto = `Olá! Vim pelo site da Eduardo Gesso e gostaria de um orçamento.\n\n`;
    texto += `*Nome:* ${nome}\n`;
    texto += `*WhatsApp:* ${telefone}\n`;
    texto += `*Serviço desejado:* ${servico}\n`;
    texto += `*Cidade/Bairro:* ${cidade}\n`;
    if (mensagem.trim()) {
      texto += `*Detalhes:* ${mensagem}\n`;
    }

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;

    showToast('Abrindo WhatsApp com seu orçamento...');
    
    setTimeout(() => {
      window.open(url, '_blank');
      // Reset form fields
      setNome('');
      setTelefone('');
      setServico('');
      setCidade('');
      setMensagem('');
    }, 800);
  };

  // Helper to trigger Toast message
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Filter gallery items
  const filteredGallery = activeTab === 'todos' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.cat === activeTab);

  return (
    <div className="relative min-h-screen font-sans bg-gesso text-tinta selection:bg-azul-claro selection:text-azul-profundo">
      
      {/* ===================== HEADER ===================== */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 border-b ${
        scrolled 
          ? 'bg-azul-profundo/95 backdrop-blur-md border-white/5 shadow-md py-3' 
          : 'bg-azul-profundo/90 backdrop-blur-sm border-white/10 py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#topo" className="logo text-white font-serif font-bold text-2xl tracking-wide flex items-baseline gap-2">
            Eduardo <span className="text-azul-claro font-sans font-light italic text-base">Gesso</span>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            <ul className="flex items-center gap-8">
              <li>
                <a href="#servicos" className="text-white/80 hover:text-white text-[15px] font-medium transition-colors relative group py-2">
                  Serviços
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-azul-claro transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a href="#processo" className="text-white/80 hover:text-white text-[15px] font-medium transition-colors relative group py-2">
                  Como Trabalhamos
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-azul-claro transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a href="#galeria" className="text-white/80 hover:text-white text-[15px] font-medium transition-colors relative group py-2">
                  Galeria
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-azul-claro transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a href="#depoimentos" className="text-white/80 hover:text-white text-[15px] font-medium transition-colors relative group py-2">
                  Depoimentos
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-azul-claro transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
              <li>
                <a href="#localizacao" className="text-white/80 hover:text-white text-[15px] font-medium transition-colors relative group py-2">
                  Localização
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-azul-claro transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            </ul>
            <a 
              href="#orcamento" 
              className="bg-azul-claro hover:bg-azul-claro/90 text-azul-profundo font-bold px-6 py-2.5 rounded shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-sm"
            >
              Peça seu orçamento
            </a>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden text-white hover:text-azul-claro focus:outline-none p-1 transition-colors"
            aria-label="Abrir menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[65px] bg-azul-profundo/98 border-b border-white/10 z-40 md:hidden flex flex-col px-6 py-8 shadow-xl backdrop-blur-md"
          >
            <ul className="flex flex-col gap-5 mb-6">
              <li>
                <a 
                  href="#servicos" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white hover:text-azul-claro text-lg font-medium block transition-colors py-1"
                >
                  Serviços
                </a>
              </li>
              <li>
                <a 
                  href="#processo" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white hover:text-azul-claro text-lg font-medium block transition-colors py-1"
                >
                  Como Trabalhamos
                </a>
              </li>
              <li>
                <a 
                  href="#galeria" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white hover:text-azul-claro text-lg font-medium block transition-colors py-1"
                >
                  Galeria
                </a>
              </li>
              <li>
                <a 
                  href="#depoimentos" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white hover:text-azul-claro text-lg font-medium block transition-colors py-1"
                >
                  Depoimentos
                </a>
              </li>
              <li>
                <a 
                  href="#localizacao" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white hover:text-azul-claro text-lg font-medium block transition-colors py-1"
                >
                  Localização
                </a>
              </li>
            </ul>
            <a 
              href="#orcamento" 
              onClick={() => setIsMenuOpen(false)}
              className="bg-azul-claro hover:bg-azul-claro/90 text-azul-profundo font-bold py-3 px-6 rounded text-center shadow-lg transition-all duration-200"
            >
              Peça seu orçamento
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================== HERO ===================== */}
      <section id="topo" className="relative min-h-screen bg-gradient-to-br from-azul-profundo via-[#0E3A5F] to-azul-medio flex items-center pt-32 pb-24 overflow-hidden">
        {/* Background Grid Pattern overlay */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,transparent,transparent_70px,rgba(255,255,255,0.015)_70px,rgba(255,255,255,0.015)_72px)] pointer-events-none"></div>
        
        {/* Absolute Architectural Molding Vector Overlay */}
        <div className="absolute -right-44 top-1/2 -translate-y-1/2 w-[720px] h-[720px] opacity-15 pointer-events-none hidden lg:block">
          <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
            <circle cx="200" cy="200" r="180" stroke="white" strokeWidth="1" />
            <circle cx="200" cy="200" r="140" stroke="white" strokeWidth="1.5" />
            <circle cx="200" cy="200" r="100" stroke="#4FA8D8" strokeWidth="1.5" />
            <circle cx="200" cy="200" r="60" stroke="#4FA8D8" strokeWidth="2.5" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 flex flex-col text-left">
              <motion.span 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-azul-claro mb-4"
              >
                Gesso & Acabamentos de Alto Padrão · Desde 2005
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-[4rem] font-serif font-semibold text-white leading-tight tracking-tight mb-6"
              >
                Sua casa merece o<br />
                acabamento que <span className="italic text-azul-claro font-serif font-medium">conta uma história.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-white/80 leading-relaxed max-w-2xl mb-8"
              >
                Sancas, molduras e forros esculpidos à mão por quem trata cada teto como uma obra. Mais de 800 ambientes transformados em Sertãozinho e região — e o seu pode ser o próximo.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="mb-6 flex"
              >
                <TrustBadge variant="compact" />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4 sm:gap-6 mb-12"
              >
                <a 
                  href="#orcamento" 
                  className="bg-azul-claro hover:bg-azul-claro/95 text-azul-profundo font-bold px-8 py-4 sm:px-10 rounded-md shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-200 text-base inline-flex items-center gap-3 group"
                >
                  Quero meu orçamento grátis
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="#galeria" 
                  className="border border-white/30 hover:border-white/50 text-white font-semibold px-8 py-4 rounded-md hover:bg-white/5 transition-all duration-200 text-base"
                >
                  Ver obras realizadas
                </a>
              </motion.div>

              {/* Stats Block */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-xl"
              >
                <div>
                  <span className="font-serif font-bold text-3xl sm:text-4xl text-white block mb-1">800+</span>
                  <span className="text-xs sm:text-sm text-white/60 tracking-wider">Obras entregues</span>
                </div>
                <div>
                  <span className="font-serif font-bold text-3xl sm:text-4xl text-white block mb-1">19</span>
                  <span className="text-xs sm:text-sm text-white/60 tracking-wider">Anos de experiência</span>
                </div>
                <div>
                  <span className="font-serif font-bold text-3xl sm:text-4xl text-white block mb-1">4.9</span>
                  <span className="text-xs sm:text-sm text-white/60 tracking-wider">Avaliação clientes</span>
                </div>
              </motion.div>
            </div>

            {/* Hero Right Visual */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: 2 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative hidden lg:block"
            >
              <div className="bg-gradient-to-tr from-white to-azul-gelo p-2 rounded-lg shadow-2xl overflow-hidden border border-white/20">
                <img 
                  src="https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=800&auto=format&fit=crop" 
                  alt="Sanca de gesso com iluminação embutida em sala de estar moderna"
                  className="rounded-md w-full h-[460px] object-fit object-cover shadow-inner"
                />
              </div>
              
              {/* Overlapping Info Tag */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -bottom-6 -left-6 bg-azul-profundo border-l-[3px] border-azul-claro p-5 rounded-md shadow-2xl max-w-[250px] text-left"
              >
                <span className="font-serif font-bold text-2xl text-azul-claro block mb-1">+35%</span>
                <span className="text-xs sm:text-sm text-white/80 leading-snug block">
                  de valorização percebida em imóveis com forro de gesso projetado
                </span>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Sanca Divider: curve downward */}
      <div className="relative -mt-1 z-20 pointer-events-none">
        <svg className="w-full h-[46px] fill-gesso" viewBox="0 0 1200 46" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 Q300,46 600,10 Q900,-20 1200,20 L1200,46 L0,46 Z" />
        </svg>
      </div>

      {/* ===================== SERVIÇOS ===================== */}
      <section id="servicos" className="py-24 bg-gesso">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-2xl text-left mb-16">
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-azul-claro mb-3 block">O que fazemos</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-serif font-semibold text-azul-profundo mb-4 leading-tight">
              Cada ambiente pede um acabamento diferente. Nós sabemos qual.
            </h2>
            <p className="text-tinta-suave text-lg leading-relaxed">
              Do clássico ao contemporâneo, trabalhamos o gesso como elemento de design — não apenas de construção.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5 bg-azul-profundo/10 border border-azul-profundo/10 rounded-md overflow-hidden shadow-sm">
            
            {/* Service 1 */}
            <div className="bg-gesso hover:bg-azul-gelo/60 p-10 relative group transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="absolute top-10 right-10 font-serif italic text-lg text-azul-profundo/20 font-bold">01</span>
                <div className="w-14 h-14 bg-azul-gelo rounded-md flex items-center justify-center mb-8 text-azul-medio">
                  <svg className="w-8 h-8" viewBox="0 0 56 56" fill="none">
                    <rect x="6" y="14" width="44" height="6" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M6 30h44M6 38h44" stroke="#4FA8D8" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-bold text-azul-profundo mb-3 group-hover:text-azul-medio transition-colors">Sancas e Rebaixos</h3>
                <p className="text-tinta-suave text-[15px] leading-relaxed">
                  Iluminação indireta que muda o clima do ambiente em segundos. Projetamos a curva certa para cada pé-direito.
                </p>
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-gesso hover:bg-azul-gelo/60 p-10 relative group transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="absolute top-10 right-10 font-serif italic text-lg text-azul-profundo/20 font-bold">02</span>
                <div className="w-14 h-14 bg-azul-gelo rounded-md flex items-center justify-center mb-8 text-azul-medio">
                  <svg className="w-8 h-8" viewBox="0 0 56 56" fill="none">
                    <rect x="10" y="10" width="36" height="36" rx="3" stroke="currentColor" strokeWidth="2"/>
                    <rect x="18" y="18" width="20" height="20" rx="2" stroke="#4FA8D8" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-bold text-azul-profundo mb-3 group-hover:text-azul-medio transition-colors">Molduras Decorativas</h3>
                <p className="text-tinta-suave text-[15px] leading-relaxed">
                  Detalhes que separam uma sala "pronta" de uma sala com identidade. Estilo clássico, moderno ou industrial.
                </p>
              </div>
            </div>

            {/* Service 3 */}
            <div className="bg-gesso hover:bg-azul-gelo/60 p-10 relative group transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="absolute top-10 right-10 font-serif italic text-lg text-azul-profundo/20 font-bold">03</span>
                <div className="w-14 h-14 bg-azul-gelo rounded-md flex items-center justify-center mb-8 text-azul-medio">
                  <svg className="w-8 h-8" viewBox="0 0 56 56" fill="none">
                    <path d="M8 40 L28 14 L48 40 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M16 40h24" stroke="#4FA8D8" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-bold text-azul-profundo mb-3 group-hover:text-azul-medio transition-colors">Forros em Drywall</h3>
                <p className="text-tinta-suave text-[15px] leading-relaxed">
                  Estrutura leve, acabamento liso e isolamento acústico. A base perfeita para qualquer projeto de interiores.
                </p>
              </div>
            </div>

            {/* Service 4 */}
            <div className="bg-gesso hover:bg-azul-gelo/60 p-10 relative group transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="absolute top-10 right-10 font-serif italic text-lg text-azul-profundo/20 font-bold">04</span>
                <div className="w-14 h-14 bg-azul-gelo rounded-md flex items-center justify-center mb-8 text-azul-medio">
                  <svg className="w-8 h-8" viewBox="0 0 56 56" fill="none">
                    <circle cx="28" cy="28" r="18" stroke="currentColor" strokeWidth="2"/>
                    <path d="M28 16v12l8 6" stroke="#4FA8D8" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-bold text-azul-profundo mb-3 group-hover:text-azul-medio transition-colors">Manutenção e Reparo</h3>
                <p className="text-tinta-suave text-[15px] leading-relaxed">
                  Trincas, infiltração ou desgaste? Recuperamos o gesso existente devolvendo o acabamento original.
                </p>
              </div>
            </div>

            {/* Service 5 */}
            <div className="bg-gesso hover:bg-azul-gelo/60 p-10 relative group transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="absolute top-10 right-10 font-serif italic text-lg text-azul-profundo/20 font-bold">05</span>
                <div className="w-14 h-14 bg-azul-gelo rounded-md flex items-center justify-center mb-8 text-azul-medio">
                  <svg className="w-8 h-8" viewBox="0 0 56 56" fill="none">
                    <rect x="8" y="8" width="40" height="40" rx="20" stroke="currentColor" strokeWidth="2"/>
                    <path d="M20 28h16M28 20v16" stroke="#4FA8D8" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-bold text-azul-profundo mb-3 group-hover:text-azul-medio transition-colors">Gesso 3D & Texturizado</h3>
                <p className="text-tinta-suave text-[15px] leading-relaxed">
                  Painéis com relevo e textura para paredes de destaque — o ponto focal que toda sala merece ter.
                </p>
              </div>
            </div>

            {/* Service 6 */}
            <div className="bg-gesso hover:bg-azul-gelo/60 p-10 relative group transition-all duration-300 flex flex-col justify-between">
              <div>
                <span className="absolute top-10 right-10 font-serif italic text-lg text-azul-profundo/20 font-bold">06</span>
                <div className="w-14 h-14 bg-azul-gelo rounded-md flex items-center justify-center mb-8 text-azul-medio">
                  <svg className="w-8 h-8" viewBox="0 0 56 56" fill="none">
                    <path d="M10 44 L10 24 L28 10 L46 24 L46 44 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M22 44V32h12v12" stroke="#4FA8D8" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-bold text-azul-profundo mb-3 group-hover:text-azul-medio transition-colors">Projetos Comerciais</h3>
                <p className="text-tinta-suave text-[15px] leading-relaxed">
                  Lojas, escritórios e fachadas internas com prazo e padrão de execução pensados para o seu negócio.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Sanca Divider: curves upward into dark section */}
      <div className="relative -mt-1 z-20 pointer-events-none">
        <svg className="w-full h-[46px] fill-azul-profundo transform rotate-180" viewBox="0 0 1200 46" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 Q300,46 600,10 Q900,-20 1200,20 L1200,46 L0,46 Z" />
        </svg>
      </div>

      {/* ===================== PROCESSO ===================== */}
      <section id="processo" className="py-24 bg-azul-profundo text-white">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-2xl text-left mb-16">
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-azul-claro mb-3 block">Como trabalhamos</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-serif font-semibold text-white mb-4 leading-tight">
              Sem surpresa no meio da obra. Sem trinca depois de seis meses.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              Um processo enxuto, pensado para quem não quer dor de cabeça dentro de casa.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Step 1 */}
            <div className="border-t-2 border-azul-claro pt-6 flex flex-col justify-between h-full">
              <div>
                <span className="font-serif italic text-[2.6rem] font-bold text-azul-claro/55 block mb-2 leading-none">01</span>
                <h4 className="text-lg font-serif font-bold text-white mb-3">Visita técnica</h4>
                <p className="text-white/68 text-[15px] leading-relaxed">
                  Vamos até o local medir, entender a estrutura e ouvir o que você imagina para o espaço.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="border-t-2 border-azul-claro pt-6 flex flex-col justify-between h-full">
              <div>
                <span className="font-serif italic text-[2.6rem] font-bold text-azul-claro/55 block mb-2 leading-none">02</span>
                <h4 className="text-lg font-serif font-bold text-white mb-3">Projeto e orçamento</h4>
                <p className="text-white/68 text-[15px] leading-relaxed">
                  Você recebe uma proposta clara, com valor, prazo e material — direto no seu WhatsApp.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="border-t-2 border-azul-claro pt-6 flex flex-col justify-between h-full">
              <div>
                <span className="font-serif italic text-[2.6rem] font-bold text-azul-claro/55 block mb-2 leading-none">03</span>
                <h4 className="text-lg font-serif font-bold text-white mb-3">Execução cuidadosa</h4>
                <p className="text-white/68 text-[15px] leading-relaxed">
                  Equipe própria, proteção do ambiente e cronograma combinado. Sua rotina sofre o mínimo possível.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="border-t-2 border-azul-claro pt-6 flex flex-col justify-between h-full">
              <div>
                <span className="font-serif italic text-[2.6rem] font-bold text-azul-claro/55 block mb-2 leading-none">04</span>
                <h4 className="text-lg font-serif font-bold text-white mb-3">Entrega e garantia</h4>
                <p className="text-white/68 text-[15px] leading-relaxed">
                  Vistoria final junto com você e garantia por escrito em todos os serviços executados.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Sanca Divider: curve downward out of dark section */}
      <div className="relative -mt-1 z-20 pointer-events-none">
        <svg className="w-full h-[46px] fill-gesso" viewBox="0 0 1200 46" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,20 Q300,-20 600,10 Q900,46 1200,0 L1200,46 L0,46 Z" />
        </svg>
      </div>

      <StatsDashboard />

      {/* ===================== GALERIA ===================== */}
      <section id="galeria" className="py-24 bg-gesso">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-2xl text-left mb-12">
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-azul-claro mb-3 block">Galeria de Obras</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-serif font-semibold text-azul-profundo mb-4 leading-tight">
              Resultados reais, em casas e ambientes reais.
            </h2>
            <p className="text-tinta-suave text-lg leading-relaxed">
              Uma amostra dos projetos que já entregamos. Clique em qualquer foto para ampliar.
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap gap-2.5 mb-10">
            {[
              { id: 'todos', label: 'Todos' },
              { id: 'sanca', label: 'Sancas' },
              { id: 'forro', label: 'Forros' },
              { id: 'moldura', label: 'Molduras' },
              { id: 'comercial', label: 'Comercial' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-azul-profundo text-white border-azul-profundo shadow-sm'
                    : 'bg-transparent text-tinta-suave border-linha hover:border-azul-profundo hover:text-azul-profundo'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <motion.div 
            layout 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[220px]"
          >
            <AnimatePresence mode="popLayout">
              {filteredGallery.map((item, index) => {
                // First item is marked 'big' and occupies column span 2 / row span 2
                const isBig = index === 0 && activeTab === 'todos';
                
                return (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setLightboxImg(item)}
                    className={`relative overflow-hidden rounded-md cursor-pointer group shadow-sm ${
                      isBig ? 'sm:col-span-2 sm:row-span-2' : ''
                    }`}
                  >
                    <img 
                      src={item.src} 
                      alt={item.alt}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    
                    {/* Visual Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-azul-profundo/90 via-azul-profundo/20 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white font-semibold text-sm sm:text-base leading-snug">
                        {item.title}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* Sanca Divider: curve downward */}
      <div className="relative -mt-1 z-20 pointer-events-none">
        <svg className="w-full h-[46px] fill-azul-gelo transform rotate-180" viewBox="0 0 1200 46" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 Q300,40 600,15 Q900,-10 1200,25 L1200,46 L0,46 Z" />
        </svg>
      </div>

      {/* ===================== TESTEMUNHOS ===================== */}
      <section id="depoimentos" className="py-24 bg-azul-gelo">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-azul-medio mb-3 block">Quem já confiou, recomenda</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-serif font-semibold text-azul-profundo">
              O que dizem sobre trabalhar com a Eduardo Gesso
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Testimonial 1 */}
            <div className="bg-gesso p-8 rounded-lg shadow-sm border border-azul-profundo/5 flex flex-col justify-between">
              <div>
                <div className="text-dourado flex items-center gap-1 mb-5">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <p className="font-serif italic text-lg text-tinta leading-relaxed mb-6">
                  "Contratei achando que ia ser só 'mais um gesseiro'. Não foi. O Eduardo sugeriu um rebaixo que eu nem tinha pensado e a sala ficou irreconhecível — todo mundo que visita comenta."
                </p>
              </div>
              <div className="flex items-center gap-4.5">
                <div className="w-12 h-12 rounded-full bg-azul-medio text-white flex items-center justify-center font-serif font-bold text-base">
                  MF
                </div>
                <div>
                  <h4 className="font-sans font-bold text-[14px] text-azul-profundo">Mariana Ferreira</h4>
                  <span className="text-xs text-tinta-suave">Sertãozinho, SP</span>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gesso p-8 rounded-lg shadow-sm border border-azul-profundo/5 flex flex-col justify-between">
              <div>
                <div className="text-dourado flex items-center gap-1 mb-5">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <p className="font-serif italic text-lg text-tinta leading-relaxed mb-6">
                  "Equipe pontual, limpou tudo ao final do dia e entregou antes do prazo combinado. Pedi orçamento pelo site numa sexta e na segunda já estavam medindo o apartamento."
                </p>
              </div>
              <div className="flex items-center gap-4.5">
                <div className="w-12 h-12 rounded-full bg-azul-medio text-white flex items-center justify-center font-serif font-bold text-base">
                  RC
                </div>
                <div>
                  <h4 className="font-sans font-bold text-[14px] text-azul-profundo">Ricardo Carvalho</h4>
                  <span className="text-xs text-tinta-suave">Pradópolis, SP</span>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gesso p-8 rounded-lg shadow-sm border border-azul-profundo/5 flex flex-col justify-between">
              <div>
                <div className="text-dourado flex items-center gap-1 mb-5">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <p className="font-serif italic text-lg text-tinta leading-relaxed mb-6">
                  "Reformei a loja toda e o forro de gesso foi a parte que mais elogiaram os clientes. Preço justo, acabamento impecável e zero retrabalho. Já indiquei para três amigos."
                </p>
              </div>
              <div className="flex items-center gap-4.5">
                <div className="w-12 h-12 rounded-full bg-azul-medio text-white flex items-center justify-center font-serif font-bold text-base">
                  JS
                </div>
                <div>
                  <h4 className="font-sans font-bold text-[14px] text-azul-profundo">Juliana Santos</h4>
                  <span className="text-xs text-tinta-suave">Sertãozinho, SP</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== ORÇAMENTO ===================== */}
      <section id="orcamento" className="py-24 bg-gradient-to-br from-azul-profundo to-[#0E3A5F] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(79,168,216,0.1),transparent_50%)]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Form Left Info Column */}
            <div className="lg:col-span-5 text-left">
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-azul-claro mb-3 block">Orçamento sem compromisso</span>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.7rem] font-serif font-semibold text-white mb-6 leading-tight">
                Conte sua ideia. A resposta cai direto no nosso WhatsApp.
              </h2>
              <p className="text-white/75 text-lg leading-relaxed mb-10">
                Preencha o formulário ao lado e envie. Sua solicitação chega instantaneamente no celular do Eduardo — sem intermediários, sem espera em fila de e-mail.
              </p>

              <div className="flex flex-col gap-5">
                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-azul-claro/10 text-azul-claro flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={14} className="stroke-[3]" />
                  </div>
                  <span className="text-white/85 text-[15px] leading-normal">Resposta em até 24h úteis, geralmente no mesmo dia</span>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-azul-claro/10 text-azul-claro flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={14} className="stroke-[3]" />
                  </div>
                  <span className="text-white/85 text-[15px] leading-normal">Visita técnica gratuita para medições e avaliação</span>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-azul-claro/10 text-azul-claro flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={14} className="stroke-[3]" />
                  </div>
                  <span className="text-white/85 text-[15px] leading-normal">Orçamento detalhado, sem letras pequenas</span>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded-full bg-azul-claro/10 text-azul-claro flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={14} className="stroke-[3]" />
                  </div>
                  <span className="text-white/85 text-[15px] leading-normal">Garantia por escrito em todo serviço executado</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <TrustBadge variant="hero" />
              </div>
            </div>

            {/* Form Right Column */}
            <div className="lg:col-span-7 w-full">
              <div className="bg-gesso text-tinta rounded-lg p-8 sm:p-10 shadow-2xl border border-white/10">
                <h3 className="text-2xl font-serif font-bold text-azul-profundo mb-2">Solicitar orçamento</h3>
                <p className="text-tinta-suave text-sm mb-8">Leva menos de 1 minuto para preencher.</p>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col text-left">
                      <label htmlFor="nome" className="text-xs font-bold text-azul-profundo mb-2 tracking-wide uppercase">
                        Nome completo *
                      </label>
                      <input 
                        type="text" 
                        id="nome"
                        required
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Seu nome"
                        className="w-full bg-white border border-linha rounded-md px-4 py-3 text-[15px] placeholder-tinta-suave/50 focus:outline-none focus:border-azul-claro focus:ring-1 focus:ring-azul-claro transition-all"
                      />
                    </div>
                    <div className="flex flex-col text-left">
                      <label htmlFor="telefone" className="text-xs font-bold text-azul-profundo mb-2 tracking-wide uppercase">
                        Seu WhatsApp *
                      </label>
                      <input 
                        type="tel" 
                        id="telefone"
                        required
                        value={telefone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        placeholder="(16) 99999-9999"
                        className="w-full bg-white border border-linha rounded-md px-4 py-3 text-[15px] placeholder-tinta-suave/50 focus:outline-none focus:border-azul-claro focus:ring-1 focus:ring-azul-claro transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col text-left">
                      <label htmlFor="servico" className="text-xs font-bold text-azul-profundo mb-2 tracking-wide uppercase">
                        Tipo de serviço *
                      </label>
                      <div className="relative">
                        <select 
                          id="servico"
                          required
                          value={servico}
                          onChange={(e) => setServico(e.target.value)}
                          className="w-full bg-white border border-linha rounded-md px-4 py-3 text-[15px] focus:outline-none focus:border-azul-claro focus:ring-1 focus:ring-azul-claro transition-all appearance-none cursor-pointer"
                        >
                          <option value="" disabled>Selecione</option>
                          <option value="Sanca / Rebaixo">Sanca / Rebaixo</option>
                          <option value="Moldura Decorativa">Moldura Decorativa</option>
                          <option value="Forro em Drywall">Forro em Drywall</option>
                          <option value="Manutenção / Reparo">Manutenção / Reparo</option>
                          <option value="Gesso 3D / Texturizado">Gesso 3D / Texturizado</option>
                          <option value="Projeto Comercial">Projeto Comercial</option>
                          <option value="Ainda não sei, quero orientação">Ainda não sei, quero orientação</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-tinta-suave">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col text-left">
                      <label htmlFor="cidade" className="text-xs font-bold text-azul-profundo mb-2 tracking-wide uppercase">
                        Cidade / Bairro *
                      </label>
                      <input 
                        type="text" 
                        id="cidade"
                        required
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                        placeholder="Ex: Sertãozinho - Centro"
                        className="w-full bg-white border border-linha rounded-md px-4 py-3 text-[15px] placeholder-tinta-suave/50 focus:outline-none focus:border-azul-claro focus:ring-1 focus:ring-azul-claro transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col text-left">
                    <label htmlFor="mensagem" className="text-xs font-bold text-azul-profundo mb-2 tracking-wide uppercase">
                      Conte um pouco sobre o projeto (Opcional)
                    </label>
                    <textarea 
                      id="mensagem"
                      value={mensagem}
                      onChange={(e) => setMensagem(e.target.value)}
                      placeholder="Ex: quero uma sanca com LED na sala, ambiente de aproximadamente 20m²..."
                      className="w-full bg-white border border-linha rounded-md px-4 py-3 text-[15px] min-h-[90px] placeholder-tinta-suave/50 focus:outline-none focus:border-azul-claro focus:ring-1 focus:ring-azul-claro transition-all resize-y"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-azul-profundo hover:bg-azul-medio text-white font-bold py-4 px-6 rounded-md shadow-lg hover:shadow-xl transition-all duration-200 text-base inline-flex items-center justify-center gap-3 cursor-pointer"
                  >
                    Enviar orçamento pelo WhatsApp
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.07-1.33A9.93 9.93 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.2 14.2c-.22.62-1.28 1.22-1.76 1.27-.45.05-.86.22-2.9-.6-2.45-1-4.02-3.45-4.14-3.62-.12-.17-.98-1.3-.98-2.48 0-1.18.62-1.76.84-2 .22-.24.48-.3.64-.3.16 0 .32 0 .46.01.15.01.35-.06.55.42.22.52.74 1.8.8 1.93.06.13.1.28.02.45-.32.68-.66.9-.92 1.18-.2.2-.04.4.07.55.4.6 1 1.18 1.7 1.66.7.48 1.16.6 1.4.48.24-.12.9-.83 1.14-1.12.24-.28.46-.22.76-.12.3.1 1.9.9 2.22 1.06.32.16.54.24.62.38.08.13.08.74-.14 1.36z"/>
                    </svg>
                  </button>
                  
                  <p className="text-center text-xs text-tinta-suave mt-1 leading-relaxed">
                    Ao enviar, você será direcionado ao WhatsApp do Eduardo Gesso com sua mensagem pronta.
                  </p>

                  <div className="mt-4 pt-4 border-t border-linha/60">
                    <TrustBadge variant="full" />
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== CONFIANÇA ===================== */}
      <section className="py-20 bg-gesso border-b border-linha/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8 text-center">
            
            {/* Trust 1 */}
            <div className="flex flex-col items-center max-w-sm mx-auto">
              <div className="w-14 h-14 bg-azul-gelo rounded-full flex items-center justify-center text-azul-profundo mb-5">
                <ShieldCheck size={28} className="text-azul-medio" />
              </div>
              <h4 className="text-lg font-sans font-bold text-azul-profundo mb-2">Garantia escrita</h4>
              <p className="text-tinta-suave text-sm sm:text-[14px] leading-relaxed">
                Todo serviço sai com termo de garantia assinado.
              </p>
            </div>

            {/* Trust 2 */}
            <div className="flex flex-col items-center max-w-sm mx-auto">
              <div className="w-14 h-14 bg-azul-gelo rounded-full flex items-center justify-center text-azul-profundo mb-5">
                <Clock size={28} className="text-azul-medio" />
              </div>
              <h4 className="text-lg font-sans font-bold text-azul-profundo mb-2">Prazo respeitado</h4>
              <p className="text-tinta-suave text-sm sm:text-[14px] leading-relaxed">
                Cronograma combinado e acompanhado até a entrega final.
              </p>
            </div>

            {/* Trust 3 */}
            <div className="flex flex-col items-center max-w-sm mx-auto">
              <div className="w-14 h-14 bg-azul-gelo rounded-full flex items-center justify-center text-azul-profundo mb-5">
                <FileText size={28} className="text-azul-medio" />
              </div>
              <h4 className="text-lg font-sans font-bold text-azul-profundo mb-2">Sem letra miúda</h4>
              <p className="text-tinta-suave text-sm sm:text-[14px] leading-relaxed">
                Valor, material e prazo detalhados antes de começar.
              </p>
            </div>

            {/* Trust 4 */}
            <div className="flex flex-col items-center max-w-sm mx-auto">
              <div className="w-14 h-14 bg-azul-gelo rounded-full flex items-center justify-center text-azul-profundo mb-5">
                <Award size={28} className="text-azul-medio" />
              </div>
              <h4 className="text-lg font-sans font-bold text-azul-profundo mb-2">19 anos de mercado</h4>
              <p className="text-tinta-suave text-sm sm:text-[14px] leading-relaxed">
                Tradição e experiência em centenas de projetos na região.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== LOCALIZAÇÃO ===================== */}
      <section id="localizacao" className="py-24 bg-azul-gelo">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Location Left Content */}
            <div className="text-left">
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-azul-medio mb-3 block">Onde estamos</span>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-serif font-semibold text-azul-profundo mb-4 leading-tight">
                Visite, siga ou nos avalie — estamos presentes onde você precisar.
              </h2>
              <p className="text-tinta-suave text-lg leading-relaxed mb-10">
                Atendemos Sertãozinho e toda a região. Confira nosso endereço, acompanhe os bastidores das obras no Instagram ou deixe sua avaliação no Google.
              </p>

              {/* Info cards */}
              <div className="flex flex-col gap-4 mb-8">
                
                {/* Card Address */}
                <div className="bg-gesso p-6 rounded-lg shadow-sm border border-azul-profundo/5 flex gap-5 items-start">
                  <div className="w-10 h-10 rounded-full bg-azul-gelo flex items-center justify-center text-azul-profundo flex-shrink-0">
                    <MapPin size={20} className="text-azul-medio" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-[15px] text-azul-profundo mb-1">Endereço</h4>
                    <p className="text-tinta-suave text-sm sm:text-[14.5px] leading-relaxed">
                      R. Arlindo Magro, 260 - Sertãozinho, SP, 14168-405
                    </p>
                  </div>
                </div>

                {/* Card Phone */}
                <div className="bg-gesso p-6 rounded-lg shadow-sm border border-azul-profundo/5 flex gap-5 items-start">
                  <div className="w-10 h-10 rounded-full bg-azul-gelo flex items-center justify-center text-azul-profundo flex-shrink-0">
                    <Phone size={20} className="text-azul-medio" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-[15px] text-azul-profundo mb-1">Telefone / WhatsApp</h4>
                    <p className="text-tinta-suave text-sm sm:text-[14.5px] leading-relaxed">
                      (16) 99241-5789
                    </p>
                  </div>
                </div>

              </div>

              {/* Buttons Row */}
              <div className="flex flex-wrap gap-4">
                <a 
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-md font-bold text-white text-sm sm:text-base tracking-wide bg-gradient-to-r from-[#4f5bd5] via-[#d62976] to-[#feda75] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200" 
                  href="https://www.instagram.com/gessoeduardogesso" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Instagram size={20} />
                  Siga no Instagram
                </a>
                <a 
                  className="inline-flex items-center gap-3 px-6 py-3.5 rounded-md font-bold text-azul-profundo text-sm sm:text-base tracking-wide bg-white border border-linha hover:border-azul-profundo shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200" 
                  href="https://www.google.com/maps/search/?api=1&query=Eduardo+Gesso+R.+Arlindo+Magro+260+Sert%C3%A3ozinho+SP" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M21.8 12.2c0-.7-.06-1.4-.18-2.05H12v3.9h5.5a4.7 4.7 0 01-2.05 3.1v2.55h3.3c1.93-1.78 3.05-4.4 3.05-7.5z" fill="#4285F4"/>
                    <path d="M12 22c2.77 0 5.1-.9 6.8-2.45l-3.3-2.55c-.92.62-2.1.98-3.5.98-2.7 0-4.98-1.82-5.8-4.27H2.78v2.63A10 10 0 0012 22z" fill="#34A853"/>
                    <path d="M6.2 13.71a6.1 6.1 0 010-3.42V7.66H2.78a10 10 0 000 8.68l3.42-2.63z" fill="#FBBC05"/>
                    <path d="M12 5.96c1.5 0 2.86.52 3.92 1.53l2.94-2.94C17.1 2.78 14.76 1.9 12 1.9 7.7 1.9 3.99 4.4 2.78 7.66l3.42 2.63c.82-2.45 3.1-4.33 5.8-4.33z" fill="#EA4335"/>
                  </svg>
                  Ver no Google Maps
                </a>
              </div>
            </div>

            {/* Location Map Container */}
            <div className="w-full bg-white p-1.5 rounded-lg border border-white/50 shadow-2xl h-[440px] overflow-hidden">
              <iframe
                src="https://www.google.com/maps?q=R.+Arlindo+Magro,+260+-+Sert%C3%A3ozinho,+SP,+14168-405&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa - Eduardo Gesso, R. Arlindo Magro 260, Sertãozinho SP"
                className="w-full h-full border-0 rounded-md"
              ></iframe>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== FINAL CTA BLOCK ===================== */}
      <section className="py-20 bg-azul-claro text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.9rem] font-serif font-semibold text-azul-profundo mb-4 leading-tight">
            Pronto para transformar o teto da sua casa?
          </h2>
          <p className="text-azul-profundo/75 text-lg max-w-2xl mb-10 leading-relaxed">
            Fale agora com o Eduardo e receba uma resposta personalizada ainda hoje, direto no WhatsApp.
          </p>
          <a 
            href="#orcamento" 
            className="bg-azul-profundo hover:bg-[#081f36] text-white font-bold px-10 py-4.5 rounded-md shadow-xl hover:shadow-2xl transition-all duration-200 text-lg inline-flex items-center gap-3"
          >
            Solicitar meu orçamento
          </a>
        </div>
      </section>

      {/* ===================== FOOTER ===================== */}
      <footer className="bg-azul-profundo text-white/70 py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
            
            {/* Col 1 */}
            <div className="text-left flex flex-col">
              <div className="text-white font-serif font-bold text-2xl mb-4">Eduardo Gesso</div>
              <p className="text-sm leading-relaxed max-w-xs text-white/60">
                Acabamentos em gesso com precisão de escultor. Sancas, molduras, forros e projetos comerciais em Sertãozinho e toda a região.
              </p>
            </div>

            {/* Col 2 */}
            <div className="text-left flex flex-col">
              <h5 className="text-white font-semibold text-xs tracking-[0.04em] uppercase mb-5">Navegação</h5>
              <ul className="flex flex-col gap-3.5 text-sm text-white/60">
                <li><a href="#servicos" className="hover:text-azul-claro transition-colors">Serviços</a></li>
                <li><a href="#galeria" className="hover:text-azul-claro transition-colors">Galeria</a></li>
                <li><a href="#depoimentos" className="hover:text-azul-claro transition-colors">Depoimentos</a></li>
                <li><a href="#orcamento" className="hover:text-azul-claro transition-colors">Orçamento</a></li>
                <li><button onClick={() => setIsPrivacyOpen(true)} className="hover:text-azul-claro transition-colors cursor-pointer text-left">Privacidade (LGPD)</button></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div className="text-left flex flex-col">
              <h5 className="text-white font-semibold text-xs tracking-[0.04em] uppercase mb-5">Contato</h5>
              <ul className="flex flex-col gap-3.5 text-sm">
                <li>
                  <a 
                    href="https://wa.me/5516992415789" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-azul-claro transition-colors inline-flex items-center gap-2"
                  >
                    (16) 99241-5789
                  </a>
                </li>
                <li>
                  <a href="mailto:eduardogessossp@gmail.com" className="hover:text-azul-claro transition-colors">
                    eduardogessossp@gmail.com
                  </a>
                </li>
                <li className="text-white/60 leading-normal">
                  R. Arlindo Magro, 260 - Sertãozinho, SP, 14168-405
                </li>
              </ul>
            </div>

            {/* Col 4 */}
            <div className="text-left flex flex-col">
              <h5 className="text-white font-semibold text-xs tracking-[0.04em] uppercase mb-5">Redes & Avaliações</h5>
              <ul className="flex flex-col gap-3.5 text-sm text-white/60">
                <li>
                  <a 
                    href="https://www.instagram.com/gessoeduardogesso" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-azul-claro transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Eduardo+Gesso+R.+Arlindo+Magro+260+Sert%C3%A3ozinho+SP" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-azul-claro transition-colors"
                  >
                    Avalie no Google
                  </a>
                </li>
                <li>Seg a Sex: 8h – 18h</li>
                <li>Sábado: 8h – 12h</li>
              </ul>
            </div>

          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/50">
            <span>
              © 2026 Eduardo Gesso. Todos os direitos reservados. ·{' '}
              <button 
                onClick={() => setIsPrivacyOpen(true)} 
                className="hover:text-white transition-colors cursor-pointer"
              >
                Política de Privacidade (LGPD)
              </button>
            </span>
            <span>Feito com precisão, do orçamento ao acabamento.</span>
          </div>
        </div>
      </footer>

      {/* ===================== WHATSAPP FLOAT ===================== */}
      <a 
        href="https://wa.me/5516992415789?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20um%20or%C3%A7amento." 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-6 right-6 z-40 w-[60px] h-[60px] rounded-full bg-white border-2 border-azul-claro text-azul-medio flex items-center justify-center shadow-xl hover:scale-108 transition-all duration-200"
      >
        <MessageSquare size={30} fill="currentColor" className="text-azul-medio" />
      </a>

      {/* ===================== LIGHTBOX ===================== */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
            className="fixed inset-0 bg-[#0B1520]/92 z-50 flex items-center justify-center p-6 md:p-10"
          >
            <button 
              onClick={() => setLightboxImg(null)}
              className="absolute top-6 right-6 text-white text-3xl focus:outline-none hover:text-azul-claro transition-colors cursor-pointer p-2"
              aria-label="Fechar"
            >
              <X size={32} />
            </button>
            <motion.img 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={lightboxImg.src} 
              alt={lightboxImg.alt} 
              className="max-w-full max-h-[84vh] rounded-md shadow-2xl object-contain border border-white/5"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================== TOAST ===================== */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 30, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 30, x: "-50%" }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-azul-profundo text-white px-8 py-4.5 rounded-lg font-semibold text-sm shadow-2xl flex items-center gap-3 z-50 border border-white/10"
          >
            <div className="w-5 h-5 rounded-full bg-azul-claro/10 text-azul-claro flex items-center justify-center flex-shrink-0">
              <Check size={12} className="stroke-[3]" />
            </div>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===================== LGPD COOKIE BANNER ===================== */}
      <LGPDBanner onOpenPolicy={() => setIsPrivacyOpen(true)} />

      {/* ===================== PRIVACY POLICY MODAL (LGPD) ===================== */}
      <AnimatePresence>
        {isPrivacyOpen && (
          <PrivacyPolicyModal 
            isOpen={isPrivacyOpen} 
            onClose={() => setIsPrivacyOpen(false)} 
          />
        )}
      </AnimatePresence>

    </div>
  );
}
