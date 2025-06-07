'use client';

import { motion } from 'framer-motion';
import { HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

type CTAButtonProps = {
  children: ReactNode;
  href: string;
  newTab?: boolean;
  icon?: ReactNode;
} & HTMLMotionProps<'a'>;

/**
 * Animated call-to-action button with optional icon.
 *
 * @param props.href Destination URL.
 * @param props.newTab Open in new tab when true.
 */
export default function CTAButton({
  children,
  href,
  newTab = true,
  icon,
  ...props
}: CTAButtonProps) {
  return (
    <motion.a
      href={href}
      target={newTab ? '_blank' : '_self'}
      rel={newTab ? 'noopener noreferrer' : undefined}
      className="relative inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white rounded-lg w-full sm:w-auto
         border border-gray-700
        hover:border-indigo-500 hover:shadow-md hover:shadow-indigo-500/10 transition duration-300"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {/* Borde animado sutil */}
      <span className="absolute -inset-px rounded-lg bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 opacity-20 animate-subtle-glow z-0" />

      {/* Contenido del botón */}
      <span className="relative z-10 flex items-center gap-2">
        {icon}
        <span className="truncate">{children}</span>
      </span>
    </motion.a>
  );
}