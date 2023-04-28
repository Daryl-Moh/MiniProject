import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list.component';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar.component';
import { SearchComponent } from './components/search.component';
import { PortfolioComponent } from './components/portfolio.component';

const routes: Routes = [
  { path: 'list', component: ListComponent},
  { path: 'search', component: SearchComponent},
  { path: 'portfolio', component: PortfolioComponent},
  { path: "**", redirectTo: "", pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
