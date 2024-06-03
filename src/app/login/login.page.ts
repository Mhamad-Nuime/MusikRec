import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  WritableSignal,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { UserLoginService } from '../services/login.service';
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
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  providers: [UserLoginService],
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
export class LoginPage implements OnDestroy {
  disabled: WritableSignal<boolean>;
  sub: Subscription;

  loginData = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('^[a-z].{7,20}$')]],
  });

  constructor(
    private userLoginService: UserLoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.disabled = signal<boolean>(this.loginData.invalid);
    this.sub = this.loginData.valueChanges.subscribe(() => {
      this.disabled.set(this.loginData.invalid);
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  onSubmit(): void {
    console.log('submit the login data');
    // if (!this.loginData.value) {
    //   try {
    //     throw new Error('invalid input date');
    //   } catch {
    //     console.error('something went wrong !!');
    //   }
    // }

    // this.loginData.get('email')?.disabled;
    // this.loginData.get('password')?.disabled;

    // this.userLoginService
    //   .userLogin({
    //     email: this.loginData.value.email,
    //     password: this.loginData.value.password,
    //   })
    //   .subscribe((res) => {
    //     localStorage.setItem('token', res.token);
    //     this.router.navigateByUrl('/content/main');
    //     console.log(
    //       `getting Token sucessfully (Token : ${localStorage.getItem('token')}`
    //     );
    //   });
    // this.disabled = this.loginData.invalid;
  }
}
