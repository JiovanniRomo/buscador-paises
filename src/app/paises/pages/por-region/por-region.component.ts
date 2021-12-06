import { Component } from '@angular/core';
import { Country } from '../../interfaces/paises.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `
      button {
        margin-right: 5px;
      }

      .textWhite {
        color: white;
      }
    `,
  ],
})
export class PorRegionComponent {
  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: string = '';
  paisesPorRegion: Country[] = [];

  constructor(private paisesService: PaisService) {}

  getClaseCss(region: string): string {
    return region === this.regionActiva
      ? 'btn btn-primary textWhite'
      : 'btn btn-outline-primary';
  }

  activarRegion(region: string) {
    this.regionActiva = region;

    // if (region === this.regionActiva) {
    //   return;
    // }
    // TODO: llamar al servicio
    this.paisesService
      .getPaisPorRegion(region)
      .subscribe((paises) => (this.paisesPorRegion = paises));
  }
}
