import { Component, OnInit } from '@angular/core';
import { UserNavComponent } from "../user-nav/user-nav.component";
import { NavComponent } from "../nav/nav.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { Chart, ChartType, registerables } from 'chart.js';
import { LogpyService } from '../servicios/logpy.service';

Chart.register(...registerables);

@Component({
  selector: 'app-graficos',
  standalone: true,
  imports: [UserNavComponent, NavComponent, ReactiveFormsModule],
  providers:[LogpyService],
  templateUrl: './graficos.component.html',
  styleUrl: './graficos.component.css'
})
export class GraficosComponent {
  ses:any = {}

  public suscripcionesBar?: Chart;
  public suscripcionesDona?: Chart;

  public generoBar?: Chart;
  public generoPie?: Chart;

  public estadoBar?: Chart;
  public estadoPie?: Chart;
  

  constructor(private apiservice:LogpyService, private router: Router){
    this.ses = this.apiservice.validarSesion();
    if (this.ses == false) {
      this.router.navigate(['/login']);
    }    
  }
  ngOnInit():void{
    
    this.conteoSuscripcion();

    this.conteoGenero();

    this.conteoEstado();
    
  }



  /* CONTEO SUSCRIPCION */
  conteoSuscripcion(){
    this.apiservice.conteoData01().subscribe({
      next: response=>{
        console.log(response)
        let label: string[] = [];
        let data: number[] = [];
        let sumatorio:number = 0;

        for (let i = 0; i < response.conteoSuscripcion.length; i++) {
          label.push(response.conteoSuscripcion[i].suscripcion);
          data.push(response.conteoSuscripcion[i].conteo);
        }

        this.chartSuscripcionPie(label, data);

        label.push('Total');
        sumatorio = data.reduce((acc, value) => acc + value, 0);
        data.push(sumatorio);

        this.chartSuscripcionBars(label, data);
        label = [];
        data = [];
        sumatorio = 0;
      },
      error: error=>{
        console.log('error');
        console.log(error);
      }
    }); 
  }
  chartSuscripcionBars(label: string[], data: number[]){
    this.suscripcionesBar = new Chart("suscripcionesBar", {
      type: 'bar' as ChartType, 
      data: {
        labels: label,
        datasets: [
          {
            label: 'Suscripciones por Usuario',
            data: data,
            backgroundColor: [
              '#740b0fa2',
              '#f17478a2',
              '#ed454ba2',
              '#e92027a2',
              '#d1151ba2',
              '#a21015a2',
              '#2e0506a2'
            ],
            borderColor: [
              '#740b0f',
              '#f17478',
              '#ed454b',
              '#e92027',
              '#d1151b',
              '#a21015',
              '#2e0506'
            ],
            borderRadius: 5,
            borderWidth: 2
          }
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  chartSuscripcionPie(label: string[], data: number[]){
    this.suscripcionesDona = new Chart("suscripcionesDona", {
      type: 'pie' as ChartType, 
      data: {
        labels: label,
        datasets: [
          {
            label: 'Suscripciones',
            data: data,
            backgroundColor: [
              '#740b0fa2',
              '#f17478a2',
              '#ed454ba2',
              '#e92027a2',
              '#d1151ba2',
              '#a21015a2',
              '#2e0506a2'
            ],
            borderColor: [
              '#740b0f',
              '#f17478',
              '#ed454b',
              '#e92027',
              '#d1151b',
              '#a21015',
              '#2e0506'
            ],
            borderRadius: 5,
            borderWidth: 2
          }
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  /* CONTEO SUSCRIPCION */ 

/* CONTEO GENERO */
  conteoGenero(){
    this.apiservice.conteoData02().subscribe({
      next: response=>{
        let label: string[] = [];
        let data: number[] = [];
        let sumatorio:number = 0;

        for (let i = 0; i < response.conteoGenero.length; i++) {
          label.push(response.conteoGenero[i].genero);
          data.push(response.conteoGenero[i].conteo);
        }

        this.chartGeneroPie(label, data);

        label.push('Total');
        sumatorio = data.reduce((acc, value) => acc + value, 0);
        data.push(sumatorio);

        this.chartGeneroBars(label, data); 
      },
      error: error=>{
        console.log('error');
        console.log(error);
      }
    }); 
  }
  chartGeneroBars(label: string[], data: number[]){
    this.generoBar = new Chart("generoBar", {
      type: 'bar' as ChartType, 
      data: {
        labels: label,
        datasets: [
          {
            label: 'Genero por Usuario',
            data: data,
            backgroundColor: [
              '#740b0fa2',
              '#f17478a2',
              '#ed454ba2',
              '#e92027a2',
              '#d1151ba2',
              '#a21015a2',
              '#2e0506a2'
            ],
            borderColor: [
              '#740b0f',
              '#f17478',
              '#ed454b',
              '#e92027',
              '#d1151b',
              '#a21015',
              '#2e0506'
            ],
            borderRadius: 5,
            borderWidth: 2
          }
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  chartGeneroPie(label: string[], data: number[]){
    this.generoPie = new Chart("generoPie", {
      type: 'pie' as ChartType, 
      data: {
        labels:label,
        datasets: [
          {
            label: 'Suscripciones',
            data: data,
            backgroundColor: [
              '#740b0fa2',
              '#f17478a2',
              '#ed454ba2',
              '#e92027a2',
              '#d1151ba2',
              '#a21015a2',
              '#2e0506a2'
            ],
            borderColor: [
              '#740b0f',
              '#f17478',
              '#ed454b',
              '#e92027',
              '#d1151b',
              '#a21015',
              '#2e0506'
            ],
            borderRadius: 5,
            borderWidth: 2
          }
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  /* CONTEO GENERO */

  /* CONTEO ESTADO */
  conteoEstado(){
    this.apiservice.conteoData03().subscribe({
      next: response=>{
        let labelEs: string[] = [];
        let dataEs: number[] = [];
        let sumatorio:number = 0;

        for (let i = 0; i < response.conteoEstado.length; i++) {
          labelEs.push(response.conteoEstado[i].estado);
          dataEs.push(response.conteoEstado[i].conteo);
        }

        this.chartEstadoPie(labelEs, dataEs);
        console.log(labelEs, dataEs)

        let label2: string[] = [];
        let data2: number[] = [];

        label2 = labelEs;
        label2.push('Total');
        sumatorio = dataEs.reduce((acc, value) => acc + value, 0);
        data2 = dataEs;
        data2.push(sumatorio);

        this.chartEstadoBars(label2, data2);
      },
      error: error=>{
        console.log('error');
        console.log(error);
      }
    }); 
  }
  chartEstadoBars(labelEs: string[], dataEs: number[]){
    this.estadoBar = new Chart("estadoBar", {
      type: 'bar' as ChartType, 
      data: {
        labels: labelEs,
        datasets: [
          {
            label: 'Estados por Usuario',
            data: dataEs,
            backgroundColor: [
              '#740b0fa2',
              '#f17478a2',
              '#ed454ba2',
              '#e92027a2',
              '#d1151ba2',
              '#a21015a2',
              '#2e0506a2'
            ],
            borderColor: [
              '#740b0f',
              '#f17478',
              '#ed454b',
              '#e92027',
              '#d1151b',
              '#a21015',
              '#2e0506'
            ],
            borderRadius: 5,
            borderWidth: 2
          }
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  chartEstadoPie(label2: string[], data2: number[]){
    this.estadoPie = new Chart("estadoPie", {
      type: 'pie' as ChartType, 
      data: {
        labels:label2,
        datasets: [
          {
            label: 'Suscripciones',
            data: data2,
            backgroundColor: [
              '#740b0fa2',
              '#f17478a2',
              '#ed454ba2',
              '#e92027a2',
              '#d1151ba2',
              '#a21015a2',
              '#2e0506a2'
            ],
            borderColor: [
              '#740b0f',
              '#f17478',
              '#ed454b',
              '#e92027',
              '#d1151b',
              '#a21015',
              '#2e0506'
            ],
            borderRadius: 5,
            borderWidth: 2
          }
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
   /* CONTEO ESTADO */



}
