/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL,
    API_IMAGEN: 'http://localhost/uni2/api/',
    NEXT_PUBLIC_API_IMAGEN: 'http://localhost/uni2/api/',
    API_GOOGLE: process.env.API_GOOGLE
  },
  images: {
    domains: ['localhost'],
    path: 'http://localhost/uni2/api/public/api'
  }
}

module.exports = nextConfig
