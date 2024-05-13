import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { SpringBootService } from './services/spring-boot.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
  providers: [SpringBootService],
})
export class AppComponent {
  constructor() {}
  public environmentInjector = inject(EnvironmentInjector);

}
