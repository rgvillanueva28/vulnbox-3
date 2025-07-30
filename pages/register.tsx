import AuthForm from "../components/AuthForm";
import { GetServerSideProps } from "next";
import jwt from "jsonwebtoken";

export default function Register() {
  return <AuthForm type="register" />;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = ctx.req.cookies.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);

      if (typeof decoded === "object" && "role" in decoded) {
        if (decoded.role === "admin") {
          return {
            redirect: {
              destination: "/dashboard",
              permanent: false,
            },
          };
        } else {
          return {
            redirect: {
              destination: "/login",
              permanent: false,
            },
          };
        }
      }
    } catch (err) {
      // Invalid token — allow registration
    }
  }

  return { props: {} };
};
