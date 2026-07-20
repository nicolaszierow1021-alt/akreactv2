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

export async function onRequestGet(context: any) {
  const { env } = context;
  const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    return new Response(JSON.stringify([]), { headers: { 'content-type': 'application/json' } });
  }

  const res = await fetch(`${supabaseUrl}/rest/v1/apps?select=*&order=createdAt.desc`, {
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`
    }
  });

  const apps = await res.json();
  return new Response(JSON.stringify(apps), { headers: { 'content-type': 'application/json' } });
}

export async function onRequestPost(context: any) {
  const { request, env } = context;
  if (!isAuthorized(request)) {
    return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401, headers: { 'content-type': 'application/json' } });
  }

  try {
    const body = await request.json();
    if (!body.id || !body.title || !body.publisher) {
      return new Response(JSON.stringify({ error: "Faltan campos requeridos" }), { status: 400, headers: { 'content-type': 'application/json' } });
    }

    const appData = {
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    const res = await fetch(`${supabaseUrl}/rest/v1/apps`, {
      method: 'POST',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(appData)
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Error from Supabase');
    }

    const newApp = await res.json();
    return new Response(JSON.stringify(newApp[0]), { status: 201, headers: { 'content-type': 'application/json' } });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || "Error al crear la app" }), { status: 400, headers: { 'content-type': 'application/json' } });
  }
}
