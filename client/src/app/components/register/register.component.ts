import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StockService } from 'src/app/services/stock.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup
  isLoggedIn: boolean = false
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authSvc: AuthService,
    private stockSvc: StockService,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.createForm()
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
    this.isLoading = true;
    setTimeout(() => {
    }, 2000);
    const givenname = this.registerForm.value['givenname']
    const familyname = this.registerForm.value['familyname']
    const email = this.registerForm.value['email']
    const password = this.registerForm.value['password']
    this.authSvc.register(givenname, familyname, email, password)
      .then(response => {
        console.log(response)
        localStorage.setItem("jwt", response['jwt'])
        this.stockSvc.savePortfolio(email).finally(() => {
          Swal.fire({
            title: 'Registration Successful!',
            text: "Welcome to Nyaa Rock Investments, " + this.authSvc.givenname,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Get Started'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/home'])
            } else {
              this.router.navigate(['/home'])
            }
          })
        })
      })
      .catch(error => {
        console.error(error)
        if (error.status === 409) {
          Swal.fire({
            title: 'Registration Failed',
            text: "This e-mail has already been registered.",
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Login'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/login']).then(() => {
                window.location.reload();
              })
            } else {
              this.router.navigate(['/login']).then(() => {
                window.location.reload();
              })
            }
          })
        } else {
          Swal.fire({
            title: 'Oops...',
            text: 'Something went wrong!',
            icon: 'error',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Retry'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/register']).then(() => {
                window.location.reload();
              })
            } else {
              this.router.navigate(['/register']).then(() => {
                window.location.reload();
              })
            }
          })
        }
      })
  }
}


