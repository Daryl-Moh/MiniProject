import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  form!: FormGroup
  stockName?: String
  isLoading: boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authSvc: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.checkLoggedIn()
    this.form = this.createForm();
  }

  search() {
    this.isLoading = true;
    setTimeout(() => {
      const stockName = this.form?.value['stockName'];
      console.log('[search] navigating to /list >>> charName = ' + stockName);
      this.router.navigate(['/list', stockName]);
    }, 2000);
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      stockName: this.formBuilder.control('', [Validators.required]),
    })
  }

  checkLoggedIn(): void {
    this.isLoggedIn = this.authSvc.isLoggedIn
    if (!this.authSvc.isLoggedIn) {
      window.alert("[ ACESS DENIED ] \n You are not logged in yet.")
      this.router.navigate(['/login']).then(() => {
        window.location.reload()
      })
    }
  }
}
