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
        path: 'dashboard',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('@features/admin/dashboard/dashboard.page').then((m) => m.AdminDashboardPage),
      },
      {
        path: 'manager-home',
        loadComponent: () =>
          import('@features/manager/dashboard/manager-dashboard.page').then((m) => m.ManagerDashboardPage),
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
        path: 'admin-profile',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('@features/admin/profile/admin-profile.page').then((m) => m.AdminProfilePage),
      },
      {
        path: 'team',
        loadComponent: () =>
          import('@features/team/team.page').then((m) => m.TeamPage),
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
        path: 'settings/theme',
        loadComponent: () =>
          import('@features/settings/theme/theme-settings.page').then((m) => m.ThemeSettingsPage),
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
        path: 'users',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('@features/admin/users/users.page').then((m) => m.UsersPage),
      },
      {
        path: 'users/add',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('@features/admin/add-user/add-user.page').then((m) => m.AddUserPage),
      },
      {
        path: 'users/:id/edit',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('@features/admin/edit-user/edit-user.page').then((m) => m.EditUserPage),
      },
      {
        path: '',
        redirectTo: '/tabs/profile',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/profile',
    pathMatch: 'full',
  },
];
