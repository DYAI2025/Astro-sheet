const features = [
  {
    title: 'Lightning Action Button',
    description: 'A smart action appears near your selection - no right-clicks, no menu digging.',
  },
  {
    title: '15+ Formats Supported',
    description: 'TXT, JSON, PY, PDF, DOCX, HTML, JS, TS, MD, SQL, CSV, CSS, Shell, XML, YAML and more.',
  },
  {
    title: 'Keyboard Shortcuts',
    description: 'Save files instantly with custom hotkeys. Never lift your hands from the keyboard.',
  },
  {
    title: 'Privacy by Default',
    description: 'Local saves. No cloud. No accounts. Designed for sensitive workflows.',
  },
]

export default function KeyFeatures() {
  return (
    <section id="features" className="py-24 bg-forest-950">
      <div className="max-w-8xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-50">Key Features</h2>
          <p className="text-lg text-slate-200/80">Fast, local, and built for deep work.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="glass-card p-8">
              <h3 className="text-xl font-bold mb-3 text-cyan-300">{feature.title}</h3>
              <p className="text-slate-200/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
