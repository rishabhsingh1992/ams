export type UserRole = 'employee' | 'manager' | 'admin';

export interface CurrentUser {
  phone: string;
  role:  UserRole;
  name:  string;
}

export interface RoleOption {
  value:       UserRole;
  label:       string;
  description: string;
  icon:        string;
}

export interface NewUser {
  fullName:   string;
  email:      string;
  phone:      string;
  employeeId: string;
  department: string;
  role:       UserRole;
}
