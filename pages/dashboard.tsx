const flag = "ORION{CVE-2025-29927}";

export default function Dashboard() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold text-blue-600">Admin Dashboard</h1>
      <h2>Here's the flag: {flag}</h2>
    </main>
  );
}
