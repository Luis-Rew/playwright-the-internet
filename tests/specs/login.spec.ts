import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', () => {
  test('login com credenciais válidas mostra mensagem de sucesso', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login('tomsmith', 'SuperSecretPassword!');

    await loginPage.expectFlashMessageToContain('You logged into a secure area!');
  });

  test('login com credenciais inválidas mostra mensagem de erro', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.login('usuario_invalido', 'senha_errada');

    await loginPage.expectFlashMessageToContain('Your username is invalid!');
  });
});
