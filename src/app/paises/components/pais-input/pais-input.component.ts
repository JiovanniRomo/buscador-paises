import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html',
  styles: [],
})
export class PaisInputComponent implements OnInit {
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  //! Emitirlo cuando se deja de escribir
  debouncer: Subject<string> = new Subject();

  termino: string = '';
  @Input() placeholder: string = '';

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.debouncer
      .pipe(
        debounceTime(300) //!No emitas el subscribe hasta que el observable deje de emitir valores por las proximas 300ms
      )
      .subscribe((valor) => {

        //! Llegados a este punto, quiere decir que el usuario DEJO de escribir y ya pasaron 300ms, por lo que ahora si 
        //! emitimos el valor 
        this.onDebounce.emit(valor);
      });
  }

  //Esto conecta el debouncer con el input
  // Cada vez que el usuario escribe, se emite el valor del input, y nosotros al estas suscritos al debouncer, recibimos todos los cambios
  teclaPresionada() {
    //el next junto con el Subject nos ayudan a asegurarnos de que todas las subscripciones reciban el mismo valor
    this.debouncer.next(this.termino); 
  }

  buscar() {
    this.onEnter.emit(this.termino);
  }
}
