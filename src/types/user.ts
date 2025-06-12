export interface Wallet {
  id: string;
  profile_id: string | null;
  address: string;
  chain_id: number | null;
  created_at: string;
}

export interface UserProfile {
  id: string;
  username: string;
  name: string;
  email: string;
  created_at: string;
  avatar_url?: string;
  wallets: Wallet[];
}
