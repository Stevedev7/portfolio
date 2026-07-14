import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Menu, X, LayoutDashboard, User, Sparkles, Briefcase, GraduationCap, FolderGit2, Award, Settings, LogOut } from "lucide-react";
import { clearToken } from "../store/authSlice";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/about", label: "About", icon: User },
  { to: "/skills", label: "Skills", icon: Sparkles },
  { to: "/experience", label: "Experience", icon: Briefcase },
  { to: "/education", label: "Education", icon: GraduationCap },
  { to: "/projects", label: "Projects", icon: FolderGit2 },
  { to: "/certifications", label: "Certifications", icon: Award },
  { to: "/config", label: "Config", icon: Settings },
];

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearToken());
    navigate("/login");
  };

  const sidebarContent = (
    <>
      <div className="mb-6 flex items-center gap-2 px-2">
        <div className="h-6 w-6 rounded-md bg-primary-600" />
        <span className="text-sm font-semibold text-text">Portfolio</span>
      </div>

      <p className="mb-2 px-2 font-mono text-[10px] uppercase tracking-wide text-text-faint">Content</p>

      <nav className="flex flex-1 flex-col gap-0.5">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] transition-colors ${
                isActive ? "bg-primary-600 text-white" : "text-text-muted hover:bg-surface hover:text-text"
              }`
            }
          >
            <item.icon size={14} />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-3 flex items-center gap-2 rounded-md border border-border bg-surface p-2">
        <div className="h-6 w-6 rounded-full bg-border" />
        <div className="flex-1">
          <p className="text-[11px] text-text">Admin</p>
        </div>
        <button onClick={handleLogout} aria-label="Logout" className="text-text-faint hover:text-primary-400 cursor-pointer">
          <LogOut size={14} />
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen flex-col bg-base md:flex-row">
      <div className="flex items-center justify-between bg-surface-alt p-4 md:hidden">
        <span className="font-mono text-sm uppercase tracking-wide text-text">Portfolio</span>
        <button onClick={() => setIsSidebarOpen(true)} aria-label="Open menu" className="text-text">
          <Menu size={20} />
        </button>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          <aside
            onClick={(e) => e.stopPropagation()}
            className="flex h-full w-64 flex-col bg-surface-alt p-4"
          >
            <div className="mb-2 flex justify-end">
              <button onClick={() => setIsSidebarOpen(false)} aria-label="Close menu" className="text-text-faint">
                <X size={20} />
              </button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}

      <aside className="hidden w-56 shrink-0 flex-col border-r border-border bg-surface-alt p-3.5 md:flex">
        {sidebarContent}
      </aside>

      <main className="flex-1 overflow-x-hidden p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
