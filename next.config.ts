import type { NextConfig } from "next";
import { createMDX } from 'fumadocs-mdx/next';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
};

const withMDX = createMDX();

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

export default withMDX(nextConfig);
