import { ThemeProvider } from "@/components/ui/theme-provider";
import { Navbar } from "../navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { useState } from "react";

const MainLayout = () => {
  const [search, setSearch] = useState("");

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex flex-1 flex-col">
        <div className="sticky top-0 z-50">
          <Navbar onSearch={setSearch} />
        </div>

        <main className="flex-1">
          <Outlet context={{ search }} />
        </main>

        <Toaster position="top-right" richColors />
      </div>
    </ThemeProvider>
  );
};

export default MainLayout;
