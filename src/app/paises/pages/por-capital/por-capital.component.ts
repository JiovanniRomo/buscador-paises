import { Component } from '@angular/core';
import { Country } from '../../interfaces/paises.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [
  ]
})
export class PorCapitalComponent {
  termino: string = ''
  paises: Country[] = []
  hayError: boolean = false;

  constructor(private paiseService: PaisService) {}

  buscar(termino: string) {
    this.hayError = false;
    this.paiseService.buscarCapital(termino)
      .subscribe(paises => {
        this.paises = paises
      }, (err) => {
        this.hayError = true
        console.log(err)
      })
  }
}
