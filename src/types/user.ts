export interface Wallet {
  id: string;
  profile_id: string;
  address: string;
  chain_id: number | null;
  created_at: string;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  created_at: string;
  avatar_url?: string;
  wallets: Wallet[];
}
