# AMS — Attendance Management System

A cross-platform mobile application built with **Ionic 8**, **Angular 20**, and **Capacitor 8**.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Ionic 8 + Angular 20 (standalone components) |
| Language | TypeScript 5.9 |
| Mobile Runtime | Capacitor 8 (iOS / Android) |
| Linting | ESLint + angular-eslint |
| Testing | Karma + Jasmine |

## Prerequisites

- Node.js 20+
- npm 10+
- [Ionic CLI](https://ionicframework.com/docs/cli): `npm install -g @ionic/cli`
- [Angular CLI](https://angular.dev/tools/cli): `npm install -g @angular/cli`

## Getting Started

```bash
# Install dependencies
npm install

# Serve in browser (hot reload)
npm start
# or
ionic serve

# Run unit tests
npm test

# Lint
npm run lint
```

## Build

```bash
# Production web build
npm run build

# Add a native platform (first time)
ionic capacitor add android
ionic capacitor add ios

# Sync web assets to native project
ionic capacitor sync

# Open native IDE
ionic capacitor open android   # Android Studio
ionic capacitor open ios       # Xcode
```

## Project Structure

```
src/
├── app/               # Feature modules and routing
│   ├── tab1/          # Tab pages
│   ├── tab2/
│   ├── tab3/
│   └── tabs/          # Tab shell
├── assets/            # Static assets
├── environments/      # Environment configs (see below)
└── theme/             # Global Ionic theme variables
```

## Environment Configuration

Environment files are **not committed**. Copy the example before first run:

```bash
cp src/environments/environment.example.ts src/environments/environment.ts
```

Edit `environment.ts` with your local values. `environment.prod.ts` is generated at build time via Angular build configurations.

## Scripts

| Command | Description |
|---|---|
| `npm start` | Dev server at `http://localhost:8100` |
| `npm run build` | Production build to `/www` |
| `npm run watch` | Dev build with file watching |
| `npm test` | Unit tests |
| `npm run lint` | ESLint check |

## Contributing

1. Branch from `main` using the convention `feature/<slug>` or `fix/<slug>`.
2. Run `npm run lint` and `npm test` before opening a PR.
3. Keep commits atomic and descriptive.
