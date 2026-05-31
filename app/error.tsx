"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#09090b] px-6 text-zinc-100">
      <div className="max-w-lg rounded-[2rem] border border-zinc-800/80 bg-white/[0.03] p-8 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-cyan-300/80">
          Something went wrong
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-zinc-50">
          We could not load the dashboard
        </h1>
        <p className="mt-3 text-sm leading-6 text-zinc-400">
          {error.message || "Please try again after checking your Supabase connection."}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-medium text-zinc-950 transition-transform hover:scale-[1.02]"
        >
          Try again
        </button>
      </div>
    </div>
  );
}