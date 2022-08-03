/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    API_IMAGEN: process.env.NEXT_PUBLIC_API_IMAGEN,
    NEXT_PUBLIC_API_IMAGEN: process.env.NEXT_PUBLIC_API_IMAGEN,
    API_GOOGLE: process.env.API_GOOGLE
  },
  images: {
    domains: ['localhost'],
    path: 'http://localhost/uni2/api/public/api'
  }
}

module.exports = nextConfig
