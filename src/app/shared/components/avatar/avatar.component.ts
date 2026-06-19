import { Component, computed, input } from '@angular/core';

type AvatarRole = 'employee' | 'manager' | 'admin';
type AvatarSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-avatar',
  templateUrl: 'avatar.component.html',
  styleUrls: ['avatar.component.scss'],
})
export class AvatarComponent {
  name = input.required<string>();
  role = input<AvatarRole | undefined>(undefined);
  size = input<AvatarSize>('md');

  readonly initials = computed(() =>
    this.name().split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase()
  );
}
