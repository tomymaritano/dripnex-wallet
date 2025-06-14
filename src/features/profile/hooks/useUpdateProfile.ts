import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProfile } from '../services/profileService'

export function useUpdateProfile(profileId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: { username?: string; email?: string }) =>
      updateProfile(profileId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', profileId] })
    },
  })
}
