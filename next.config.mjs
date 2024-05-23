/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        // port: "",
        // pathname: "/account123/**",
      },
      {
        protocol: "http",
        hostname: "uhdtv.io",
        // port: "",
        // pathname: "/account123/**",
      },
      {
        protocol: "https",
        hostname: "mango.blender.org",
        // port: "",
        // pathname: "/account123/**",
      },
      {
        protocol: "https",
        hostname: "download.blender.org",
        // port: "",
        // pathname: "/account123/**",
      },
    ],
  },
};

export default nextConfig;
