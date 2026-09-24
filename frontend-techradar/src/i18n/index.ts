import { createI18n } from 'vue-i18n'
import fr from './locales/fr'
import en from './locales/en'

export const SUPPORTED_LOCALES = ['fr', 'en'] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]

const STORAGE_KEY = 'techradar:locale'

function isLocale(value: unknown): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale)
}

/** Choix mémorisé > langue du navigateur > français */
function initialLocale(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (isLocale(saved)) return saved
  } catch {
    // localStorage indisponible (navigation privée stricte…) : on ignore
  }
  const browser = navigator.language.slice(0, 2)
  return isLocale(browser) ? browser : 'fr'
}

export function saveLocale(locale: Locale) {
  try {
    localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    // Pas bloquant : la langue ne sera simplement pas mémorisée
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: initialLocale(),
  fallbackLocale: 'fr',
  messages: { fr, en },
  pluralRules: {
    // "0 article", "1 article", "2 articles" (l'anglais garde la règle par défaut : "0 articles")
    fr: (choice) => (choice > 1 ? 1 : 0),
  },
})
