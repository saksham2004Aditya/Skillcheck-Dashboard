# Next-Gen Learning Dashboard 

A dark-mode student dashboard prototype featuring a responsive Bento Grid layout, smooth spring-physics animations, and live data fetched from Supabase.

 Live Demo: [https://skillcheck-dashboard.vercel.app/]

---

##  Tech Stack
* Framework: Next.js 15 (App Router)
* Database: Supabase PostgreSQL
* Styling: Tailwind CSS
* Animations: Framer Motion
* Icons: Lucide React

---

## 💡 Architecture & Implementation

### Data Fetching & Server Components (RSC)
* [cite_start]**Server-Side Sourcing:** All course data is fetched directly on the server inside `app/page.tsx` using `@supabase/ssr`[cite: 39, 40]. [cite_start]This secures environment variables and eliminates client-side loading waterfalls[cite: 69].
* [cite_start]**Loading Skeletons:** Implemented a custom `loading.tsx` file with a subtle pulsing skeleton UI[cite: 41]. [cite_start]This provides a smooth transition while the Supabase data resolves and ensures zero layout shifts[cite: 24].
* [cite_start]**Auth Fallback:** If no user session is detected by the middleware, the dashboard gracefully fallbacks to a clean "Guest" layout rather than breaking or throwing console errors[cite: 43].

### Performance & Animations (Framer Motion)
* [cite_start]**Staggered Entry:** On initial load, the Bento tiles don't just snap in all at once; they use variants to fade and translate up the Y-axis sequentially[cite: 46, 47].
* [cite_start]**Spring Physics:** Tile hover states elevate the card slightly (~2%) and use the exact required spring dynamics (`type: "spring"`, `stiffness: 300`, `damping: 20`)[cite: 49, 51].
* [cite_start]**Progress Bars:** The custom progress indicator inside each course tile smoothly animates from `0%` to its actual database value upon mounting[cite: 57, 58].

### Dom Standards
* [cite_start]**Semantic HTML:** Completely avoided "div soup" by wrapping components in proper HTML5 tags like `<nav>` for the sidebar, `<main>` for the viewport, and `<section>` or `<article>` for individual tiles[cite: 23].
* [cite_start]**CLS Optimization:** To prevent layout shifts and keep frame rates smooth, animations are strictly bound to hardware-accelerated properties (`transform` and `opacity`)[cite: 5, 24, 25].

---

##  Server / Client Component Split
* [cite_start]**Server Layer:** `page.tsx` securely checks user cookies and queries the Supabase data table directly from the server side[cite: 39, 40].
* [cite_start]**Client Layer:** Raw data arrays are passed down to modular, interactive client sub-trees (`"use client"`) so Framer Motion can capture browser events and handle animations[cite: 45].

---

##  Challenges & Solutions
* [cite_start]**Dynamic Icons:** Supabase logs icon targets as plain strings (e.g., `"BookOpen"`)[cite: 35]. [cite_start]I built a key-value mapper component that matches these database strings straight to their respective Lucide React functional elements with type safety[cite: 56, 72].
* **Cookie Middleware:** Keeping the server and client auth states entirely in sync can be tricky. Writing custom Supabase cookie handling into Next.js `middleware.ts` resolved this, forcing token refreshes in the background on every routing request.

---

##  Local Setup
1. **Install:** `npm install`
2. [cite_start]**Env Configuration:** Copy `.env.example` into a local `.env.local` file and update your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` placeholders[cite: 78].
3. **Run:** `npm run dev`
