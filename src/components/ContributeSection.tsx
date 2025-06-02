import {
  FaGithub,
  FaBug,
  FaComments,
  FaCodeBranch,
  FaPencilAlt,
  FaStar,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import CTAButton from './ui/CTAButton';
import Card3D from './ui/Card3D';

const waysToContribute = [
  {
    icon: FaStar,
    title: 'Give us a star',
    description: 'Help us gain visibility on GitHub.',
    link: 'https://github.com/tomymaritano/dripnex-wallet',
  },
  {
    icon: FaBug,
    title: 'Report a bug',
    description: 'Spotted an issue? Open an issue and let us know.',
    link: 'https://github.com/tomymaritano/dripnex-wallet/issues',
  },
  {
    icon: FaComments,
    title: 'Join the community',
    description: 'Chat with contributors, share feedback, ask questions.',
    link: 'https://discord.gg/your-invite-link',
  },
  {
    icon: FaCodeBranch,
    title: 'Submit a pull request',
    description: 'Fix a bug, improve the code, or add a new feature.',
    link: 'https://github.com/tomymaritano/dripnex-wallet/pulls',
  },
  {
    icon: FaPencilAlt,
    title: 'Improve the docs',
    description: 'Clear documentation helps everyone.',
    link: 'https://github.com/tomymaritano/dripnex-wallet/wiki',
  },
];

export default function HowToContributeSection() {
  return (
    <section className="py-24 px-6 max-w-6xl mx-auto text-white text-center">
      <motion.h2
        className="text-4xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
      >
        How to Contribute
      </motion.h2>


      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-20">
        {waysToContribute.map(({ icon: Icon, title, description, link }, index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1, type: 'spring', bounce: 0.2 }}
            viewport={{ once: true }}
          >
            <Card3D>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-black/30 border border-white/10 rounded-2xl p-6 backdrop-blur-md transition-all duration-300 hover:bg-white/5 hover:shadow-xl flex flex-col items-center text-center gap-3 min-h-[230px] justify-center"
              >
                <Icon size={32} className="text-indigo-400 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-gray-400">{description}</p>
              </a>
            </Card3D>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
      >
        <CTAButton
          href="https://github.com/tomymaritano/dripnex-wallet"
          icon={<FaGithub className="text-indigo-400" />}
        >
          Become a Contributor
        </CTAButton>
      </motion.div>
    </section>
  );
}