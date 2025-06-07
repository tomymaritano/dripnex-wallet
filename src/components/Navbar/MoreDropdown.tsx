import MultiSectionDropdown from './MultiSectionDropdown';
import { DropdownSection } from './types';

const sections: DropdownSection[] = [
  {
    title: 'Legal',
    items: [
      { href: '/legal/privacy-policy', label: 'Privacy' },
      { href: '/legal/terms-of-use', label: 'Terms' },
      { href: '/legal/cookies', label: 'Cookies' },
    ],
  },
  {
    title: 'Info',
    items: [
      { href: '/about', label: 'About Us' },
      { href: '/faq', label: 'FAQ' },
    ],
  },
];

type MoreDropdownProps = {
  isMobile?: boolean;
  onClickItem?: () => void;
};

/**
 * Wrapper component configuring `MultiSectionDropdown` for the "More" menu.
 *
 * @param props.isMobile Render a mobile version.
 * @param props.onClickItem Optional click handler.
 */
export default function MoreDropdown({ isMobile = false, onClickItem }: MoreDropdownProps) {
  return (
    <MultiSectionDropdown
      label="More"
      sections={sections}
      isMobile={isMobile}
      onClickItem={onClickItem}
    />
  );
}