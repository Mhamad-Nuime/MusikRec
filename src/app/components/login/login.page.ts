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
import { AuthenticationService } from '../../services/outer-service/springBootBasedServices/Authentication.service';
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
  IonInputPasswordToggle, IonLoading, IonSpinner } from '@ionic/angular/standalone';
import { timer } from 'rxjs';
import { LoginForm } from 'src/app/models/userBasedModels/login/loginForm';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  providers: [AuthenticationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonSpinner, IonLoading, 
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
export class LoginPage implements OnDestroy {
  //this prop is responsable for disabling/enabling the submit button until the validation condations get met
  disabled: WritableSignal<boolean>;
  //show and hide the spinner
  showSpinner: boolean = false;
  
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
    let loginSub =this.loginData.valueChanges.subscribe(() => {
      this.disabled.set(this.loginData.invalid);
    });
    this.Subscribtions.push(loginSub);
  }
  Subscribtions : any[] = [];
  onSubmit(): void {
    this.showSpinner = true;
    const data = this.loginData.value;
    let submitSubscribtion = this.authenticationService.login(data).subscribe(
      {
        next: () => {
          this.showSpinner = false;
          this.router.navigateByUrl('/content/main/trends');
        },
        error: (err: any) => {
          this.showSpinner = false;
          this.showErrorMessage.set(`We Get This Error : ${err.message}`);
          timer(3000).subscribe(() => {
            this.showErrorMessage.set("Try Again")
            timer(2000).subscribe(() => this.showErrorMessage.set(null));
          });
        },
      }
    );
    this.Subscribtions.push(submitSubscribtion);
  }
  ngOnDestroy() : void {
    if(this.Subscribtions){
      this.Subscribtions.forEach( sub => {
        sub.unsubscribe();
      });
    }
  }
}
