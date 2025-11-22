import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordem-servico-nova-foto',
  templateUrl: './ordem-servico-nova-foto.page.html',
  styleUrls: ['./ordem-servico-nova-foto.page.scss'],
  standalone: false   // <<< IMPORTANTE: NÃO PODE SER true
})
export class OrdemServicoNovaFotoPage {

  constructor(private router: Router) {}

  // volta para a tela de defeitos/causas (aba FOTOS)
  onBack() {
    this.router.navigate(['/tabs/ordem-servico-defeitos'], {
      queryParams: { segment: 'fotos' }
    });
  }

  // futuro: abrir picker de arquivo/câmera
  localizarFoto() {
    console.log('Localizar foto clicado');
  }

  // confirmar inclusão da foto
  confirmarFoto() {
    console.log('Confirmar inclusão de foto');
    this.router.navigate(['/tabs/ordem-servico-pesquisa'], {
      queryParams: { segment: 'fotos' }
    });
  }
}
