import { test, expect } from '@playwright/test';
import { FileUploadPage } from '../pages/FileUploadPage';

test('fazer upload de um arquivo mostra o nome dele na página', async ({ page }) => {
  const uploadPage = new FileUploadPage(page);
  await uploadPage.goto();

  await uploadPage.uploadFile('sample.txt');

  await expect(uploadPage.uploadedFilesText).toHaveText('sample.txt');
});
