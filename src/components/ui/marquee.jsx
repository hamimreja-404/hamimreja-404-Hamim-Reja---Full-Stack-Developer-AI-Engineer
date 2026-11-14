import * as React from 'react'
import { cn } from '@/lib/utils'

function Marquee({
  children,
  className,
  duration = 40,
  delay = 0,
  gap = 1,
  pauseOnHover = false,
  repeat = 4,
  reverse = false,
  vertical = false,
  ...rest
}) {
  return (
    <div
      style={{
        '--marquee-duration': `${duration}s`,
        '--marquee-delay': `${delay}s`,
        '--marquee-gap': `${gap}rem`,
      }}
      className={cn(
        'group flex gap-[var(--marquee-gap,1rem)] overflow-hidden p-3',
        {
          'flex-row': !vertical,
          'flex-col': vertical,
        },
        className
      )}
      {...rest}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              'flex shrink-0 justify-around gap-[var(--marquee-gap,1rem)] [animation-delay:var(--marquee-delay)]',
              {
                'animate-marquee-horizontal flex-row': !vertical,
                'animate-marquee-vertical flex-col': vertical,
                'group-hover:[animation-play-state:paused]': pauseOnHover,
                'direction-[reverse]': reverse,
              }
            )}
          >
            {children}
          </div>
        ))}
    </div>
  )
}

export { Marquee }

