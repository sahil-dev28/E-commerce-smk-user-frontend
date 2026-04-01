import { useAuthStore } from "@/store/authStore";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface RedirectUserProps {
  children: ReactNode;
  isAuth?: boolean;
}

export default function RedirectUser({
  children,
  isAuth = true,
}: RedirectUserProps) {
  const isAuthorized = useAuthStore((state) => state.isAuthorized);

  if (isAuthorized && isAuth) return <Navigate to="/" replace />;

  if (!isAuthorized && !isAuth) return <Navigate to="/auth/register" replace />;

  return children;
}
