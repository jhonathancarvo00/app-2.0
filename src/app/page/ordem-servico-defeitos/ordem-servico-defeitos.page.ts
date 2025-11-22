import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-ordem-servico-defeitos',
  templateUrl: './ordem-servico-defeitos.page.html',
  styleUrls: ['./ordem-servico-defeitos.page.scss'],
})
export class OrdemServicoDefeitosPage {

  segment: 'defeitos' | 'observacao' | 'fotos' = 'defeitos';

  // placeholders de fotos (pode trocar por objetos reais depois)
  photos = [1, 2];

  constructor(private router: Router) {}

  onBack() {
    // volta para a tela de edição principal de OS
    this.router.navigate(['/tabs/ordem-servico-edicao']);
  }

  changeSegment(ev: any) {
    this.segment = ev.detail.value;
  }

  confirmar() {
    // Depois de confirmar, volta para a tela de pesquisa de OS
    this.router.navigate(['/tabs/ordem-servico-pesquisa']);
  }

  goNovaFoto() {
    // Caminho correto conforme tabs-routing.module.ts
    this.router.navigate(['/tabs/ordem-servico-nova-foto']);
  }
}
