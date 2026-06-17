import { Injectable, computed, signal } from '@angular/core';
import { CurrentUser, UserRole } from '@core/models/user.model';

const STORAGE_KEY = 'ams_user';

const MOCK_USERS: Record<string, CurrentUser> = {
  '0000': { phone: '0000', role: 'admin',    name: 'Admin User'    },
  '4444': { phone: '4444', role: 'employee', name: 'Rishabh Singh' },
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _user = signal<CurrentUser | null>(this.loadFromStorage());

  readonly currentUser = this._user.asReadonly();
  readonly isLoggedIn  = computed(() => !!this._user());
  readonly isAdmin     = computed(() => this._user()?.role === 'admin');

  login(phone: string): boolean {
    const user = MOCK_USERS[phone];
    if (!user) return false;
    this._user.set(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return true;
  }

  logout(): void {
    this._user.set(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  private loadFromStorage(): CurrentUser | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CurrentUser) : null;
    } catch {
      return null;
    }
  }
}
