import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './'),
      '@components': path.resolve(__dirname, './components'),
      '@public': path.resolve(__dirname, './public'),
      '@lib': path.resolve(__dirname, './lib'),
      '@app': path.resolve(__dirname, './app'),
      '@services': path.resolve(__dirname, './services'),
      '@hooks': path.resolve(__dirname, './hooks'),
    };
    return config;
  },
};

export default nextConfig;
