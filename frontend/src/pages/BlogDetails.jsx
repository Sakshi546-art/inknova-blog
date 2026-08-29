import { useEffect, useState } from "react";
import { ArrowLeft, CalendarDays, Trash2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Loading from "../components/Loading";
import { useAuth } from "../context/AuthContext";

export default function BlogDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const { user } = useAuth();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [commentError, setCommentError] = useState("");

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const res = await api.get(`/blogs/${id}`);
        setBlog(res.data.blog);
      } catch (e) {
        setError(
          e.response?.data?.message || "Could not load story."
        );
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [id]);

  const loadComments = async () => {
    try {
      setCommentsLoading(true);

      const res = await api.get(`/comments/${id}`);

      setComments(res.data.comments || []);
    } catch (e) {
      setCommentError(
        e.response?.data?.message || "Could not load comments."
      );
    } finally {
      setCommentsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadComments();
    }
  }, [id]);

  const remove = async () => {
    if (!confirm("Delete this story?")) return;

    try {
      await api.delete(`/blogs/${id}`);
      nav("/my-blogs");
    } catch (e) {
      alert(
        e.response?.data?.message || "Could not delete story."
      );
    }
  };

  const addComment = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) return;

    try {
      setCommentSubmitting(true);
      setCommentError("");

      const res = await api.post(`/comments/${id}`, {
        content: commentText.trim(),
      });

      setComments((prev) => [res.data.comment, ...prev]);
      setCommentText("");
    } catch (e) {
      setCommentError(
        e.response?.data?.message || "Could not add comment."
      );
    } finally {
      setCommentSubmitting(false);
    }
  };

  const removeComment = async (commentId) => {
    if (!confirm("Delete this comment?")) return;

    try {
      await api.delete(`/comments/${commentId}`);

      setComments((prev) =>
        prev.filter((comment) => comment._id !== commentId)
      );
    } catch (e) {
      alert(
        e.response?.data?.message ||
          "Could not delete comment."
      );
    }
  };

  if (loading) {
    return <Loading text="Opening story..." />;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-20 text-red-600">
        {error}
      </div>
    );
  }

  const mine = blog.author?._id === user?.id;

  return (
    <article className="mx-auto max-w-4xl px-5 py-14">
      <Link
        to="/"
        className="mb-10 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600"
      >
        <ArrowLeft size={17} />
        Back to stories
      </Link>

      <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
        {blog.category}
      </span>

      <h1 className="mt-5 font-display text-5xl font-bold leading-tight sm:text-6xl">
        {blog.title}
      </h1>

      <div className="mt-7 flex flex-wrap items-center gap-4 border-b border-slate-200 pb-8 text-sm text-slate-500">
        <span className="font-semibold text-slate-800">
          By {blog.author?.name}
        </span>

        <span>•</span>

        <span className="flex items-center gap-1">
          <CalendarDays size={15} />
          {new Date(blog.createdAt).toLocaleDateString()}
        </span>

        {mine && (
          <div className="ml-auto flex gap-2">
            <Link
              to={`/edit/${blog._id}`}
              className="rounded-xl bg-slate-100 px-4 py-2 font-bold text-slate-700"
            >
              Edit
            </Link>

            <button
              onClick={remove}
              className="rounded-xl bg-red-50 px-4 py-2 font-bold text-red-600"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {blog.coverImage && (
        <img
          src={blog.coverImage}
          className="mt-10 max-h-[480px] w-full rounded-[2rem] object-cover"
          alt=""
        />
      )}

      <div className="prose prose-lg mt-10 max-w-none whitespace-pre-wrap leading-9 text-slate-700">
        {blog.content}
      </div>

      {/* COMMENTS */}
      <section className="mt-16 border-t border-slate-200 pt-10">
        <h2 className="text-2xl font-bold text-slate-900">
          Comments
        </h2>

        {/* Add Comment */}
        <form onSubmit={addComment} className="mt-6">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            rows={4}
            className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

          <div className="mt-3 flex items-center justify-between">
            {commentError ? (
              <p className="text-sm text-red-600">
                {commentError}
              </p>
            ) : (
              <span />
            )}

            <button
              type="submit"
              disabled={
                commentSubmitting || !commentText.trim()
              }
              className="rounded-xl bg-indigo-600 px-5 py-2.5 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {commentSubmitting
                ? "Posting..."
                : "Post Comment"}
            </button>
          </div>
        </form>

        {/* Comments List */}
        <div className="mt-10 space-y-5">
          {commentsLoading ? (
            <p className="text-sm text-slate-500">
              Loading comments...
            </p>
          ) : comments.length === 0 ? (
            <p className="text-sm text-slate-500">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            comments.map((comment) => {
              const isMine =
                comment.author?._id === user?.id;

              return (
                <div
                  key={comment._id}
                  className="rounded-2xl border border-slate-200 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-bold text-slate-900">
                        {comment.author?.name || "Anonymous"}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {new Date(
                          comment.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    {isMine && (
                      <button
                        onClick={() =>
                          removeComment(comment._id)
                        }
                        className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                        title="Delete comment"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>

                  <p className="mt-4 whitespace-pre-wrap text-slate-700">
                    {comment.content}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </section>
    </article>
  );
}