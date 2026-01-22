const personas = [
  { icon: '🔬', label: 'Researchers', description: 'Save quotes and citations instantly.' },
  { icon: '💻', label: 'Developers', description: 'Capture code snippets as Markdown.' },
  { icon: '🧠', label: 'Scientists', description: 'Store notes locally for reproducible work.' },
  { icon: '✍️', label: 'Writers', description: 'Export drafts and notes to your editor.' },
  { icon: '🔒', label: 'Privacy-focused users', description: 'No cloud uploads.' },
]

export default function PerfectFor() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-50">Perfect For</h2>
          <p className="text-lg text-slate-200/80">Built for productivity and privacy.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {personas.map((persona) => (
            <div key={persona.label} className="glass-card p-6 text-center">
              <div className="text-4xl mb-3" aria-hidden="true">{persona.icon}</div>
              <h3 className="font-bold text-lg mb-2 text-slate-50">{persona.label}</h3>
              <p className="text-sm text-slate-200/80">{persona.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
