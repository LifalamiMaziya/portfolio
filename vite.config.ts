
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react({
      // Enable React Fast Refresh for better development experience
      fastRefresh: true,
    }),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable these for production optimizations
    minify: 'terser',
    cssMinify: true,
    rollupOptions: {
      output: {
        // Code splitting to improve initial load time
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@radix-ui/react-tooltip', 'lucide-react'],
        },
      },
    },
    // Enable source map for easier debugging
    sourcemap: mode === 'development',
  },
}));
