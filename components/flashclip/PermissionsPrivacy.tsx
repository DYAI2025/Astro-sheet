export default function PermissionsPrivacy() {
  return (
    <section id="privacy" className="py-24 bg-forest-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-50">Your Data Stays Yours</h2>
          <p className="text-lg text-slate-200/80">Privacy-first by design. Local-first by default.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-cyan-300">Required Permissions</h3>
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h4 className="font-bold mb-2 text-slate-50">Downloads</h4>
                <p className="text-slate-200/80">Saves files directly to your Downloads folder (local only).</p>
              </div>

              <div className="glass-card p-6">
                <h4 className="font-bold mb-2 text-slate-50">Storage</h4>
                <p className="text-slate-200/80">Stores your preferences locally (optional Chrome Sync).</p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-black/40 rounded-lg border border-forest-900">
              <p className="text-sm text-slate-200/80 leading-relaxed">
                <strong>How it works:</strong> FlashClip reads your current selection only when you trigger an action (button
                click, context menu, or shortcut). It never monitors your browsing or scans content in the background.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-cyan-300">Privacy Guarantees</h3>
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h4 className="font-bold mb-2 text-slate-50">No Uploads</h4>
                <p className="text-slate-200/80">No servers. No telemetry required for the core workflow.</p>
              </div>

              <div className="glass-card p-6">
                <h4 className="font-bold mb-2 text-slate-50">Works Offline</h4>
                <p className="text-slate-200/80">Perfect for research environments and sensitive contexts.</p>
              </div>

              <div className="glass-card p-6">
                <h4 className="font-bold mb-2 text-slate-50">Transparent Permissions</h4>
                <p className="text-slate-200/80">Only what's necessary to save your content locally.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
