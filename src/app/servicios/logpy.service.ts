import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogpyService {
  datosSesion = {}
  constructor(private http:HttpClient){}

/* LOGIN */
  guardarSesion(respuesta: any): any{
    const objetoJSON = JSON.stringify(respuesta);
    // Guarda la cadena JSON en el local storage
    localStorage.setItem("session", objetoJSON);
  }

  recuperarDatosUser():any{
    const valor = localStorage.getItem('session');
    if (valor) {
      try {
        return JSON.parse(valor);
      } catch (error) {
        console.error('Error al parsear los datos del usuario:', error);
        return null;
      }
    }
    return null;
  }

  validarSesion(){
    const valor = localStorage.getItem('session');
    return valor !== null;
  }

  cerrarSesion(): any{
    localStorage.removeItem('session');
    return true
  }


  getLogIn(username: string, passrd: string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const params = new HttpParams()
        .set('username', username)
        .set('pass', passrd);
    return this.http.get<any>('http://127.0.0.1:5000/loginDash',{ headers, params });
  }
/* LOGIN */

/* HOME */
  conteoUsersDash(): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<any>('http://127.0.0.1:5000/countUsersDash',{ headers });
  }
/* HOME */

/* USER DASH */
  registerUserDash(fullName: string, username: string, email: string, password: string, nivel: string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = {
        fullName: fullName,
        username: username,
        email: email,
        password: password,
        nivel: nivel
    };
    return this.http.post<any>('http://127.0.0.1:5000/registeruserdash', body, { headers });
  }

  getUsersDash(): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<any>('http://127.0.0.1:5000/getusersdash',{ headers });
  }

  deleteUsersDash(id:string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const params = new HttpParams()
        .set('id', id);
    return this.http.delete<any>('http://127.0.0.1:5000/deleteusersdash',{ headers, params });
  }

  sendeditedData(id:string, fullName: string, username: string, email: string, password: string, nivel: string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = {
        id: id,
        fullName: fullName,
        username: username,
        email: email,
        password: password,
        nivel: nivel
    };
    return this.http.put<any>('http://127.0.0.1:5000/editaruserdash', body, { headers });
  }
  
  getOneDash(id:string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const params = new HttpParams()
    .set('id', id);
    return this.http.get<any>('http://127.0.0.1:5000/getonesdash',{ headers, params });
  }

/* USER DASH */


/* USER FINDE */
  registerUserDashFinde(fullName: string, email: string, telefono: string, suscripción: string, 
    datebirth: string, direccion: string, estado: string, cp: string, password: string, genero: string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = {
        fullName: fullName,
        email: email,
        telefono: telefono,
        suscripción: suscripción,
        datebirth: datebirth,
        direccion: direccion,
        estado: estado,
        cp: cp,
        password: password,
        genero: genero
    };
    return this.http.post<any>('http://127.0.0.1:5000/registeruserdashfinde', body, { headers });
  }

  getUsersDashFinde(): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<any>('http://127.0.0.1:5000/getusersdashFinde',{ headers });
  }

  deleteUsersDashFinde(id:string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const params = new HttpParams()
        .set('id', id);
    return this.http.delete<any>('http://127.0.0.1:5000/deleteusersdashfinde',{ headers, params });
  }

  sendeditedDataFinde(id:string, fullName: string, email: string, telefono: string, suscripción: string, 
    datebirth: string, direccion: string, estado: string, cp: string, password: string, genero: string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = {
      id: id,
      fullName: fullName,
      email: email,
      telefono: telefono,
      suscripción: suscripción,
      datebirth: datebirth,
      direccion: direccion,
      estado: estado,
      cp: cp,
      password: password,
      genero: genero
  };
    return this.http.put<any>('http://127.0.0.1:5000/editaruserdashfinde', body, { headers });
  }
  
  getOneDashFinde(id:string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const params = new HttpParams()
    .set('id', id);
    return this.http.get<any>('http://127.0.0.1:5000/getonesdashfinde',{ headers, params });
  }

/* USER FINDE */



/* USER GRÁFICOS */
conteoData01(): Observable<any>{
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  return this.http.get<any>('http://127.0.0.1:5000/conteoData01',{ headers });
}

conteoData02(): Observable<any>{
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  return this.http.get<any>('http://127.0.0.1:5000/conteoData02',{ headers });
}

conteoData03(): Observable<any>{
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  return this.http.get<any>('http://127.0.0.1:5000/conteoData03',{ headers });
}
/* USER GRÁFICOS */



/* PLACE FINDE */

getPlacesDashFinde(): Observable<any>{
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  return this.http.get<any>('http://127.0.0.1:5000/getPlacesDashFinde',{ headers });
}
deletePlaceDash(id:string): Observable<any>{
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  const params = new HttpParams()
      .set('id', id);
  return this.http.delete<any>('http://127.0.0.1:5000/deletePlaceDash',{ headers, params });
}
registerPlaceDash(fullName: string, email: string, password: string, comentarios: string, 
  calificacion: string, categorias: string, palabras: string, descripcion: string, 
  direccion: string, link: string, longitud: string, latitud: string, 
  lunesT: string, martesT: string, miercolesT: string, juevesT: string, viernesT: string, 
  sabadoT: string, domingoT: string): Observable<any>{
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  const body = {
      fullName: fullName, email: email,
      password: password, comentarios: comentarios,
      calificacion: calificacion, categorias: categorias,
      palabras: palabras, direccion: direccion,
      link: link, descripcion: descripcion,
      longitud: longitud, latitud: latitud,
      lunesT: lunesT, martesT: martesT,
      miercolesT: miercolesT, juevesT: juevesT,
      viernesT: viernesT, sabadoT: sabadoT,
      domingoT: domingoT,
  };
  return this.http.post<any>('http://127.0.0.1:5000/registerPlaceDash', body, { headers });
}
/* PLACE FINDE */
}
