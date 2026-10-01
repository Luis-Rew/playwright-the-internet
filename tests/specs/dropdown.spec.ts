import { test, expect } from '@playwright/test';
import { DropdownPage } from '../pages/DropdownPage';

test('selecionar uma opção do dropdown reflete no valor selecionado', async ({ page }) => {
  const dropdownPage = new DropdownPage(page);
  await dropdownPage.goto();

  await dropdownPage.selectOption('Option 2');

  await expect(dropdownPage.dropdown).toHaveValue('2');
  expect(await dropdownPage.getSelectedLabel()).toBe('Option 2');
});
