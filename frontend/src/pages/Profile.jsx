import { CalendarDays, Mail, UserRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Profile(){
 const {user}=useAuth();
 return <div className="mx-auto max-w-4xl px-5 py-16"><div className="overflow-hidden rounded-[2.5rem] bg-slate-950 p-8 text-white sm:p-12"><div className="grid h-24 w-24 place-items-center rounded-3xl bg-indigo-500 text-4xl font-bold">{user.name.charAt(0).toUpperCase()}</div><p className="mt-8 text-sm font-bold uppercase tracking-[.25em] text-indigo-300">Writer profile</p><h1 className="mt-2 font-display text-5xl font-bold">{user.name}</h1><p className="mt-4 max-w-xl text-slate-300">{user.bio}</p></div>
 <div className="mt-6 grid gap-4 sm:grid-cols-2"><div className="rounded-3xl border border-slate-200 bg-white p-6"><Mail className="text-indigo-600"/><p className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-400">Email</p><p className="mt-1 font-semibold">{user.email}</p></div><div className="rounded-3xl border border-slate-200 bg-white p-6"><CalendarDays className="text-indigo-600"/><p className="mt-5 text-xs font-bold uppercase tracking-wider text-slate-400">Member since</p><p className="mt-1 font-semibold">{new Date(user.createdAt).toLocaleDateString()}</p></div></div></div>
}
