import { motion } from 'framer-motion';

type Props = {
  onClick: () => void;
};

export default function EditToggle({ onClick }: Props) {
  return (
    <motion.button
      key="edit-button"
      onClick={onClick}
      className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 transition rounded-md text-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      Editar perfil
    </motion.button>
  );
}