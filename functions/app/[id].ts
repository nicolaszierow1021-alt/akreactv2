export async function onRequest(context: any) {
  const { request, env, params, next } = context;
  const appId = params.id;

  const response = await next();
  let html = await response.text();

  try {
    const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseKey) {
      const dbRes = await fetch(`${supabaseUrl}/rest/v1/apps?id=eq.${appId}&select=title,description,iconUrl,version,modType,publisher,category,subcategory,rating,size`, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        }
      });

      const apps = await dbRes.json();
      const app = apps[0];

      if (app) {
        const isGame = app.category === 'Juegos';
        const seoTitle = `${app.title} ${app.modType ? `- ${app.modType} ` : ''}(v${app.version || '1.0'}) APK - AKDESCARGAS`;
        const seoDesc = app.description ? app.description.substring(0, 150).replace(/"/g, '&quot;') + '...' : `Descarga ${app.title} APK gratis.`;
        
        html = html.replace(/<title>.*<\/title>/i, `<title>${seoTitle}</title>`);
        html = html.replace(/<meta name="description" content="[^"]*"/i, `<meta name="description" content="${seoDesc}">`);
        html = html.replace(/<meta property="og:title" content="[^"]*"/i, `<meta property="og:title" content="${seoTitle}">`);
        html = html.replace(/<meta property="og:description" content="[^"]*"/i, `<meta property="og:description" content="${seoDesc}">`);
        if (app.iconUrl) {
          html = html.replace(/<meta property="og:image" content="[^"]*"/i, `<meta property="og:image" content="${app.iconUrl}">`);
        }

        const jsonLd = {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": app.title,
          "operatingSystem": "ANDROID",
          "applicationCategory": isGame ? "GameApplication" : "Application",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": app.rating || 4.5,
            "ratingCount": Math.floor(Math.random() * 500) + 100
          },
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        };

        const jsonLdScript = `\n  <script type="application/ld+json">\n${JSON.stringify(jsonLd)}\n  </script>`;
        html = html.replace("</head>", `${jsonLdScript}\n</head>`);
      }
    }
  } catch (error: any) {
    console.error("Error inyectando SEO:", error);
  }

  return new Response(html, {
    status: response.status,
    headers: { 
      'content-type': 'text/html;charset=UTF-8',
      'cache-control': 'public, max-age=3600'
    },
  });
}
