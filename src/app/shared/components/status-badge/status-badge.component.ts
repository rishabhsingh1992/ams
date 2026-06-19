import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  templateUrl: 'status-badge.component.html',
  styleUrls: ['status-badge.component.scss'],
})
export class StatusBadgeComponent {
  status = input.required<string>();
  label  = input<string | undefined>(undefined);

  readonly displayLabel = computed(() =>
    this.label() ?? (this.status().charAt(0).toUpperCase() + this.status().slice(1))
  );
}
