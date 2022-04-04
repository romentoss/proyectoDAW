import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './layout/base-layout/base-layout/base-layout.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout/login-layout.component';
import { ViewBaseComponent } from './views/viewBase/view-base/view-base.component';
import { ViewLoginComponent } from './views/viewLogin/view-login/view-login.component';
const routes: Routes = [
  {
    path: 'home',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: ViewBaseComponent
      }
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      {
        path: 'login',
        component: ViewLoginComponent
      }
    ]
  },
  {
    path: '**',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: ViewBaseComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
