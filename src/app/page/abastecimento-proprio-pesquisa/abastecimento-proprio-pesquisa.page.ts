import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-abastecimento-proprio-pesquisa',
  templateUrl: './abastecimento-proprio-pesquisa.page.html',
  styleUrls: ['./abastecimento-proprio-pesquisa.page.scss'],
})
export class AbastecimentoProprioPesquisaPage implements OnInit {

  resultados: Array<{
    id: number;
    numero: string;
    empreendimento: string;
    equipamento: string;
    bombaBico: string;
    destino: string;
    data: string;
    observacao: string;
    status: 'Concluida' | 'Não concluída';
  }> = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.resultados = [
      {
        id: 13763,
        numero: '13763',
        empreendimento: '900',
        equipamento: 'fdjskf jksdjf',
        bombaBico: '3 | Tanque Itaqua',
        destino: 'EQ | Equipamento',
        data: '99/99/9999',
        observacao: 'CAM. BASCULANTE GBP-3859',
        status: 'Não concluída'
      },
      {
        id: 13764,
        numero: '13764',
        empreendimento: '901',
        equipamento: 'Trator de esteira D6',
        bombaBico: '1 | Tanque principal',
        destino: 'EQ | Equipamento',
        data: '15/10/2025',
        observacao: 'CAMINHÃO PIPA MERCEDES',
        status: 'Concluida'
      }
    ];
  }
  verDetalhes(item: { id: number }): void {
    this.router.navigate(['/tabs/abastecimento-proprio-edicao', item.id]);
  }
}
