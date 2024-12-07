import { Component } from '@angular/core';
import { UserNavComponent } from "../user-nav/user-nav.component";
import { NavComponent } from "../nav/nav.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LogpyService } from '../servicios/logpy.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UserNavComponent, NavComponent, HttpClientModule, NgIf, CommonModule],
  providers:[LogpyService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  ses:any = {}
  conUserDash:any = {}
  conLectura = 0;
  conSoporte = 0;
  conAdmin = 0;

  contPaog = 0;
  contGratuito = 0;
  contTotal = 0;

  constructor(private apiservice:LogpyService, private router: Router){   
  }

  ngOnInit(): void {
    this.ses = this.apiservice.validarSesion();
    if (this.ses == false) {
      this.router.navigate(['/login']);
    }
    this.conteoUserson();  
    this.conteoData01();  
  }


  conteoUserson(){
    this.conUserDash = this.apiservice.conteoUsersDash().subscribe({
        next:response=>{
          console.log('Respuesta: ', response)
          if (response.exito == true) {
            console.log('Conteo BIEN');
            console.log(response);
            this.contadorDashUsers(response);
          }
          else{
            console.log('Conteo MAL');
          }
        },
        error: error=>{
          console.log('Conteo MAL');
        }
      }); 
  }

  conteoData01(){
    this.apiservice.conteoData01().subscribe({
      next: response=>{
        console.log('Respuesta: Conteo ', response)
        console.log(response.mensaje)
        console.log(response.conteoSuscripcion[0].conteo)
        let sum:any =  response.conteoSuscripcion[0].conteo + response.conteoSuscripcion[1].conteo
        this.contPaog = response.conteoSuscripcion[0].conteo;
        this.contGratuito = response.conteoSuscripcion[1].conteo;
        this.contTotal = sum;

      },
      error: error=>{
        console.log('error');
        console.log(error);
      }
    }); 
  }


  contadorDashUsers(arr: any){
    if (arr.alumnos[0].nivel == "Admin") {
      this.conAdmin = arr.alumnos[0].conteo;
    }
    else{
      this.conAdmin = 0;
    }
    if (arr.alumnos[1].nivel == "Soporte") {
      this.conSoporte = arr.alumnos[1].conteo;
    }
    else{
      this.conSoporte = 0;
    }
    if (arr.alumnos[2].nivel == "Lectura") {
      this.conLectura = arr.alumnos[2].conteo;
    }
    else{
      this.conLectura = 0;
    }
  }



  

  

  


  
}
