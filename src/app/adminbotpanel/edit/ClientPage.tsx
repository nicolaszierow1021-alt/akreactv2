"use client";

import { AppForm } from "@/components/AppForm";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Loader2 } from "lucide-react";

function EditAppContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [appData, setAppData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError("No se proporcionó ID");
      setLoading(false);
      return;
    }

    async function fetchApp() {
      try {
        const res = await fetch(`/api/apps/${id}`);
        if (!res.ok) {
          setError("App no encontrada");
          return;
        }
        const data = await res.json();
        setAppData(data);
      } catch {
        setError("Error de conexión");
      }
      setLoading(false);
    }
    fetchApp();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f1c] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#DC2626] animate-spin" />
      </div>
    );
  }

  if (error || !appData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f1c] flex items-center justify-center">
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  return <AppForm initialData={appData} isEditing />;
}

export default function ClientEditAppPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f1c] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#DC2626] animate-spin" />
      </div>
    }>
      <EditAppContent />
    </Suspense>
  );
}
