import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-[#f7f8fc] text-slate-900">
      <Navbar />
      <main><Outlet /></main>
      <footer className="mt-20 border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-5 py-8 text-sm text-slate-400 sm:flex-row">
          <span>© {new Date().getFullYear()} InkNova</span>
          <span>Stories that move ideas.</span>
        </div>
      </footer>
    </div>
  );
}
