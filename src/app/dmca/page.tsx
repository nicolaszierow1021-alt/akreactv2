import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ShieldAlert } from "lucide-react";

export const metadata = {
  title: "DMCA - AKDESCARGAS",
  description: "Política de derechos de autor y notificaciones de DMCA de AKDESCARGAS.",
  alternates: {
    canonical: "/dmca",
  },
};

export default function DmcaPage() {
  return (
    <>
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 md:py-20 w-full">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
          <ShieldAlert className="w-8 h-8 text-[#DC2626]" /> DMCA Policy
        </h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none text-[15px] md:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          <p className="mb-4">
            En <strong>AKDESCARGAS</strong> respetamos la propiedad intelectual de los creadores de contenido y desarrolladores. Si eres el propietario legítimo de los derechos de autor de algún material publicado en nuestro portal, o eres un representante legal autorizado, y deseas solicitar la retirada del mismo, puedes enviar una notificación por escrito siguiendo las instrucciones detalladas a continuación.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-3 text-slate-900 dark:text-white">1. Cómo presentar una reclamación por infracción</h2>
          <p className="mb-4">
            Para que una reclamación de derechos de autor sea procesada de forma efectiva, la notificación formal de DMCA debe incluir los siguientes requisitos indispensables:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Una firma física o electrónica del propietario de los derechos de autor o de la persona autorizada para actuar en su nombre.</li>
            <li>Identificación clara del material protegido por derechos de autor que se alega ha sido infringido.</li>
            <li>Identificación específica del material en nuestro sitio que se alega está infringiendo los derechos (incluyendo la URL exacta del post o archivo).</li>
            <li>Información de contacto completa del reclamante: nombre, dirección postal, número de teléfono y correo electrónico oficial.</li>
            <li>Una declaración escrita de que el propietario cree de buena fe que el uso del material no está autorizado por el dueño de los derechos de autor, su agente o la ley.</li>
            <li>Una declaración de que la información contenida en la notificación es exacta y, bajo pena de perjurio, que estás autorizado a actuar en nombre del titular del derecho de autor.</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-3 text-slate-900 dark:text-white">2. Resolución y Plazo de Retirada</h2>
          <p className="mb-4">
            Una vez recibida y validada una notificación de DMCA que cumpla con los requisitos legales mencionados, es política de nuestro sitio retirar o inhabilitar el acceso al material infractor de manera expedita.
          </p>
          <p className="mb-4">
            Nos comprometemos a dar respuesta y procesar la retirada de los enlaces correspondientes en un plazo máximo de <strong>24 a 48 horas</strong> hábiles.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-3 text-slate-900 dark:text-white">3. Dirección de Contacto Oficial</h2>
          <p className="mb-4">
            Por favor, envía todas las reclamaciones oficiales de derechos de autor y notificaciones de DMCA directamente a nuestro correo de soporte:
          </p>
          <div className="bg-slate-50 dark:bg-[#0f172a]/30 border border-slate-200/50 dark:border-white/5 p-4 rounded-xl w-fit font-mono text-sm mb-4">
            <a href="mailto:soporte@akdescargas.store" className="text-[#DC2626] font-bold hover:underline">
              soporte@akdescargas.store
            </a>
          </div>

          <p className="mt-10 text-sm text-gray-500 dark:text-slate-500">Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
