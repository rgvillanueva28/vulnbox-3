// pages/unauthorized.tsx
import Link from "next/link";

export default function Unauthorized({ query }: any) {
  const reason = query?.reason || "Unauthorized access";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-2xl font-bold text-red-600">🚫 Access Denied</h1>
      <p>{reason}</p>
      <div className="mt-4 space-x-4">
        <Link href="/" className="text-blue-500 underline">Home</Link>
        <Link href="/login" className="text-blue-500 underline">Login</Link>
        <Link href="/register" className="text-blue-500 underline">Register</Link>
      </div>
    </div>
  );
}

// Support for query string messages
Unauthorized.getInitialProps = ({ query }: any) => {
  return { query };
};
