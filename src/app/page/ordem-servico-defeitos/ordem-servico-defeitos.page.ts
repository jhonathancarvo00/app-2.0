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

  // textos das abas
  defeitosConstatados: string = '';
  causasProvaveis: string = '';
  observacoes: string = '';

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
    console.log('Defeitos constatados:', this.defeitosConstatados);
    console.log('Causas prováveis:', this.causasProvaveis);
    console.log('Observações:', this.observacoes);

    // aqui depois a gente encaixa no payload da GravarOrdemServico
    this.router.navigate(['/tabs/ordem-servico-pesquisa']);
  }

  goNovaFoto() {
    this.router.navigate(['/tabs/ordem-servico-nova-foto']);
  }
}
