import { spawn } from 'node:child_process'
const child = spawn(process.execPath, ['--import', 'tsx', 'server.ts'], {
  stdio: 'inherit', env: { ...process.env, NODE_ENV: 'production', PORT: '4175', RESEND_API_KEY: '', RESEND_FROM_EMAIL: '' },
})
for (const signal of ['SIGTERM', 'SIGINT'] as const) process.on(signal, () => { child.kill(); process.exit() })
child.on('exit', code => process.exit(code || 0))
