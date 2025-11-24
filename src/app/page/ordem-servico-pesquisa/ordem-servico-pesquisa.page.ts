import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrdemServicoService } from '../../services/ordem-servico.service';

export interface OrdemServicoListaItem {
  numeroOs: string;
  empreendimento: string;
  equipamento: string;
  dataAbertura: string;
  dataConclusao: string;
  status: string;
}

// MOCK fixo para quando a API voltar vazia
const OS_MOCK: OrdemServicoListaItem[] = [
  {
    numeroOs: '1234',
    status: 'Aberta',
    empreendimento: 'OBRA 001',
    equipamento: 'RETROESCAVADEIRA CAT',
    dataAbertura: '10/11/2025',
    dataConclusao: '',
  },
  {
    numeroOs: '1235',
    status: 'Concluída',
    empreendimento: 'OBRA 002',
    equipamento: 'ESCAVADEIRA PC200',
    dataAbertura: '05/11/2025',
    dataConclusao: '15/11/2025',
  },
];

@Component({
  standalone: false,
  selector: 'app-ordem-servico-pesquisa',
  templateUrl: './ordem-servico-pesquisa.page.html',
  styleUrls: ['./ordem-servico-pesquisa.page.scss'],
})
export class OrdemServicoPesquisaPage implements OnInit {
  listaOs: OrdemServicoListaItem[] = [];
  carregando = false;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private ordemService: OrdemServicoService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      console.log('🔍 QueryParams na pesquisa:', params);

      let listaApi: any[] = [];

      // vem da tela de filtros (ordem-servico.page)
      if (params && params['lista']) {
        try {
          listaApi =
            typeof params['lista'] === 'string'
              ? JSON.parse(params['lista'])
              : params['lista'];
        } catch (e) {
          console.error('Erro ao fazer JSON.parse da lista de OS:', e);
          listaApi = [];
        }
      }

      console.log('📦 Resposta bruta da API de OS:', listaApi);

      if (listaApi && listaApi.length) {
        // mapeia resultado real da API
        this.listaOs = listaApi.map((item: any): OrdemServicoListaItem => ({
          numeroOs: String(item.numeroOs ?? item.NumeroOS ?? ''),
          empreendimento: item.empreendimento ?? item.Empreendimento ?? '',
          equipamento: item.equipamento ?? item.Equipamento ?? '',
          dataAbertura: item.dataAbertura ?? item.DataAbertura ?? '',
          dataConclusao: item.dataConclusao ?? item.DataConclusao ?? '',
          status: item.status ?? item.Status ?? '',
        }));
      } else {
        console.warn('⚠️ API de OS retornou vazio, usando MOCK.');
        this.listaOs = OS_MOCK;
      }

      console.log('📋 Lista de OS para os cards:', this.listaOs);
    });
  }

  onBack() {
    this.router.navigate(['/tabs/ordem-servico']);
  }

  verDetalhes(os: OrdemServicoListaItem) {
    console.log('➡️ Navegando para edição com OS:', os);

    this.router.navigate(['/tabs/ordem-servico-edicao'], {
      queryParams: {
        os: JSON.stringify(os),
      },
    });
  }
}
