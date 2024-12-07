import { Component } from '@angular/core';
import { UserNavComponent } from "../user-nav/user-nav.component";
import { NavComponent } from "../nav/nav.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LogpyService } from '../servicios/logpy.service';

@Component({
  selector: 'app-administracion',
  standalone: true,
  imports: [UserNavComponent, NavComponent, ReactiveFormsModule, NgFor, NgIf],
  providers:[LogpyService],
  templateUrl: './administracion.component.html',
  styleUrl: './administracion.component.css'
})
export class AdministracionComponent {
  registerForm!: FormGroup;
  updateForm!: FormGroup;
  fatal = false;
  registrar = true;
  actualizar = false;
  ses:any = {}
  dataus: any = {}
  adminsArray: any[] = [];
  /* adminModify: any[] = []; */
  adminModify:any = {}

  constructor(private apiservice:LogpyService, private router: Router){
    this.initForm();
    this.ses = this.apiservice.validarSesion();
    if (this.ses == false) {
      this.router.navigate(['/login']);
    }
    this.dataus = this.apiservice.recuperarDatosUser();
    if(this.dataus.alumnos[0].nivel !== 'Admin'){
      this.router.navigate(['/home']);
    }
  }

  initForm(){
    this.registerForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password : new FormControl('', Validators.required),
      nivel : new FormControl('', Validators.required),
    });
    this.updateForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password : new FormControl('', Validators.required),
      nivel : new FormControl('', Validators.required),
      id_admin : new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.apiservice.getUsersDash().subscribe({
        next: response=>{
          console.log('Respuesta: GET ', response)
          console.log(response.mensaje)
          this.adminsArray = response.admins
        },
        error: error=>{
          console.log('error');
          console.log(error);
        }
      }); 
  }

  recargarDatos(){
    this.apiservice.getUsersDash().subscribe({
      next: response=>{
        console.log('Respuesta: GET ', response)
        console.log(response.mensaje)
        this.adminsArray = response.admins
      },
      error: error=>{
        console.log('error');
        console.log(error);
      }
    }); 
  }

  onSubmit(){

    this.apiservice.registerUserDash(
      this.registerForm.value.fullName,
      this.registerForm.value.username,
      this.registerForm.value.email,
      this.registerForm.value.password,
      this.registerForm.value.nivel
    ).subscribe({
        next: response=>{
          console.log('Respuesta: ', response)
          console.log(response.mensaje)

          if (response.exito == false) {
            this.fatal = true;
          }
          else{
            this.recargarDatos()
          }
          
        },
        error: error=>{
          console.log('error');
          console.log(error);
        }
      }); 
  }



  deleteUsersDash(id:string){
    this.apiservice.deleteUsersDash(
      id
    ).subscribe({
        next: response=>{
          console.log('Respuesta: ', response)
          console.log(response.mensaje)

          if (response.exito == true) {
            this.recargarDatos()
          }          
        },
        error: error=>{
          console.log('error');
          console.log(error);
        }
      }); 
  }

  editarUsersDash(id:string){
    this.registrar = false;
    this.actualizar = true;
    console.log(id)
    this.apiservice.getOneDash(id).subscribe({
      next: response=>{
        console.log('Respuesta: ACTUALIZAR ', response)
        console.log(response.mensaje)
        this.adminModify = response.admin

        this.updateForm.patchValue({
          fullName: this.adminModify.nombre,
          username: this.adminModify.username,
          email: this.adminModify.correo,
          password: this.adminModify.contrasenia,
          nivel: this.adminModify.nivel,
          id_admin: this.adminModify.id,
        });
        
      },
      error: error=>{
        console.log('error');
        console.log(error);
      }
    }); 
  }

  sendeditedData(){
    this.apiservice.sendeditedData(
      this.updateForm.value.id_admin,
      this.updateForm.value.fullName,
      this.updateForm.value.username,
      this.updateForm.value.email,
      this.updateForm.value.password,
      this.updateForm.value.nivel
    ).subscribe({
        next: response=>{
          console.log('Respuesta: EDITAR', response)
          console.log(response.mensaje)
          if (response.exito == true) {
            this.recargarDatos()
          } 
        },
        error: error=>{
          console.log('error');
          console.log(error);
        }
      }); 
  }

  cancelEditing(){
    this.registrar = true;
    this.actualizar = false;
  }

}
