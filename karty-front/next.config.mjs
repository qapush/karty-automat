import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'upvxroox3cbu7snu.public.blob.vercel-storage.com',
          port: '',
          search: '',
        },
      ],
    },
};
 
export default withNextIntl(nextConfig);