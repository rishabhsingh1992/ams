import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  if (auth.currentUser()?.role !== 'admin') {
    inject(Router).navigate(['/tabs/home']);
    return false;
  }
  return true;
};
