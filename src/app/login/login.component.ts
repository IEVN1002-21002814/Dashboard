import { Component, inject  } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { LogpyService } from '../servicios/logpy.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, NgIf],
  providers:[LogpyService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authForm!: FormGroup;
  fatal = false;
  ses:any = {}
  constructor(private apiservice:LogpyService, private router: Router){
    this.initForm();
    this.ses = this.apiservice.validarSesion();
    if (this.ses == false) {
      this.router.navigate(['/login']);
    }
    else{
      this.router.navigate(['/home']);
    }
  }

  initForm(){
    this.authForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password : new FormControl('', Validators.required),
    })
  }

  onSubmit(){
    this.apiservice.getLogIn(
      this.authForm.value.username,
      this.authForm.value.password
    ).subscribe({
        next: response=>{
          console.log('Respuesta: ', response)
          console.log(response.mensaje)

          if (response.exito == true) {
            this.apiservice.guardarSesion(response);
            this.fatal = false;
            this.router.navigate(['/home']);
          }
          else{
            this.fatal = true;
          }
          
          
        },
        error: error=>{
          console.log('error');
          this.fatal = true;
        }
      }); 
  }
}
