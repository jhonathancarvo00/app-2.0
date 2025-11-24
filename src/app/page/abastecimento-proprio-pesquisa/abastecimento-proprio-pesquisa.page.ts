import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AbastecimentoService,
  AbastecimentoConsulta,
} from '../../services/abastecimento.service';

@Component({
  standalone: false,
  selector: 'app-abastecimento-proprio-pesquisa',
  templateUrl: './abastecimento-proprio-pesquisa.page.html',
  styleUrls: ['./abastecimento-proprio-pesquisa.page.scss'],
})
export class AbastecimentoProprioPesquisaPage implements OnInit {
  // lista que será exibida na tela (vinda da API)
  lista: AbastecimentoConsulta[] = [];

  // só pra você saber se está carregando
  carregando = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private abastecimentoService: AbastecimentoService
  ) {}

  ngOnInit() {
    // pega os filtros enviados pela tela anterior
    this.route.queryParams.subscribe((params) => {
      const filtros = {
        origemTanque: params['origemTanque'] || undefined,
        equipamento: params['equipamento'] || undefined,
        dataInicial: params['dataInicial'] || undefined,
        dataFinal: params['dataFinal'] || undefined,
      };

      this.buscarAbastecimentos(filtros);
    });
  }

  private buscarAbastecimentos(filtros: {
    origemTanque?: string;
    equipamento?: string;
    dataInicial?: string | null;
    dataFinal?: string | null;
  }) {
    this.carregando = true;

    this.abastecimentoService
      .consultarAbastecimentoProprio(filtros)
      .subscribe({
        next: (dados) => {
          this.lista = dados;
          this.carregando = false;
          console.log('Abastecimentos carregados:', dados);
        },
        error: (erro) => {
          console.error('Erro ao buscar abastecimentos:', erro);
          this.carregando = false;
        },
      });
  }

  onBack() {
    // volta pra tela principal de Abastecimento
    this.router.navigate(['/tabs/abastecimento']);
  }

  verDetalhes(item: any) {
    // TODO: aqui depois podemos usar o ID real retornado pela API (ex: abastecimentoId)
    this.router.navigate(['/tabs/abastecimento-proprio-edicao'], {
      queryParams: {
        // ajuste depois conforme o campo que você quiser usar
        abastecimentoId: (item as any).abastecimentoId,
      },
    });
  }
}
