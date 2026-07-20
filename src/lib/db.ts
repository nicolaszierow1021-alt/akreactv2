import { supabase } from "./supabase";

export interface DownloadLink {
  name: string;
  description: string;
  size: string;
  url: string;
}

export interface AppData {
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
  badgeType: string;
  featured: boolean;
  installationInstructions?: string;
  createdAt: string;
  updatedAt: string;
}

const LIGHT_SELECT = "id, title, publisher, category, subcategory, version, size, rating, ageRating, modType, iconUrl, bannerUrl, badgeType, featured, updatedAt";

export const getApps = async (limit: number = 100): Promise<AppData[]> => {
  const { data, error } = await supabase
    .from("apps")
    .select(LIGHT_SELECT)
    .order("createdAt", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching apps:", error);
    return [];
  }
  return data as AppData[];
};

export const getAppBySlug = async (slug: string): Promise<AppData | undefined> => {
  const { data, error } = await supabase
    .from("apps")
    .select("*")
    .eq("id", slug)
    .single();

  if (error) {
    console.error(`Error fetching app ${slug}:`, error);
    return undefined;
  }
  return data as AppData;
};

export const getAppsByCategory = async (category: string, limit: number = 100): Promise<AppData[]> => {
  const { data, error } = await supabase
    .from("apps")
    .select(LIGHT_SELECT)
    .eq("category", category)
    .order("createdAt", { ascending: false })
    .limit(limit);

  if (error) {
    console.error(`Error fetching apps for category ${category}:`, error);
    return [];
  }
  return data as AppData[];
};

export const getAppsExcludingCategory = async (category: string, limit: number = 100): Promise<AppData[]> => {
  const { data, error } = await supabase
    .from("apps")
    .select(LIGHT_SELECT)
    .neq("category", category)
    .order("createdAt", { ascending: false })
    .limit(limit);

  if (error) {
    console.error(`Error fetching apps excluding category ${category}:`, error);
    return [];
  }
  return data as AppData[];
};

export const getFeaturedApps = async (limit: number = 20): Promise<AppData[]> => {
  const { data, error } = await supabase
    .from("apps")
    .select(LIGHT_SELECT)
    .eq("featured", true)
    .order("updatedAt", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching featured apps:", error);
    return [];
  }
  return data as AppData[];
};

export const getRecentApps = async (limit: number = 9): Promise<AppData[]> => {
  const { data, error } = await supabase
    .from("apps")
    .select(LIGHT_SELECT)
    .order("updatedAt", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching recent apps:", error);
    return [];
  }
  return data as AppData[];
};

export const searchApps = async (query: string, limit: number = 20): Promise<AppData[]> => {
  const { data, error } = await supabase
    .from("apps")
    .select(LIGHT_SELECT)
    .or(`title.ilike.%${query}%,publisher.ilike.%${query}%,category.ilike.%${query}%,description.ilike.%${query}%`)
    .limit(limit);

  if (error) {
    console.error("Error searching apps:", error);
    return [];
  }
  return data as AppData[];
};

export const getSuggestions = async (excludeId: string, limit: number = 4): Promise<AppData[]> => {
  const { data, error } = await supabase
    .from("apps")
    .select(LIGHT_SELECT)
    .neq("id", excludeId)
    .order("updatedAt", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }
  return data as AppData[];
};

export async function createApp(
  app: Omit<AppData, "createdAt" | "updatedAt">
): Promise<AppData> {
  const now = new Date().toISOString();
  const newApp = {
    ...app,
    createdAt: now,
    updatedAt: now,
  };

  const { data, error } = await supabase
    .from("apps")
    .insert([newApp])
    .select()
    .single();

  if (error) {
    console.error("Error creating app:", error);
    throw new Error(`Error creating app: ${error.message}`);
  }

  return data as AppData;
}

export async function updateApp(
  slug: string,
  updates: Partial<Omit<AppData, "id" | "createdAt">>
): Promise<AppData | null> {
  const { data, error } = await supabase
    .from("apps")
    .update({ ...updates, updatedAt: new Date().toISOString() })
    .eq("id", slug)
    .select()
    .single();

  if (error) {
    console.error(`Error updating app ${slug}:`, error);
    return null;
  }

  return data as AppData;
}

export async function deleteApp(slug: string): Promise<boolean> {
  const { error } = await supabase.from("apps").delete().eq("id", slug);

  if (error) {
    console.error(`Error deleting app ${slug}:`, error);
    return false;
  }
  return true;
}
