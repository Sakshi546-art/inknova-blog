import { useEffect, useState } from "react";
import { ArrowLeft, Image as ImageIcon, Save } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export default function Editor(){
 const {id}=useParams();const editing=Boolean(id);const nav=useNavigate();const [form,setForm]=useState({title:"",category:"Technology",coverImage:"",content:""});const [error,setError]=useState("");const [busy,setBusy]=useState(false);
 useEffect(()=>{if(editing)api.get(`/blogs/${id}`).then(r=>setForm({title:r.data.blog.title,category:r.data.blog.category,coverImage:r.data.blog.coverImage||"",content:r.data.blog.content})).catch(e=>setError(e.response?.data?.message||"Unable to load story."));},[id,editing]);
 const submit=async e=>{e.preventDefault();setError("");setBusy(true);try{if(editing)await api.put(`/blogs/${id}`,form);else await api.post("/blogs",form);nav(editing?`/blogs/${id}`:"/my-blogs");}catch(e){setError(e.response?.data?.message||"Could not save story.");}finally{setBusy(false);}};
 return <div className="mx-auto max-w-4xl px-5 py-14"><Link to={editing?`/blogs/${id}`:"/"} className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-500"><ArrowLeft size={17}/> Back</Link>
 <div className="mb-9"><p className="text-sm font-bold uppercase tracking-[.25em] text-indigo-600">{editing?"Edit story":"New story"}</p><h1 className="mt-2 font-display text-5xl font-bold">{editing?"Refine your story.":"What will you make people think about?"}</h1></div>
 <form onSubmit={submit} className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
  <input required maxLength={140} value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Your story headline..." className="w-full border-b border-slate-200 py-4 font-display text-3xl font-bold outline-none focus:border-indigo-400"/>
  <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-bold text-slate-600">Category<select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal outline-none"><option>Technology</option><option>Design</option><option>Career</option><option>Ideas</option><option>Life</option></select></label>
  <label className="text-sm font-bold text-slate-600">Cover image URL<div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 px-3"><ImageIcon size={17} className="text-slate-400"/><input value={form.coverImage} onChange={e=>setForm({...form,coverImage:e.target.value})} placeholder="https://..." className="w-full p-3 outline-none font-normal"/></div></label></div>
  <textarea required minLength={20} rows={14} value={form.content} onChange={e=>setForm({...form,content:e.target.value})} placeholder="Start writing..." className="w-full resize-y rounded-2xl bg-slate-50 p-5 leading-8 outline-none focus:ring-2 focus:ring-indigo-100"/>
  {error&&<p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p>}
  <button disabled={busy} className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-7 py-4 font-bold text-white hover:bg-indigo-600 disabled:opacity-60"><Save size={18}/>{busy?"Saving...":"Publish story"}</button>
 </form></div>
}
