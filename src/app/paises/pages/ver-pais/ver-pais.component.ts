import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Country, Languages, Translation } from '../../interfaces/paises.interface';

import { PaisService } from '../../services/pais.service';


@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [],
})
export class VerPaisComponent implements OnInit {

  pais!: Country;
  translations!: Translation[];
  languages!: Languages[];

  constructor(
    private rutaActiva: ActivatedRoute,
    private paisService: PaisService
  ) {}

  ngOnInit() {

    this.rutaActiva.params
    .pipe(
      //Recibir un observable y regresar otro observable
      switchMap( (params) => this.paisService.getPaisPorCodigo(params.id)),

      // En lugar de retornar el observable del this.rutaActiva.params, retornamos el observable del this.paisService.getPaisPorCodigo
      // por lo tanto el subscribe de abajo corresponde al producto de la PETICION, NO a recuperar los params del URL

      //El tap recibe el producto del observable de arriba, e imprime en consola lo que responda
      tap(console.log)
    )
    .subscribe( pais => {
      this.pais = pais[0];
      // this.translations = Object.values(this.pais.translations);
      this.languages = Object.values(this.pais.languages);
    })
  }
}
