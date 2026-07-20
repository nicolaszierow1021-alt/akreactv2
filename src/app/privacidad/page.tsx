import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Política de Privacidad - AKDESCARGAS",
  description: "Nuestra política de privacidad.",
  alternates: {
    canonical: "/privacidad",
  },
};

export default function PrivacidadPage() {
  return (
    <>
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 md:py-20 w-full">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6">Política de Privacidad</h1>
        <div className="prose prose-slate dark:prose-invert max-w-none text-[15px] md:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          <p className="mb-4">
            En AKDESCARGAS valoramos tu privacidad. Esta política explica cómo recopilamos, usamos y protegemos tu información cuando utilizas nuestro sitio web.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-3 text-slate-900 dark:text-white">1. Información que Recopilamos</h2>
          <p className="mb-4">
            Recopilamos información básica no identificable (como el navegador que utilizas, la resolución de tu pantalla, y tu país) a través de herramientas de analítica estándar para mejorar nuestro sitio web.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-3 text-slate-900 dark:text-white">2. Uso de la Información</h2>
          <p className="mb-4">
            La información recopilada se utiliza exclusivamente para fines estadísticos y para mejorar la experiencia de usuario. No vendemos ni compartimos tu información personal con terceros.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-3 text-slate-900 dark:text-white">3. Cookies</h2>
          <p className="mb-4">
            Utilizamos cookies esenciales para el funcionamiento del sitio y cookies analíticas para entender cómo nuestros visitantes interactúan con la página.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-3 text-slate-900 dark:text-white">4. Enlaces a Terceros</h2>
          <p className="mb-4">
            Nuestro sitio puede contener enlaces a otros sitios de interés. Sin embargo, una vez que hayas utilizado estos enlaces para abandonar nuestro sitio, debes tener en cuenta que no tenemos ningún control sobre ese otro sitio web. Por lo tanto, no somos responsables de la protección y privacidad de ninguna información que proporciones.
          </p>

          <p className="mt-10 text-sm text-gray-500 dark:text-slate-500">Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
