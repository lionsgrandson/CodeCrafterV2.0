import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resend } from 'resend';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';
const app = express();
const preferredPort = Number(process.env.PORT || 5173);

app.use(express.json({ limit: '32kb' }));

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

function clean(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

app.post('/api/contact', async (req, res) => {
  const body = req.body as ContactPayload;
  const name = clean(body.name);
  const email = clean(body.email);
  const phone = clean(body.phone);
  const message = clean(body.message);

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide your name, email, and message.' });
  }

  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
    return res.status(500).json({ error: 'Email delivery is not configured.' });
  }

  const to = process.env.CONTACT_NOTIFICATION_EMAIL || 'moshe@mosheschwartzberg.com';
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to,
      replyTo: email,
      subject: `New CodeCrafter inquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || 'Not provided'}`,
        '',
        message,
      ].join('\n'),
      html: `
        <h2>New CodeCrafter inquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || 'Not provided')}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
    });

    return res.json({ ok: true });
  } catch (error) {
    console.error('Failed to send contact email', error);
    return res.status(500).json({ error: 'Could not send your message right now.' });
  }
});

if (isProduction) {
  const amitStarDistPath = path.join(__dirname, 'dist', 'amitStarProject');

  app.get('/amitStarProject', (_req, res) => {
    res.redirect(301, '/amitStarProject/');
  });
  app.use('/amitStarProject', express.static(amitStarDistPath));
  app.get('/amitStarProject/*', (_req, res) => {
    res.sendFile(path.join(amitStarDistPath, 'index.html'));
  });

  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'dist', '404.html'));
  });
} else {
  const { createServer } = await import('vite');
  const hmrPort = Number(process.env.HMR_PORT || 24679);
  const vite = await createServer({
    server: {
      middlewareMode: true,
      hmr: process.env.DISABLE_HMR === 'true' ? false : { port: hmrPort },
    },
    appType: 'spa',
  });
  app.use(vite.middlewares);
}

function listen(port: number) {
  const server = app.listen(port, () => {
    console.log(`CodeCrafter running at http://localhost:${port}`);
  });

  server.on('error', (error: NodeJS.ErrnoException) => {
    if (error.code === 'EADDRINUSE' && !process.env.PORT && !isProduction) {
      console.warn(`Port ${port} is already in use. Trying ${port + 1}...`);
      listen(port + 1);
      return;
    }

    throw error;
  });
}

listen(preferredPort);
