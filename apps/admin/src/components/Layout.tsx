import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, X } from "lucide-react";
import { Button, ThemeToggle } from "@portfolio/ui";
import { clearToken } from "../store/authSlice";
import { toggleTheme } from "../store/themeSlice";
import type { RootState } from "../store/store";

const navItems = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/experience", label: "Experience" },
  { to: "/education", label: "Education" },
  { to: "/projects", label: "Projects" },
  { to: "/certifications", label: "Certifications" },
  { to: "/config", label: "Config" },
];

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state: RootState) => state.theme.mode);

  const handleLogout = () => {
    dispatch(clearToken());
    navigate("/login");
  };

  const sidebarContent = (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-mono text-sm font-semibold uppercase tracking-wide text-white">
          Portfolio Admin
        </h2>
        <ThemeToggle isDark={theme === "dark"} onToggle={() => dispatch(toggleTheme())} />
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              `rounded px-3 py-2 font-mono text-xs uppercase tracking-wide transition-colors ${
                isActive ? "bg-primary-600 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>


      <Button
        variant="secondary"
        onClick={handleLogout}
        className="w-full border-white/20 bg-transparent text-white hover:bg-white/10"
      >
        Logout
      </Button>
    </>
  );

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="flex items-center justify-between bg-ink-900 p-4 text-white md:hidden">
        <span className="font-mono text-sm uppercase tracking-wide">Portfolio Admin</span>
        <div className="flex items-center gap-2">
          <ThemeToggle isDark={theme === "dark"} onToggle={() => dispatch(toggleTheme())} />
          <button onClick={() => setIsSidebarOpen(true)} aria-label="Open menu">
            <Menu size={20} />
          </button>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-ink-950/60 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          <aside
            onClick={(e) => e.stopPropagation()}
            className="flex h-full w-64 flex-col bg-ink-900 p-4 text-white"
          >
            <div className="mb-2 flex justify-end">
              <button onClick={() => setIsSidebarOpen(false)} aria-label="Close menu">
                <X size={20} />
              </button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}

      <aside className="hidden w-60 shrink-0 flex-col bg-ink-900 p-4 text-white md:flex">
        {sidebarContent}
      </aside>

      <main className="flex-1 overflow-x-hidden bg-canvas-200 p-4 dark:bg-ink-950 md:p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
