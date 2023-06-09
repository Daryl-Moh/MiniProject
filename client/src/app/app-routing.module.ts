import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { SearchComponent } from './components/search/search.component';
import { AboutComponent } from './components/about/about.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { OverviewComponent } from './components/overview/overview.component';
import { MapComponent } from './components/map/map.component';

const routes: Routes = [
  
  { path: '', component: HomeComponent},
  { path: 'list/:stockName', component: ListComponent},
  { path: 'search', component: SearchComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'about', component: AboutComponent},
  { path: 'map', component: MapComponent},
  { path: 'home', component: HomeComponent},
  { path: 'home/:stockName/:quantity', component: HomeComponent},
  { path: 'overview/:stockName', component: OverviewComponent},
  { path: "**", redirectTo: "/", pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
