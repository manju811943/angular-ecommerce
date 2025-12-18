import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

    loginFormGroup: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private  loginService : LoginService,
                private router: Router
    ) {
      this.loginFormGroup = this.formBuilder.group({
        login: this.formBuilder.group({
          username: ['', [Validators.required]],
          password: ['', [Validators.required]]
        })
      });
    }

    ngOnInit(){
     
      
    }

    onSubmit() {
      if (this.loginFormGroup.valid) {
        const loginData = this.loginFormGroup.get('login')?.value;
        console.log('Login Data:', loginData);
        
        this.loginService.login(loginData).subscribe(result=>{
          console.log("login details=>", result);
          this.router.navigate(['/category']);
        })
      } else {
        console.log('Form is invalid');
      }
   }
}
