import { Link } from '@tanstack/react-router'
import {
  heroPrimaryCta,
  heroSecondaryCta,
} from '../constants/heroContent'
import {
  heroPrimaryLinkClassName,
  heroSecondaryLinkClassName,
} from '../constants/heroStyles'

export function HeroActions() {
  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
      <Link to={heroPrimaryCta.to} className={heroPrimaryLinkClassName}>
        {heroPrimaryCta.label}
      </Link>
      <Link to={heroSecondaryCta.to} className={heroSecondaryLinkClassName}>
        {heroSecondaryCta.label}
      </Link>
    </div>
  )
}
