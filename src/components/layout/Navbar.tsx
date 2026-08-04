import { NavLink } from "react-router-dom";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/master-data", label: "Master Data" },
  { to: "/insights", label: "Insights" },
  { to: "/about", label: "About Data" },
];

export function Navbar() {
  return (
    <div className="absolute top-5 left-5 z-30 pointer-events-auto">
      <nav
        aria-label="Main navigation"
        className="bg-white/95 backdrop-blur-md rounded-2xl shadow-floating border border-white/60 h-12 px-4 flex items-center gap-2.5"
      >
        <img src={`${import.meta.env.BASE_URL}logo/bca-logo.svg`} alt="BCA logo" className="h-5 w-auto" />
        <div className="hidden md:block w-px h-5 bg-bca-border" />
        <span className="hidden md:inline text-xs font-semibold text-bca-ink tracking-tight">
          Tourism Intelligence Explorer
        </span>
        <div className="hidden lg:block w-px h-5 bg-bca-border ml-1" />
        <div className="hidden lg:flex items-center gap-1 ml-1" role="navigation">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `text-xs font-semibold px-3 py-1.5 rounded-full transition-colors duration-200 ${
                  isActive ? "bg-bca-primary text-white" : "text-bca-sub hover:text-bca-primary hover:bg-bca-hover"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <nav aria-label="Mobile navigation" className="lg:hidden mt-2 flex gap-1 bg-white/95 backdrop-blur-md rounded-2xl shadow-floating border border-white/60 h-11 px-2 items-center w-fit">
        {LINKS.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === "/"}
            className={({ isActive }) =>
              `text-[11px] font-semibold px-2.5 py-1.5 rounded-full transition-colors duration-200 ${
                isActive ? "bg-bca-primary text-white" : "text-bca-sub"
              }`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
