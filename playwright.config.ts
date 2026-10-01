import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/specs',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }], ['list']],

  use: {
    baseURL: 'https://the-internet.herokuapp.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    // Sem gravação de vídeo de propósito: ela depende do binário ffmpeg, que
    // não vem junto com o Chrome do sistema (só com o Chromium baixado pelo
    // Playwright). O screenshot de falha já é suficiente para diagnóstico.
  },

  projects: [
    {
      name: 'chromium',
      // Usa o Google Chrome instalado na máquina em vez do Chromium que o
      // Playwright baixaria por conta própria. Tanto em máquinas locais quanto
      // em runners do GitHub Actions o Chrome já costuma estar disponível,
      // então evitamos um download extra (e uma fonte a menos de instabilidade).
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],
});
