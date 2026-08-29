import { Link, NavLink } from "react-router-dom";
import { BookOpen, LogOut, PenLine, UserRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const link = ({ isActive }) => `transition ${isActive ? "text-indigo-600 font-semibold" : "text-slate-600 hover:text-indigo-600"}`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-indigo-200">
            <BookOpen size={20} />
          </span>
          <span className="font-display text-2xl font-bold tracking-tight text-slate-950">InkNova</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <NavLink to="/" className={link}>Discover</NavLink>
          <NavLink to="/my-blogs" className={link}>My Stories</NavLink>
          <NavLink to="/create" className={link}>Write</NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/profile" className="hidden items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:border-indigo-300 sm:flex">
            <UserRound size={16} /> {user?.name}
          </Link>
          <button onClick={logout} className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200" title="Log out">
            <LogOut size={17} />
          </button>
        </div>
      </div>
    </header>
  );
}
