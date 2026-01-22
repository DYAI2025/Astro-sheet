import { useState } from 'react'
import { CHROME_WEB_STORE_URL } from './constants'
import BrandLogo from './BrandLogo'
import { LightningBoltIcon } from './LightningBoltIcon'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md border-b border-forest-900">
      <div className="max-w-8xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <BrandLogo />

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-200 hover:text-gold-400 transition-colors">
              Features
            </a>
            <a href="#shortcuts" className="text-slate-200 hover:text-gold-400 transition-colors">
              Shortcuts
            </a>
            <a href="#privacy" className="text-slate-200 hover:text-gold-400 transition-colors">
              Privacy
            </a>
            <a href="#faq" className="text-slate-200 hover:text-gold-400 transition-colors">
              FAQ
            </a>

            <a href={CHROME_WEB_STORE_URL} className="btn-primary px-5 py-2.5">
              <LightningBoltIcon className="text-forest-950" />
              Add to Chrome
            </a>
          </div>

          <button
            className="md:hidden text-slate-100 hover:text-gold-400 transition-colors"
            onClick={() => setMobileMenuOpen((value) => !value)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-forest-900 pt-4 space-y-4">
            <a
              href="#features"
              className="block text-slate-200 hover:text-gold-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#shortcuts"
              className="block text-slate-200 hover:text-gold-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shortcuts
            </a>
            <a
              href="#privacy"
              className="block text-slate-200 hover:text-gold-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Privacy
            </a>
            <a
              href="#faq"
              className="block text-slate-200 hover:text-gold-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </a>

            <a
              href={CHROME_WEB_STORE_URL}
              className="btn-primary w-full px-5 py-3"
              onClick={() => setMobileMenuOpen(false)}
            >
              <LightningBoltIcon className="text-forest-950" />
              Add to Chrome
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
