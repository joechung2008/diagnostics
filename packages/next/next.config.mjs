import withDevToolsJSON from "next-plugin-devtools-json";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default withDevToolsJSON(nextConfig);
