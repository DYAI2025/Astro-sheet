const shortcuts = [
  { action: 'Smart Save (auto-detects format)', keys: ['Ctrl', 'Shift', 'S'], mac: ['⌘', 'Shift', 'S'] },
  { action: 'Save as TXT', keys: ['Ctrl', 'Shift', 'T'], mac: ['⌘', 'Shift', 'T'] },
  { action: 'Save as Markdown', keys: ['Ctrl', 'Shift', 'M'], mac: ['⌘', 'Shift', 'M'] },
  { action: 'Save as PDF', keys: ['Ctrl', 'Shift', 'P'], mac: ['⌘', 'Shift', 'P'] },
]

export default function Shortcuts() {
  return (
    <section id="shortcuts" className="py-24 bg-black">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-50">Master the Shortcuts</h2>
          <p className="text-lg text-slate-200/80">Stay on the keyboard. Save without friction.</p>
        </div>

        <div className="glass-card overflow-hidden">
          <div className="divide-y divide-forest-900">
            {shortcuts.map((shortcut) => (
              <div key={shortcut.action} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-slate-50">{shortcut.action}</p>
                  <p className="text-sm text-slate-200/70">Mac: {shortcut.mac.join(' + ')}</p>
                </div>
                <div className="flex items-center gap-2">
                  {shortcut.keys.map((key) => (
                    <kbd
                      key={key}
                      className="px-3 py-1.5 bg-cyan-400/10 border border-cyan-400/30 rounded text-sm font-mono text-cyan-200"
                    >
                      {key}
                    </kbd>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
