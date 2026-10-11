export type ContactInput = { name: string; email: string; phone: string; message: string; company: string }
export type ContactField = 'name' | 'email' | 'phone' | 'message'
export function validateContact(input: ContactInput): Partial<Record<ContactField, string>> {
  const errors: Partial<Record<ContactField, string>> = {}
  if (!input.name.trim() || input.name.length > 120) errors.name = 'invalid_name'
  if (!input.email.trim() && !input.phone.trim()) errors.email = 'missing_contact_method'
  if (input.email.trim() && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim()) || input.email.length > 254)) errors.email = 'invalid_email'
  const phone = input.phone.trim()
  if (phone && (!/^\+?[\d\s().-]+$/.test(phone) || phone.replace(/\D/g, '').length < 7 || phone.replace(/\D/g, '').length > 15 || phone.length > 40)) errors.phone = 'invalid_phone'
  if (input.message.length > 5000) errors.message = 'message_too_long'
  return errors
}
