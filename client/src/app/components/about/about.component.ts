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

  constructor(private router: Router) {}

  ngOnInit(): void {
 
  }
}
