export async function onRequestPost(context: any) {
  const { request, env } = context;
  try {
    const body = await request.json();
    const password = body.password;
    const adminPassword = env.ADMIN_PASSWORD || "admin123";

    if (password === adminPassword) {
      // Create a simple token in edge (Buffer is not available in standard CF Pages env, using btoa)
      const tokenString = `admin:${Date.now()}`;
      const token = btoa(tokenString);
      
      return new Response(JSON.stringify({ success: true, token }), { 
        headers: { 'content-type': 'application/json' } 
      });
    }

    return new Response(
      JSON.stringify({ success: false, error: "Contraseña incorrecta" }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, error: "Error en la petición" }),
      { status: 400, headers: { 'content-type': 'application/json' } }
    );
  }
}
