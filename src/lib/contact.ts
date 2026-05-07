export const contact = {
  email: 'moshe@mosheschwartzberg.com',
  phoneDisplay: '+972 58 707 6077',
  phoneE164: '+972587076077',
  whatsappNumber: '972587076077',
};

export function getWhatsAppUrl(message = 'Hi Moshe, I would like to talk about a project.') {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
