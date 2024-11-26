import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // ...
  publicRuntimeConfig: {
    // ...
  },
  // routes: [
  //   {
  //     path: "/arquivos",
  //     page: "/arquivos",
  //   },
  // ],
  // ...
  async rewrites() {
    return [
      {
        source: "/compartilhar/:slug",
        destination: "/compartilhar/:slug",
      },
    ];
  },
};

export default nextConfig;
