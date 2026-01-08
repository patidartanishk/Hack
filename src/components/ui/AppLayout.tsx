import { ReactNode } from "react";
import { Navbar } from "./Navbar";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-neutral-900 dark:text-white">
      <Navbar />
      <main className="pt-16 px-4 max-w-6xl mx-auto">
        {children}
      </main>
    </div>
  );
}
