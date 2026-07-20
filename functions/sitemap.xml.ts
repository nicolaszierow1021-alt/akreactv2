export async function onRequest(context: any) {
  const { env } = context;
  const baseUrl = "https://akdescargas.store";

  try {
    const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    let apps = [];
    if (supabaseUrl && supabaseKey) {
      const dbRes = await fetch(`${supabaseUrl}/rest/v1/apps?select=id,updatedAt`, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        }
      });
      if (dbRes.ok) {
        apps = await dbRes.json();
      }
    }

    const appUrls = apps.map((app: any) => `
  <url>
    <loc>${baseUrl}/app/${app.id}</loc>
    <lastmod>${new Date(app.updatedAt || Date.now()).toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`).join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>hourly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/juegos</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/aplicaciones</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/mas-juegos</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>${appUrls}
</urlset>`;

    return new Response(xml, {
      headers: {
        'content-type': 'application/xml',
        'cache-control': 'public, max-age=3600'
      }
    });
  } catch (error: any) {
    return new Response('Error generating sitemap', { status: 500 });
  }
}
