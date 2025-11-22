import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-abastecimento-proprio-pesquisa',
  templateUrl: './abastecimento-proprio-pesquisa.page.html',
  styleUrls: ['./abastecimento-proprio-pesquisa.page.scss'],
})
export class AbastecimentoProprioPesquisaPage implements OnInit {

  // lista exibida na tela
  lista: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Se depois você quiser montar a lista a partir dos filtros,
    // pode usar os queryParams aqui.
    this.route.queryParams.subscribe(params => {
      // MOCK só pra manter igual ao seu rascunho
      this.lista = [
        {
          numeroRequisicao: 13763,
          status: 'Não concluída',
          empreendimento: '900',
          equipamento: 'fdjsfk jksdjf',
          bombaBico: '3 | Tanque Itaqua',
          destino: 'EQ | Equipamento',
          data: '99/99/9999',
          observacao: 'CAM. BASCULANTE GBP-3859',
        },
        {
          numeroRequisicao: 13764,
          status: 'Concluída',
          empreendimento: '901',
          equipamento: 'Trator de esteira D6',
          bombaBico: '1 | Tanque principal',
          destino: 'EQ | Equipamento',
          data: '15/10/2025',
          observacao: 'CAMINHÃO PIPA MERCEDES',
        },
      ];
    });
  }

  onBack() {
    // volta pra tela principal de Abastecimento
    this.router.navigate(['/tabs/abastecimento']);
  }

  verDetalhes(item: any) {
    // aqui você pode passar um id real se tiver
    this.router.navigate(['/tabs/abastecimento-proprio-edicao'], {
      queryParams: { numeroRequisicao: item.numeroRequisicao },
    });
  }
}
