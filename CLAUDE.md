# AMS — Claude Instructions

## Chat Session Protocol

**Starting a new chat — always prompt this first:**
> Check your memory for this project and give me a quick summary of where we left off before we continue.

**Ending a chat — always prompt this before closing:**
> Update memory files with everything we did this session before I start a new chat.

---

## Project
Mobile-first attendance management app. Angular 20 + Ionic 8 + Capacitor 8.

## Run
```bash
ionic serve          # browser dev server
npm run lint         # ESLint check
npm run build        # production build
ionic capacitor sync # sync to native after build
```

## Stack Rules
- **Standalone components only** — no NgModules, ever
- **`inject()` over constructor injection** everywhere
- **Signals** for all reactive state — `signal()`, `computed()` — not RxJS observables unless required
- **`@for` / `@if`** control flow syntax (Angular 17+) — not `*ngFor` / `*ngIf`
- **TypeScript strict mode** — no `any`, no type assertions unless unavoidable

## Path Aliases — always use these, never deep relative imports
| Alias | Path |
|---|---|
| `@core/*` | `src/app/core/*` |
| `@features/*` | `src/app/features/*` |
| `@layout/*` | `src/app/layout/*` |
| `@shared/*` | `src/app/shared/*` |
| `@env/*` | `src/environments/*` |
| `@assets/*` | `src/assets/*` |
| `@theme/*` | `src/theme/*` |

## Folder Structure
```
src/app/
  core/
    guards/         # auth.guard.ts, role.guard.ts
    interceptors/   # auth, error, loading
    models/         # all shared interfaces — never define models inside components
    services/       # singleton services
  features/
    auth/           # login, forgot-password
    admin/          # dashboard, users, add-user, edit-user
    manager/        # dashboard
    home/           # employee check-in/out
    attendance/     # history, detail
    leave/          # apply, list, detail
    profile/        # profile + sub-pages
    reports/        # report pages
    settings/       # settings, attendance-settings
  layout/
    tabs/           # tab shell + routes
  shared/
    components/     # reusable components
    directives/
    pipes/
```

## NEVER Do These
- **No test files** — do not create `.spec.ts` files, ever. No Karma, no Jasmine, no testing setup of any kind.
- **No `zod`** — use Angular form validators for validation
- **No `chart.js` / `ng2-charts`** — reports are tables and lists only
- **No NgModules** — standalone components only
- **No deep relative imports** — always use path aliases
- **No comments explaining what code does** — only add comments for non-obvious WHY
- **No `any` type**
- **Never navigate between tabs programmatically** — tabs are independent stacks; the user switches tabs only via the tab bar. Never call `router.navigate()` or `NavController` to a tab root (`/tabs/users`, `/tabs/reports`, etc.) from inside another tab. Cross-tab actions must use modals or push pages onto the current tab's own stack via `NavController.navigateForward()`.

## Design Conventions
- Cards: `border-radius: 16px`, `box-shadow: 0 2px 12px rgba(0,0,0,0.06)`, `background: var(--ion-background-color)`
- Form fields: use `au-*` CSS class pattern (see `add-user.component.scss`)
- Icon squares: `settings-icon--blue/teal/purple/orange` pattern (see `attendance-settings.page.scss`)
- Section labels: 12px, 600 weight, uppercase, `var(--ion-color-medium)`
- Always use `var(--ion-color-*)` tokens — never hardcode colors except for status colors:
  - Green (present/active): `#2DD36F`
  - Red (absent/danger): `#FF3B30`
  - Orange (late/warning): `#FF9900`
  - Blue (info): `#3880FF`

## User Roles
| Role | Login Code | Home Route |
|---|---|---|
| Admin | `1000` | `/tabs/dashboard` |
| Manager | `2000` | `/tabs/manager-home` |
| Employee | `3000` | `/tabs/home` |

- Admin = Owner (no separate owner role)
- `adminGuard` protects admin-only routes
- `authGuard` protects all `/tabs/*` routes

## Key Services
- `AuthService` — `currentUser()` signal, `login()`, `logout()` (clears all localStorage)
- `UserService` — user CRUD + `restoreSeed()` (called by LoginPage to restore mock data after logout)
- `ThemeService` — dark/light/system theme via signal

## Packages
- `date-fns` — installed, use for all date formatting/arithmetic
- No chart library
- No test libraries
