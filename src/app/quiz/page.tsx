"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, CheckCircle, XCircle, Copy, ArrowRight, Check } from "lucide-react";
import VslPlayer from "@/components/VslPlayer";

// 👇 COLOQUE AQUI O LINK DO SEU MINI CURSO
const MINI_COURSE_LINK = "https://hubtask-rho.vercel.app/"; 
const VIDEO_ID_MINI = "oFqCrWRRGTs"; // Coloque o ID do vídeo de como funciona o minicurso

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function QuizPage() {
  const [stage, setStage] = useState<"select" | "compatible" | "incompatible">("select");
  const [isOther, setIsOther] = useState(false);
  const [otherPhone, setOtherPhone] = useState("");
  const [videoFinished, setVideoFinished] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "other") {
      setIsOther(true);
    } else {
      setIsOther(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isOther) {
      setStage("incompatible");
    } else {
      setStage("compatible");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <main className="min-h-screen bg-brand-gray font-sans flex flex-col items-center justify-center p-6 gradient-bg">
      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          
          {/* ETAPA 1: SELEÇÃO */}
          {stage === "select" && (
            <FadeIn key="select">
              <div className="bg-white rounded-3xl shadow-card p-8 md:p-12 border border-gray-100">
                <div className="flex flex-col items-center text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-brand-green/10 flex items-center justify-center mb-6">
                    <Smartphone className="text-brand-green" size={32} />
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mb-3">Teste de Compatibilidade</h1>
                  <p className="text-brand-text">Para garantir a melhor experiência no mini curso, verifique se seu dispositivo é compatível com nossa plataforma.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-2">Selecione o seu dispositivo:</label>
                    <select 
                      onChange={handleSelectChange}
                      className="w-full p-4 rounded-xl border border-gray-200 bg-brand-gray text-brand-dark focus:ring-2 focus:ring-brand-green focus:outline-none transition-all"
                      required
                    >
                      <option value="" disabled selected>Escolha seu modelo...</option>
                      <optgroup label="Apple iPhone">
                        <option value="iphone12">iPhone 12</option>
                        <option value="iphone13">iPhone 13</option>
                        <option value="iphone14">iPhone 14</option>
                        <option value="iphone15">iPhone 15</option>
                        <option value="iphone16">iPhone 16</option>
                        <option value="iphone17">iPhone 17</option>
                        <option value="iphonepro12">iPhone Pro 12</option>
                        <option value="iphonepro13">iPhone Pro 13</option>
                        <option value="iphonepro14">iPhone Pro 14</option>
                        <option value="iphonepro15">iPhone Pro 15</option>
                        <option value="iphonepro16">iPhone Pro 16</option>
                        <option value="iphonepro17">iPhone Pro 17</option>
                        <option value="iphone12pm">iPhone 12 Pro Max</option>
                        <option value="iphone13pm">iPhone 13 Pro Max</option>
                        <option value="iphone14pm">iPhone 14 Pro Max</option>
                        <option value="iphone15pm">iPhone 15 Pro Max</option>
                        <option value="iphone16pm">iPhone 16 Pro Max</option>
                        <option value="iphone17pm">iPhone 17 Pro Max</option>
                      </optgroup>
                      <optgroup label="Google Pixel">
                        <option value="pixel6">Google Pixel 6</option>
                        <option value="pixel7">Google Pixel 7</option>
                        <option value="pixel8">Google Pixel 8</option>
                        <option value="pixel9">Google Pixel 9</option>
                      </optgroup>
                      <optgroup label="Samsung Galaxy">
                        <option value="s21">Galaxy S21</option>
                        <option value="s22">Galaxy S22</option>
                        <option value="s23">Galaxy S23</option>
                        <option value="s24">Galaxy S24</option>
                        <option value="s25">Galaxy S25</option>
                        <option value="s26">Galaxy S26</option>
                        <option value="s21u">Galaxy S21 Ultra</option>
                        <option value="s22u">Galaxy S22 Ultra</option>
                        <option value="s23u">Galaxy S23 Ultra</option>
                        <option value="s24u">Galaxy S24 Ultra</option>
                        <option value="s25u">Galaxy S25 Ultra</option>
                        <option value="s26u">Galaxy S26 Ultra</option>
                      </optgroup>
                      <option value="other">Outro modelo (digitar)</option>
                    </select>
                  </div>

                  <AnimatePresence>
                    {isOther && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <label className="block text-sm font-medium text-brand-dark mb-2">Qual o seu modelo?</label>
                        <input 
                          type="text" 
                          value={otherPhone}
                          onChange={(e) => setOtherPhone(e.target.value)}
                          placeholder="Ex: Motorola Moto G"
                          className="w-full p-4 rounded-xl border border-gray-200 bg-brand-gray text-brand-dark focus:ring-2 focus:ring-brand-green focus:outline-none transition-all"
                          required
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button 
                    type="submit"
                    className="w-full bg-brand-dark text-white py-4 rounded-xl text-lg font-semibold hover:bg-black transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    Verificar Compatibilidade <ArrowRight size={20} />
                  </button>
                </form>
              </div>
            </FadeIn>
          )}

          {/* ETAPA 2A: INCOMPATÍVEL */}
          {stage === "incompatible" && (
            <FadeIn key="incompatible">
              <div className="bg-white rounded-3xl shadow-card p-8 md:p-12 border border-gray-100 text-center">
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
                  <XCircle className="text-red-500" size={32} />
                </div>
                <h1 className="text-3xl font-bold text-brand-dark mb-3">Dispositivo Incompatível</h1>
                <p className="text-brand-text mb-8 max-w-md mx-auto">
                  Sentimos muito, mas o <span className="font-semibold text-brand-dark">{otherPhone || "seu dispositivo"}</span> não é compatível com nossa plataforma no momento. 
                  <br/><br/>
                  Mas você pode indicar a HubTask Brasil para um amigo que tenha um dispositivo compatível!
                </p>

                <button 
                  onClick={handleCopyLink}
                  className={`inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 ${
                    copied ? "bg-brand-green text-white" : "bg-brand-dark text-white hover:bg-black"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check size={20} /> Link Copiado!
                    </>
                  ) : (
                    <>
                      <Copy size={20} /> Copiar Link da Página
                    </>
                  )}
                </button>

                <div className="mt-8">
                  <button onClick={() => { setStage("select"); setIsOther(false); setOtherPhone(""); }} className="text-brand-text hover:text-brand-dark text-sm transition-colors">
                    Voltar e tentar outro dispositivo
                  </button>
                </div>
              </div>
            </FadeIn>
          )}

          {/* ETAPA 2B: COMPATÍVEL */}
          {stage === "compatible" && (
            <FadeIn key="compatible">
              <div className="bg-white rounded-3xl shadow-card p-8 md:p-12 border border-gray-100 text-center">
                <div className="w-16 h-16 rounded-full bg-brand-green/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="text-brand-green" size={32} />
                </div>
                <h1 className="text-3xl font-bold text-brand-dark mb-3">Dispositivo Compatível!</h1>
                <p className="text-brand-text mb-8 max-w-md mx-auto">
                  Tudo certo! Para liberar seu acesso ao mini curso, assista ao rápido vídeo abaixo de instruções.
                </p>

                {/* MINI VÍDEO DE INSTRUÇÕES */}
                <div className="mt-8 text-left">
                  <VslPlayer videoId={VIDEO_ID_MINI} onVideoEnd={() => setVideoFinished(true)} />
                </div>

                {/* BOTÃO BLOQUEADO PARA O CURSO */}
                <div className="mt-8">
                  <a 
                    href={videoFinished ? MINI_COURSE_LINK : "#"} 
                    target="_blank"
                    onClick={(e) => { if (!videoFinished) e.preventDefault(); }}
                    className={`group inline-flex items-center justify-center gap-3 w-full px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 ${
                      videoFinished 
                        ? "bg-brand-green text-white shadow-lg shadow-brand-green/30 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer" 
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {videoFinished ? "ACESSAR MINI CURSO AGORA" : "ASSISTA PARA LIBERAR ACESSO"}
                    <ArrowRight size={20} />
                  </a>
                </div>
              </div>
            </FadeIn>
          )}

        </AnimatePresence>
      </div>
    </main>
  );
}