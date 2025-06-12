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

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_crud_owner" ON profiles
  FOR ALL USING (id = auth.uid()) WITH CHECK (id = auth.uid());

CREATE POLICY "wallets_crud_owner" ON wallets
  FOR ALL USING (profile_id = auth.uid()) WITH CHECK (profile_id = auth.uid());
