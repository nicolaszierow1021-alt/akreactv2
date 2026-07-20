import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Mail, MessageCircle, Send } from "lucide-react";

export const metadata = {
  title: "Contacto - AKDESCARGAS",
  description: "Ponte en contacto con el equipo de AKDESCARGAS.",
  alternates: {
    canonical: "/contacto",
  },
};

export default function ContactoPage() {
  return (
    <>
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 md:py-20 w-full">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">Contacto</h1>
        <p className="text-slate-600 dark:text-slate-400 text-[15px] md:text-base leading-relaxed mb-8 max-w-xl">
          ¿Tienes alguna duda, sugerencia, propuesta comercial o quieres reportar un enlace caído? Ponte en contacto con nosotros a través de nuestros canales oficiales.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          {/* Email Card */}
          <div className="bg-slate-50 dark:bg-[#0f172a]/30 border border-slate-200/50 dark:border-white/5 p-6 rounded-2xl flex flex-col items-start gap-4 transition hover:-translate-y-1 duration-300">
            <div className="p-3.5 bg-red-50 dark:bg-red-900/20 text-[#DC2626] rounded-xl">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Correo Electrónico</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Soporte general y propuestas comerciales.</p>
              <a 
                href="mailto:soporte@akdescargas.store" 
                className="text-sm font-bold text-[#DC2626] hover:underline transition-colors"
              >
                soporte@akdescargas.store
              </a>
            </div>
          </div>

          {/* Telegram Card */}
          <a 
            href="https://t.me/+e4Wx4s_d0ag1MjQx" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-slate-50 dark:bg-[#0f172a]/30 border border-slate-200/50 dark:border-white/5 p-6 rounded-2xl flex flex-col items-start gap-4 transition hover:-translate-y-1 duration-300 group cursor-pointer"
          >
            <div className="p-3.5 bg-[#00A2FF]/10 text-[#00A2FF] rounded-xl group-hover:bg-[#00A2FF] group-hover:text-white transition-colors">
              <Send className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Soporte Telegram</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Chat de soporte rápido y actualizaciones del canal.</p>
              <span className="text-sm font-bold text-[#00A2FF] group-hover:underline transition-colors">
                @akdescargas
              </span>
            </div>
          </a>
        </div>

        <div className="mt-12 bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-500/20 rounded-2xl p-6">
          <h4 className="font-bold text-red-900 dark:text-red-300 flex items-center gap-2 mb-2">
            <MessageCircle className="w-5 h-5 shrink-0" /> Soporte 24/7
          </h4>
          <p className="text-[13px] md:text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
            Intentamos responder a todos los correos electrónicos dentro de un plazo de 24 a 48 horas laborales. Si necesitas una respuesta inmediata, te recomendamos escribirnos directamente a nuestro canal de Telegram.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
