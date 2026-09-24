const LOCALE = 'fr'

const relativeFormatter = new Intl.RelativeTimeFormat(LOCALE, { numeric: 'auto' })
const fullFormatter = new Intl.DateTimeFormat(LOCALE, { dateStyle: 'long', timeStyle: 'short' })

// Du plus grand au plus petit : on prend la première unité qui "tient" dans l'écart
const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 365 * 24 * 60 * 60],
  ['month', 30 * 24 * 60 * 60],
  ['week', 7 * 24 * 60 * 60],
  ['day', 24 * 60 * 60],
  ['hour', 60 * 60],
  ['minute', 60],
]

/** "il y a 3 heures", "hier", "à l'instant"… */
export function formatRelativeDate(date: Date, now: Date = new Date()): string {
  const diffSeconds = Math.round((date.getTime() - now.getTime()) / 1000)

  for (const [unit, secondsInUnit] of UNITS) {
    if (Math.abs(diffSeconds) >= secondsInUnit) {
      return relativeFormatter.format(Math.round(diffSeconds / secondsInUnit), unit)
    }
  }
  return 'à l’instant'
}

/** "24 septembre 2026 à 18:35" dans le fuseau du navigateur */
export function formatFullDate(date: Date): string {
  return fullFormatter.format(date)
}
