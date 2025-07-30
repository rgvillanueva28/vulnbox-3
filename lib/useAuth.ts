import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";

export function useAuth() {
  const [user, setUser] = useState<{ id: number; role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
      setLoading(false);
    }
    getUser();
  }, []);

  return { user, loading };
}
