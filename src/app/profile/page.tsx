'use client';

import { useUserProfile } from '@/features/profile/hooks/useUserProfile';
import { useAccount } from 'wagmi';
import { useState } from 'react';
import EditProfileForm from './EditProfileForm';
import PageLayout from '@/components/PageLayout';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileHeader from './ProfileHeader';
import EditToggle from './EditToggle';
import '../globals.css'; // Ensure global styles are imported

export default function UserProfilePage() {
  const { address, isConnected } = useAccount();
  const { profile, loading, refetch } = useUserProfile(address);
  const [editing, setEditing] = useState(false);

  if (!isConnected || !address)
    return <p className="text-white text-center mt-10">Conectá tu wallet para ver el perfil.</p>;

  if (loading)
    return <p className="text-white text-center mt-10">Cargando perfil...</p>;

  if (!profile)
    return <p className="text-red-500 text-center mt-10">No se encontró ningún perfil.</p>;

  return (
    <PageLayout>
      <motion.div
        className="max-w-2xl mx-auto py-10 px-4 text-white space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold">User Profile</h1>

        <ProfileHeader username={profile.username} createdAt={profile.created_at} />

        <AnimatePresence mode="wait">
          {editing ? (
            <motion.div
              key="edit"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <EditProfileForm
                profile={profile}
                onCancel={() => setEditing(false)}
                onSuccess={() => {
                  setEditing(false);
                  refetch();
                }}
              />
            </motion.div>
          ) : (
            <EditToggle onClick={() => setEditing(true)} />
          )}
        </AnimatePresence>
      </motion.div>
    </PageLayout>
  );
}