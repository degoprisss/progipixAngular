import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRouterGuard } from './auth/auth-router.guard';
import { BiddingListComponent } from './components/bidding-list/bidding-list.component';
import { BiddingComponent } from './components/bidding/bidding.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent,  canActivate: [AuthRouterGuard] },
  { path: 'bidding/:id', component: BiddingComponent,  canActivate: [AuthRouterGuard] },
  { path: 'biddinglist', component: BiddingListComponent,  canActivate: [AuthRouterGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
