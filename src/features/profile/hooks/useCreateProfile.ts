import { useMutation } from '@tanstack/react-query'
import { createProfile } from '../services/profileService'

export function useCreateProfile() {
  return useMutation({
    mutationFn: createProfile,
  })
}
