import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { EmailService } from 'src/app/services/email.service';

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
    private emailSvc: EmailService) {}

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
    }
  }

}
