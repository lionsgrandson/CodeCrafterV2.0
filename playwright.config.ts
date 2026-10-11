import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: './tests/browser', fullyParallel: false, workers: 1, timeout: 30000,
  use: { baseURL: 'http://localhost:4175', reducedMotion: 'reduce', trace: 'retain-on-failure' },
  reporter: [['list'], ['json', { outputFile: 'docs/evidence/browser-results.json' }]],
  webServer: { command: 'node --import tsx scripts/test-server.ts', url: 'http://localhost:4175', reuseExistingServer: false },
})
