import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { viteMockServe } from 'vite-plugin-mock'; // ✅ Add this line

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteMockServe({
      mockPath: 'mock', // 👈 name of the folder where mocks will live
      enable: true,     // 👈 always enable mock server
    }),
  ],
});

