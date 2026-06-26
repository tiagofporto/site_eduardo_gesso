import React from 'react';
import { motion } from 'motion/react';
import { X, Shield, Lock, Eye, CheckCircle2, RefreshCw } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-azul-profundo/90 backdrop-blur-md">
      {/* Backdrop close area */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-gesso w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden border border-linha/60 relative z-10 flex flex-col max-h-[85vh] text-left"
      >
        {/* Header */}
        <div className="bg-azul-profundo px-6 py-5 flex items-center justify-between border-b border-white/10 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-azul-claro/10 text-azul-claro flex items-center justify-center">
              <Shield size={20} />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg leading-tight">Política de Privacidade</h3>
              <p className="text-xs text-white/60 font-sans tracking-wide uppercase mt-0.5">Em Conformidade com a LGPD</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto font-sans text-sm text-tinta-suave leading-relaxed space-y-6">
          
          {/* Introduction */}
          <div>
            <h4 className="font-serif font-bold text-base text-azul-profundo mb-2">1. Introdução</h4>
            <p>
              Na <strong>Eduardo Gesso</strong>, privacidade e segurança são prioridades. Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos seus dados pessoais ao interagir com nosso site, em estrita conformidade com a <strong>Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018)</strong>.
            </p>
          </div>

          {/* Collected Data */}
          <div>
            <h4 className="font-serif font-bold text-base text-azul-profundo mb-2">2. Quais Dados Coletamos?</h4>
            <p className="mb-3">
              Coletamos apenas as informações estritamente necessárias enviadas por você através do nosso formulário de orçamento, para que possamos prestar nossos serviços de gesso de alto padrão:
            </p>
            <ul className="space-y-2.5 pl-1">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-azul-claro mt-0.5 shrink-0" />
                <span><strong>Nome Completo:</strong> Para identificar e personalizar seu atendimento.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-azul-claro mt-0.5 shrink-0" />
                <span><strong>WhatsApp / Telefone:</strong> Canal primário de comunicação para envio do orçamento e agendamento da visita técnica gratuita.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-azul-claro mt-0.5 shrink-0" />
                <span><strong>Tipo de Serviço Desejado:</strong> Para entender sua necessidade (Sancas, Drywall, Rebaixos, Reparos, etc.).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-azul-claro mt-0.5 shrink-0" />
                <span><strong>Cidade / Bairro:</strong> Para planejar a logística da visita técnica na região de Sertãozinho, SP.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="text-azul-claro mt-0.5 shrink-0" />
                <span><strong>Detalhes Adicionais (Mensagem):</strong> Qualquer especificação extra ou preferências estéticas que você queira nos antecipar.</span>
              </li>
            </ul>
          </div>

          {/* Purpose of Processing */}
          <div>
            <h4 className="font-serif font-bold text-base text-azul-profundo mb-2">3. Finalidade do Tratamento de Dados</h4>
            <p className="mb-2">
              Seus dados pessoais são coletados com base no seu consentimento explícito e na execução de medidas preliminares ao contrato de prestação de serviços. As finalidades incluem:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Elaboração e envio de estimativas de orçamento personalizadas.</li>
              <li>Contato via WhatsApp ou telefone para sanar dúvidas e agendar medições gratuitas.</li>
              <li>Aprimoramento técnico e estético das nossas soluções em gesso e drywall.</li>
            </ul>
          </div>

          {/* Storage & Retention */}
          <div>
            <h4 className="font-serif font-bold text-base text-azul-profundo mb-2">4. Armazenamento e Segurança dos Dados</h4>
            <p>
              Seus dados são transmitidos de forma segura diretamente para o nosso canal integrado de atendimento e não são armazenados de forma permanente ou compartilhados em bancos de dados de terceiros para fins de marketing. Adotamos práticas rígidas de segurança digital para evitar qualquer acesso não autorizado, perda ou alteração indesejada.
            </p>
          </div>

          {/* User Rights */}
          <div>
            <h4 className="font-serif font-bold text-base text-azul-profundo mb-2">5. Seus Direitos como Titular (LGPD)</h4>
            <p className="mb-3">
              A LGPD garante a você pleno controle sobre seus dados pessoais. A qualquer momento, você pode exercer os seguintes direitos:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-3.5 bg-azul-gelo/40 border border-linha/50 rounded-lg flex gap-3">
                <Eye size={18} className="text-azul-medio shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-sans font-bold text-xs text-azul-profundo mb-1 uppercase tracking-wide">Confirmação & Acesso</h5>
                  <p className="text-xs text-tinta-suave">Saber se tratamos seus dados e obter cópia das informações.</p>
                </div>
              </div>
              <div className="p-3.5 bg-azul-gelo/40 border border-linha/50 rounded-lg flex gap-3">
                <RefreshCw size={18} className="text-azul-medio shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-sans font-bold text-xs text-azul-profundo mb-1 uppercase tracking-wide">Correção & Atualização</h5>
                  <p className="text-xs text-tinta-suave">Corrigir dados incompletos, inexatos ou desatualizados.</p>
                </div>
              </div>
              <div className="p-3.5 bg-azul-gelo/40 border border-linha/50 rounded-lg flex gap-3">
                <Lock size={18} className="text-azul-medio shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-sans font-bold text-xs text-azul-profundo mb-1 uppercase tracking-wide">Revogação de Consentimento</h5>
                  <p className="text-xs text-tinta-suave">Retirar sua permissão de tratamento e solicitar a exclusão total.</p>
                </div>
              </div>
              <div className="p-3.5 bg-azul-gelo/40 border border-linha/50 rounded-lg flex gap-3">
                <Shield size={18} className="text-azul-medio shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-sans font-bold text-xs text-azul-profundo mb-1 uppercase tracking-wide">Exclusão Definitiva</h5>
                  <p className="text-xs text-tinta-suave">Solicitar que seus dados sejam completamente apagados de nossos registros.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Controller */}
          <div>
            <h4 className="font-serif font-bold text-base text-azul-profundo mb-2">6. Encarregado pelo Tratamento de Dados (Contato)</h4>
            <p>
              Para esclarecer dúvidas, solicitar alteração ou exclusão de dados nos termos da LGPD, entre em contato diretamente com o nosso Encarregado de Proteção de Dados (DPO) através do e-mail: <a href="mailto:eduardogessossp@gmail.com" className="text-azul-medio hover:text-azul-claro font-semibold underline decoration-azul-claro/50">eduardogessossp@gmail.com</a> ou pelo endereço físico R. Arlindo Magro, 260 - Sertãozinho, SP, CEP 14168-405.
            </p>
          </div>

          <div className="pt-4 border-t border-linha/50 text-center text-xs text-tinta-suave/80">
            Última atualização: Junho de 2026. Eduardo Gesso. Todos os direitos reservados.
          </div>

        </div>

        {/* Footer actions */}
        <div className="bg-azul-gelo/50 px-6 py-4 flex items-center justify-end border-t border-linha/60">
          <button
            onClick={onClose}
            className="bg-azul-profundo hover:bg-azul-medio text-white font-bold px-6 py-2.5 rounded text-sm transition-all shadow-md cursor-pointer"
          >
            Entendido, Fechar
          </button>
        </div>

      </motion.div>
    </div>
  );
}
