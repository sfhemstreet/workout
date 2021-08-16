import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { SignInModal } from "../components/SignInModal";

/**
 * Register Page
 * 
 * `/register`
 */
export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/");
  }, []);

  return (
    <SignInModal
      isRegistering
      isShowing
      toggleIsShowing={() => router.push("/")}
    />
  );
}
