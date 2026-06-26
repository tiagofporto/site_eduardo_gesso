import { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Cell 
} from 'recharts';
import { 
  TrendingUp, 
  Coins, 
  Leaf, 
  VolumeX, 
  PieChart, 
  Activity, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

const SAVINGS_DATA = [
  { ano: 'Ano 1', economia: 450, acumulado: 450 },
  { ano: 'Ano 2', economia: 530, acumulado: 980 },
  { ano: 'Ano 3', economia: 580, acumulado: 1560 },
  { ano: 'Ano 4', economia: 640, acumulado: 2200 },
  { ano: 'Ano 5', economia: 750, acumulado: 2950 },
];

const DISTRIBUTION_DATA = [
  { name: 'Sancas & Rebaixos', value: 40, color: '#0B2D4D', desc: 'Sancas com LED e design de luz indireta.' },
  { name: 'Forros Drywall', value: 30, color: '#16527F', desc: 'Rebaixamentos lisos e isolamento acústico.' },
  { name: 'Molduras Decorativas', value: 15, color: '#4FA8D8', desc: 'Molduras modernas, clássicas e industriais.' },
  { name: 'Gesso 3D & Relevos', value: 10, color: '#C9A875', desc: 'Paredes decoradas com placas tridimensionais.' },
  { name: 'Manutenção / Reparos', value: 5, color: '#3E5A70', desc: 'Consertos, trincas e correções estéticas.' },
];

export default function StatsDashboard() {
  const [activeTab, setActiveTab] = useState<'economia' | 'distribuicao'>('economia');

  // Custom tooltips to guarantee visual consistency with the app's theme
  const CustomSavingsTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-azul-profundo border border-white/10 p-3 rounded shadow-lg text-left text-xs">
          <p className="font-serif font-bold text-white mb-1.5">{label}</p>
          <p className="font-sans text-azul-claro font-medium">
            Economia Anual: R$ {payload[0].value}
          </p>
          <p className="font-sans text-dourado font-medium mt-0.5">
            Acumulado de 5 anos: R$ {payload[1].value}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomDistributionTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-azul-profundo border border-white/10 p-3 rounded shadow-lg text-left text-xs">
          <p className="font-serif font-bold text-white mb-1">{payload[0].name}</p>
          <p className="font-sans text-azul-claro font-medium">
            Participação: {payload[0].value}% dos projetos
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="py-24 bg-azul-gelo/40 relative border-y border-linha/50 overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-azul-claro/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-dourado/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header section with badge */}
        <div className="max-w-3xl text-left mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.18em] uppercase text-azul-medio mb-3 block">
            <Sparkles size={14} className="text-azul-claro animate-pulse" />
            Inteligência & Autoridade
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-serif font-semibold text-azul-profundo mb-4 leading-tight">
            Gesso inteligente valoriza cada centavo investido.
          </h2>
          <p className="text-tinta-suave text-lg leading-relaxed">
            Mais do que beleza visual, nossos projetos de gesso e drywall oferecem soluções práticas de conforto térmico, isolamento acústico e valorização real de imóveis.
          </p>
        </div>

        {/* Dashboard Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Visual Charts Container */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="bg-gesso rounded-xl p-6 sm:p-8 shadow-md border border-linha/60 flex flex-col justify-between h-full">
              
              {/* Chart Tabs / Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-linha/50">
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('economia')}
                    className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      activeTab === 'economia'
                        ? 'bg-azul-profundo text-white shadow-sm'
                        : 'bg-azul-gelo/60 text-tinta-suave hover:bg-azul-gelo hover:text-azul-profundo'
                    }`}
                  >
                    Economia Térmica Estimada
                  </button>
                  <button
                    onClick={() => setActiveTab('distribuicao')}
                    className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      activeTab === 'distribuicao'
                        ? 'bg-azul-profundo text-white shadow-sm'
                        : 'bg-azul-gelo/60 text-tinta-suave hover:bg-azul-gelo hover:text-azul-profundo'
                    }`}
                  >
                    Distribuição dos Serviços
                  </button>
                </div>
                
                <span className="text-[11px] font-mono uppercase tracking-widest text-tinta-suave/70 flex items-center gap-1.5 justify-end">
                  <Activity size={12} className="text-azul-claro" />
                  Dados de Mercado
                </span>
              </div>

              {/* Chart Stage */}
              <div className="h-[320px] w-full relative">
                {activeTab === 'economia' ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={SAVINGS_DATA}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorEconomia" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4FA8D8" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#4FA8D8" stopOpacity={0.0}/>
                        </linearGradient>
                        <linearGradient id="colorAcumulado" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#C9A875" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#C9A875" stopOpacity={0.0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#0B2D4D" opacity={0.05} />
                      <XAxis 
                        dataKey="ano" 
                        stroke="#3E5A70" 
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        stroke="#3E5A70" 
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `R$${value}`}
                      />
                      <Tooltip content={<CustomSavingsTooltip />} />
                      <Area 
                        name="Economia Anual"
                        type="monotone" 
                        dataKey="economia" 
                        stroke="#4FA8D8" 
                        strokeWidth={2.5}
                        fillOpacity={1} 
                        fill="url(#colorEconomia)" 
                      />
                      <Area 
                        name="Economia Acumulada"
                        type="monotone" 
                        dataKey="acumulado" 
                        stroke="#C9A875" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorAcumulado)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={DISTRIBUTION_DATA}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                      barSize={40}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#0B2D4D" opacity={0.05} />
                      <XAxis 
                        dataKey="name" 
                        stroke="#3E5A70" 
                        fontSize={10}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => value.split(' ')[0]} // Show first word to fit mobile
                      />
                      <YAxis 
                        stroke="#3E5A70" 
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <Tooltip content={<CustomDistributionTooltip />} />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {DISTRIBUTION_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>

              {/* Chart Caption Footer */}
              <div className="mt-6 pt-4 border-t border-linha/50 text-left text-xs text-tinta-suave flex items-center justify-between gap-4">
                <span>
                  {activeTab === 'economia' 
                    ? '*Estimativa baseada em residência de 120m² sob redução de uso de ar-condicionado em 30%.'
                    : '*Proporção de projetos entregues e ativos pela Eduardo Gesso nos últimos 5 anos.'}
                </span>
                <span className="font-semibold text-azul-profundo shrink-0 flex items-center gap-1">
                  Estudo de Caso <ChevronRight size={12} />
                </span>
              </div>

            </div>
          </div>

          {/* Right Column: Informative Features & Copy */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 text-left">
            
            {activeTab === 'economia' ? (
              // Savings / Insulation detailed cards
              <div className="flex flex-col gap-6 h-full justify-between">
                
                {/* Feature 1 */}
                <div className="bg-gesso p-6 rounded-lg border border-linha/50 shadow-sm flex gap-5 items-start">
                  <div className="w-12 h-12 rounded-lg bg-azul-claro/10 text-azul-claro flex items-center justify-center shrink-0">
                    <Coins size={22} />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg text-azul-profundo mb-2">Economia na Conta de Luz</h4>
                    <p className="text-tinta-suave text-sm leading-relaxed">
                      O gesso e o drywall com revestimento isolante agem como barreira térmica. No calor, o ambiente retém mais o ar refrigerado, reduzindo o esforço do ar-condicionado em até <span className="font-bold text-azul-profundo">30%</span>.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="bg-gesso p-6 rounded-lg border border-linha/50 shadow-sm flex gap-5 items-start">
                  <div className="w-12 h-12 rounded-lg bg-dourado/10 text-dourado flex items-center justify-center shrink-0">
                    <VolumeX size={22} />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg text-azul-profundo mb-2">Conforto Acústico Excepcional</h4>
                    <p className="text-tinta-suave text-sm leading-relaxed">
                      Sons de vizinhos de cima, saltos, chuvas fortes no telhado ou ruídos da rua são mitigados. O sistema drywall reduz em média de <span className="font-bold text-azul-profundo">12dB a 18dB</span> a transmissão acústica.
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="bg-gesso p-6 rounded-lg border border-linha/50 shadow-sm flex gap-5 items-start">
                  <div className="w-12 h-12 rounded-lg bg-azul-medio/10 text-azul-medio flex items-center justify-center shrink-0">
                    <Leaf size={22} />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg text-azul-profundo mb-2">Sustentabilidade & Desperdício Zero</h4>
                    <p className="text-tinta-suave text-sm leading-relaxed">
                      Ao contrário do gesso tradicional de plaquinhas que gera muita sujeira e sobras, nossos sistemas drywall geram menos de <span className="font-bold text-azul-profundo">3%</span> de desperdício, sendo ecologicamente responsáveis.
                    </p>
                  </div>
                </div>

              </div>
            ) : (
              // Service distribution detailed list
              <div className="flex flex-col gap-5 h-full justify-center">
                <p className="text-tinta-suave text-sm font-semibold uppercase tracking-wider mb-2">Por que somos especialistas em Sertãozinho?</p>
                
                {DISTRIBUTION_DATA.map((item, index) => (
                  <div 
                    key={index} 
                    className="p-4 rounded-lg bg-gesso/90 border border-linha/40 flex items-center justify-between gap-4 hover:border-azul-medio/30 transition-all shadow-xs"
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-4 h-4 rounded-full shrink-0" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <div>
                        <h4 className="font-serif font-bold text-sm text-azul-profundo leading-none mb-1.5">{item.name}</h4>
                        <p className="text-xs text-tinta-suave">{item.desc}</p>
                      </div>
                    </div>
                    <span className="font-mono text-base font-bold text-azul-profundo shrink-0 bg-azul-gelo px-3 py-1 rounded">
                      {item.value}%
                    </span>
                  </div>
                ))}
                
                <div className="bg-azul-profundo text-white p-5 rounded-lg text-xs leading-relaxed mt-2 shadow-sm relative overflow-hidden">
                  <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 opacity-10">
                    <PieChart size={100} />
                  </div>
                  <p className="font-serif font-bold text-sm text-azul-claro mb-1">Dica do Eduardo:</p>
                  Sancas e rebaixos combinados com forros lisos representam 70% dos nossos serviços porque transformam completamente o design de luz de qualquer residência sem encarecer a fundação do imóvel.
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
