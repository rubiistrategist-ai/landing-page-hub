"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  Check, 
  Users, 
  GraduationCap, 
  LifeBuoy, 
  RefreshCw, 
  Lock, 
  ChevronDown, 
  ArrowRight,
  MessageCircle,
  Smartphone
} from "lucide-react";
import VslPlayer from "@/components/VslPlayer";

// 👇 LINK PARA A PÁGINA DO QUIZ
const QUIZ_LINK = "/quiz"; 

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function Home() {
  const [videoFinished, setVideoFinished] = useState(false);
  const vslRef = useRef<HTMLDivElement>(null);

  const handleLockedClick = (e: React.MouseEvent) => {
    if (!videoFinished) {
      e.preventDefault();
      vslRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <main className="min-h-screen bg-white font-sans">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="HubTask Brasil" width={140} height={32} className="h-8 w-auto" priority />
          </div>
          <a 
            href={videoFinished ? QUIZ_LINK : "#"} 
            onClick={handleLockedClick}
            className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${
              videoFinished ? "bg-brand-dark text-white hover:bg-brand-dark/90" : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Verificar Celular <ArrowRight size={14} />
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-24 gradient-bg overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <FadeIn>
              <span className="inline-block bg-brand-gray text-brand-text px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-gray-200">
                Treinamento e suporte para novos usuários
              </span>
            </FadeIn>
            
            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-brand-dark leading-[1.1] mb-4">
                Comece hoje mesmo na <span className="text-brand-green">HubTask Brasil</span>.
              </h1>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="my-8 md:my-10">
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-brand-dark bg-brand-green/10 inline-block px-6 py-3 rounded-xl border-2 border-brand-green transform -rotate-2 shadow-lg">
                  100% Gratuito
                </h2>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg text-brand-text mb-8 max-w-xl leading-relaxed">
                Aprenda o passo a passo completo, tenha acesso ao mini curso, à maior comunidade brasileira sobre HubTask e descubra como utilizar a plataforma através do meu link de indicação.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <a 
                href={videoFinished ? QUIZ_LINK : "#"} 
                onClick={handleLockedClick}
                className={`group inline-flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 ${
                  videoFinished 
                    ? "bg-brand-green text-white shadow-lg shadow-brand-green/30 hover:shadow-xl hover:shadow-brand-green/40 hover:-translate-y-0.5 cursor-pointer" 
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {videoFinished ? "VERIFICAR COMPATIBILIDADE" : "ASSISTA O VÍDEO PARA LIBERAR"}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
                {["Mini Curso Gratuito", "Comunidade Exclusiva", "Suporte", "Atualizações"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-brand-dark/80">
                    <div className="w-5 h-5 rounded-full bg-brand-green/10 flex items-center justify-center">
                      <Check size={12} className="text-brand-green" strokeWidth={3} />
                    </div>
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* VSL Player */}
          <FadeIn delay={0.3}>
            <div ref={vslRef}>
              <VslPlayer videoId="FrY_ceAKfFE" onVideoEnd={() => setVideoFinished(true)} />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* TIMELINE / COMO FUNCIONA */}
      <section className="py-32 bg-brand-gray">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-4">Como funciona</h2>
            <p className="text-brand-text text-lg">Três passos simples para iniciar sua jornada.</p>
          </FadeIn>

          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 md:-translate-x-1/2"></div>

            <div className="space-y-16">
              {[
                { icon: Users, title: "PASSO 1", desc: "Entre na comunidade." },
                { icon: GraduationCap, title: "PASSO 2", desc: "Assista ao mini curso." },
                { icon: ArrowRight, title: "PASSO 3", desc: "Comece sua jornada utilizando o link disponibilizado." }
              ].map((step, i) => (
                <FadeIn key={i} delay={i * 0.15}>
                  <div className={`relative flex items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="hidden md:block flex-1"></div>
                    <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-brand-green ring-4 ring-brand-green/20 md:-translate-x-1/2 z-10"></div>
                    <div className="flex-1 ml-16 md:ml-0">
                      <div className="bg-white p-8 rounded-2xl shadow-soft border border-gray-100 hover:shadow-card transition-all duration-300">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-brand-green/10 flex items-center justify-center">
                            <step.icon className="text-brand-green" size={20} />
                          </div>
                          <span className="text-sm font-bold text-brand-green tracking-wider">{step.title}</span>
                        </div>
                        <p className="text-xl font-medium text-brand-dark">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-4">Tudo o que você recebe</h2>
            <p className="text-brand-text text-lg max-w-2xl mx-auto">Recursos completos para você dominar a plataforma.</p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: GraduationCap, title: "Mini Curso", desc: "Aulas práticas e diretas ao ponto." },
              { icon: Users, title: "Comunidade", desc: "A maior comunidade brasileira sobre HubTask." },
              { icon: LifeBuoy, title: "Suporte", desc: "Tire suas dúvidas com nossos moderadores." },
              { icon: RefreshCw, title: "Atualizações", desc: "Conteúdo constantemente atualizado." },
              { icon: Lock, title: "Conteúdo Exclusivo", desc: "Materiais e PDFs exclusivos para membros." },
              { icon: MessageCircle, title: "Networking", desc: "Conecte-se com outros usuários da plataforma." }
            ].map((benefit, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group h-full p-8 rounded-2xl border border-gray-100 hover:border-brand-green/30 hover:bg-brand-gray/50 transition-all duration-300 cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-brand-dark flex items-center justify-center mb-6 group-hover:bg-brand-green transition-all duration-300">
                    <benefit.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-brand-dark mb-2">{benefit.title}</h3>
                  <p className="text-brand-text leading-relaxed">{benefit.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 bg-brand-gray">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-dark mb-4">Perguntas Frequentes</h2>
          </FadeIn>

          <div className="space-y-4">
            {[
              { q: "Como funciona?", a: "Você entra na nossa comunidade via WhatsApp, assiste ao mini curso e utiliza nosso link de indicação para começar a usar a HubTask." },
              { q: "É gratuito?", a: "Sim! O acesso à comunidade e ao mini curso é totalmente gratuito. Criado por um afiliado da HubTask para treinar novos usuários." },
              { q: "Preciso pagar alguma coisa?", a: "Não pagamos para acessar o treinamento. Eventuais custos estão apenas vinculados à própria plataforma HubTask, caso opte por usá-la." },
              { q: "Como entro na comunidade?", a: "Basta clicar em qualquer botão do WhatsApp nesta página, e você será redirecionado direto para o nosso grupo exclusivo." },
              { q: "Quanto tempo leva para começar?", a: "Leva menos de 2 minutos. Você clica no botão, entra no grupo e já recebe o link do mini curso." }
            ].map((item, i) => <FaqItem key={i} {...item} />)}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-brand-green py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Pronto para começar?</h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Clique abaixo e verifique agora mesmo se seu celular é compatível com nossa plataforma.
            </p>
            <a 
              href={videoFinished ? QUIZ_LINK : "#"} 
              onClick={handleLockedClick}
              className={`group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-xl text-lg font-semibold shadow-2xl transition-all duration-300 ${
                videoFinished 
                  ? "bg-brand-dark text-white hover:bg-black hover:-translate-y-1" 
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <Smartphone size={24} />
              {videoFinished ? "FAZER TESTE DE COMPATIBILIDADE" : "AGUARDE O VÍDEO TERMINAR"}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-dark py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Image src="/logo.png" alt="HubTask Brasil" width={120} height={28} className="h-7 w-auto" />
          </div>
          <div className="flex gap-8 text-brand-gray/70 text-sm">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Contato</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-8 pt-8 border-t border-white/10">
          <p className="text-center md:text-left text-xs text-brand-gray/40">
            © {new Date().getFullYear()} HubTask Brasil. Todos os direitos reservados. Este site foi criado por um afiliado da HubTask e não representa oficialmente a empresa.
          </p>
        </div>
      </footer>

      {/* STICKY MOBILE CTA */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 md:hidden p-4 bg-white/90 backdrop-blur-lg border-t border-gray-100 transition-transform duration-300 ${
        videoFinished ? "translate-y-0" : "translate-y-full"
      }`}>
        <a 
          href={videoFinished ? QUIZ_LINK : "#"} 
          onClick={handleLockedClick}
          className="flex items-center justify-center gap-3 w-full bg-brand-green text-white px-6 py-4 rounded-xl text-base font-semibold shadow-lg shadow-brand-green/30"
        >
          {videoFinished ? "VERIFICAR MEU CELULAR" : "ASSISTIR PARA LIBERAR"}
          <ArrowRight size={18} />
        </a>
      </div>
    </main>
  );
}

function FaqItem({ q, a }: { q: string, a: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <FadeIn>
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-6 text-left hover:bg-brand-gray/50 transition-colors"
        >
          <span className="font-medium text-lg text-brand-dark">{q}</span>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="text-brand-text" />
          </motion.div>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }} 
              animate={{ height: "auto", opacity: 1 }} 
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="p-6 pt-0 text-brand-text leading-relaxed">{a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeIn>
  );
}