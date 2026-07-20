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
    return new Response(JSON.stringify({ error: "No autorizado" }), { status: 401, headers: { 'content-type': 'application/json' } });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return new Response(JSON.stringify({ error: "No se envió ningún archivo" }), { status: 400, headers: { 'content-type': 'application/json' } });
    }

    const ext = file.name.split('.').pop() || "png";
    const baseName = file.name.replace(`.${ext}`, "").replace(/[^a-zA-Z0-9-_]/g, "_").slice(0, 50);
    const uniqueName = `${baseName}-${Date.now()}.${ext}`;

    const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    // Convert to ArrayBuffer for uploading
    const arrayBuffer = await file.arrayBuffer();

    // Upload to Supabase Storage, bucket name: "uploads"
    const uploadRes = await fetch(`${supabaseUrl}/storage/v1/object/uploads/${uniqueName}`, {
      method: 'POST',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': file.type || 'image/png',
        'x-upsert': 'true'
      },
      body: arrayBuffer
    });

    if (!uploadRes.ok) {
      const err = await uploadRes.json();
      throw new Error(err.message || 'Error uploading to Supabase');
    }

    // Public URL
    const publicUrl = `${supabaseUrl}/storage/v1/object/public/uploads/${uniqueName}`;
    
    return new Response(JSON.stringify({ url: publicUrl, filename: uniqueName }), { headers: { 'content-type': 'application/json' } });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || "Error al subir archivo" }), { status: 500, headers: { 'content-type': 'application/json' } });
  }
}
