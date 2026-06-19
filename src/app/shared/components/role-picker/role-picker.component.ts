import { Component, EventEmitter, Output } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline, peopleOutline, shieldCheckmarkOutline } from 'ionicons/icons';
import { UserRole, RoleOption } from '@core/models/user.model';

export type { UserRole, RoleOption };

const ROLES: RoleOption[] = [
  {
    value: 'employee',
    label: 'Employee',
    description: 'Clock in/out and view your own attendance records',
    icon: 'person-outline',
  },
  {
    value: 'manager',
    label: 'Manager',
    description: 'Oversee your team\'s attendance and approve leave requests',
    icon: 'people-outline',
  },
  {
    value: 'admin',
    label: 'Administrator',
    description: 'Full access to manage users, policies, and system settings',
    icon: 'shield-checkmark-outline',
  },
];

@Component({
  selector: 'app-role-picker',
  templateUrl: './role-picker.component.html',
  styleUrls: ['./role-picker.component.scss'],
  imports: [IonIcon],
  standalone: true,
})
export class RolePickerComponent {
  @Output() roleSelected = new EventEmitter<UserRole>();
  @Output() dismissed    = new EventEmitter<void>();

  roles = ROLES;
  selected: UserRole | null = null;

  constructor() {
    addIcons({ personOutline, peopleOutline, shieldCheckmarkOutline });
  }

  select(role: UserRole) {
    this.selected = role;
  }

  confirm() {
    if (this.selected) this.roleSelected.emit(this.selected);
  }

  dismiss() {
    this.dismissed.emit();
  }
}
