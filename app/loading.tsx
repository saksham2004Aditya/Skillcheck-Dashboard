export default function Loading() {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 lg:flex">
      <aside className="hidden lg:block lg:w-72 border-r border-zinc-800/80 bg-zinc-950/95 p-4">
        <div className="h-12 w-48 rounded-2xl bg-white/5 animate-pulse" />
        <div className="mt-6 space-y-3">
          <div className="h-12 rounded-2xl bg-white/5 animate-pulse" />
          <div className="h-12 rounded-2xl bg-white/5 animate-pulse" />
          <div className="h-12 rounded-2xl bg-white/5 animate-pulse" />
          <div className="h-12 rounded-2xl bg-white/5 animate-pulse" />
        </div>
      </aside>

      <main className="flex-1 px-4 pb-24 pt-6 md:px-6 lg:px-8 lg:pb-8 lg:pt-8">
        <section className="mx-auto flex max-w-7xl flex-col gap-6">
          <div className="h-10 w-56 rounded-full bg-white/5 animate-pulse" />
          <div className="grid auto-rows-[180px] grid-cols-1 gap-6 md:grid-cols-6 lg:auto-rows-[200px] xl:grid-cols-12">
            <div className="md:col-span-6 md:row-span-2 xl:col-span-7 xl:row-span-2 rounded-[2rem] bg-white/5 animate-pulse" />
            <div className="md:col-span-3 xl:col-span-2 rounded-[2rem] bg-white/5 animate-pulse" />
            <div className="md:col-span-3 xl:col-span-3 rounded-[2rem] bg-white/5 animate-pulse" />
            <div className="md:col-span-6 md:row-span-2 xl:col-span-5 xl:row-span-2 rounded-[2rem] bg-white/5 animate-pulse" />
          </div>
        </section>
      </main>
    </div>
  );
}