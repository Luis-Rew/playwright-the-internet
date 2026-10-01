import { test, expect } from '@playwright/test';
import { NestedFramesPage } from '../pages/NestedFramesPage';

test('ler o conteúdo de frames aninhados (frameset dentro de frameset)', async ({ page }) => {
  const framesPage = new NestedFramesPage(page);
  await framesPage.goto();

  await expect(framesPage.leftFrameText()).toHaveText('LEFT');
  await expect(framesPage.middleFrameText()).toHaveText('MIDDLE');
  await expect(framesPage.rightFrameText()).toHaveText('RIGHT');
  await expect(framesPage.bottomFrameText()).toHaveText('BOTTOM');
});
