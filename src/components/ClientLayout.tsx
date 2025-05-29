// src/components/ClientLayout.tsx
'use client';
import { ReactNode } from 'react';
import Web3Wrapper from './Web3Wrapper';

export default function ClientLayout({ children }: { children: ReactNode }) {
  return <Web3Wrapper>{children}</Web3Wrapper>;
}