import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  personOutline, mailOutline, callOutline, idCardOutline,
  businessOutline, chevronDownOutline, closeOutline,
} from 'ionicons/icons';
import { UserRole, NewUser } from '@core/models/user.model';

export type { NewUser };

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  imports: [FormsModule, IonIcon],
  standalone: true,
})
export class AddUserComponent {
  @Output() userAdded  = new EventEmitter<NewUser>();
  @Output() dismissed  = new EventEmitter<void>();

  readonly departments = [
    'Engineering', 'Human Resources', 'Finance',
    'Operations', 'Marketing', 'Sales',
  ];

  readonly roles: { value: UserRole; label: string }[] = [
    { value: 'employee', label: 'Employee' },
    { value: 'manager',  label: 'Manager'  },
    { value: 'admin',    label: 'Administrator' },
  ];

  form: NewUser = {
    fullName:   '',
    email:      '',
    phone:      '',
    employeeId: '',
    department: '',
    role:       'employee',
  };

  touched = false;

  constructor() {
    addIcons({
      personOutline, mailOutline, callOutline, idCardOutline,
      businessOutline, chevronDownOutline, closeOutline,
    });
  }

  get isValid(): boolean {
    return !!(
      this.form.fullName.trim() &&
      this.form.email.trim() &&
      this.form.department &&
      this.form.role
    );
  }

  fieldError(value: string): boolean {
    return this.touched && !value.trim();
  }

  submit() {
    this.touched = true;
    if (!this.isValid) return;
    this.userAdded.emit({ ...this.form });
  }

  dismiss() {
    this.dismissed.emit();
  }
}
