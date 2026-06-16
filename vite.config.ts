// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Nitro deploy preset.
  // - Inside the Lovable sandbox/preview build, the wrapper forces the Cloudflare
  //   preset regardless of what we set here, so Lovable preview keeps working.
  // - Outside Lovable (e.g. when this repo is built on Vercel), this `preset: "vercel"`
  //   flows through to Nitro, which emits `.vercel/output/` per the Vercel Build
  //   Output API. That makes Vercel correctly serve SSR routes (no more 404 on
  //   refresh), server functions (Gemini Help Center, Supabase auth-attacher),
  //   and the dynamic /sitemap.xml route.
  nitro: { preset: "vercel" },
});
