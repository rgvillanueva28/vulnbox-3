// pages/dashboard.js or app/dashboard/page.js
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [flag, setFlag] = useState("");

  useEffect(() => {
    async function getFlag() {
      const res = await fetch("/api/auth/flag-is-here");
      if (res.ok) {
        const data = await res.json();
        setFlag(data.flag);
      }
    }
    getFlag();
  }, []);

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold text-blue-600">Admin Dashboard</h1>
      <h2>{flag ? flag : "Fetching flag from API 👀"}</h2>
    </main>
  );
}
