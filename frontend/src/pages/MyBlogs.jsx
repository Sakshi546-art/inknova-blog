import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PenLine, Plus } from "lucide-react";
import api from "../services/api";
import BlogCard from "../components/BlogCard";
import Loading from "../components/Loading";
import { useAuth } from "../context/AuthContext";

export default function MyBlogs(){
 const {user}=useAuth();const [blogs,setBlogs]=useState([]);const [loading,setLoading]=useState(true);
 useEffect(()=>{api.get("/blogs").then(r=>setBlogs(r.data.blogs.filter(b=>b.author?._id===user.id))).finally(()=>setLoading(false));},[user.id]);
 if(loading)return <Loading/>;
 return <div className="mx-auto max-w-7xl px-5 py-14"><div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-sm font-bold uppercase tracking-[.25em] text-indigo-600">Your workspace</p><h1 className="mt-2 font-display text-5xl font-bold">My stories</h1></div><Link to="/create" className="inline-flex items-center gap-2 self-start rounded-2xl bg-slate-950 px-5 py-3 font-bold text-white hover:bg-indigo-600"><Plus size={18}/> New story</Link></div>
 {blogs.length?<div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">{blogs.map((b,i)=><BlogCard key={b._id} blog={b} index={i}/>)}</div>:<div className="rounded-[2rem] border border-dashed border-slate-300 p-16 text-center"><PenLine className="mx-auto text-indigo-500" size={35}/><h2 className="mt-4 font-display text-3xl font-bold">Your first story is waiting.</h2><p className="mt-2 text-slate-500">Turn an idea into something people can remember.</p><Link to="/create" className="mt-6 inline-block rounded-2xl bg-indigo-600 px-6 py-3 font-bold text-white">Start writing</Link></div>}
 </div>
}
