import { CacheEntry } from "../types/cacheTypes";

const inMemoryCache = new Map<string, CacheEntry>();

const generateCacheKey = (key: string, params?: Record<string, unknown>) =>
  `${key}-${JSON.stringify(params ?? {})}`;

export const getCachedData = <T>(
  key: string,
  ttl: number,
  params?: Record<string, unknown>
): T | null => {
  const cacheKey = generateCacheKey(key, params);
  const now = Date.now();

  const memoryEntry = inMemoryCache.get(cacheKey);
  if (memoryEntry && now - memoryEntry.timestamp < ttl) {
    return memoryEntry.data as T;
  }

  const storageRaw = localStorage.getItem(cacheKey);
  if (storageRaw) {
    try {
      const storageEntry: CacheEntry = JSON.parse(storageRaw);
      if (now - storageEntry.timestamp < ttl) {
        inMemoryCache.set(cacheKey, storageEntry);
        return storageEntry.data as T;
      } else {
        localStorage.removeItem(cacheKey);
      }
    } catch {
      localStorage.removeItem(cacheKey);
    }
  }

  return null;
};

export const setCachedData = <T>(
  key: string,
  params: Record<string, unknown> | undefined,
  data: T
) => {
  const cacheKey = generateCacheKey(key, params);
  const entry: CacheEntry<T> = { data, timestamp: Date.now() };

  inMemoryCache.set(cacheKey, entry);
  localStorage.setItem(cacheKey, JSON.stringify(entry));
};
