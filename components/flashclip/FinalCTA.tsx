import { CHROME_WEB_STORE_URL } from './constants'
import { LightningBoltIcon } from './LightningBoltIcon'

export default function FinalCTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-forest-600 to-forest-900 text-slate-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Start Saving Locally</h2>
        <p className="text-xl mb-8 opacity-90">Install FlashClip and keep your workflow fast - and private.</p>

        <a href={CHROME_WEB_STORE_URL} className="btn-primary inline-flex px-8 py-4 text-lg">
          <LightningBoltIcon className="text-forest-950" />
          Add to Chrome - It's Free
        </a>

        <p className="mt-6 text-sm opacity-80">No sign-up required • Works offline</p>
      </div>
    </section>
  )
}
