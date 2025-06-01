'use client';

import { useUserProfile } from '@/app/hooks/useUserProfile';
import { useAccount } from 'wagmi';
import { useState } from 'react';
import EditProfileForm from './EditProfileForm';
import '../globals.css';
import PageLayout from '@/components/PageLayout';
import { motion, AnimatePresence } from 'framer-motion';

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

                <motion.div
                    className="p-4 border border-white/10 rounded-lg bg-white/5"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <p className="text-lg font-semibold">Username: {profile.username}</p>
                    <p className="text-sm text-gray-400">
                        Joined: {new Date(profile.created_at).toLocaleDateString()}
                    </p>
                </motion.div>

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
                        <motion.button
                            key="edit-button"
                            onClick={() => setEditing(true)}
                            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 transition rounded-md text-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            Editar perfil
                        </motion.button>
                    )}
                </AnimatePresence>
            </motion.div>
        </PageLayout>
    );
}