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
    <div className="min-h-screen w-full flex flex-col bg-[#f5f7fb] text-slate-900 overflow-x-hidden">
      
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 w-full overflow-x-hidden py-8">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default RootLayout;