# AGENTS.md

> Canonical, model-agnostic guide for AI agents in this repo. Read by Claude Code (via the CLAUDE.md
> import), Codex, Cursor, Copilot, and other agent tools.

## Project
login_impl_test — SPA React de teste para uma tela de login/autenticação usando shadcn/ui.

## Stack
- Language: TypeScript
- Framework: React 19 + Vite 8
- UI: Tailwind CSS v4 + shadcn/ui (base radix, preset Nova; ícones Lucide)
- Package manager: pnpm 11
- Runtime: Node 24
- Path alias: `@/*` → `src/*`

## Commands (gate verbs)
Todos ligados e verdes. Rode `pnpm <verbo>`. Ordem do gate (mesma do CI):
- fmt:       `pnpm fmt`        # biome check .  (auto-fix: `pnpm format`)
- lint:      `pnpm lint`       # oxlint
- typecheck: `pnpm typecheck`  # tsc -b
- arch:      `pnpm arch`       # dependency-cruiser (config: .dependency-cruiser.cjs)
- deadcode:  `pnpm deadcode`   # knip (config: knip.json)
- test:      `pnpm test`       # vitest run
- coverage:  `pnpm coverage`   # vitest run --coverage → lcov (Codecov)
- build:     `pnpm build`      # tsc -b && vite build
- e2e:       `pnpm e2e`        # playwright test (fluxo de login)
- run/dev:   `pnpm dev`        # vite

Notas: Biome só formata (linter desligado; lint fica no oxlint) e ignora `*.css` (sintaxe do
Tailwind v4). Testes unit usam jsdom + Testing Library (setup em `src/test/setup.ts`); E2E usa
Playwright (config em `playwright.config.ts`, specs em `e2e/`).

## Thresholds & policies (Pilar 3)
- Diff coverage (Codecov `patch`): **≥ 80%** — required check quando o app Codecov estiver instalado.
- Coverage de projeto: informativo (foco no diff, não no absoluto).
- `arch`: qualquer violação **falha o PR**. `deadcode`: **zero deps não usadas**.

## Observability (Pilar 3)
- `src/observability.ts` (`initObservability()`, chamado em `main.tsx`). **Inerte sem config.**
- Sentry (erros/perf) liga com `VITE_SENTRY_DSN`. OpenTelemetry Web exporta OTLP para o Collector
  com `VITE_OTLP_TRACES_ENDPOINT` (nunca apontar direto para o vendor; o Collector faz o fan-out).

## Arsenal (Pilar 4)
- `.mcp.json` liga **chrome-devtools-mcp** e **shadcn-ui-mcp** (via `npx`, sem segredos).
- Com chave (adicionar manualmente, nunca commitar a chave): **21st.dev Magic**
  (`https://21st.dev/api/mcp`, header `x-api-key`). shadcn-ui-mcp aceita `--github-api-key` p/ subir
  o rate limit de 60→5000/h.

## Conventions
- Workflow: Issue-first, PR-driven. Toda tarefa é uma Issue; todo deploy é um PR que a referencia
  (`Closes #N`). Conventional Commits.
- Componentes shadcn ficam em `src/components/ui/` (gerados via `pnpm dlx shadcn@latest add <nome>`);
  não editar manualmente sem necessidade.
- Componentes de aplicação em `src/components/`; helper `cn()` vem do pacote `cn` (preset Nova).

## Zeroth (mandatory)
This repo follows the `zeroth` skill. Apply the 4 pillars before any task:
1. Workflow (Issue-first, PR-driven).
2. Motion and UI (skeleton, lazy loading, enter/exit/loading/progress; `prefers-reduced-motion`;
   animar só `transform`/`opacity`, nunca `transition: all`).
3. Observability + Quality + Testing (OpenTelemetry; o gate `fmt -> lint -> typecheck -> arch ->
   deadcode -> test -> coverage -> build`; diff coverage no Codecov).
4. Arsenal (shadcn-ui-mcp, 21st.dev Magic, chrome-devtools-mcp, design-motion-principles,
   web-design-guidelines, humanizer).
Full spec: the `zeroth` skill (`references/zeroth.md`).
