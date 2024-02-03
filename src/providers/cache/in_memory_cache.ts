import { ICache } from "./icache";

export class InMemoryCache implements ICache {
    private cache = new Map<string, any>();
  
    async get<T>(key: string): Promise<T | null> {
      const data = this.cache.get(key);
      if(data) {
        return data as T;
      }
      return null;
    }
  
    async set<T>(key: string, value: T, ttl?: number): Promise<void> {
      this.cache.set(key, value);
      // Implement TTL logic
    }
  
    async delete(key: string): Promise<void> {
      this.cache.delete(key);
    }
  }
  