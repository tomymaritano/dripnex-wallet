// src/components/ClientLayout.tsx
'use client';
import { ReactNode } from 'react';
import { Web3Wrapper } from './Web3Wrapper';
/**
 * Provides Web3 context for pages that require client-side wallet access.
 *
 * @param children React nodes to render within the providers.
 */

export default function ClientLayout({ children }: { children: ReactNode }) {
  return <Web3Wrapper>{children}</Web3Wrapper>;
}