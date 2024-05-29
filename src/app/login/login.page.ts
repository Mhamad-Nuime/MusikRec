import { Component, OnInit } from '@angular/core';
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
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  providers: [UserLoginService],
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
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class LoginPage implements OnInit {
  mailIconHidden: boolean = false;
  passwordAppeared: boolean = false;
  disabled: boolean = false;

  loginData = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: [''],
  });

  constructor(
    private userLoginService: UserLoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {}

  onEmailInput(): void {
    this.mailIconHidden = true;
  }
  onShowPassword(): void {
    this.passwordAppeared = !this.passwordAppeared;
  }
  onSubmit(): void {
    if (!this.loginData.value || !this.loginData.value) {
      try {
        throw new Error('invalid input date');
      } catch {
        console.error('something went wrong !!');
      }
    }

    this.loginData.get('email')?.disabled;
    this.loginData.get('password')?.disabled;

    this.userLoginService
      .userLogin({
        email: this.loginData.value.email,
        password: this.loginData.value.password,
      })
      .subscribe((res) => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/content/main');
        console.log(
          `getting Token sucessfully (Token : ${localStorage.getItem(
            'token'
          )}`
        );
      });
    this.disabled = this.loginData.invalid;
  }
}
