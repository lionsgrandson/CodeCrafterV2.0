import { handleContact, contactJson, type ContactEnvironment } from '../../../server/contact'
export function onRequestPost({ request, env }: { request: Request; env: ContactEnvironment }) {
  return handleContact(request, env)
}
export function onRequest() { return contactJson({ error: 'Method not allowed.' }, 405) }
