'use client';
import { FaEdit, FaRegCopy } from 'react-icons/fa';

type Props = {
  address: string;
  chainId?: number;
  balance?: string;
  profile: { username: string; created_at: string } | null;
  loading: boolean;
  onEditClick: () => void;
};

export default function ProfileCard({
  address,
  chainId,
  balance,
  profile,
  loading,
  onEditClick,
}: Props) {
  const iconClass = 'w-4 h-4 text-gray-400 hover:text-white transition';

  if (loading) return <p className="text-gray-400">Loading profile...</p>;
  if (!profile) return <p className="text-sm text-red-500">No profile found.</p>;

  return (
    <>
      <div className="mb-6 p-4 rounded-lg border border-white/10 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-300 flex items-center justify-center text-black font-bold text-lg">
          {profile.username?.charAt(0).toUpperCase() || 'A'}
        </div>
        <div className="flex-1">
          <p className="text-lg font-semibold text-white">{profile.username || 'Anonymous'}</p>
          <p className="text-xs text-gray-400">
            Joined on {new Date(profile.created_at).toLocaleDateString()}
          </p>
        </div>
        <button
          onClick={onEditClick}
          className="p-2 rounded-md hover:bg-white/10 transition"
          title="Edit Profile"
        >
          <FaEdit className={iconClass} />
        </button>
      </div>

      <div className="space-y-4 text-sm text-gray-300 mt-6">
        <div>
          <span className="block text-xs uppercase text-gray-500 mb-1">Address</span>
          <div className="flex items-center gap-2">
            <span className="break-all">{address}</span>
            <button
              onClick={() => navigator.clipboard.writeText(address)}
              className="hover:text-white"
              title="Copy Address"
            >
              <FaRegCopy className={iconClass} />
            </button>
          </div>
        </div>

        <div>
          <span className="block text-xs uppercase text-gray-500 mb-1">Chain ID</span>
          {chainId ?? 'N/A'}
        </div>

        <div>
          <span className="block text-xs uppercase text-gray-500 mb-1">Balance</span>
          {balance ?? 'Loading...'}
        </div>
      </div>
    </>
  );
}