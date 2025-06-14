import { useQuery } from '@tanstack/react-query'
import { fetchUserProfile } from '../services/profileService'

export function useUserProfile(address?: string) {
  return useQuery({
    queryKey: ['profile', address],
    queryFn: () => (address ? fetchUserProfile(address) : Promise.resolve(null)),
    enabled: !!address,
  })
}
