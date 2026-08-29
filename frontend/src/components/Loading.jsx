export default function Loading({ text = "Loading..." }) {
  return <div className="grid min-h-[40vh] place-items-center text-slate-500"><div className="flex items-center gap-3"><span className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />{text}</div></div>;
}
