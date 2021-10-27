import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderbannerComponent } from 'src/app/components/headerbanner/headerbanner.component';
import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
    //declaro las rutas hijas (children) que se cargaran en Page/Login
    children:[
      {
        path: '',
        component: HeaderbannerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
