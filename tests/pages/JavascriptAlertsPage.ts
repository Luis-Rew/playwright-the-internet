import { Page, Locator } from '@playwright/test';

export class JavascriptAlertsPage {
  readonly page: Page;
  readonly jsAlertButton: Locator;
  readonly jsConfirmButton: Locator;
  readonly jsPromptButton: Locator;
  readonly result: Locator;

  constructor(page: Page) {
    this.page = page;
    this.jsAlertButton = page.locator('button', { hasText: 'Click for JS Alert' });
    this.jsConfirmButton = page.locator('button', { hasText: 'Click for JS Confirm' });
    this.jsPromptButton = page.locator('button', { hasText: 'Click for JS Prompt' });
    this.result = page.locator('#result');
  }

  async goto() {
    await this.page.goto('/javascript_alerts');
  }

  /**
   * Os três botões desta página disparam um diálogo nativo do navegador
   * (alert/confirm/prompt). Esses diálogos não fazem parte do DOM, então o
   * Playwright exige que o listener de "dialog" seja registrado ANTES do
   * clique que o dispara — depois é tarde demais para capturá-lo.
   */
  async triggerAlertAndAccept() {
    this.page.once('dialog', (dialog) => dialog.accept());
    await this.jsAlertButton.click();
  }

  async triggerConfirmAndAccept() {
    this.page.once('dialog', (dialog) => dialog.accept());
    await this.jsConfirmButton.click();
  }

  async triggerConfirmAndDismiss() {
    this.page.once('dialog', (dialog) => dialog.dismiss());
    await this.jsConfirmButton.click();
  }

  async triggerPromptAndAcceptWithText(text: string) {
    this.page.once('dialog', (dialog) => dialog.accept(text));
    await this.jsPromptButton.click();
  }
}
