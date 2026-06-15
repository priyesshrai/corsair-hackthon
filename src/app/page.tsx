"use client";

import AuthModal, { AuthMode } from "@/components/authmodal";
import Features from "@/components/features";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import { useState } from "react";

export default function Home() {
  const [modal, setModal] = useState<{ open: boolean; mode: AuthMode }>({
    open: false,
    mode: "login",
  });

  const openModal = (mode: AuthMode) => setModal({ open: true, mode });
  const closeModal = () => setModal((m) => ({ ...m, open: false }));

  return (
    <main className="min-h-screen bg-canvas">
      <Navbar onSignIn={() => openModal("login")} onGetStarted={() => openModal("signup")} />
      <Hero onGetStarted={() => openModal("signup")} />
      <Features />
      <Footer />
      <AuthModal
        open={modal.open}
        mode={modal.mode}
        onClose={closeModal}
        onModeChange={(mode) => setModal({ open: true, mode })}
      />
    </main>
  );
}