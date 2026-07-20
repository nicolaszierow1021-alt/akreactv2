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
  const { env, params } = context;
  const appId = params.id;
  const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    return new Response(JSON.stringify({ error: "Missing env" }), { status: 500, headers: { 'content-type': 'application/json' } });
  }

  const res = await fetch(`${supabaseUrl}/rest/v1/apps?id=eq.${appId}&select=*`, {
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`
    }
  });

  const apps = await res.json();
  if (apps.length === 0) {
    return new Response(JSON.stringify({ error: "App no encontrada" }), { status: 404, headers: { 'content-type': 'application/json' } });
  }

  return new Response(JSON.stringify(apps[0]), { headers: { 'content-type': 'application/json' } });
}

export async function onRequestPut(context: any) {
  const { request, env, params } = context;
  if (!isAuthorized(request)) {
    return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401, headers: { 'content-type': 'application/json' } });
  }

  try {
    const appId = params.id;
    const body = await request.json();
    body.updatedAt = new Date().toISOString();

    const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    const res = await fetch(`${supabaseUrl}/rest/v1/apps?id=eq.${appId}`, {
      method: 'PATCH',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      throw new Error('Error updating in Supabase');
    }

    const updated = await res.json();
    if (updated.length === 0) {
      return new Response(JSON.stringify({ error: "App no encontrada" }), { status: 404, headers: { 'content-type': 'application/json' } });
    }

    return new Response(JSON.stringify(updated[0]), { headers: { 'content-type': 'application/json' } });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400, headers: { 'content-type': 'application/json' } });
  }
}

export async function onRequestDelete(context: any) {
  const { request, env, params } = context;
  if (!isAuthorized(request)) {
    return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401, headers: { 'content-type': 'application/json' } });
  }

  try {
    const appId = params.id;
    const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    const res = await fetch(`${supabaseUrl}/rest/v1/apps?id=eq.${appId}`, {
      method: 'DELETE',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Prefer': 'return=representation'
      }
    });

    if (!res.ok) {
      throw new Error('Error deleting in Supabase');
    }

    const deleted = await res.json();
    if (deleted.length === 0) {
      return new Response(JSON.stringify({ error: "App no encontrada" }), { status: 404, headers: { 'content-type': 'application/json' } });
    }

    return new Response(JSON.stringify({ success: true }), { headers: { 'content-type': 'application/json' } });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400, headers: { 'content-type': 'application/json' } });
  }
}
