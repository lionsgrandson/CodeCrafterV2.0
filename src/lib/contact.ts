export const contact = {
  email: 'moshe@mosheschwartzberg.com',
  phoneDisplay: '+972 58 707 6077',
  phoneE164: '+972587076077',
  whatsappNumber: '972587076077',
};

type ContactLanguage = 'he' | 'en';

const whatsappMessages: Record<ContactLanguage, string> = {
  he: 'היי משה, אשמח להתייעץ איתך לגבי פרויקט.',
  en: 'Hi Moshe, I would like to talk about a project.',
};

export function getWhatsAppUrl(
  lang: ContactLanguage = 'he',
  message = whatsappMessages[lang],
) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
