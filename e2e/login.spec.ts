import { expect, test } from '@playwright/test'

test('fluxo de login mostra a confirmação após enviar', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByLabel('E-mail', { exact: true })).toBeVisible()

  await page.getByLabel('E-mail', { exact: true }).fill('voce@exemplo.com')
  await page.getByLabel('Senha', { exact: true }).fill('segredo123')
  await page.getByRole('button', { name: 'Entrar' }).click()

  await expect(page.getByRole('status')).toContainText('voce@exemplo.com')
})
