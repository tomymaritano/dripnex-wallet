import { FaXTwitter, FaGithub, FaTelegram, FaLinkedin } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black/30 backdrop-blur-md text-gray-400 text-sm">
      <div className="max-w-6xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Branding */}
        <div>
          <h3 className="text-white font-bold text-lg tracking-tight">Dripnex</h3>
          <p className="text-gray-500 mt-2 text-sm">
            Minimal Web3 tools for modern wallets.
          </p>
          <p className="text-gray-600 mt-4 text-xs">
            © 2025 Dripnex — Built with 🧠 and ☕
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wide">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:text-indigo-400 transition">About</a></li>
            <li><a href="/faq" className="hover:text-indigo-400 transition">FAQ</a></li>
            <li><a href="/privacy" className="hover:text-indigo-400 transition">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-indigo-400 transition">Terms of Use</a></li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wide">Connect</h4>
          <div className="flex justify-center md:justify-start gap-4 mt-2">
            <a href="https://x.com/dripnex" target="_blank" rel="noopener" className="hover:text-indigo-400 transition">
              <FaXTwitter size={20} />
            </a>
            <a href="https://github.com/dripnex" target="_blank" rel="noopener" className="hover:text-indigo-400 transition">
              <FaGithub size={20} />
            </a>
            <a href="https://t.me/dripnex" target="_blank" rel="noopener" className="hover:text-indigo-400 transition">
              <FaTelegram size={20} />
            </a>
            <a href="https://linkedin.com/company/dripnex" target="_blank" rel="noopener" className="hover:text-indigo-400 transition">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}