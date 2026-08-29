import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, UserRound, Mail, LockKeyhole } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    // Check password match
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Check password length
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setBusy(true);

    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      nav("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed."
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">

      {/* LEFT SIDE */}
      <div className="hidden bg-indigo-600 p-12 text-white lg:flex lg:flex-col lg:justify-center">
        <div className="max-w-lg">
          <p className="mb-5 text-sm font-bold uppercase tracking-[.3em] text-indigo-200">
            Join the community
          </p>

          <h1 className="font-display text-6xl font-bold leading-tight">
            Publish what
            <br />
            matters.
          </h1>

          <p className="mt-6 max-w-md text-lg leading-8 text-indigo-100">
            Create thoughtful stories, discover fresh perspectives
            and build your writer identity.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="grid place-items-center bg-white px-6 py-12">
        <div className="w-full max-w-md">

          <Link
            to="/"
            className="mb-10 inline-flex font-bold text-slate-950"
          >
            ← InkNova
          </Link>

          <h2 className="font-display text-4xl font-bold">
            Create your account.
          </h2>

          <p className="mt-2 text-slate-500">
            Start your publishing journey today.
          </p>

          <form
            onSubmit={submit}
            className="mt-8 space-y-4"
          >

            {/* NAME */}
            <Field
              icon={<UserRound size={18} />}
              type="text"
              placeholder="Full name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />

            {/* EMAIL */}
            <Field
              icon={<Mail size={18} />}
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />

            {/* PASSWORD */}
            <Field
              icon={<LockKeyhole size={18} />}
              type="password"
              placeholder="Password (6+ characters)"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />

            {/* CONFIRM PASSWORD */}
            <Field
              icon={<LockKeyhole size={18} />}
              type="password"
              placeholder="Confirm password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({
                  ...form,
                  confirmPassword: e.target.value,
                })
              }
            />

            {/* ERROR */}
            {error && (
              <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
                {error}
              </p>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={busy}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 py-4 font-bold text-white hover:bg-indigo-600 disabled:opacity-60"
            >
              {busy ? "Creating..." : "Create account"}

              <ArrowRight size={18} />
            </button>
          </form>

          {/* LOGIN LINK */}
          <p className="mt-5 text-center text-sm text-slate-500">
            Already registered?{" "}
            <Link
              className="font-bold text-indigo-600"
              to="/login"
            >
              Log in
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}


// INPUT FIELD COMPONENT
function Field({ icon, ...props }) {
  return (
    <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 focus-within:border-indigo-400 focus-within:bg-white">

      <span className="text-slate-400">
        {icon}
      </span>

      <input
        {...props}
        required
        className="w-full bg-transparent outline-none"
      />

    </label>
  );
}