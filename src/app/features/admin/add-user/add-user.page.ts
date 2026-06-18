import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  personOutline, mailOutline, callOutline, idCardOutline,
  businessOutline, chevronDownOutline,
} from 'ionicons/icons';
import { UserService } from '@core/services/user.service';
import { NewUser, UserRole } from '@core/models/user.model';

@Component({
  selector: 'app-add-user-page',
  templateUrl: 'add-user.page.html',
  styleUrls: ['add-user.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
    IonIcon, FormsModule,
  ],
})
export class AddUserPage {
  private readonly userService = inject(UserService);
  private readonly router      = inject(Router);

  readonly departments = [
    'Engineering', 'Human Resources', 'Finance',
    'Operations', 'Marketing', 'Sales',
  ];

  readonly roles: { value: UserRole; label: string }[] = [
    { value: 'employee', label: 'Employee'      },
    { value: 'manager',  label: 'Manager'       },
    { value: 'admin',    label: 'Administrator' },
  ];

  form: NewUser = {
    fullName: '', email: '', phone: '',
    employeeId: '', department: '', role: 'employee',
  };

  touched = false;

  constructor() {
    addIcons({ personOutline, mailOutline, callOutline, idCardOutline, businessOutline, chevronDownOutline });
  }

  get isValid(): boolean {
    return !!(this.form.fullName.trim() && this.form.email.trim() && this.form.department);
  }

  fieldError(value: string): boolean {
    return this.touched && !value.trim();
  }

  submit(): void {
    this.touched = true;
    if (!this.isValid) return;
    this.userService.addUser(this.form);
    this.router.navigate(['/tabs/users']);
  }
}
