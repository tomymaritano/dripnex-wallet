# Navbar Module

This folder contains all components related to the global navigation bar.

## Components

- `Navbar.tsx`: The main navigation bar used across the app.
- `MoreDropdown.tsx`: Handles dropdown sections like "Legal", "Info", etc.
- `MultiSectionDropdown.tsx`: Generic dropdown supporting multiple columns and mobile behavior.
- `WalletButton.tsx`: Connect wallet button integrated into the nav.
- `types.ts`: Type declarations used across dropdowns.

## Features

- Responsive navbar with mobile menu.
- Theme toggle (light/dark).
- Wallet connect integration.
- Multi-column dropdown in desktop, animated accordion in mobile.

## Usage

Import the main component:

```tsx
import Navbar from '@/components/Navbar/Navbar';