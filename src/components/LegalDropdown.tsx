'use client';

import DropdownMenu from './DropdownMenu';

const legalLinks = [
  { href: '/legal/privacy-policy', label: 'Privacy' },
  { href: '/legal/terms-of-use', label: 'Terms' },
  { href: '/legal/cookies', label: 'Cookies' },
];

export default function LegalDropdown({ isMobile = false }: { isMobile?: boolean }) {
  return <DropdownMenu label="Legal" items={legalLinks} isMobile={isMobile} />;
}