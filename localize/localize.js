import de from './languages/de.js';
import en from './languages/en.js';

const languages = {
  de,
  en,
};

function resolveLanguage(hass) {
  const raw = hass?.selectedLanguage || hass?.language || localStorage.getItem('selectedLanguage') || navigator.language || 'en';
  const normalized = String(raw).toLowerCase().replace('-', '_');

  if (normalized.startsWith('de')) return 'de';
  if (normalized.startsWith('en')) return 'en';
  return 'en';
}

function resolveTranslation(path, dictionary) {
  const value = path.split('.').reduce((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return acc[key];
    }
    return undefined;
  }, dictionary);

  return typeof value === 'string' ? value : undefined;
}

export function localize(hass, string, search = '', replace = '') {
  const lang = resolveLanguage(hass);
  let translated = resolveTranslation(string, languages[lang] || languages.en);

  if (translated === undefined) translated = resolveTranslation(string, languages.en);
  if (translated === undefined) translated = string;

  if (search !== '' && replace !== '') {
    translated = translated.replace(search, replace);
  }

  return translated;
}