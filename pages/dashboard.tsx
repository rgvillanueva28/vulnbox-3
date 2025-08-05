// pages/dashboard.tsx
import { GetServerSideProps } from "next";
import { jwtVerify } from "jose";

type Props = {
  user: { name: string };
  flag: string;
};

export default function Dashboard({ user, flag }: Props) {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold text-blue-600">Admin Dashboard</h1>
      <h2>Here's the flag: {flag}</h2>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: "/unauthorized?reason=Please+login",
        permanent: false,
      },
    };
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    if (payload.role !== "admin") {
      return {
        redirect: {
          destination: "/unauthorized?reason=Not+authorized",
          permanent: false,
        },
      };
    }

    return {
      props: {
        user: { name: payload.name },
        flag: "ORION{CVE-2025-29927-N3XT_JS_M1DDL3W4R3}",
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/unauthorized?reason=Invalid+token",
        permanent: false,
      },
    };
  }
};
