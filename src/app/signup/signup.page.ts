import { Component, OnDestroy, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonInput,
  IonCol,
  IonIcon,
  IonText,
  IonButton,
  IonFab,
  IonFabButton,
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [
    IonFabButton,
    IonFab,
    IonButton,
    IonText,
    IonIcon,
    IonCol,
    IonInput,
    IonRow,
    IonGrid,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class SignupPage implements OnDestroy {
  signupData = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern('^[a-zA-z][a-z]{3,10}$')]],
    lastName: ['', [Validators.required, Validators.pattern('^[a-zA-z][a-z]{3,10}$')]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('^[a-z].{7,20}$')]],
  });
  disableSubmitButton: WritableSignal<boolean> = signal<boolean>(false);
  sub: Subscription;
  constructor(
    private fb: FormBuilder,
  ) {
    this.sub = this.signupData.valueChanges.subscribe(()=> {
      this.disableSubmitButton.set(this.signupData.invalid);
    });
  }

  ngOnDestroy() : void {
    this.sub.unsubscribe();
  }
  onSubmit() : void {
    console.log('signup to server is in progress......');
  }

}
