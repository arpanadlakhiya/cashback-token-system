import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { PaymentboardComponent } from './components/paymentboard/paymentboard.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  {
    path : '', loadChildren : () =>
    import('./components/public/public.module').then((m) => m.PublicModule)
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: UserRegistrationComponent,
  },
  {
    path: 'paymentdashboard',
    component: PaymentboardComponent,
  },
  {
    path: 'userdetails',
    component: UserListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
