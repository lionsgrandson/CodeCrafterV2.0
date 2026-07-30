type PagesContext = {
  env: {
    RESEND_API_KEY?: string
    RESEND_FROM_EMAIL?: string
  }
}

export function onRequestGet({ env }: PagesContext) {
  return Response.json(
    {
      ok: true,
      providerConfigured: Boolean(
        env.RESEND_API_KEY && env.RESEND_FROM_EMAIL,
      ),
    },
    {
      headers: {
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
      },
    },
  )
}

export function onRequest() {
  return Response.json(
    { error: 'Method not allowed.' },
    {
      status: 405,
      headers: { 'Cache-Control': 'no-store' },
    },
  )
}
