import { Component } from '@angular/core';
import { UserNavComponent } from "../user-nav/user-nav.component";
import { NavComponent } from "../nav/nav.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LogpyService } from '../servicios/logpy.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [UserNavComponent, NavComponent, ReactiveFormsModule, NgFor, NgIf],
  providers:[LogpyService],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

  registerForm!: FormGroup;
  updateForm!: FormGroup;
  fatal = false;
  registrar = true;
  actualizar = false;
  ses:any = {}
  dataus: any = {}

  adminsArray: any[] = [];
  adminModify:any = {}

  constructor(private apiservice:LogpyService, private router: Router){
    this.initForm();

    this.ses = this.apiservice.validarSesion();
    if (this.ses == false) {
      this.router.navigate(['/login']);
    }
    this.dataus = this.apiservice.recuperarDatosUser();
    if(this.dataus.alumnos[0].nivel == 'Lectura'){
      this.router.navigate(['/home']);
    }
  }

  initForm(){
    this.registerForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      suscripción : new FormControl('', Validators.required),
      datebirth : new FormControl('', Validators.required),
      direccion : new FormControl('', Validators.required),
      estado : new FormControl('', Validators.required),
      cp : new FormControl('', Validators.required),
      password : new FormControl('', Validators.required),
      genero : new FormControl('', Validators.required),
    });
    this.updateForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      id_user: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      suscripción : new FormControl('', Validators.required),
      datebirth : new FormControl('', Validators.required),
      direccion : new FormControl('', Validators.required),
      estado : new FormControl('', Validators.required),
      cp : new FormControl('', Validators.required),
      password : new FormControl('', Validators.required),
      genero : new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.apiservice.getUsersDashFinde().subscribe({
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
    this.apiservice.getUsersDashFinde().subscribe({
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

    this.apiservice.registerUserDashFinde(
      this.registerForm.value.fullName,
      this.registerForm.value.email,
      this.registerForm.value.telefono,
      this.registerForm.value.suscripción,
      this.registerForm.value.datebirth,
      this.registerForm.value.direccion,
      this.registerForm.value.estado,
      this.registerForm.value.cp,
      this.registerForm.value.password,
      this.registerForm.value.genero
    ).subscribe({
        next: response=>{
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
    this.apiservice.deleteUsersDashFinde(
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
    this.apiservice.getOneDashFinde(id).subscribe({
      next: response=>{
        console.log('Respuesta: ACTUALIZAR ', response)
        console.log(response.mensaje)
        this.adminModify = response.admin

        this.updateForm.patchValue({
          fullName: this.adminModify.nombre,
          email: this.adminModify.correo,
          telefono: this.adminModify.telefono,
          suscripción: this.adminModify.suscripcion,
          datebirth: this.adminModify.fecha_nacimiento,
          direccion: this.adminModify.direccion,
          estado: this.adminModify.estado,
          cp: this.adminModify.cp,
          password: this.adminModify.contra,
          genero: this.adminModify.genero,
          id_user: this.adminModify.id,
        });
        
      },
      error: error=>{
        console.log('error');
        console.log(error);
      }
    }); 
  }

  sendeditedData(){
    this.apiservice.sendeditedDataFinde(
      this.updateForm.value.id_user,
      this.updateForm.value.fullName,
      this.updateForm.value.email,
      this.updateForm.value.telefono,
      this.updateForm.value.suscripción,
      this.updateForm.value.datebirth,
      this.updateForm.value.direccion,
      this.updateForm.value.estado,
      this.updateForm.value.cp,
      this.updateForm.value.password,
      this.updateForm.value.genero
    ).subscribe({
        next: response=>{
          console.log('Respuesta: EDITADO', response)
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
