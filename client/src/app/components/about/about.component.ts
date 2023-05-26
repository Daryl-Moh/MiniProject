import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EmailService } from 'src/app/services/email.service';
import { MemeComponent } from '../meme/meme.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { PaypalComponent } from '../paypal/paypal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  
  mapOptions!: google.maps.MapOptions;
  markerOptions!: google.maps.MarkerOptions;
  
  constructor(
    private router: Router,
    private authSvc: AuthService,
    private emailSvc: EmailService,
    public dialog: MatDialog,
    private _bottomSheet: MatBottomSheet) {}

  ngOnInit(): void {
    
  }

  sendEmail(): void {
    if(!this.authSvc.isLoggedIn) {
      Swal.fire({
        icon: 'info',
        title: 'Oh no! It seems you do not have an account with us',
        text: "Sign up with us or login first",
        showDenyButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Login',
        denyButtonColor: '#3085d6',
        denyButtonText: 'Register'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login'])
        } 
        if (result.isDenied) {
          this.router.navigate(['/register'])
        } 
        if (result.dismiss) {
          this.router.navigate(['/about'])
        }
      })
    } else {
      this.emailSvc.sendEmail(this.authSvc.userID)
      window.alert("Thank you for your interest. \nWe will contact you within 3-5 business days.")
      this.router.navigate(["/home"])
    }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(MemeComponent, {
      width: '100%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openBottomSheet(): void {
    this._bottomSheet.open(PaypalComponent);
  }
}
