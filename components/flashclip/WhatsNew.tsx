export default function WhatsNew() {
  return (
    <section id="whats-new" className="py-24 bg-black">
      <div className="max-w-8xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-50">What's New</h2>
          <p className="text-lg text-slate-200/80">More formats, better control, smoother experience</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="glass-card p-8">
            <div className="inline-block bg-cyan-400/15 text-cyan-200 text-xs font-bold px-3 py-1 rounded-full mb-4 border border-cyan-400/30">
              NEW
            </div>
            <h3 className="text-xl font-bold mb-4 text-slate-50">Smarter Format Detection</h3>
            <p className="text-slate-200/80">Better heuristics for code and structured data.</p>
          </div>

          <div className="glass-card p-8">
            <div className="inline-block bg-gold-400/15 text-gold-200 text-xs font-bold px-3 py-1 rounded-full mb-4 border border-gold-400/30">
              IMPROVED
            </div>
            <h3 className="text-xl font-bold mb-4 text-slate-50">Keyboard-first Workflow</h3>
            <p className="text-slate-200/80">Faster saves with fewer interrupts.</p>
          </div>

          <div className="glass-card p-8">
            <div className="inline-block bg-tangerine-400/15 text-tangerine-200 text-xs font-bold px-3 py-1 rounded-full mb-4 border border-tangerine-400/30">
              FIXED
            </div>
            <h3 className="text-xl font-bold mb-4 text-slate-50">Format Suggestions</h3>
            <p className="text-slate-200/80">More accurate suggestions for predictable exports.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
