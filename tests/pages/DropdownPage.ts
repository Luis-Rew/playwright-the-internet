import { Page, Locator } from '@playwright/test';

export class DropdownPage {
  readonly page: Page;
  readonly dropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dropdown = page.locator('#dropdown');
  }

  async goto() {
    await this.page.goto('/dropdown');
  }

  async selectOption(label: string) {
    await this.dropdown.selectOption({ label });
  }

  async getSelectedLabel(): Promise<string> {
    return this.dropdown.locator('option:checked').innerText();
  }
}
