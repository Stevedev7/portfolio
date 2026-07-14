import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/cv", label: "CV" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

const Header = () => {
  return (
    <header className="flex items-center justify-between border-b border-ink-800 px-8 py-5">
      <span className="text-sm font-medium text-ink-50">Steve Pinto</span>
      <nav className="flex gap-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="font-mono text-xs uppercase tracking-wide text-ink-400 hover:text-ink-50"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
