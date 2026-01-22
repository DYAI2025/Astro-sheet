export default function Footer() {
  return (
    <footer className="bg-black text-slate-300 border-t border-forest-900">
      <div className="max-w-8xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-gold-400 font-brand text-2xl mb-4">FlashClip</h3>
            <p className="text-sm text-slate-300/80">Local-only saving for Chrome. No uploads.</p>
          </div>

          <div>
            <h4 className="text-slate-50 font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#features" className="hover:text-gold-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#shortcuts" className="hover:text-gold-400 transition-colors">
                  Shortcuts
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-gold-400 transition-colors">
                  Privacy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-50 font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#privacy" className="hover:text-gold-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-gold-400 transition-colors">
                  Imprint
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-50/90 font-semibold mb-4">Contact</h4>
            <a href="mailto:info.machinetool.site" className="text-sm hover:text-gold-400 transition-colors">
              info.machinetool.site
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-forest-900 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-slate-400 mb-4 md:mb-0">© 2024 FlashClip. All rights reserved.</p>
          <span className="text-slate-500">Privacy-first • Local-first</span>
        </div>
      </div>
    </footer>
  )
}
