import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PorCapitalComponent } from './paises/pages/por-capital/por-capital.component';
import { PorPaisComponent } from './paises/pages/por-pais/por-pais.component';
import { PorRegionComponent } from './paises/pages/por-region/por-region.component';
import { VerPaisComponent } from './paises/pages/ver-pais/ver-pais.component';

const routes: Routes = [
    {
        //Home page
        path: '',
        component: PorPaisComponent,
        pathMatch: 'full'
    },
    {
        path: 'region',
        component: PorRegionComponent,
    }, 
    {
        path: 'capital',
        component: PorCapitalComponent,
    },
    {
        //Ver pais mediante su id especifico
        path: 'pais/:id',
        component: VerPaisComponent,
    },
    {
        path: '**',
        redirectTo: ''
    }
]

@NgModule({
    imports: [
        //Configuracion de las rutas
        RouterModule.forRoot( routes )
    ],
    exports: [
        //! Es buena practica exportar el modulo de rutas
        RouterModule
    ]
})
export class AppRoutingModule {}
