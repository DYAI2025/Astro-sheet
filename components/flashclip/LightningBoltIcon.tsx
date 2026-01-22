import type { SVGProps } from 'react'

interface LightningBoltIconProps extends SVGProps<SVGSVGElement> {
  title?: string
}

export function LightningBoltIcon({ title = 'Lightning bolt', ...props }: LightningBoltIconProps) {
  return (
    <svg
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : 'presentation'}
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path d="M13 2L3 14h7l-1 8 12-14h-7l-1-6Z" />
    </svg>
  )
}

export default LightningBoltIcon
