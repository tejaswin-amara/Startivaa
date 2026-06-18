"use client";
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import EarthGlobe to avoid SSR heavy load
const EarthGlobe = dynamic(() => import('@/components/EarthGlobe'), { ssr: false });

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background text-white overflow-hidden">
      {/* Faded EarthGlobe background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <EarthGlobe />
      </div>
      <h1 className="z-10 text-6xl font-extrabold mb-4">404 – Page Not Found</h1>
      <p className="z-10 text-lg mb-8 text-center max-w-xl">
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/"
        className="z-10 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-md transition"
      >
        Return Home
      </Link>
    </div>
  );
}
