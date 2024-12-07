import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { LugaresComponent } from './lugares/lugares.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { GraficosComponent } from './graficos/graficos.component';

export const routes: Routes = [

    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'usuarios',
        component: UsuariosComponent
    },
    {
        path: 'lugares',
        component: LugaresComponent
    },
    {
        path: 'administracion',
        component: AdministracionComponent
    },
    {
        path: 'graficos',
        component: GraficosComponent
    },
    {
        path: '**',
        redirectTo: 'login'
    },
    {
        path: '*',
        redirectTo: 'login'
    }
];
