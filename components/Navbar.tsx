import Link from "next/link";
import useUser from "@/hooks/useUser";

export default function Navbar() {
  const { user, loading, refetch } = useUser();

  const logout = async () => {
    await fetch("/api/auth/logout");
    refetch(); // Optional if you want to reset user state immediately
    window.location.href = "/";
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center">
      <div className="space-x-4">
        <Link href="/" className="hover:underline">Home</Link>
        {!loading && user ? (
          <>
            {user.role === "admin" && (
              <Link href="/dashboard" className="hover:underline">Dashboard</Link>
            )}
          </>
        ) : (
          <>
            <Link href="/login" className="hover:underline">Login</Link>
            <Link href="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>

      {!loading && user && (
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-300">
            <span className="font-semibold">{user.email}</span> ({user.role})
          </div>
          <button onClick={logout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
