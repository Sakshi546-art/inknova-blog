import { ArrowUpRight, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

const fallback = [
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80"
];

export default function BlogCard({ blog, index = 0 }) {
  const image = blog.coverImage || fallback[index % fallback.length];
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-100">
      <Link to={`/blogs/${blog._id}`} className="block">
        <div className="relative h-52 overflow-hidden">
          <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-800">{blog.category}</span>
        </div>
        <div className="p-6">
          <div className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-400">
            <CalendarDays size={14} /> {new Date(blog.createdAt).toLocaleDateString()}
          </div>
          <h3 className="font-display text-2xl font-bold leading-tight text-slate-900 group-hover:text-indigo-600">{blog.title}</h3>
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">{blog.content}</p>
          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
            <span className="font-semibold text-slate-700">By {blog.author?.name}</span>
            <span className="flex items-center gap-1 font-bold text-indigo-600">Read <ArrowUpRight size={16} /></span>
          </div>
        </div>
      </Link>
    </article>
  );
}
