// MultiSectionDropdown.tsx
'use client';

import DropdownDesktop from './DropdownDesktop';
import DropdownMobile from './DropdownMobile';
import { DropdownSection } from './types';

export type MultiSectionDropdownProps = {
  label: string;
  sections: DropdownSection[];
  isMobile?: boolean;
  onClickItem?: () => void;
};

export default function MultiSectionDropdown({
  label,
  sections,
  isMobile = false,
  onClickItem,
}: MultiSectionDropdownProps) {
  return isMobile ? (
    <DropdownMobile label={label} sections={sections} onClickItem={onClickItem} />
  ) : (
    <DropdownDesktop label={label} sections={sections} />
  );
}
