import { authVisual } from '../constants/authContent'

export function AuthVisualPanel() {
  const { image, tagline, highlight } = authVisual

  return (
    <aside
      aria-hidden="true"
      className="relative hidden overflow-hidden lg:block"
    >
      <img
        src={image.src}
        alt=""
        width={image.width}
        height={image.height}
        className="absolute inset-0 size-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-linear-to-br from-primary/90 via-primary/75 to-primary/60" />
      <div className="relative flex h-full min-h-[calc(100dvh-5.5rem)] flex-col justify-end p-10 xl:p-14">
        <blockquote className="max-w-lg text-pretty">
          <p className="font-serif text-[clamp(1.75rem,3vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.02em] text-primary-foreground">
            {tagline}
          </p>
          <p className="mt-4 text-base leading-relaxed text-primary-foreground/90">
            {highlight}
          </p>
        </blockquote>
        <p className="mt-8 text-sm font-semibold tracking-wide text-primary-foreground/80 uppercase">
          LMS platform
        </p>
      </div>
    </aside>
  )
}
