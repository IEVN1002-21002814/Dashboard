import { Component } from '@angular/core';
import { UserNavComponent } from "../user-nav/user-nav.component";
import { NavComponent } from "../nav/nav.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LogpyService } from '../servicios/logpy.service';

@Component({
  selector: 'app-lugares',
  standalone: true,
  imports: [UserNavComponent, NavComponent, ReactiveFormsModule, NgFor, NgIf],
  providers:[LogpyService],
  templateUrl: './lugares.component.html',
  styleUrl: './lugares.component.css'
})
export class LugaresComponent {
  registerForm!: FormGroup;
  updateForm!: FormGroup;
  fatal = false;
  registrar = true;
  actualizar = false;
  ses:any = {}
  dataus: any = {}

  isOpen: { [key: string]: boolean } = {
    lunes: false,
    martes: false,
    miercoles: false,
    jueves: false,
    viernes: false,
    sabado: false,
    domingo: false,
  };

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
      password: new FormControl('', Validators.required),
      comentarios: new FormControl('', Validators.required),
      calificacion: new FormControl('', Validators.required),
      categorias: new FormControl('', Validators.required),
      palabras : new FormControl('', Validators.required),
      descripcion : new FormControl('', Validators.required),
      direccion : new FormControl('', Validators.required),
      link : new FormControl('', Validators.required),
      longitud : new FormControl('', Validators.required),
      latitud : new FormControl('', Validators.required),
      lunesHorario : new FormControl('close', Validators.required),
      OPlunes : new FormControl('', Validators.required),
      CLOlunes : new FormControl('', Validators.required),
      martesHorario : new FormControl('close', Validators.required),
      OPmartes : new FormControl('', Validators.required),
      CLOmartes : new FormControl('', Validators.required),
      miercolesHorario : new FormControl('close', Validators.required),
      OPmiercoles : new FormControl('', Validators.required),
      CLOmiercoles : new FormControl('', Validators.required),
      juevesHorario : new FormControl('close', Validators.required),
      OPjueves : new FormControl('', Validators.required),
      CLOjueves : new FormControl('', Validators.required),
      viernesHorario : new FormControl('close', Validators.required),
      OPviernes : new FormControl('', Validators.required),
      CLOviernes : new FormControl('', Validators.required),
      sabadoHorario : new FormControl('close', Validators.required),
      OPsabado : new FormControl('', Validators.required),
      CLOsabado : new FormControl('', Validators.required),
      domingoHorario : new FormControl('close', Validators.required),
      OPdomingo : new FormControl('', Validators.required),
      CLOdomingo : new FormControl('', Validators.required),
    });
    /* this.updateForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      comentarios: new FormControl('', Validators.required),
      calificacion: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      categorias: new FormControl('', Validators.required),
      palabras : new FormControl('', Validators.required),
      descripcion : new FormControl('', Validators.required),
      direccion : new FormControl('', Validators.required),
      link : new FormControl('', Validators.required),
      longitud : new FormControl('', Validators.required),
      latitud : new FormControl('', Validators.required),
      lunesHorario : new FormControl('close', Validators.required),
      OPLunes : new FormControl('', Validators.required),
      CLOLunes : new FormControl('', Validators.required),
      martesHorario : new FormControl('close', Validators.required),
      OPmartes : new FormControl('', Validators.required),
      CLOmartes : new FormControl('', Validators.required),
      miercolesHorario : new FormControl('close', Validators.required),
      OPmiercoles : new FormControl('', Validators.required),
      CLOmiercoles : new FormControl('', Validators.required),
      juevesHorario : new FormControl('close', Validators.required),
      OPjueves : new FormControl('', Validators.required),
      CLOjueves : new FormControl('', Validators.required),
      viernesHorario : new FormControl('close', Validators.required),
      OPviernes : new FormControl('', Validators.required),
      CLOviernes : new FormControl('', Validators.required),
      sabadoHorario : new FormControl('close', Validators.required),
      OPsabado : new FormControl('', Validators.required),
      CLOsabado : new FormControl('', Validators.required),
      domingoHorario : new FormControl('close', Validators.required),
      OPdomingo : new FormControl('', Validators.required),
      CLOdomingo : new FormControl('', Validators.required),
    }) */
  }

  ngOnInit(): void {
    this.recargarDatos();
  }

  recargarDatos(){
    this.apiservice.getPlacesDashFinde().subscribe({
        next: response=>{
          console.log('Respuesta: GET ', response)
          console.log(response.mensaje)
          this.adminsArray = response.lugares
        },
        error: error=>{
          console.log('error');
          console.log(error);
        }
      });  
  }

  onSubmit(){
    console.log(this.registerForm)
    let lunesT: any, martesT: any, miercolesT: any, juevesT: any, viernesT: any, sabadoT: any, domingoT: any;
    lunesT = this.validarHorarios(this.registerForm.value.lunesHorario, 'lunes');
    martesT = this.validarHorarios(this.registerForm.value.martesHorario, 'martes');
    miercolesT = this.validarHorarios(this.registerForm.value.miercolesHorario, 'miercoles');
    juevesT = this.validarHorarios(this.registerForm.value.juevesHorario, 'jueves');
    viernesT = this.validarHorarios(this.registerForm.value.viernesHorario, 'viernes');
    sabadoT = this.validarHorarios(this.registerForm.value.sabadoHorario, 'sabado');
    domingoT = this.validarHorarios(this.registerForm.value.domingoHorario, 'domingo');

    /* console.log(
      this.registerForm.value.fullName,
      this.registerForm.value.email,
      this.registerForm.value.password,
      this.registerForm.value.comentarios,
      this.registerForm.value.calificacion,
      this.registerForm.value.categorias,
      this.registerForm.value.palabras,
      this.registerForm.value.descripcion,
      this.registerForm.value.direccion,
      this.registerForm.value.link,
      this.registerForm.value.longitud,
      this.registerForm.value.latitud,
      lunesT,
      martesT
    ); */
    this.apiservice.registerPlaceDash(
      this.registerForm.value.fullName,
      this.registerForm.value.email,
      this.registerForm.value.password,
      this.registerForm.value.comentarios,
      this.registerForm.value.calificacion,
      this.registerForm.value.categorias,
      this.registerForm.value.palabras,
      this.registerForm.value.descripcion,
      this.registerForm.value.direccion,
      this.registerForm.value.link,
      this.registerForm.value.longitud,
      this.registerForm.value.latitud,
      lunesT,
      martesT,
      miercolesT,
      juevesT,
      viernesT,
      sabadoT,
      domingoT,
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

  validarHorarios(imeDia:any, dia:string):any{
    let res:any = '-';
    if (imeDia == 'open') {
      let apertura:any = this.registerForm.get(`OP${dia}`)?.value;
      let cierre:any = this.registerForm.get(`CLO${dia}`)?.value;

      res = apertura + '-' + cierre;
    }
    return res;
  }
  deletePlaceDash(id:string){
    this.apiservice.deletePlaceDash(
      id
    ).subscribe({
        next: response=>{
          console.log('Respuesta: ', response)
          console.log(response.mensaje)

          if (response.exito == true) {
            this.recargarDatos();
          }          
        },
        error: error=>{
          console.log('error');
          console.log(error);
        }
      }); 
  }

  editarUsersDash(id:string){
    /* this.registrar = false;
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
    });  */
  }

  sendeditedData(){
    /* this.apiservice.sendeditedDataFinde(
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
      });  */
  }

  cancelEditing(){
    this.registrar = true;
    this.actualizar = false;
  }


  toggleInputs(dion: string): void {
    const selectedValue = this.registerForm.get(`${dion}Horario`)?.value;
    this.isOpen[dion] = selectedValue === 'open';
  }
}
