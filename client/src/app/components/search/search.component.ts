import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  form!: FormGroup
  stockName?: String
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,) { }

  ngOnInit(): void {
    this.form = this.createForm();
  }

  ngOnDestroy(): void {

  }

  search() {
    this.isLoading = true;
    setTimeout(() => {
    }, 2000);
    const stockName = this.form?.value['stockName'];
    console.log('[search] navigating to /list >>> charName = ' + stockName);
    this.router.navigate(['/list', stockName]);
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      stockName: this.formBuilder.control('', [Validators.required]),
    })
  }
}
