'use client';

import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';
import { parseEther } from 'viem';
import { useAccount, useSendTransaction } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { CryptoType } from './cryptoTypes';

interface Props {
  selectedCrypto: CryptoType;
  amount: string;
  address: string;
  explorerBase: string;
}

export default function SendDonation({
  selectedCrypto,
  amount,
  address,
  explorerBase,
}: Props) {
  const { isConnected } = useAccount();
  const { sendTransaction, data: txHash, isPending, isSuccess, isError } = useSendTransaction();

  const handleSend = () => {
    if (selectedCrypto === 'ETH') {
      sendTransaction({
        to: address as `0x${string}`,
        value: parseEther(amount),
      });
    }
  };

  return (
    <>
      {selectedCrypto === 'ETH' ? (
        isConnected ? (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={isPending}
            className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-600 text-white px-4 py-2 rounded-md transition font-semibold flex items-center justify-center gap-2"
          >
            {isPending ? (
              <>
                <FaSpinner className="animate-spin" /> Sending...
              </>
            ) : (
              `Send ${amount} ETH`
            )}
          </motion.button>
        ) : (
          <ConnectButton />
        )
      ) : (
        <p className="text-xs text-center text-gray-400">
          Send manually to the above {selectedCrypto} address using your wallet.
        </p>
      )}

      {isSuccess && txHash && selectedCrypto === 'ETH' && (
        <p className="text-green-400 text-center text-sm">
          ✅ Donation sent!{' '}
          <a
            href={`${explorerBase}${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            View on Explorer
          </a>
        </p>
      )}

      {isError && selectedCrypto === 'ETH' && (
        <p className="text-red-400 text-center text-sm">❌ Something went wrong. Try again.</p>
      )}
    </>
  );
}
