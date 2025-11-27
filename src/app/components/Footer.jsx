export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          <div>
            <h3 className="text-xl font-bold text-white mb-3">Roomly</h3>
            <p className="text-sm text-gray-400">
              Plateforme intelligente pour trouver des logements facilement et rapidement.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white">Accueil</a></li>
              <li><a href="/logements" className="hover:text-white">Tous les logements</a></li>
              <li><a href="/ai-reco" className="hover:text-white">Recommandation IA</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">À propos</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="hover:text-white">Qui sommes-nous ?</a></li>
              <li><a href="/faq" className="hover:text-white">FAQ</a></li>
              <li><a href="/conditions" className="hover:text-white">Conditions d’utilisation</a></li>
              <li><a href="/privacy" className="hover:text-white">Confidentialité</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Suivez-nous</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Instagram</a></li>
              <li><a href="#" className="hover:text-white">Facebook</a></li>
              <li><a href="#" className="hover:text-white">TikTok</a></li>
              <li><a href="#" className="hover:text-white">LinkedIn</a></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Roomly — Tous droits réservés.
        </div>

      </div>
    </footer>
  );
}
