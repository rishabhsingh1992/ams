import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { authGuard } from '@core/guards/auth.guard';
import { adminGuard } from '@core/guards/role.guard';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('@features/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'attendance',
        loadComponent: () =>
          import('@features/attendance/attendance.page').then((m) => m.AttendancePage),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('@features/profile/profile.page').then((m) => m.ProfilePage),
      },
      {
        path: 'reports',
        loadComponent: () =>
          import('@features/reports/reports.page').then((m) => m.ReportsPage),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('@features/settings/settings.page').then((m) => m.SettingsPage),
      },
      {
        path: 'profile/personal',
        loadComponent: () =>
          import('@features/profile/personal-details/personal-details.page').then(
            (m) => m.PersonalDetailsPage,
          ),
      },
      {
        path: 'profile/salary',
        loadComponent: () =>
          import('@features/profile/salary-details/salary-details.page').then(
            (m) => m.SalaryDetailsPage,
          ),
      },
      {
        path: 'profile/bank',
        loadComponent: () =>
          import('@features/profile/bank-details/bank-details.page').then(
            (m) => m.BankDetailsPage,
          ),
      },
      {
        path: 'profile/leave-balances',
        loadComponent: () =>
          import('@features/profile/leave-balances/leave-balances.page').then(
            (m) => m.LeaveBalancesPage,
          ),
      },
      {
        path: 'profile/documents',
        loadComponent: () =>
          import('@features/profile/documents/documents.page').then(
            (m) => m.DocumentsPage,
          ),
      },
      {
        path: 'attendance-settings',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('@features/attendance-settings/attendance-settings.page').then(
            (m) => m.AttendanceSettingsPage,
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];
