import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  WritableSignal,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../services/outer services/springBootBasedServices/Authentication.service';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonRow,
  IonInput,
  IonCol,
  IonGrid,
  IonButton,
  IonIcon,
  IonText,
  IonFab,
  IonFabButton,
  IonButtons,
  IonBackButton,
  IonImg,
  IonInputPasswordToggle,
} from '@ionic/angular/standalone';
import { Subscription, timer } from 'rxjs';
import { LoginForm } from 'src/app/models/userBasedModels/login/loginForm';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  providers: [AuthenticationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonImg,
    IonBackButton,
    IonButtons,
    IonFabButton,
    IonFab,
    IonText,
    IonIcon,
    IonButton,
    IonGrid,
    IonCol,
    IonInput,
    IonRow,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonInputPasswordToggle,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class LoginPage {
  //this prop is responsable for disabling/enabling the submit button until the validation condations get met
  disabled: WritableSignal<boolean>;
  
  showErrorMessage: WritableSignal<string | null> = signal(null);
  //The Form's Model
  loginData = this.formBuilder.group<LoginForm>({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.pattern('^[a-z].{7,20}$')]),
  });

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    // enable and disabled the submit button
    this.disabled = signal<boolean>(this.loginData.invalid);
    this.loginData.valueChanges.subscribe(() => {
      this.disabled.set(this.loginData.invalid);
    });
  }
  onSubmit(): void {
    const data = this.loginData.value;
    const loginSubscribtion = this.authenticationService.login(data).subscribe(
      {
        next: () => {
          this.router.navigateByUrl('/content/main/trends');
        },
        error: (err: any) => {;
          this.showErrorMessage.set(`We Get This Error : ${err.message}`);
          timer(4000).subscribe(() => this.showErrorMessage.set("Try Again"));
          timer(2000).subscribe(() => this.showErrorMessage.set(null));
        },
      }
    );
  }
}

