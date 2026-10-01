import { test, expect } from '@playwright/test';
import { JavascriptAlertsPage } from '../pages/JavascriptAlertsPage';

test.describe('Diálogos nativos do navegador (alert/confirm/prompt)', () => {
  test('aceitar um JS Alert mostra o resultado esperado', async ({ page }) => {
    const alertsPage = new JavascriptAlertsPage(page);
    await alertsPage.goto();

    await alertsPage.triggerAlertAndAccept();

    await expect(alertsPage.result).toHaveText('You successfully clicked an alert');
  });

  test('aceitar um JS Confirm mostra o resultado de "Ok"', async ({ page }) => {
    const alertsPage = new JavascriptAlertsPage(page);
    await alertsPage.goto();

    await alertsPage.triggerConfirmAndAccept();

    await expect(alertsPage.result).toHaveText('You clicked: Ok');
  });

  test('cancelar um JS Confirm mostra o resultado de "Cancel"', async ({ page }) => {
    const alertsPage = new JavascriptAlertsPage(page);
    await alertsPage.goto();

    await alertsPage.triggerConfirmAndDismiss();

    await expect(alertsPage.result).toHaveText('You clicked: Cancel');
  });

  test('responder um JS Prompt ecoa o texto digitado no resultado', async ({ page }) => {
    const alertsPage = new JavascriptAlertsPage(page);
    await alertsPage.goto();

    await alertsPage.triggerPromptAndAcceptWithText('Olá, Playwright!');

    await expect(alertsPage.result).toHaveText('You entered: Olá, Playwright!');
  });
});
