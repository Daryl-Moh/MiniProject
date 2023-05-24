import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EmailService } from 'src/app/services/email.service';
import { MemeComponent } from '../meme/meme.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { PaypalComponent } from '../paypal/paypal.component';

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
    
    this.mapOptions = {
      center: { lat: 1.292056, lng: 103.776512 }, // Set the initial map center
      zoom: 15 // Set the initial zoom level
    }
    this.markerOptions = { 
      position: { lat: 1.292056, lng: 103.776512 },
      animation: google.maps.Animation.BOUNCE
    }
  }

  sendEmail(): void {
    if(!this.authSvc.isLoggedIn) {
      window.alert("Please login or register an account first")
      this.router.navigate(["/login"])
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
