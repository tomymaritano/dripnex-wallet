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

/**
 * Responsive dropdown that switches between desktop and mobile implementations.
 *
 * @param props.label Menu label.
 * @param props.sections Sections to render.
 * @param props.isMobile Render mobile version if true.
 * @param props.onClickItem Optional item click handler.
 */
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
