import { supabase } from '@/lib/supabaseClient'
import type { UserProfile } from '@/types/user'

export async function fetchUserProfile(address: string) {
  const { data: walletData, error: walletErr } = await supabase
    .from('wallets')
    .select('profile_id')
    .eq('address', address.toLowerCase())
    .maybeSingle()

  if (walletErr) throw walletErr
  if (!walletData) return null

  const { data, error } = await supabase
    .from('profiles')
    .select(
      `id, username, name, email, avatar_url, created_at, wallets ( id, address, chain_id, created_at, profile_id )`
    )
    .eq('id', walletData.profile_id)
    .maybeSingle()

  if (error) throw error
  return data as UserProfile | null
}

export async function createProfile(data: { username: string; email: string; address: string }) {
  const { data: profileData, error: profileErr } = await supabase
    .from('profiles')
    .insert({ username: data.username, email: data.email })
    .select('id')
    .single()

  if (profileErr || !profileData) throw profileErr

  const { error: walletErr } = await supabase
    .from('wallets')
    .insert({ profile_id: profileData.id, address: data.address })

  if (walletErr) throw walletErr
  return profileData
}

export async function updateProfile(profileId: string, data: { username?: string; email?: string }) {
  const { error } = await supabase
    .from('profiles')
    .update(data)
    .eq('id', profileId)

  if (error) throw error
  return { id: profileId, ...data }
}
