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
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authSvc: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.createForm()
    this.isLoggedIn = this.authSvc.isLoggedIn
    if (this.authSvc.isLoggedIn) {
      this.router.navigate(['/about']).then(() => {
        window.location.reload()
      })
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      password: this.fb.control<string>('', [Validators.required, Validators.minLength(8)]),
    })
  }

  login() {
    this.isLoading = true;
    setTimeout(() => {
      const email = this.loginForm.value['email']
      const password = this.loginForm.value['password']
      this.authSvc.login(email, password)
        .then(response => {
          console.log(response)
          localStorage.setItem("jwt", response['jwt'])
          this.router.navigate(['/'])
          this.isLoggedIn = this.authSvc.isLoggedIn
        })
        .catch(error => {
          console.error(error)
          window.alert("Invalid Login Credentials")
          this.router.navigate(['/']).then(() => {
            window.location.reload()
          })
        })
    }, 1500);
  }
}
