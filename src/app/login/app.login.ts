import { Login } from './models/login.model';
import { Component } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './app.login.html',
  styleUrls: []
})
export class LoginComponent {
  router: any;

  constructor(
    private userServise: UserService
  ) {}

  login(loginForm: any){
    const loginData: Login = loginForm.value;
    this.userServise.authenticate(loginData)
      .subscribe(data => { 
        //this.router.navigate(['register']);
        console.log(data);
      }, error => {
        console.log('Error occurred. Error data: ', error);
      });
  }
}
