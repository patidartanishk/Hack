import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { 
  Home, 
  Search, 
  Route, 
  Coins, 
  User, 
  Settings, 
  Menu,
  X,
  GraduationCap
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { path: "/dashboard", label: "Home", icon: Home },
  { path: "/explore", label: "Explore", icon: Search },
  { path: "/pathway", label: "AI Pathway", icon: Route },
  { path: "/tokens", label: "Tokens", icon: Coins },
  { path: "/profile", label: "Profile", icon: User },
  { path: "/settings", label: "Settings", icon: Settings },
];

export function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-neutral-900 border-b">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-md bg-black dark:bg-white flex items-center justify-center">
              <GraduationCap className="text-white dark:text-black" size={18} />
            </div>
            <span className="font-bold text-lg">Pathly</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4">
            {navItems.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition ${
                    isActive
                      ? "bg-gray-200 dark:bg-neutral-800 font-semibold"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Mobile Button */}
            <button
              className="md:hidden p-2 border rounded-md"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t py-3 flex flex-col gap-2">
            {navItems.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-md text-sm ${
                    isActive
                      ? "bg-gray-200 dark:bg-neutral-800 font-semibold"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  <Icon size={18} />
                  {label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
