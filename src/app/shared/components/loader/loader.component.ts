import { Component, input } from '@angular/core';
import { IonSpinner } from '@ionic/angular/standalone';

@Component({
  selector: 'app-loader',
  templateUrl: 'loader.component.html',
  styleUrls: ['loader.component.scss'],
  imports: [IonSpinner],
})
export class LoaderComponent {
  loading = input<boolean>(false);
  message = input<string | undefined>(undefined);
}
