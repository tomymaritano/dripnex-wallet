CREATE TABLE profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text NOT NULL,
  email text NOT NULL,
  created_at timestamptz DEFAULT now(),
  avatar_url text
);

CREATE TABLE wallets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  address text UNIQUE NOT NULL,
  chain_id integer,
  created_at timestamptz DEFAULT now()
);
