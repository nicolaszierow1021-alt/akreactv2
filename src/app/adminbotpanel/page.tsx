"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Lock,
  Plus,
  Pencil,
  Trash2,
  Star,
  LogOut,
  Loader2,
  Search,
  AppWindow,
  Home,
  Rocket,
} from "lucide-react";

interface AppItem {
  id: string;
  title: string;
  publisher: string;
  category: string;
  version: string;
  rating: number;
  iconUrl: string;
  featured: boolean;
  updatedAt: string;
}

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [apps, setApps] = useState<AppItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deploying, setDeploying] = useState(false);
  const [deploySuccess, setDeploySuccess] = useState<boolean | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("admin_token");
    if (saved) setToken(saved);
  }, []);

  useEffect(() => {
    if (token) fetchApps();
  }, [token]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem("admin_token", data.token);
        setToken(data.token);
      } else {
        setLoginError(data.error || "Contraseña incorrecta");
      }
    } catch {
      setLoginError("Error de conexión");
    }

    setLoginLoading(false);
  }

  function handleLogout() {
    localStorage.removeItem("admin_token");
    setToken(null);
    setApps([]);
  }

  async function fetchApps() {
    setLoading(true);
    try {
      const res = await fetch("/api/apps");
      const data = await res.json();
      setApps(data);
    } catch {
      console.error("Error fetching apps");
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    try {
      await fetch(`/api/apps/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setApps((prev) => prev.filter((a) => a.id !== id));
      setDeleteId(null);
    } catch {
      console.error("Error deleting app");
    }
  }

  async function handleDeploy() {
    setDeploying(true);
    setDeploySuccess(null);
    try {
      const res = await fetch("/api/deploy", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setDeploySuccess(true);
        setTimeout(() => setDeploySuccess(null), 3000);
      } else {
        setDeploySuccess(false);
        setTimeout(() => setDeploySuccess(null), 3000);
      }
    } catch {
      setDeploySuccess(false);
      setTimeout(() => setDeploySuccess(null), 3000);
    }
    setDeploying(false);
  }

  const filtered = apps.filter(
    (app) =>
      app.title.toLowerCase().includes(search.toLowerCase()) ||
      app.publisher.toLowerCase().includes(search.toLowerCase()) ||
      app.category.toLowerCase().includes(search.toLowerCase())
  );

  // ─── LOGIN SCREEN ─────────────────────────────
  if (!token) {
    return (
      <div className="min-h-screen bg-[#050914] flex items-center justify-center p-4 selection:bg-red-500/30">
        <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-red-900 to-black border border-red-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(220,38,38,0.3)] animate-pulse">
              <Lock className="w-10 h-10 text-red-500" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-wider uppercase">
              Modo Dios
            </h1>
            <p className="text-sm text-red-500/80 mt-2 font-mono">
              Acceso restringido. Identifícate.
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="bg-[#0a0f1c] rounded-3xl p-8 border border-white/5 shadow-2xl space-y-6 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50"></div>
            <div>
              <label className="block text-[13px] font-bold text-slate-400 mb-2 font-mono uppercase tracking-widest">
                Código Autorizado
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-center text-xl text-white font-mono tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all placeholder:tracking-normal"
                placeholder="••••••••"
                autoFocus
              />
            </div>

            {loginError && (
              <p className="text-red-400 text-[13px] font-mono text-center bg-red-900/20 border border-red-500/20 px-3 py-3 rounded-xl">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              disabled={loginLoading || !password}
              className="w-full bg-gradient-to-r from-red-700 to-red-900 hover:from-red-600 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black uppercase tracking-widest py-4 rounded-xl text-[15px] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]"
            >
              {loginLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Acceder al Sistema"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ─── ADMIN DASHBOARD ──────────────────────────
  return (
    <div className="min-h-screen bg-[#050914] text-slate-200 selection:bg-red-500/30 font-sans pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0f1c] border-b border-white/5 shadow-sm">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center overflow-hidden shrink-0 bg-black/50 border border-white/5 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
              <img src="/logo.png" alt="Logo" className="w-7 h-7 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
            </div>
            <div>
              <h1 className="text-[17px] font-black text-white leading-tight uppercase tracking-wider">
                Admin Panel <span className="text-red-500 ml-1">PRO</span>
              </h1>
              <p className="text-[11px] font-mono text-slate-500 mt-0.5 tracking-widest uppercase">
                {apps.length} Registros Activos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/"
              className="p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
              title="Ir al Inicio"
            >
              <Home className="w-5 h-5" />
            </Link>
            <Link
              href="/adminbotpanel/new"
              className="bg-red-600/20 border border-red-500/30 hover:bg-red-500 hover:border-red-400 text-red-50 hover:text-white px-5 py-2.5 rounded-xl text-[13px] font-bold transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(220,38,38,0.15)] hover:shadow-[0_0_20px_rgba(220,38,38,0.3)] uppercase tracking-wider"
            >
              <Plus className="w-4 h-4 stroke-[3]" /> <span className="hidden sm:inline">Crear App</span>
            </Link>
            <button
              onClick={handleDeploy}
              disabled={deploying}
              className={`${
                deploySuccess === true 
                  ? "bg-green-600/20 border-green-500/30 text-green-500" 
                  : deploySuccess === false 
                    ? "bg-red-600/20 border-red-500/30 text-red-500" 
                    : "bg-blue-600/20 border-blue-500/30 hover:bg-blue-500 hover:border-blue-400 text-blue-50 hover:text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              } border px-4 py-2.5 rounded-xl text-[13px] font-bold transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.15)] uppercase tracking-wider disabled:opacity-50`}
              title="Actualizar SEO en Google"
            >
              {deploying ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : deploySuccess === true ? (
                <span className="text-green-500 text-base leading-none">✓</span>
              ) : (
                <Rocket className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">
                {deploySuccess === true ? "Listo" : deploySuccess === false ? "Error" : "Desplegar"}
              </span>
            </button>
            <button
              onClick={handleLogout}
              className="p-2.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
              title="Cerrar sesión"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-5 py-8 flex flex-col xl:flex-row gap-8">
        <div className="flex-1 min-w-0">
          {/* Troll Admin Message */}
          <div className="mb-8 bg-gradient-to-r from-red-900/40 to-black border border-red-500/20 rounded-2xl p-5 flex items-start gap-4 animate-in fade-in slide-in-from-top-4 duration-500 shadow-[0_0_30px_rgba(220,38,38,0.1)] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500 group-hover:w-2 transition-all"></div>
            <div className="text-3xl mt-0.5 animate-pulse drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]">💀</div>
            <div>
              <h3 className="text-[15px] font-black text-red-500 tracking-widest uppercase">Modo Dios: Activado</h3>
              <p className="text-[14px] text-slate-300 mt-1.5 font-mono">
                Bienvenido, pedazo de animal.
              </p>
            </div>
          </div>

          {/* Analytics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#0a0f1c] border border-white/5 rounded-2xl p-5 relative overflow-hidden group hover:border-blue-500/30 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-blue-500/10 transition-all"></div>
              <p className="text-[12px] font-bold text-slate-500 mb-2 uppercase tracking-widest">Total Apps</p>
              <h4 className="text-4xl font-black text-white">{apps.length}</h4>
            </div>
            <div className="bg-[#0a0f1c] border border-white/5 rounded-2xl p-5 relative overflow-hidden group hover:border-emerald-500/30 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-emerald-500/10 transition-all"></div>
              <p className="text-[12px] font-bold text-slate-500 mb-2 uppercase tracking-widest">Juegos</p>
              <h4 className="text-4xl font-black text-white">{apps.filter(a => a.category === 'Juegos').length}</h4>
            </div>
            <div className="bg-[#0a0f1c] border border-white/5 rounded-2xl p-5 relative overflow-hidden group hover:border-purple-500/30 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-purple-500/10 transition-all"></div>
              <p className="text-[12px] font-bold text-slate-500 mb-2 uppercase tracking-widest">Aplicaciones</p>
              <h4 className="text-4xl font-black text-white">{apps.filter(a => a.category === 'Aplicaciones').length}</h4>
            </div>
            <div className="bg-[#0a0f1c] border border-white/5 rounded-2xl p-5 relative overflow-hidden group hover:border-yellow-500/30 transition-all">
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-yellow-500/10 transition-all"></div>
              <p className="text-[12px] font-bold text-slate-500 mb-2 uppercase tracking-widest">Destacados</p>
              <h4 className="text-4xl font-black text-white">{apps.filter(a => a.featured).length}</h4>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-8 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-red-500 transition-colors" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar apps por nombre, creador o categoría..."
              className="w-full bg-[#0a0f1c] border border-white/10 rounded-2xl pl-14 pr-5 py-5 text-[15px] text-white focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all placeholder:text-slate-600 font-medium"
            />
          </div>

          {/* Apps Grid */}
          {loading ? (
            <div className="flex justify-center py-32">
              <Loader2 className="w-10 h-10 text-red-500 animate-spin drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-32 bg-[#0a0f1c]/50 rounded-3xl border border-white/5 backdrop-blur-sm">
              <AppWindow className="w-16 h-16 text-slate-700 mx-auto mb-4" />
              <p className="text-slate-400 font-bold tracking-wide uppercase">
                {search
                  ? "No se encontraron resultados"
                  : "Base de datos vacía. Ingresa el primer registro."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((app) => (
                <div
                  key={app.id}
                  className="bg-[#0a0f1c] border border-white/5 rounded-3xl p-5 flex flex-col hover:border-white/20 transition-all group shadow-lg hover:shadow-xl hover:-translate-y-1 duration-300 relative overflow-hidden"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="flex items-start gap-4 mb-5 relative z-10">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-[22%] overflow-hidden shadow-lg shrink-0 bg-black/50 border border-white/10 relative group-hover:shadow-[0_0_20px_rgba(220,38,38,0.15)] transition-all">
                      {app.iconUrl ? (
                        <img
                          src={app.iconUrl}
                          alt={app.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <AppWindow className="w-6 h-6 text-slate-600" />
                        </div>
                      )}
                      {app.featured && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center shadow-sm z-20">
                          <Star className="w-3 h-3 text-white fill-current" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 pt-0.5">
                      <h3 className="text-[17px] font-black text-white truncate mb-1 group-hover:text-red-400 transition-colors tracking-wide">
                        {app.title}
                      </h3>
                      <p className="text-[12px] font-mono text-slate-400 truncate mb-1.5 uppercase tracking-wider">
                        v{app.version} • {app.category}
                      </p>
                      <p className="text-[13px] text-slate-500 truncate font-medium">
                        {app.publisher}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between gap-2 relative z-10">
                    <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                      <span className="text-[13px] font-bold text-slate-300">
                        {app.rating}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Link
                        href={`/app/${app.id}`}
                        target="_blank"
                        className="p-2.5 text-slate-500 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                        title="Ver en web"
                      >
                        <AppWindow className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/adminbotpanel/edit?id=${app.id}`}
                        className="p-2.5 text-blue-500/70 hover:text-blue-400 hover:bg-blue-500/20 rounded-xl transition-all"
                        title="Editar registro"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setDeleteId(app.id)}
                        className="p-2.5 text-red-500/70 hover:text-red-400 hover:bg-red-500/20 rounded-xl transition-all"
                        title="Destruir"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar: Últimas Actualizaciones */}
        <aside className="w-full xl:w-80 shrink-0">
          <div className="bg-[#0a0f1c] rounded-3xl border border-white/5 p-6 shadow-xl sticky top-24">
            <h3 className="text-[15px] font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Últimas Actividades
            </h3>
            
            <div className="space-y-4">
              {[...apps]
                .sort((a, b) => {
                  const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
                  const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
                  return dateB - dateA; // Descending
                })
                .slice(0, 6)
                .map((app) => (
                  <div key={`recent-${app.id}`} className="flex items-center gap-3 p-3 rounded-2xl bg-black/30 border border-white/5 hover:bg-black/50 hover:border-white/10 transition-all group">
                    <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-black/50 border border-white/5">
                      {app.iconUrl ? (
                        <img src={app.iconUrl} alt={app.title} className="w-full h-full object-cover" />
                      ) : (
                        <AppWindow className="w-full h-full p-3 text-slate-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[14px] font-bold text-slate-200 truncate group-hover:text-red-400 transition-colors">
                        {app.title}
                      </h4>
                      <p className="text-[11px] font-mono text-slate-500 uppercase tracking-widest truncate mt-0.5">
                        {app.category} • v{app.version}
                      </p>
                    </div>
                    <Link
                      href={`/adminbotpanel/edit?id=${app.id}`}
                      className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-red-500 transition-all shrink-0"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}

              {apps.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-[12px] font-mono text-slate-500 uppercase tracking-widest">
                    Sin actividad reciente
                  </p>
                </div>
              )}
            </div>
          </div>
        </aside>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#0a0f1c] rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-red-500/30 animate-in zoom-in-95 duration-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
            <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 border border-red-500/20 shadow-inner">
              <Trash2 className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-black text-white mb-2 tracking-wide uppercase">
              ¿Eliminar Registro?
            </h3>
            <p className="text-[14px] text-slate-400 mb-8 leading-relaxed">
              Estás a punto de desintegrar <strong className="text-white">"{apps.find(a => a.id === deleteId)?.title || deleteId}"</strong>. Esta acción es permanente y no hay vuelta atrás en el Modo Dios.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-3.5 rounded-xl text-[14px] font-bold bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition-all border border-white/5 uppercase tracking-wider"
              >
                Abortar
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 py-3.5 rounded-xl text-[14px] font-bold bg-red-600 hover:bg-red-500 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all uppercase tracking-wider"
              >
                Destruir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
