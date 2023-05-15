import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { timeout } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  isLoggedIn: boolean = false

  constructor(
    private authSvc: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authSvc.isLoggedIn
    console.log("login status >>> " + this.isLoggedIn)
    if (this.authSvc.isLoggedIn == false) {
      this.router.navigate(['/login'])
    }
  }
}
