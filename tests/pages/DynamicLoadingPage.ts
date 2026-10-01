import { Page, Locator } from '@playwright/test';

export class DynamicLoadingPage {
  readonly page: Page;
  readonly startButton: Locator;
  readonly loading: Locator;
  readonly finishText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.startButton = page.locator('#start button');
    this.loading = page.locator('#loading');
    this.finishText = page.locator('#finish h4');
  }

  /**
   * Exemplo 1: o elemento final já existe no DOM, só fica escondido
   * (display: none) até o carregamento terminar.
   */
  async gotoHiddenElementExample() {
    await this.page.goto('/dynamic_loading/1');
  }

  /**
   * Exemplo 2: o elemento final não existe no DOM até o carregamento
   * terminar — só então ele é renderizado.
   */
  async gotoRenderedAfterLoadExample() {
    await this.page.goto('/dynamic_loading/2');
  }

  async start() {
    await this.startButton.click();
  }
}
