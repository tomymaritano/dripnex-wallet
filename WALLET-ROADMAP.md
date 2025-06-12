# 🗺️ WALLET ROADMAP - Functional & UX Enhancements

---

## ✅ Implementado

- TokenGroup con precios USD (via `useTokenPricesBatch`)
- CurrencyDropdown persistente (`useCurrencyStore`)
- Tests básicos para TransferPanel, WalletInfoCard, BridgePanel
- Toggle tema claro/oscuro + Navbar responsive

---

## ❌ Faltante / parcial

### Multiwallet Profile Management

- `useUserProfile` filtra wallets solo por address conectada → **debe devolver todas las wallets del profile**
- Necesito global store `activeWallet` para seleccionar con qué wallet estoy operando

### Historial Multichain

- `fetchTransactions` consulta solo Etherscan/Ethereum
- Quiero que sea **multichain** (Ethereum, Polygon, Arbitrum, Optimism, BSC)
- Parametrizar `chainId` y usar los explorers adecuados

### Token Bridge

- `BridgePanel` existe pero no se muestra en `Dashboard`
- Exponer con tab, botón o sección visible

### Verificación de Ownership

- Al agregar wallets (`WalletList`, `CreateProfileForm`), hoy se inserta directamente
- Quiero que el usuario **firme un mensaje** antes de insertar

### TransferPanel

- Validación de address básica → mejorar:
  - Soporte **ENS**
  - Validación checksum (wagmi)
- Mostrar estimación detallada de **gas/fees**

### WalletInfoCard

- Mostrar **balance en fiat** en la moneda seleccionada en `CurrencyDropdown`

### TransactionList

- Agregar:
  - Filtros: por token, incoming/outgoing, rango de fecha
  - Paginación completa (infinite scroll o “load more” real)

### State Management

- No hay store global → implementar:
  - `userProfileStore` (profile + wallets)
  - `activeWalletStore`
  - `tokenPricesStore` (o React Query cache)

### Supabase & Security

- Hoy se usa `anon key` para todo → no está seguro
- Revisar RLS en `schema.sql`
- En frontend: usar auth con sesión/token en Supabase hooks y API calls

---

## ✨ Nuevas oportunidades

- Exponer `CurrencyDropdown` dentro del Dashboard (no solo en Navbar)
- Calcular **balance total en fiat** y mostrar en `WalletInfoCard`
- Implementar cache (React Query o SWR):
  - Para CoinGecko (token prices)
  - Para Supabase calls
- Añadir estados de loading/error consistentes en todos los componentes
- Soporte ENS + checksum en TransferPanel

---

## ⚠️ Problemas estructurales

- No hay store global para profile ni balances → agregar
- Loading / error handling disperso → unificar con un patrón
- Supabase: aplicar RLS real y usar autenticación (no anon key)
- Tests y linting no configurados → `npm test` y `npm run lint` fallan → instalar `Vitest` + `ESLint`

---

## 🚀 Acciones prioritarias (Próximo sprint)

1️⃣ Implementar firma al agregar wallets (WalletList + CreateProfileForm)  
2️⃣ Añadir historial multichain parametrizable  
3️⃣ Integrar BridgePanel en Dashboard  
4️⃣ Mejorar TransferPanel (ENS + gas feedback)  
5️⃣ Mostrar balance total en fiat en WalletInfoCard  
6️⃣ Añadir filtros + paginación a TransactionList  
7️⃣ Centralizar estado global de usuario y precios  
8️⃣ Revisar y activar RLS real en Supabase con auth

---

## Quick Wins

- Habilitar BridgePanel (sección simple o tab)
- Añadir toasts al agregar/eliminar wallets
- Mostrar valor fiat en WalletInfoCard

---

## Stack

- Next.js (App Router)
- Wagmi + Viem
- Zustand
- Supabase
- Tailwind CSS
- React Query o SWR (permitido agregar)
- Framer Motion (opcional)

---

## Instrucciones para Codex / equipo

👉 Revisar qué partes están faltando  
👉 Implementar siguiendo este roadmap  
👉 Mantener estructura visual y componentes existentes  
👉 Escribir código listo para integrar fácilmente  
👉 Documentar en qué archivos se hacen los cambios

---

# 🚀 Go build the best Web3 Wallet UX 🚀