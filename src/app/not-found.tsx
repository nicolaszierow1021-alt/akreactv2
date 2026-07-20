
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Home, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Página no encontrada - AKDESCARGAS",
  description: "La página que buscas no existe o ha sido movida.",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4 min-h-[70vh] bg-gray-50/50 dark:bg-[#0a0f1c]">
        <div className="text-center max-w-lg mx-auto">
          <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-red-50 dark:bg-red-900/20">
            <AlertCircle className="w-12 h-12 text-[#DC2626]" />
            <div className="absolute inset-0 rounded-full border-4 border-[#DC2626]/20 animate-ping"></div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-200 mb-4 tracking-tight">
            Página no encontrada
          </h2>
          <p className="text-[15px] md:text-base text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
            Oops... Parece que el enlace está roto o la página ha sido eliminada. Verifica que la URL esté escrita correctamente.
          </p>
          
          <a 
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#DC2626] hover:bg-red-700 text-white font-bold rounded-full transition-all duration-300 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 active:scale-95"
          >
            <Home className="w-5 h-5" />
            Volver al inicio
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
