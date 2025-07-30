import { useState } from "react";
import { useRouter } from "next/router";

export default function AuthForm({ type }: { type: "login" | "register" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<null | string>(null);
  const [error, setError] = useState<null | string>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    const res = await fetch(`/api/auth/${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      if (type === "register") {
        setMessage("Registration successful. You can now log in.");
        setEmail("");
        setPassword("");
      } else {
        // Login success – fetch user to determine role
        const userRes = await fetch("/api/auth/me");
        if (userRes.ok) {
          const user = await userRes.json();
          if (user.role === "admin") {
            router.push("/dashboard");
          } else {
            router.push("/");
          }
        } else {
          // fallback redirect
          router.push("/");
        }
      }
    } else {
      const data = await res.json().catch(() => null);
      setError(data?.message || "Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold capitalize">{type}</h1>

      {message && (
        <div className="text-green-600 border border-green-600 p-2 rounded">
          {message}
        </div>
      )}
      {error && (
        <div className="text-red-600 border border-red-600 p-2 rounded">
          {error}
        </div>
      )}

      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 border"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        {type === "login" ? "Log In" : "Register"}
      </button>
    </form>
  );
}
