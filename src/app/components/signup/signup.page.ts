import { Component, OnDestroy, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
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
  IonInputPasswordToggle, IonSpinner } from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { SignUpForm } from 'src/app/models/userBasedModels/signup/signupForm';
import { AuthenticationService } from '../../services/outer-service/springBootBasedServices/Authentication.service';;
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  providers: [AuthenticationService],
  imports: [IonSpinner, 
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
    IonInputPasswordToggle,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class SignupPage implements OnDestroy{

  showErrorMessage: WritableSignal<string | null> = signal(null);
  //show and hide the spinner 
  showSpinner : boolean = false;
  //The form's Model
  signupData = this.fb.group<SignUpForm>({
    firstName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-z][a-z]{3,10}$')]),
    lastName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-z][a-z]{3,10}$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('^[a-z].{7,20}$')]),
  });
  //diabling and enabling the submit button
  disableSubmitButton: WritableSignal<boolean> = signal<boolean>(true);
  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {
    let signupSub = this.signupData.valueChanges.subscribe(()=> {
      this.disableSubmitButton.set(this.signupData.invalid);
    });
    this.subscribtions.push(signupSub);
  }
  ngOnDestroy(): void {
    if(this.subscribtions){
      this.subscribtions.forEach( sub => {
        sub.unsubscribe();
      })
    }
  }
  subscribtions: any[] = [];
  onSubmit(): void {
    this.showSpinner = true;
    const data = this.signupData.value;
    let signupSubscribtion = this.authenticationService.signup(data).subscribe(
      {
        next: () => {
          this.showSpinner = false;
          this.router.navigateByUrl('/content/main/trends');
        },
        error: (err: any) => {
          this.showSpinner = false;
          this.showErrorMessage.set(`We Get This Error : ${err.message}`);
          timer(2000).subscribe(() => {
            this.showErrorMessage.set('Try Again')
            timer(2000).subscribe(() => this.showErrorMessage.set(null));
          });
        },
      }
    );
    this.subscribtions.push(signupSubscribtion);
  }

}
