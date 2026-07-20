"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  Plus,
  X,
  Loader2,
  Save,
  Image as ImageIcon,
  Trash2,
  Check,
  Copy,
  Pencil,
} from "lucide-react";

interface DownloadLink {
  name: string;
  description: string;
  size: string;
  url: string;
}

interface AppFormData {
  id: string;
  title: string;
  publisher: string;
  category: string;
  subcategory: string;
  description: string;
  version: string;
  size: string;
  rating: number;
  ageRating: string;
  modType: string;
  modInfo: string[];
  iconUrl: string;
  bannerUrl: string;
  screenshots: string[];
  downloadLinks: DownloadLink[];
  featured: boolean;
  badgeType?: string;
  installationInstructions?: string;
}

interface AppFormProps {
  initialData?: AppFormData;
  isEditing?: boolean;
}

export function AppForm({ initialData, isEditing = false }: AppFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showTelegramModal, setShowTelegramModal] = useState(false);
  const [telegramMessage, setTelegramMessage] = useState("");



  const gameSubcategories = [
    "Acción",
    "Arcade",
    "Aventura",
    "Carreras",
    "Casual",
    "Deporte",
    "Estrategia",
    "Horror",
    "Juegos de rol",
    "Música",
    "Paid",
    "Puzzle",
    "Simulación",
    "Supervivencia",
    "Terror"
  ];

  const appSubcategories = [
    "Aplicaciones de vídeo",
    "Arte y Diseño",
    "Cómics",
    "Comunicación",
    "Edición",
    "Educación",
    "Empresa",
    "Entretenimiento",
    "Estilo de vida",
    "Fotografía",
    "Herramientas",
    "Mapas y navegación",
    "Música y audio",
    "Películas",
    "Personalización",
    "Productividad",
    "Salud y bienestar",
    "Ser padres",
    "Social",
    "Televisión",
    "Tiempo",
    "Tools",
    "Viajes y guías"
  ];

  const [form, setForm] = useState<AppFormData>(
    initialData || {
      id: "",
      title: "",
      publisher: "",
      category: "Aplicaciones",
      subcategory: "",
      description: "",
      version: "1.0.0",
      size: "",
      rating: 4.5,
      ageRating: "3+",
      modType: "Premium",
      modInfo: [""],
      iconUrl: "",
      bannerUrl: "",
      screenshots: [],
      downloadLinks: [{ name: "APK", description: "Premium", size: "", url: "" }],
      featured: false,
      installationInstructions: "",
    }
  );

  function getToken() {
    return localStorage.getItem("admin_token") || "";
  }

  // Auto-generate slug from title
  function generateSlug(title: string) {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }

  function generateTelegramMessage(data: AppFormData) {
    const isMod = data.badgeType?.toUpperCase() === "MOD";
    const isPremium = data.badgeType?.toUpperCase() === "PREMIUM";
    
    const finalId = data.id || generateSlug(data.title);
    const appUrl = `https://akdescargas.store/app/${finalId}`;
    
    const parts = [
      "🔥 𝗡𝗨𝗘𝗩𝗔 𝗔𝗖𝗧𝗨𝗔𝗟𝗜𝗭𝗔𝗖𝗜𝗢́𝗡 🔥\n",
      `📱 𝗔𝗽𝗽: ${data.title}`,
      `🏷️ 𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝗶́𝗮: ${data.subcategory || data.category}`,
      `👑 𝗩𝗲𝗿𝘀𝗶𝗼́𝗻: ${data.version || "1.0.0"}`,
      `📦 𝗣𝗲𝘀𝗼: ${data.size}\n`,
      "✨ 𝗖𝗮𝗿𝗮𝗰𝘁𝗲𝗿𝗶́𝘀𝘁𝗶𝗰𝗮𝘀:",
    ];

    // Agregar las características que el usuario escribió en el formulario
    const validFeatures = (data.modInfo || []).filter(f => f.trim() !== "");
    if (validFeatures.length > 0) {
      validFeatures.forEach(feature => {
        parts.push(`✅ ${feature.trim()}`);
      });
    } else if (isMod) {
      parts.push("✅ Versión Modificada (MOD)");
    } else if (isPremium) {
      parts.push("✅ Premium Desbloqueado");
    }
    
    parts.push(`\n━━━━━━━━━━━━━━━━━━`);
    parts.push(`👇 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔 𝗦𝗘𝗚𝗨𝗥𝗔 𝗔𝗤𝗨𝗜́ 👇`);
    parts.push(appUrl);
    parts.push(`━━━━━━━━━━━━━━━━━━`);

    return parts.join("\n");
  }

  function updateField<K extends keyof AppFormData>(key: K, value: AppFormData[K]) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };

      // Sincronizar automáticamente el tamaño con el primer enlace de descarga
      if (key === "size" && next.downloadLinks && next.downloadLinks.length > 0) {
        const links = [...next.downloadLinks];
        // Si el tamaño del enlace estaba vacío o era igual al tamaño global anterior, lo actualizamos
        if (links[0].size === "" || links[0].size === prev.size) {
          links[0] = { ...links[0], size: value as string };
          next.downloadLinks = links;
        }
      }

      // Sincronizar automáticamente el título con el nombre del primer enlace de descarga
      if (key === "title" && next.downloadLinks && next.downloadLinks.length > 0) {
        const links = [...next.downloadLinks];
        // Si el nombre del enlace estaba vacío, era "APK", o era igual al título anterior, lo actualizamos
        if (links[0].name === "" || links[0].name === "APK" || links[0].name === prev.title) {
          links[0] = { ...links[0], name: value as string };
          next.downloadLinks = links;
        }
      }

      return next;
    });
  }





  function removeScreenshot(index: number) {
    updateField(
      "screenshots",
      form.screenshots.filter((_, i) => i !== index)
    );
  }

  function addModInfo() {
    updateField("modInfo", [...form.modInfo, ""]);
  }

  function updateModInfo(index: number, value: string) {
    const updated = [...form.modInfo];
    updated[index] = value;
    updateField("modInfo", updated);
  }

  function removeModInfo(index: number) {
    updateField(
      "modInfo",
      form.modInfo.filter((_, i) => i !== index)
    );
  }

  function addDownloadLink() {
    updateField("downloadLinks", [
      ...form.downloadLinks,
      { name: "APK", description: "", size: "", url: "" },
    ]);
  }

  function updateDownloadLink(
    index: number,
    key: keyof DownloadLink,
    value: string
  ) {
    const updated = [...form.downloadLinks];
    updated[index] = { ...updated[index], [key]: value };
    updateField("downloadLinks", updated);
  }

  function removeDownloadLink(index: number) {
    updateField(
      "downloadLinks",
      form.downloadLinks.filter((_, i) => i !== index)
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const payload = {
        ...form,
        modInfo: form.modInfo.filter((m) => m.trim() !== ""),
      };

      if (!isEditing) {
        payload.id = payload.id || generateSlug(payload.title);
      }

      const url = isEditing ? `/api/apps/${form.id}` : "/api/apps";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al guardar");
      }

      router.push("/adminbotpanel");
    } catch (err: any) {
      setError(err.message);
    }

    setSaving(false);
  }

  const inputClass =
    "w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-[15px] text-white focus:outline-none focus:ring-1 focus:ring-red-500/50 focus:border-red-500 transition-all placeholder:text-slate-600 shadow-inner";
  const labelClass =
    "block text-[12px] font-bold text-slate-400 mb-2 uppercase tracking-widest";

  return (
    <div className="min-h-screen bg-[#050914] text-slate-200 selection:bg-red-500/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0f1c] border-b border-white/5 shadow-sm">
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push("/adminbotpanel")}
            className="flex items-center gap-2 text-[13px] font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest bg-white/5 px-4 py-2 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" /> Volver
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setTelegramMessage(generateTelegramMessage(form));
                setShowTelegramModal(true);
              }}
              disabled={!form.title}
              className="bg-[#0088cc] hover:bg-[#0077b3] text-white px-4 py-2 rounded-xl text-[13px] font-bold transition-colors flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-[#0088cc]/20"
            >
              <Copy className="w-4 h-4" /> Telegram
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving || !form.title}
              className="bg-[#DC2626] hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2 rounded-xl text-[13px] font-bold transition-colors flex items-center gap-1.5"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isEditing ? "Guardar Cambios" : "Crear App"}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-5 py-8 pb-32">
        <h1 className="text-3xl font-black text-white mb-8 uppercase tracking-widest flex items-center gap-3">
          {isEditing ? <Pencil className="w-8 h-8 text-red-500" /> : <Plus className="w-8 h-8 text-red-500" />}
          {isEditing ? "Editar Registro" : "Nuevo Registro"}
        </h1>

        {error && (
          <div className="mb-8 bg-red-900/20 border border-red-500/30 text-red-400 text-[14px] font-mono px-5 py-4 rounded-2xl flex items-center gap-3">
            <X className="w-5 h-5 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* ─── BASIC INFO ────────────────────── */}
          <section className="bg-[#0a0f1c] rounded-3xl p-6 md:p-8 border border-white/5 space-y-6 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500/50 group-hover:bg-red-500 transition-colors"></div>
            <h2 className="text-[18px] font-black text-white flex items-center gap-3 uppercase tracking-widest">
              <span className="w-8 h-8 bg-red-500/10 rounded-lg flex items-center justify-center text-red-500 shrink-0">1</span> 
              Información Básica
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className={labelClass}>Título *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => {
                    updateField("title", e.target.value);
                    if (!isEditing) {
                      updateField("id", generateSlug(e.target.value));
                    }
                  }}
                  className={inputClass}
                  placeholder="YouTube Music Premium"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Slug (ID) *</label>
                <input
                  type="text"
                  value={form.id}
                  onChange={(e) => updateField("id", e.target.value)}
                  className={inputClass}
                  placeholder="youtube-music-premium"
                  disabled={isEditing}
                  required
                />
                <p className="text-[11px] text-gray-400 mt-1">
                  Se usa en la URL: /app/{form.id || "slug"}
                </p>
              </div>

              <div>
                <label className={labelClass}>Publisher *</label>
                <input
                  type="text"
                  value={form.publisher}
                  onChange={(e) => updateField("publisher", e.target.value)}
                  className={inputClass}
                  placeholder="Google LLC"
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Categoría</label>
                <select
                  value={form.category}
                  onChange={(e) => {
                    updateField("category", e.target.value);
                    updateField("subcategory", "");
                  }}
                  className={inputClass}
                >
                  <option>Aplicaciones</option>
                  <option>Juegos</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Subcategoría</label>
                <select
                  value={form.subcategory}
                  onChange={(e) => updateField("subcategory", e.target.value)}
                  className={inputClass}
                >
                  <option value="">Sin subcategoría</option>
                  {(form.category === "Juegos" ? gameSubcategories : appSubcategories).map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Versión</label>
                <input
                  type="text"
                  value={form.version}
                  onChange={(e) => updateField("version", e.target.value)}
                  className={inputClass}
                  placeholder="9.22.53"
                />
              </div>

              <div>
                <label className={labelClass}>Tamaño</label>
                <div className="flex rounded-xl overflow-hidden border border-white/10 focus-within:ring-1 focus-within:ring-red-500/50 focus-within:border-red-500 transition-all bg-black/50 shadow-inner">
                  <input
                    type="number"
                    step="0.01"
                    value={form.size.replace(/(MB|GB|M|G|\s)/gi, "")}
                    onChange={(e) => {
                      const unit = form.size.toUpperCase().includes("G") ? "GB" : "MB";
                      updateField("size", `${e.target.value} ${unit}`);
                    }}
                    className="w-full bg-transparent px-4 py-3.5 text-[15px] text-white focus:outline-none min-w-0 placeholder:text-slate-600"
                    placeholder="48"
                  />
                  <select
                    value={form.size.toUpperCase().includes("G") ? "GB" : "MB"}
                    onChange={(e) => {
                      const num = form.size.replace(/(MB|GB|M|G|\s)/gi, "");
                      updateField("size", `${num} ${e.target.value}`);
                    }}
                    className="bg-[#0a0f1c] border-l border-white/10 px-4 text-[14px] font-bold text-slate-300 focus:outline-none cursor-pointer"
                  >
                    <option value="MB">MB</option>
                    <option value="GB">GB</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>Calificación</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={form.rating}
                  onChange={(e) =>
                    updateField("rating", parseFloat(e.target.value) || 0)
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Clasificación de Edad</label>
                <select
                  value={form.ageRating}
                  onChange={(e) => updateField("ageRating", e.target.value)}
                  className={inputClass}
                >
                  <option>3+</option>
                  <option>7+</option>
                  <option>12+</option>
                  <option>16+</option>
                  <option>18+</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Tipo de MOD</label>
                <input
                  type="text"
                  value={form.modType}
                  onChange={(e) => updateField("modType", e.target.value)}
                  className={inputClass}
                  placeholder="Premium, Dinero ilimitado, etc."
                />
              </div>

              <div>
                <label className={labelClass}>Etiqueta Flotante (Icono)</label>
                <select
                  value={form.badgeType || ""}
                  onChange={(e) => updateField("badgeType", e.target.value)}
                  className={inputClass}
                >
                  <option value="">Ninguna</option>
                  <option value="MOD">MOD</option>
                  <option value="PREMIUM">PREMIUM</option>
                </select>
              </div>

              <div className="flex items-center gap-3 self-end pb-1">
                <input
                  type="checkbox"
                  id="featured"
                  checked={form.featured}
                  onChange={(e) => updateField("featured", e.target.checked)}
                  className="w-5 h-5 rounded-md border-gray-300 text-[#DC2626] focus:ring-[#DC2626] cursor-pointer"
                />
                <label
                  htmlFor="featured"
                  className="text-[14px] font-bold text-slate-300 cursor-pointer uppercase tracking-wider"
                >
                  ⭐ App Destacada (carrusel principal)
                </label>
              </div>
            </div>

            <div>
              <label className={labelClass}>Descripción</label>
              <textarea
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                rows={5}
                className={inputClass}
                placeholder="Describe la aplicación..."
              />
            </div>

            <div>
              <label className={labelClass}>Instrucciones de Instalación (Opcional)</label>
              <textarea
                value={form.installationInstructions || ""}
                onChange={(e) => updateField("installationInstructions", e.target.value)}
                rows={3}
                className={inputClass}
                placeholder="Ej: 1. Descarga el archivo APK. 2. Instálalo..."
              />
            </div>
          </section>

          {/* ─── IMAGES ────────────────────────── */}
          <section className="bg-[#0a0f1c] rounded-3xl p-6 md:p-8 border border-white/5 space-y-6 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50 group-hover:bg-blue-500 transition-colors"></div>
            <h2 className="text-[18px] font-black text-white flex items-center gap-3 uppercase tracking-widest">
              <span className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500 shrink-0">2</span> 
              Multimedia
            </h2>

            {/* Icon */}
            <div>
              <label className={labelClass}>Ícono de la App</label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-[22%] overflow-hidden bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 flex items-center justify-center shrink-0">
                  {form.iconUrl ? (
                    <img
                      src={form.iconUrl}
                      alt="Icon"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-gray-300" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-bold text-gray-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">
                    URL del ícono
                  </p>
                  <input
                    type="text"
                    value={form.iconUrl}
                    onChange={(e) => updateField("iconUrl", e.target.value)}
                    className={inputClass}
                    placeholder="https://ejemplo.com/icono.png"
                  />
                </div>
              </div>
            </div>

            {/* Banner */}
            <div>
              <label className={labelClass}>
                Banner (para carrusel de Destacados)
              </label>
              <div className="space-y-3">
                {form.bannerUrl && (
                  <div className="relative w-full max-w-md aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-700">
                    <img
                      src={form.bannerUrl}
                      alt="Banner"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => updateField("bannerUrl", "")}
                      className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <div>
                  <p className="text-[11px] font-bold text-gray-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">
                    URL del Banner
                  </p>
                  <input
                    type="text"
                    value={form.bannerUrl}
                    onChange={(e) => updateField("bannerUrl", e.target.value)}
                    className={inputClass}
                    placeholder="https://ejemplo.com/banner.png"
                  />
                </div>
              </div>
            </div>

            {/* Screenshots */}
            <div>
              <label className={labelClass}>Capturas de Pantalla</label>
              <div className="flex flex-wrap gap-3 mb-3">
                {form.screenshots.map((url, i) => (
                  <div
                    key={i}
                    className="relative w-24 h-40 rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600"
                  >
                    <img
                      src={url}
                      alt={`Screenshot ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeScreenshot(i)}
                      className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 text-[10px]"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="https://ejemplo.com/imagen.png"
                  className={`${inputClass} flex-1`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const val = e.currentTarget.value.trim();
                      if (val) {
                        updateField("screenshots", [...form.screenshots, val]);
                        e.currentTarget.value = "";
                      }
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                    const val = input.value.trim();
                    if (val) {
                      updateField("screenshots", [...form.screenshots, val]);
                      input.value = "";
                    }
                  }}
                  className="bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-700 dark:text-slate-300 px-4 py-2 rounded-xl text-[13px] font-bold transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <Plus className="w-4 h-4" /> Agregar URL
                </button>
              </div>
            </div>
          </section>

          {/* ─── MOD INFO ──────────────────────── */}
          <section className="bg-[#0a0f1c] rounded-3xl p-6 md:p-8 border border-white/5 space-y-6 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-purple-500/50 group-hover:bg-purple-500 transition-colors"></div>
            <h2 className="text-[18px] font-black text-white flex items-center gap-3 uppercase tracking-widest">
              <span className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-500 shrink-0">3</span> 
              Características MOD
            </h2>
            <div className="space-y-2">
              {form.modInfo.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-[14px] text-gray-400 shrink-0">✿</span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateModInfo(i, e.target.value)}
                    className={`${inputClass} flex-1`}
                    placeholder="Ej: Sin anuncios"
                  />
                  <button
                    type="button"
                    onClick={() => removeModInfo(i)}
                    className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addModInfo}
              className="text-[#DC2626] hover:text-red-600 text-[13px] font-bold flex items-center gap-1 transition-colors"
            >
              <Plus className="w-4 h-4" /> Agregar característica
            </button>
          </section>

          {/* ─── DOWNLOAD LINKS ────────────────── */}
          <section className="bg-[#0a0f1c] rounded-3xl p-6 md:p-8 border border-white/5 space-y-6 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/50 group-hover:bg-emerald-500 transition-colors"></div>
            <h2 className="text-[18px] font-black text-white flex items-center gap-3 uppercase tracking-widest">
              <span className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500 shrink-0">4</span> 
              Enlaces de Descarga
            </h2>
            <div className="space-y-4">
              {form.downloadLinks.map((link, i) => (
                <div
                  key={i}
                  className="bg-black/40 border border-white/5 rounded-2xl p-5 space-y-4 relative hover:border-white/10 transition-colors shadow-inner"
                >
                  <button
                    type="button"
                    onClick={() => removeDownloadLink(i)}
                    className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className={labelClass}>Nombre</label>
                      <input
                        type="text"
                        value={link.name}
                        onChange={(e) =>
                          updateDownloadLink(i, "name", e.target.value)
                        }
                        className={inputClass}
                        placeholder="APK"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Descripción</label>
                      <input
                        type="text"
                        value={link.description}
                        onChange={(e) =>
                          updateDownloadLink(i, "description", e.target.value)
                        }
                        className={inputClass}
                        placeholder="Premium, MicroG..."
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Tamaño</label>
                      <div className="flex rounded-xl overflow-hidden border border-white/10 focus-within:ring-1 focus-within:ring-red-500/50 focus-within:border-red-500 transition-all bg-black/50 shadow-inner">
                        <input
                          type="number"
                          step="0.01"
                          value={link.size.replace(/(MB|GB|M|G|\s)/gi, "")}
                          onChange={(e) => {
                            const unit = link.size.toUpperCase().includes("G") ? "GB" : "MB";
                            updateDownloadLink(i, "size", `${e.target.value} ${unit}`);
                          }}
                          className="w-full bg-transparent px-4 py-3.5 text-[15px] text-white focus:outline-none min-w-0 placeholder:text-slate-600"
                          placeholder="120"
                        />
                        <select
                          value={link.size.toUpperCase().includes("G") ? "GB" : "MB"}
                          onChange={(e) => {
                            const num = link.size.replace(/(MB|GB|M|G|\s)/gi, "");
                            updateDownloadLink(i, "size", `${num} ${e.target.value}`);
                          }}
                          className="bg-[#0a0f1c] border-l border-white/10 px-4 text-[14px] font-bold text-slate-300 focus:outline-none cursor-pointer"
                        >
                          <option value="MB">MB</option>
                          <option value="GB">GB</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>URL de Descarga</label>
                    <input
                      type="text"
                      value={link.url}
                      onChange={(e) =>
                        updateDownloadLink(i, "url", e.target.value)
                      }
                      className={inputClass}
                      placeholder="https://example.com/download.apk"
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addDownloadLink}
              className="text-[#DC2626] hover:text-red-600 text-[13px] font-bold flex items-center gap-1 transition-colors"
            >
              <Plus className="w-4 h-4" /> Agregar enlace de descarga
            </button>
          </section>
        </form>
      </main>

      {/* Telegram Modal */}
      {showTelegramModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-gray-100 dark:border-white/10 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-[#0088cc]/10 rounded-full flex items-center justify-center">
                  <Copy className="w-5 h-5 text-[#0088cc]" />
                </div>
                <button
                  onClick={() => setShowTelegramModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Mensaje para Telegram
              </h3>
              <p className="text-[14px] text-gray-500 dark:text-slate-400 mb-6">
                Puedes editar el mensaje aquí antes de copiarlo:
              </p>
              
              <div className="relative">
                <textarea 
                  value={telegramMessage}
                  onChange={(e) => setTelegramMessage(e.target.value)}
                  className="w-full h-[280px] bg-gray-50 dark:bg-[#0f172a] border border-gray-200 dark:border-slate-700 rounded-xl p-4 text-[13px] font-mono text-gray-800 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0088cc]/50 focus:border-[#0088cc] resize-none transition-all"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-6">
                <button
                  onClick={() => setShowTelegramModal(false)}
                  className="px-4 py-3 rounded-xl text-[14px] font-bold text-gray-700 dark:text-slate-300 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(telegramMessage);
                      const btn = document.getElementById("copy-telegram-btn");
                      if (btn) {
                        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check w-4 h-4"><path d="M20 6 9 17l-5-5"/></svg> ¡Copiado!`;
                        btn.classList.replace("bg-[#0088cc]", "bg-green-600");
                        btn.classList.replace("hover:bg-[#0077b3]", "hover:bg-green-700");
                        btn.classList.replace("shadow-[#0088cc]/20", "shadow-green-600/20");
                      }
                      setTimeout(() => {
                        setShowTelegramModal(false);
                      }, 1200);
                    } catch (err) {
                      console.error(err);
                      alert("Error al copiar al portapapeles.");
                    }
                  }}
                  id="copy-telegram-btn"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-[14px] font-bold text-white bg-[#0088cc] hover:bg-[#0077b3] transition-colors shadow-lg shadow-[#0088cc]/20"
                >
                  <Copy className="w-4 h-4" /> Copiar Mensaje
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
