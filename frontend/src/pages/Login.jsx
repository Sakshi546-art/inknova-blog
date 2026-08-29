import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, LockKeyhole, Mail } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault(); setError(""); setBusy(true);
    try { await login(form); nav("/"); } catch (err) { setError(err.response?.data?.message || "Login failed."); }
    finally { setBusy(false); }
  };

  return <AuthShell title="Welcome back." subtitle="Your next great idea starts here.">
    <form onSubmit={submit} className="space-y-5">
      <Field icon={<Mail size={18}/>} type="email" placeholder="Email address" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
      <Field icon={<LockKeyhole size={18}/>} type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>
      {error && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}
      <button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 py-4 font-bold text-white transition hover:bg-indigo-600 disabled:opacity-60">{busy ? "Signing in..." : "Log in"} <ArrowRight size={18}/></button>
      <p className="text-center text-sm text-slate-500">New here? <Link className="font-bold text-indigo-600" to="/register">Create an account</Link></p>
    </form>
  </AuthShell>;
}

function Field({ icon, ...props }) {
  return <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 focus-within:border-indigo-400 focus-within:bg-white"><span className="text-slate-400">{icon}</span><input {...props} required className="w-full bg-transparent outline-none" /></label>;
}
function AuthShell({ title, subtitle, children }) {
  return <div className="grid min-h-screen lg:grid-cols-2">
    <div className="hidden bg-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
      <Link to="/" className="flex items-center gap-3 text-xl font-bold"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-slate-950"><BookOpen size={19}/></span>InkNova</Link>
      <div><p className="mb-5 text-sm font-bold uppercase tracking-[.3em] text-indigo-300">Write. Connect. Inspire.</p><h1 className="font-display text-6xl font-bold leading-tight">Ideas deserve<br/><span className="text-indigo-400">a place to shine.</span></h1></div>
      <p className="text-sm text-slate-400">A full-stack publishing experience built with React, Node, Express & MongoDB.</p>
    </div>
    <div className="grid place-items-center bg-white px-6 py-12"><div className="w-full max-w-md"><div className="mb-9"><h2 className="font-display text-4xl font-bold">{title}</h2><p className="mt-2 text-slate-500">{subtitle}</p></div>{children}</div></div>
  </div>;
}
