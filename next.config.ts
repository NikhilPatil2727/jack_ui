import type { NextConfig } from "next";
import { createMDX } from 'fumadocs-mdx/next';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
};

const withMDX = createMDX();

const nextConfig: NextConfig = {
    pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
    outputFileTracingIncludes: {
        "/**": ["components/jackui/**/*"],
    },
     async headers() {
        return [
            {
                source: "/r/:path*",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "public, max-age=31536000, immutable",
                    },
                ],
            },
        ];
    },
  /* config options here */
  reactCompiler: true,
   images: {
        remotePatterns: [
            {
                hostname: "*",
            },
        ],
    },
   

    
};

export default withMDX(nextConfig);
