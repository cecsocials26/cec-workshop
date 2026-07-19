"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      setError(error.message);
      return;
    }

    router.replace("/");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="email"
          className="text-[11px] uppercase tracking-[0.15em] text-brand-ivory/55"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-sm border border-brand-gold/25 bg-brand-green-dark/60 px-4 py-2.5 text-sm text-brand-ivory placeholder:text-brand-ivory/30 outline-none transition-colors focus:border-brand-gold/60"
          placeholder="you@completeexteriorcare.co.uk"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="password"
          className="text-[11px] uppercase tracking-[0.15em] text-brand-ivory/55"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-sm border border-brand-gold/25 bg-brand-green-dark/60 px-4 py-2.5 text-sm text-brand-ivory placeholder:text-brand-ivory/30 outline-none transition-colors focus:border-brand-gold/60"
          placeholder="••••••••"
        />
      </div>

      {error && (
        <p className="rounded-sm border border-brand-gold/20 bg-brand-green-dark/60 px-4 py-2 text-xs text-brand-gold-soft">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-2 rounded-sm bg-brand-gold px-4 py-2.5 text-sm font-medium uppercase tracking-[0.15em] text-brand-green-dark transition-colors hover:bg-brand-gold-soft disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
