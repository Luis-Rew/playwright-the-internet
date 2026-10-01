import { test, expect } from '@playwright/test';
import { DynamicLoadingPage } from '../pages/DynamicLoadingPage';

test.describe('Carregamento dinâmico de elementos', () => {
  test('exemplo 1: elemento escondido aparece após o carregamento', async ({ page }) => {
    const dynamicPage = new DynamicLoadingPage(page);
    await dynamicPage.gotoHiddenElementExample();

    await dynamicPage.start();

    // O próprio site simula um carregamento de ~5s antes de exibir o
    // elemento. O Playwright espera automaticamente até ele ficar visível —
    // não precisamos de nenhum "sleep" manual, só de um timeout maior que
    // esse atraso conhecido.
    await expect(dynamicPage.finishText).toBeVisible({ timeout: 10_000 });
    await expect(dynamicPage.finishText).toHaveText('Hello World!');
  });

  test('exemplo 2: elemento só é criado no DOM após o carregamento', async ({ page }) => {
    const dynamicPage = new DynamicLoadingPage(page);
    await dynamicPage.gotoRenderedAfterLoadExample();

    await dynamicPage.start();

    await expect(dynamicPage.finishText).toBeVisible({ timeout: 10_000 });
    await expect(dynamicPage.finishText).toHaveText('Hello World!');
  });
});
