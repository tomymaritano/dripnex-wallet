'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-black text-white px-6">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg text-gray-400 mb-6">Ups... esta página no existe.</p>
      <Link
        href="/"
        className="text-teal-400 hover:underline border border-teal-500 px-4 py-2 rounded"
      >
        ← Volver al inicio
      </Link>
    </main>
  );
}