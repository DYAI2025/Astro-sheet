export default function WhyFlashDoc() {
  return (
    <section className="py-24 bg-forest-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-50">Don't Break Your Flow</h2>
            <p className="text-lg text-slate-200/90 mb-8 leading-relaxed">
              Manual copy-pasting and file creation kills momentum. With FlashClip, you capture thoughts, code snippets,
              or research instantly. The intelligent lightning action keeps you in flow - no menus, no context switching.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <h3 className="font-bold text-xl mb-2 text-cyan-300">15+ Formats</h3>
              <p className="text-slate-200/80">Code (PY, JS, TS, SQL…), Docs (DOCX, PDF), Data (JSON, CSV, XML).</p>
            </div>
            <div className="glass-card p-6">
              <h3 className="font-bold text-xl mb-2 text-cyan-300">Local-Only</h3>
              <p className="text-slate-200/80">No cloud uploads. Your data stays on your machine.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
