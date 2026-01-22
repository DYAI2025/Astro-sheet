import VisualFallback from './VisualFallback'
import TechParticles from './TechParticles'
import { LightningBoltIcon } from './LightningBoltIcon'
import { CHROME_WEB_STORE_URL } from './constants'

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden bg-black">
      <div className="absolute inset-0 grid-overlay opacity-25" />

      <VisualFallback
        fallback={<div className="absolute inset-0 bg-gradient-to-br from-forest-950 via-black to-forest-900 opacity-90" />}
      >
        <TechParticles />
      </VisualFallback>

      <div className="relative max-w-8xl mx-auto px-6 pt-28 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 z-10">
          <p className="inline-flex items-center gap-2 text-sm text-slate-200 bg-forest-950/40 border border-forest-900 rounded-full px-4 py-2 mb-6">
            <LightningBoltIcon className="text-gold-400" />
            Local-first productivity for developers & researchers
          </p>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            <span className="font-brand text-gold-400">Stay in Flow.</span>
            <br />
            <span className="text-cyan-300">Save Instantly.</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-200/90 mb-8 max-w-2xl">
            FlashClip captures selected text, code snippets, and citations in
            <span className="text-cyan-300 font-semibold"> 15+ formats</span> - saved locally, no uploads.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <a href={CHROME_WEB_STORE_URL} className="btn-primary">
              <LightningBoltIcon className="text-forest-950" />
              Add to Chrome
            </a>
            <a href="#privacy" className="btn-secondary">
              Privacy by design
            </a>
          </div>

          <p className="text-sm text-slate-300/80">
            No account required • Works offline • Built for privacy-sensitive workflows
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="relative rounded-lg overflow-hidden shadow-soft border border-gold-400/20 bg-gradient-to-br from-forest-900 via-black to-forest-800 p-8">
            <div className="text-sm uppercase tracking-[0.3em] text-gold-200 mb-4">Lightning Action Preview</div>
            <p className="text-3xl font-semibold text-slate-100 leading-tight mb-6">
              Select text, tap the floating action button, and export to Markdown, PDF, DOCX, JSON, and more.
            </p>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-forest-900/60 border border-forest-800">
                  <LightningBoltIcon className="text-gold-400" />
                </span>
                Auto-detects format before saving
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-cyan-500/10 border border-cyan-400/30 text-cyan-200 font-semibold">
                  15+
                </span>
                Export options for devs, researchers, and writers
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
