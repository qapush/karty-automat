import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      unoptimized: true,
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'upvxroox3cbu7snu.public.blob.vercel-storage.com',
          port: '',
          search: '',
        },
      ],
        minimumCacheTTL: 2678400 // 31 days,
    },
};
 
export default withNextIntl(nextConfig);