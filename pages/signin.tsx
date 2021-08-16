import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { SignInModal } from "../components/SignInModal";

export default function SignInPage() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/");
  }, []);

  return <SignInModal isShowing toggleIsShowing={() => router.push("/")} />;
}
