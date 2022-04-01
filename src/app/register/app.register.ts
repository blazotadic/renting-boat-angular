import { UserService } from 'src/app/service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Register } from './models/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './app.register.html',
  styleUrls: ['app.register.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private userService: UserService
    ){}

  adminInput: boolean = false;
  registerForm!: FormGroup;

  ngOnInit(): void {
    this.initializeForm();
  }
  
  createUser(): void {
    console.log(this.registerForm);
    const registerData: Register = this.registerForm.value;
    this.userService.register(registerData)
      .subscribe(data => { 
        console.log(data);
      }, error => {
        console.log('Error occurred. Error data: ', error);
      });
  }
  adminButton(){
    this.adminInput=!this.adminInput
  }

  private initializeForm(): void {
    this.registerForm = new FormGroup({	
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      username: new FormControl(null, [Validators.required, Validators.minLength(6)]),	
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      adminPassword: new FormControl(null),
    });
  }
}
