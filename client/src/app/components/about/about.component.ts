import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { timeout } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(
    private router: Router,
    private authSvc: AuthService,
    private emailSvc: EmailService) {}

  ngOnInit(): void {
    
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
