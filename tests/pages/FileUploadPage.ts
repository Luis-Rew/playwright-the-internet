import { Page, Locator } from '@playwright/test';
import path from 'path';

export class FileUploadPage {
  readonly page: Page;
  readonly fileInput: Locator;
  readonly uploadButton: Locator;
  readonly uploadedFilesText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fileInput = page.locator('#file-upload');
    this.uploadButton = page.locator('#file-submit');
    this.uploadedFilesText = page.locator('#uploaded-files');
  }

  async goto() {
    await this.page.goto('/upload');
  }

  async uploadFile(fileName: string) {
    const filePath = path.join(__dirname, '..', 'fixtures', fileName);
    await this.fileInput.setInputFiles(filePath);
    await this.uploadButton.click();
  }
}
