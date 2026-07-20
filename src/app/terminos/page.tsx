import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Términos y Condiciones - AKDESCARGAS",
  description: "Términos y condiciones de uso.",
  alternates: {
    canonical: "/terminos",
  },
};

export default function TerminosPage() {
  return (
    <>
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 md:py-20 w-full">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6">Términos y Condiciones</h1>
        <div className="prose prose-slate dark:prose-invert max-w-none text-[15px] md:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          <p className="mb-4">
            Al utilizar AKDESCARGAS, aceptas cumplir con los siguientes términos y condiciones de uso. Te recomendamos leerlos cuidadosamente.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-3 text-slate-900 dark:text-white">1. Uso del Contenido</h2>
          <p className="mb-4">
            Los archivos APK, modificaciones (MODs) y otras aplicaciones proporcionadas en este sitio se comparten únicamente con fines educativos y de prueba. No nos hacemos responsables por el mal uso que se le pueda dar al material proporcionado.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-3 text-slate-900 dark:text-white">2. Propiedad Intelectual</h2>
          <p className="mb-4">
            Todos los derechos de las aplicaciones, juegos y logotipos mostrados pertenecen a sus respectivos desarrolladores y empresas. AKDESCARGAS no se atribuye la propiedad de dicho software.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-3 text-slate-900 dark:text-white">3. Responsabilidad del Usuario</h2>
          <p className="mb-4">
            Eres responsable de verificar la compatibilidad de las aplicaciones con tus dispositivos y de asegurarte de que cumples con las leyes locales aplicables respecto a la descarga y uso de software de terceros. Todo lo que descargues e instales es bajo tu propio riesgo.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-3 text-slate-900 dark:text-white">4. Modificaciones de los Términos</h2>
          <p className="mb-4">
            Nos reservamos el derecho de modificar estos términos en cualquier momento. El uso continuado del sitio después de cualquier cambio constituye tu aceptación de los nuevos términos.
          </p>

          <p className="mt-10 text-sm text-gray-500 dark:text-slate-500">Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
