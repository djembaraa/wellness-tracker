// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Baris ini secara eksplisit memberi tahu Next.js (Turbopack)
  // bahwa root proyek adalah direktori ini ('.')
  // bukan C:\Users\Axioo
  turbopack: {
    root: '.',
  },
};

export default nextConfig;