import { CHROME_WEB_STORE_URL } from './constants'
import { LightningBoltIcon } from './LightningBoltIcon'

export default function FloatingButton() {
  return (
    <a
      href={CHROME_WEB_STORE_URL}
      className="fixed bottom-6 right-6 z-50 btn-primary px-4 py-3"
      aria-label="Install FlashClip from the Chrome Web Store"
    >
      <LightningBoltIcon className="text-forest-950" />
      <span className="hidden sm:inline">Add to Chrome</span>
      <span className="sm:hidden">Install</span>
    </a>
  )
}
