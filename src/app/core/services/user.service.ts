import { Injectable, signal } from '@angular/core';
import { User, NewUser } from '@core/models/user.model';

const STORAGE_KEY = 'ams_users';

const SEED: User[] = [
  { id: '1', fullName: 'Arjun Mehta',   email: 'arjun@company.com',   phone: '1000', employeeId: 'EMP001', department: 'Engineering',    role: 'admin',    status: 'active',   joinedAt: '2024-01-01' },
  { id: '2', fullName: 'Priya Sharma',  email: 'priya@company.com',   phone: '2000', employeeId: 'EMP002', department: 'Human Resources', role: 'manager',  status: 'active',   joinedAt: '2024-02-01' },
  { id: '3', fullName: 'Rishabh Singh', email: 'rishabh@company.com', phone: '3000', employeeId: 'EMP003', department: 'Engineering',    role: 'employee', status: 'active',   joinedAt: '2024-03-01' },
  { id: '4', fullName: 'Rahul Verma',   email: 'rahul@company.com',   phone: '4001', employeeId: 'EMP004', department: 'Finance',        role: 'employee', status: 'inactive', joinedAt: '2024-04-10' },
  { id: '5', fullName: 'Anita Kumar',   email: 'anita@company.com',   phone: '5001', employeeId: 'EMP005', department: 'Marketing',      role: 'employee', status: 'active',   joinedAt: '2024-05-20' },
  { id: '6', fullName: 'Neha Joshi',    email: 'neha@company.com',    phone: '6001', employeeId: 'EMP006', department: 'Operations',     role: 'employee', status: 'active',   joinedAt: '2024-06-01' },
  { id: '7', fullName: 'Suresh Mehta',  email: 'suresh@company.com',  phone: '7001', employeeId: 'EMP007', department: 'Sales',          role: 'employee', status: 'active',   joinedAt: '2024-07-15' },
];

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly _users = signal<User[]>(this.load());

  readonly users = this._users.asReadonly();

  addUser(data: NewUser): void {
    const user: User = {
      ...data,
      id:       crypto.randomUUID(),
      status:   'active',
      joinedAt: new Date().toISOString().split('T')[0],
    };
    this._users.update(list => [...list, user]);
    this.save();
  }

  updateUser(id: string, changes: Partial<Omit<User, 'id'>>): void {
    this._users.update(list => list.map(u => u.id === id ? { ...u, ...changes } : u));
    this.save();
  }

  toggleStatus(id: string): void {
    this._users.update(list =>
      list.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u)
    );
    this.save();
  }

  getById(id: string): User | undefined {
    return this._users().find(u => u.id === id);
  }

  restoreSeed(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED));
    this._users.set([...SEED]);
  }

  private save(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this._users()));
  }

  private load(): User[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as User[]) : SEED;
    } catch {
      return SEED;
    }
  }
}
