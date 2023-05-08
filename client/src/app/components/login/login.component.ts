import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  isLoggedIn: boolean = false
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authSvc: AuthService,
    private _ngZone: NgZone) { }

  ngOnInit(): void {
    this.loginForm = this.createForm()

    // this.isLoggedIn = this.authSvc.isLoggedIn
    // if (this.authSvc.isLoggedIn) {
    //   this.router.navigate(['/']).then(() => {
    //     window.location.reload()
    //   })
    // }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      password: this.fb.control<string>('', [Validators.required, Validators.minLength(8)]),
    })
  }

  login() {
    const email = this.loginForm.value['email']
    const password = this.loginForm.value['password']
    this.authSvc.login(email, password)
      .then(response => {
        console.log(response)
        localStorage.setItem("jwt", response['jwt'])
        this.router.navigate(['/portfolio'])
      })
      .catch(error => {
        console.error(error)
        window.alert(error)
      })
  }
}
