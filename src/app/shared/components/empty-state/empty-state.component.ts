import { Component, input } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { alertCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-empty-state',
  templateUrl: 'empty-state.component.html',
  styleUrls: ['empty-state.component.scss'],
  imports: [IonIcon],
})
export class EmptyStateComponent {
  icon    = input<string>('alert-circle-outline');
  message = input<string>('No data found');

  constructor() {
    addIcons({ alertCircleOutline });
  }
}
