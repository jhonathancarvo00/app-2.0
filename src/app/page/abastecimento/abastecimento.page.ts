import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-abastecimento',
  templateUrl: './abastecimento.page.html',
  styleUrls: ['./abastecimento.page.scss'],
})
export class AbastecimentoPage {

  constructor(private router: Router) {}

  /**
   * Navega para a página de destino com base no botão clicado.
   * @param destino A rota para a qual navegar (ex: 'abastecimento-proprio').
   */
  navegarPara(destino: string) {
    console.log(`Navegando para: /tabs/${destino}`);
    this.router.navigate([`/tabs/${destino}`]);
  }

  voltar() {
    this.router.navigate(['/tabs/new-home']);
  }
}