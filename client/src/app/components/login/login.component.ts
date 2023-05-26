import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

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
          Swal.fire({
            title: 'Login Sucessful',
            text: "Welcome Back " + this.authSvc.givenname,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Confirm'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/home'])
            } if (result.isDismissed) {
              this.router.navigate(['/home'])
            }
          })
          this.isLoggedIn = this.authSvc.isLoggedIn
        })
        .catch(error => {
          console.error(error)
          Swal.fire({
            title: 'Login Failed',
            text: "E-mail or Password may be incorrect",
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Try Again'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/login']).then(() => {
                location.reload()
              })
            } 
            if (result.isDismissed) {
              this.router.navigate(['/login']).then(() => {
                location.reload()
              })
            }
          })
        })
    }, 1500);
  }
}
