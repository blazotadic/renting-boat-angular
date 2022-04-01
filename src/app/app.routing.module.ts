import { LoginComponent } from './login/app.login';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegisterComponent } from './register/app.register';

const routes: Routes = [
    {
      path: 'login', // http://localhost:4200/login
      component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
      path: '**', redirectTo: 'login' 
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }