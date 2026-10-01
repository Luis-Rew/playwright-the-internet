# Playwright + TypeScript — the-internet.herokuapp.com

Projeto de automação de testes de UI usando **Playwright + TypeScript** (a combinação oficialmente recomendada pelo time do Playwright), rodando contra o [the-internet.herokuapp.com](https://the-internet.herokuapp.com/) — um site público clássico, cheio de "desafios" de automação (dropdowns, diálogos nativos, frames, upload de arquivo, carregamento dinâmico).

> Projeto de portfólio, feito para demonstrar organização de um framework de testes de UI do zero. Sinta-se à vontade para clonar, rodar e usar como referência.

---

## Por que Playwright (e por que essa escolha é relevante)

Esse é o segundo projeto de uma série de portfólio; o primeiro foi com Selenium. Vale registrar uma diferença prática importante que apareceu entre os dois: o Selenium exige que você mesmo espere elementos ficarem prontos antes de interagir (`WebDriverWait`), e isso pode gerar instabilidade sutil. O Playwright tem **auto-waiting nativo** — ele espera sozinho um elemento ficar visível, habilitado e "estável" antes de clicar ou digitar — o que torna a suíte naturalmente mais confiável sem código extra de sincronização.

---

## Stack

| Camada | Ferramenta |
|---|---|
| Linguagem | TypeScript |
| Framework de teste | Playwright Test (`@playwright/test`) |
| Runtime | Node.js |
| Navegador | Google Chrome instalado na máquina (`channel: 'chrome'`) |
| Relatório | HTML nativo do Playwright |
| CI | GitHub Actions |

---

## Estrutura do projeto

```
playwright-the-internet/
├── tests/
│   ├── pages/              # Page Object Model (1 classe por página)
│   ├── specs/              # os arquivos de teste (*.spec.ts)
│   └── fixtures/           # arquivos usados nos testes (ex.: upload)
├── .github/workflows/playwright.yml
├── playwright.config.ts
└── package.json
```

---

## Como rodar

Pré-requisitos: **Node.js 18+** e **Google Chrome** instalados.

```bash
npm install
npm test
```

Isso roda toda a suíte contra o Chrome instalado na sua máquina (sem precisar baixar nenhum navegador extra).

**Ver o navegador rodando (não headless)?**
```bash
npm run test:headed
```

**Ver o relatório HTML depois de rodar:**
```bash
npm run report
```

---

## O que cada teste cobre

| Spec | O que testa |
|---|---|
| `login.spec.ts` | Login com credenciais válidas e inválidas |
| `dropdown.spec.ts` | Seleção de uma opção em um `<select>` |
| `javascript-alerts.spec.ts` | Diálogos nativos do navegador: `alert`, `confirm` (aceitar/cancelar) e `prompt` |
| `nested-frames.spec.ts` | Leitura de conteúdo dentro de frames aninhados (frameset dentro de frameset) |
| `file-upload.spec.ts` | Upload de um arquivo real |
| `dynamic-loading.spec.ts` | Elementos que só aparecem (ou só existem no DOM) depois de um carregamento assíncrono |

### Nota sobre diálogos nativos (`javascript-alerts.spec.ts`)

Um `alert`/`confirm`/`prompt` do navegador não faz parte do DOM da página, então o Playwright exige que você registre um listener de `dialog` **antes** da ação que o dispara — depois que ele aparece, já é tarde para capturá-lo por código. Isso está encapsulado em `JavascriptAlertsPage`.

### Nota sobre uma funcionalidade quebrada no site (honestidade > fingir que funciona)

A página `/iframe` desse site tem um editor de texto rico (TinyMCE) dentro de um iframe — um exemplo clássico de teste de automação. Só que, ao investigar, esse editor específico está **genuinamente quebrado no próprio site**: ele carrega uma versão do TinyMCE via CDN que não é mais compatível com o código da página, e o editor fica permanentemente em modo somente-leitura. Isso não é um problema do nosso código de teste — é uma característica real (e desatualizada) do the-internet.herokuapp.com, um site de demonstração que não recebe manutenção ativa.

Em vez de simular um teste "passando" contra algo que não funciona de verdade, trocamos esse cenário por `/nested_frames`, que testa a mesma categoria de dificuldade (frames/iframes) de forma que realmente funciona.

---

## Aulinha: como criar um projeto desse do zero, sem IA

### 1. Instale o Node.js

- Baixe a versão **LTS** em [nodejs.org](https://nodejs.org/).
- Confirme no terminal:
  ```bash
  node --version
  npm --version
  ```

### 2. Instale o Git

- Baixe em [git-scm.com](https://git-scm.com/downloads) e confirme com `git --version`.
- Configure seu nome e e-mail (uma vez por máquina):
  ```bash
  git config --global user.name "Seu Nome"
  git config --global user.email "seu-email@exemplo.com"
  ```

### 3. Crie o projeto com o instalador oficial do Playwright

Essa é a forma recomendada pelo próprio time do Playwright — ela já monta toda a estrutura (config, pasta de testes, workflow de CI) por você:

```bash
npm init playwright@latest
```

O instalador pergunta: linguagem (escolha **TypeScript**), pasta dos testes (aceite o padrão `tests`), se quer adicionar um workflow do GitHub Actions (responda **sim**), e se quer baixar os navegadores agora.

### 4. (Opcional, mas recomendado) Use o Chrome já instalado na sua máquina

Por padrão, o Playwright baixa sua própria cópia do Chromium. Se preferir usar o Google Chrome que você já tem instalado (evita um download grande), configure `channel: 'chrome'` no `playwright.config.ts`:

```ts
projects: [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'], channel: 'chrome' },
  },
],
```

### 5. Escreva um Page Object

Um Page Object é só uma classe que representa uma página (ou parte dela) e expõe métodos com nomes de ações, escondendo os seletores:

```ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly usernameInput: Locator;

  constructor(private page: Page) {
    this.usernameInput = page.locator('#username');
  }

  async goto() {
    await this.page.goto('/login');
  }
}
```

### 6. Escreva o teste

```ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('login funciona', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  // ... ações e assertions
});
```

### 7. Rode

```bash
npx playwright test
```

### 8. Crie o repositório no GitHub

1. Acesse [github.com/new](https://github.com/new), dê um nome, marque **Public**, não adicione README (você já tem um local).
2. Clique em **Create repository**.

### 9. Suba o projeto (primeira vez)

```bash
git init
git add .
git commit -m "primeiro commit"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/nome-do-repo.git
git push -u origin main
```

### 10. Próximas alterações

```bash
git status
git add .
git commit -m "descrição da mudança"
git push
```

### 11. CI (GitHub Actions)

Se você respondeu "sim" na pergunta do passo 3, o Playwright já criou `.github/workflows/playwright.yml` pra você — ele roda `npx playwright test` a cada push, automaticamente, e você vê o resultado na aba "Actions" do seu repositório no GitHub.
