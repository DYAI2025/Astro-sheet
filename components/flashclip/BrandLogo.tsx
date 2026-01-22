import { LightningBoltIcon } from './LightningBoltIcon'

export default function BrandLogo() {
  return (
    <a href="#top" className="group inline-flex items-center gap-2 focus:outline-none" aria-label="FlashClip home">
      <span
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-forest-900/60 border border-forest-800 shadow-soft"
        aria-hidden="true"
      >
        <LightningBoltIcon className="text-gold-400" />
      </span>

      <span className="text-2xl font-brand text-gold-400 leading-none">
        <span className="relative">
          FlashClip
          <span
            className="pointer-events-none absolute inset-0 rounded-[10px] opacity-0 transition-opacity duration-150 group-hover:opacity-100"
            style={{ boxShadow: 'inset 0 0 0 2px #FFD700' }}
          />
        </span>
      </span>
    </a>
  )
}
