# AMS — Attendance Management System

A mobile-first attendance tracking app built with **Angular 20**, **Ionic 8**, and **Capacitor**. Employees clock in/out using GPS verification and a front-camera selfie. Managers and admins get reporting and team oversight tools.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 20 (standalone components, signals) |
| UI Library | Ionic 8 (standalone tree-shaken imports) |
| Native Runtime | Capacitor 8 (iOS + Android) |
| Language | TypeScript 5.9 (strict mode) |
| Styling | SCSS + Ionic CSS custom properties |
| State | Angular signals + localStorage |
| Linting | ESLint + angular-eslint |
| Testing | Karma + Jasmine |

---

## Features

| Feature | Status |
|---|---|
| GPS-verified clock in / clock out | Done |
| Front-camera selfie capture on attendance | Done |
| Daily attendance persistence (localStorage) | Done |
| Monthly attendance history with locations | Done |
| Dark / light / system theme | Done |
| Reports page (scaffold) | Done |
| Settings page | Done |
| Role selection dialog component | Done |
| Add user dialog component | Done |

---

## Project Structure

```
src/
└── app/
    ├── core/                            # Singleton services and domain models
    │   ├── models/
    │   │   ├── attendance.model.ts      # CheckStatus, TodayRecord, AttendanceRecord, MonthData
    │   │   └── user.model.ts            # UserRole, RoleOption, NewUser
    │   └── services/
    │       └── theme.service.ts         # Dark/light/system theme via signal
    │
    ├── features/                        # One folder per routed feature
    │   ├── home/                        # Clock in/out with GPS + selfie capture
    │   ├── attendance/                  # Monthly attendance history
    │   ├── profile/                     # User profile view
    │   ├── reports/                     # Report categories (scaffold)
    │   └── settings/                    # App settings, links to Reports
    │
    ├── layout/
    │   └── tabs/                        # Bottom tab bar shell + route config
    │       ├── tabs.page.ts/html/scss
    │       └── tabs.routes.ts
    │
    ├── shared/
    │   └── components/                  # Reusable bottom-sheet components
    │       ├── camera-preview/          # Capacitor camera: flip, capture, confirm
    │       ├── role-picker/             # Role selector (Employee/Manager/Admin)
    │       └── add-user/               # Add user form with validation
    │
    ├── app.component.ts
    └── app.routes.ts
```

### Path Aliases (`tsconfig.json`)

| Alias | Resolves to |
|---|---|
| `@core/*` | `src/app/core/*` |
| `@features/*` | `src/app/features/*` |
| `@layout/*` | `src/app/layout/*` |
| `@shared/*` | `src/app/shared/*` |
| `@env/*` | `src/environments/*` |
| `@assets/*` | `src/assets/*` |
| `@theme/*` | `src/theme/*` |

---

## Routes

| Path | Component | Entry Point |
|---|---|---|
| `/tabs/home` | `HomePage` | Tab bar — Home |
| `/tabs/attendance` | `AttendancePage` | Tab bar — Attendance |
| `/tabs/profile` | `ProfilePage` | Tab bar — Profile |
| `/tabs/settings` | `SettingsPage` | FAB button on Profile |
| `/tabs/reports` | `ReportsPage` | Settings → Reports |

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+
- Ionic CLI: `npm install -g @ionic/cli`
- Angular CLI: `npm install -g @angular/cli`
- Android Studio (for Android builds)
- Xcode 15+ (for iOS builds)

### Install & Run

```bash
npm install
ionic serve          # browser dev server at http://localhost:8100
```

### Build & Deploy

```bash
# Production web build
npm run build

# Sync to native (first time: ionic capacitor add android/ios)
ionic capacitor sync

# Open native IDE
ionic capacitor open android   # Android Studio
ionic capacitor open ios       # Xcode
```

---

## Scripts

| Command | Description |
|---|---|
| `npm start` | Dev server at `http://localhost:8100` |
| `npm run build` | Production build to `/www` |
| `npm run watch` | Dev build with file watching |
| `npm test` | Unit tests via Karma |
| `npm run lint` | ESLint check |

---

## Shared Components

### `<app-role-picker>`
Bottom sheet for selecting a user role. Emits `roleSelected: UserRole` on confirm, `dismissed` on cancel.

```html
@if (showRolePicker) {
  <app-role-picker
    (roleSelected)="onRoleSelected($event)"
    (dismissed)="showRolePicker = false"
  />
}
```

### `<app-add-user>`
Bottom sheet form to add a new user (name, email, phone, employee ID, department, role). Emits `userAdded: NewUser` on valid submit, `dismissed` on cancel.

```html
@if (showAddUser) {
  <app-add-user
    (userAdded)="onUserAdded($event)"
    (dismissed)="showAddUser = false"
  />
}
```

### `<app-camera-preview>`
Full-featured camera preview with front-camera flip, selfie capture, orientation normalization, and confirm/retake flow. Emits `capture` when the user confirms.

```html
<app-camera-preview (capture)="onCapture()"></app-camera-preview>
```

---

## Conventions

- **Standalone components only** — no NgModules
- **`inject()` over constructor injection** where possible
- **Signals** for reactive state (`signal()`, `computed()`)
- **`@core/models`** for all shared interfaces/types — never define models inside components
- **`@for` / `@if`** control flow syntax (Angular 17+)
- **SCSS BEM-style** class naming with Ionic CSS custom properties
- **Path aliases** (`@core/*`, `@features/*`, etc.) — never use deep relative imports across layers

---

## Contributing

1. Branch from `main` using `feature/<slug>` or `fix/<slug>`.
2. Run `npm run lint` and `npm test` before opening a PR.
3. Keep commits atomic and descriptive (conventional commits preferred).
