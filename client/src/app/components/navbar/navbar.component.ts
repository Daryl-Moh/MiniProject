import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

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
    private authSvc: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authSvc.isLoggedIn
    this.givenname = this.authSvc.givenname
    console.log("userName >>> " + this.givenname)
    console.log("login status >>> " + this.isLoggedIn)
    if (this.authSvc.isLoggedIn == false) {
      this.router.navigate(['/login'])
    } 
    this.router.events.subscribe((event) => 
    this.isLoggedIn = this.authSvc.isLoggedIn)
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  logout() {
    this.authSvc.logout()
    window.location.reload()
  }
  
}
