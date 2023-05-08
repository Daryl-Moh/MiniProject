import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup
  isLoggedIn: boolean = false

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authSvc: AuthService,
    private _ngZone: NgZone) { }

  ngOnInit(): void {
    this.registerForm = this.createForm()
    // this.isLoggedIn = this.authSvc.isLoggedIn
    // if (this.authSvc.isLoggedIn) {
    //   timeout(3000)
    //   this.router.navigate(['/register']).then(() => {
    //     window.location.reload()
    //   })
    // }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      givenname: this.fb.control<string>('', [Validators.required, Validators.pattern("^[a-zA-Z]{2,}$")]),
      familyname: this.fb.control<string>('', [Validators.required, Validators.pattern("^[a-zA-Z]{2,}$")]),
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      password: this.fb.control<string>('', [Validators.required, Validators.minLength(8)]),
    })
  }

  register() {
    const givenname = this.registerForm.value['givenname']
    const familyname = this.registerForm.value['familyname']
    const email = this.registerForm.value['email']
    const password = this.registerForm.value['password']
    this.authSvc.register(givenname, familyname, email, password)
      .then(response => {
        console.log(response)
        localStorage.setItem("jwt", response['jwt'])
        this.router.navigate(['/portfolio'])
      })
      .catch(error => {
        console.error(error)
        if (error.status === 409) {
          window.alert("This email has already been registered. Please try logging in instead.")
          this._ngZone.run(() => {
            this.router.navigate(['/login'])
          })
        } else {
          console.warn(error)
          window.alert(error['error'])
        }
      })
  }
}
  

