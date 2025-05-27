import { Component } from '@angular/core';
import { evaluate } from 'mathjs';
import { FormsModule } from '@angular/forms';
import { NgClass, NgForOf } from '@angular/common';

@Component({
  selector: 'app-calculadora',
  standalone: true,
  imports: [FormsModule, NgForOf, NgClass],
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent {
  pantalla: string = '';

  // Botones organizados correctamente (quitado el duplicado de '-')
  bottons: string[] = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', 'AC'
  ];

  // Manejo de clics en los botones
  presionarBoton(valor: string) {
    if (valor === 'AC') {
      this.pantalla = '';
    } else if (valor === '=') {
      try {
        this.pantalla = evaluate(this.pantalla).toString();
      } catch (error) {
        this.pantalla = 'Error';
      }
    } else {
      this.pantalla += valor;
    }
  }

  // Divide los botones en grupos de 4 para el grid en Bootstrap
  dividirBotones(array: string[], tam: number): string[][] {
    const resultado: string[][] = [];
    for (let i = 0; i < array.length; i += tam) {
      resultado.push(array.slice(i, i + tam));
    }
    return resultado;
  }
}
