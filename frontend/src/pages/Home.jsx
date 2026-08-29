import { useEffect, useMemo, useState } from "react";
import { ArrowRight, PenLine, Search, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import Loading from "../components/Loading";
import api from "../services/api";

export default function Home() {
  const [blogs,setBlogs]=useState([]),[loading,setLoading]=useState(true),[search,setSearch]=useState("");
  useEffect(()=>{api.get("/blogs").then(r=>setBlogs(r.data.blogs)).finally(()=>setLoading(false));},[]);
  const filtered=useMemo(()=>blogs.filter(b=>`${b.title} ${b.content} ${b.category} ${b.author?.name}`.toLowerCase().includes(search.toLowerCase())),[blogs,search]);
  if(loading)return <Loading text="Curating your feed..." />;
  return <div>
    <section className="overflow-hidden bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.1fr_.9fr] lg:py-28">
        <div><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-indigo-200"><Sparkles size={15}/> The modern home for ideas</div>
          <h1 className="font-display text-6xl font-bold leading-[.98] tracking-tight sm:text-7xl">Stories that<br/><span className="text-indigo-400">move ideas.</span></h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">A focused publishing space for curious minds. Read deeply, write boldly, and share perspectives that deserve attention.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link to="/create" className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 font-bold text-slate-950 hover:bg-indigo-100">Write a story <PenLine size={17}/></Link><a href="#discover" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-6 py-3.5 font-bold text-white hover:bg-white/10">Explore stories <ArrowRight size={17}/></a></div>
        </div>
        <div className="relative"><div className="absolute -inset-8 rounded-full bg-indigo-500/20 blur-3xl"/><div className="relative rounded-[2.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur"><div className="rounded-[2rem] bg-gradient-to-br from-indigo-500 to-violet-700 p-8"><TrendingUp size={38}/><p className="mt-16 text-sm font-semibold text-indigo-100">TODAY'S EDIT</p><h2 className="mt-2 font-display text-4xl font-bold">Make room for better questions.</h2><p className="mt-4 text-indigo-100">Good writing doesn't just answer. It changes what we ask next.</p></div></div></div>
      </div>
    </section>
    <section id="discover" className="mx-auto max-w-7xl px-5 py-16">
      <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-sm font-bold uppercase tracking-[.25em] text-indigo-600">Discover</p><h2 className="mt-2 font-display text-4xl font-bold">Fresh from the community</h2></div>
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"><Search size={18} className="text-slate-400"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search stories..." className="w-48 outline-none"/></div></div>
      {filtered.length?<div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">{filtered.map((b,i)=><BlogCard key={b._id} blog={b} index={i}/>)}</div>:<div className="rounded-3xl border border-dashed border-slate-300 p-14 text-center text-slate-500">No stories found yet. Be the first to publish one.</div>}
    </section>
  </div>;
}
