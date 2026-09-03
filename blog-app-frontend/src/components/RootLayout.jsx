import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";
import { useEffect, useRef } from "react";
import { useAuth } from "../store/authStore";

function RootLayout() {
  const checkAuth = useAuth((state) => state.checkAuth);
  const authChecked = useRef(false);

  useEffect(() => {
    if (authChecked.current) return;

    authChecked.current = true;
    checkAuth();
  }, [checkAuth]);

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#070b14] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden relative">
      {/* Background ambient lighting effects */}
      <div className="pointer-events-none fixed top-0 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-cyan-600/10 blur-[140px]" />
      <div className="pointer-events-none fixed bottom-1/3 right-1/4 -z-10 h-[600px] w-[600px] rounded-full bg-indigo-600/10 blur-[160px]" />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 w-full overflow-x-hidden">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default RootLayout;