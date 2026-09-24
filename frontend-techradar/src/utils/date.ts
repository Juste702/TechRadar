// Les formateurs Intl sont coûteux à créer : un par langue, réutilisé ensuite
const relativeFormatters = new Map<string, Intl.RelativeTimeFormat>()
const fullFormatters = new Map<string, Intl.DateTimeFormat>()

function relativeFormatter(locale: string) {
  let formatter = relativeFormatters.get(locale)
  if (!formatter) {
    formatter = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })
    relativeFormatters.set(locale, formatter)
  }
  return formatter
}

function fullFormatter(locale: string) {
  let formatter = fullFormatters.get(locale)
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeStyle: 'short' })
    fullFormatters.set(locale, formatter)
  }
  return formatter
}

// Du plus grand au plus petit : on prend la première unité qui "tient" dans l'écart
const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 365 * 24 * 60 * 60],
  ['month', 30 * 24 * 60 * 60],
  ['week', 7 * 24 * 60 * 60],
  ['day', 24 * 60 * 60],
  ['hour', 60 * 60],
  ['minute', 60],
]

/** "il y a 3 heures", "hier", "maintenant" / "3 hours ago", "yesterday", "now"… */
export function formatRelativeDate(date: Date, locale: string, now: Date = new Date()): string {
  const diffSeconds = Math.round((date.getTime() - now.getTime()) / 1000)

  for (const [unit, secondsInUnit] of UNITS) {
    if (Math.abs(diffSeconds) >= secondsInUnit) {
      return relativeFormatter(locale).format(Math.round(diffSeconds / secondsInUnit), unit)
    }
  }
  // Moins d'une minute : Intl donne "maintenant" / "now" grâce à numeric: 'auto'
  return relativeFormatter(locale).format(0, 'second')
}

/** "24 septembre 2026 à 18:35" / "September 24, 2026 at 6:35 PM", dans le fuseau du navigateur */
export function formatFullDate(date: Date, locale: string): string {
  return fullFormatter(locale).format(date)
}

/** "anglais" / "English" à partir d'un code langue ("en") */
export function languageName(code: string, locale: string): string {
  try {
    return new Intl.DisplayNames(locale, { type: 'language' }).of(code) ?? code
  } catch {
    return code
  }
}
