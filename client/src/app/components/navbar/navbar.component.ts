import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false
  givenname!: string

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authSvc: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authSvc.isLoggedIn

    console.log("userName >>> " + this.givenname)
    console.log("login status >>> " + this.isLoggedIn)
    if (this.authSvc.isLoggedIn == false) {
      this.router.navigate(['/login'])
    }
    this.router.events.subscribe((event) => {
      this.isLoggedIn = this.authSvc.isLoggedIn
      this.givenname = this.authSvc.givenname
    })
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  logout() {
    Swal.fire({
      title: 'Account Logout',
      text: "Are you sure you want to logout?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authSvc.logout()
        Swal.fire({
          title: 'Logout Successful!',
          text: 'Thank you for using Nyaa Rock Investments',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Close'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/login'])
          } if (result.isDismissed) {
            this.router.navigate(['/login'])
          }
        })
      }
    })
  }
}

