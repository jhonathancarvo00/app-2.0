import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-abastecimento-postos-pesquisa',
  templateUrl: './abastecimento-postos-pesquisa.page.html',
  styleUrls: ['./abastecimento-postos-pesquisa.page.scss'],
  standalone: false
})
export class AbastecimentoPostosPesquisaPage implements OnInit {

  // Simulação de resultados (mantenha/ajuste conforme seu serviço real)
  resultados: any[] = [
    {
      Fornecedor: 'ALELO INSTITUIÇÃO PAGEMENTO S/A',
      equipamento: 'VETERO87',
      Voucher: '6314',
      data: '99/99/9999',
      observacao: 'GALÃO RESERVA'
    },
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  verDetalhes(item?: any) {
    this.router.navigate(['/tabs/abastecimento-postos-edicao']);
  }
}
