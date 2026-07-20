function isAuthorized(request: any) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return false;
  const token = authHeader.slice(7);
  try {
    const decoded = atob(token);
    return decoded.startsWith("admin:");
  } catch {
    return false;
  }
}

export async function onRequestPost(context: any) {
  const { request, env } = context;
  
  if (!isAuthorized(request)) {
    return new Response(JSON.stringify({ success: false, error: "No autorizado" }), {
      status: 401,
      headers: { 'content-type': 'application/json' }
    });
  }

  const webhookUrl = env.CLOUDFLARE_WEBHOOK_URL;
  
  if (!webhookUrl) {
    return new Response(JSON.stringify({ success: false, error: "La variable CLOUDFLARE_WEBHOOK_URL no está configurada" }), {
      status: 500,
      headers: { 'content-type': 'application/json' }
    });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
    });

    if (response.ok) {
      return new Response(JSON.stringify({ success: true, message: "Deploy iniciado" }), {
        headers: { 'content-type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({ success: false, error: "Error al iniciar el deploy en Cloudflare" }), {
        status: response.status,
        headers: { 'content-type': 'application/json' }
      });
    }
  } catch (error: any) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
      headers: { 'content-type': 'application/json' }
    });
  }
}
