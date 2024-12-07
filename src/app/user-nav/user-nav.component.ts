import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LogpyService } from '../servicios/logpy.service';
@Component({
  selector: 'app-user-nav',
  standalone: true,
  imports: [NgIf],
  providers:[LogpyService,],
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.css'
})
export class UserNavComponent {

  datasesion: any = {};
  nombre:string = ''

  ses:any = {}

  currentDate: { day: number, month: number, year: number };
  currentTime: { hours: number, minutes: number };

  constructor(private apiservice:LogpyService, private router: Router){
    this.currentDate = this.getCurrentDate();
    this.currentTime = this.getCurrentTime();
  }

  ngOnInit(): void {

    this.ses = this.apiservice.recuperarDatosUser();
    console.log(this.ses.alumnos[0].nombre);

  }


  cerrarSesion(){
    if(this.apiservice.cerrarSesion()){
      this.router.navigate(['/login']);
    }
  }

  getCurrentDate(): { day: number, month: number, year: number } {
    const today = new Date();
    return {
        day: today.getDate(),
        month: today.getMonth() + 1,
        year: today.getFullYear()
    };
  }

  getCurrentTime(): { hours: number, minutes: number } {
      const now = new Date();
      return {
          hours: now.getHours(),
          minutes: now.getMinutes()
      };
  }
}
