import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { CalendarPopoverComponent } from '../../components/calendar-popover/calendar-popover.component';
import { OrdemServicoService } from '../../services/ordem-servico.service';

// 👉 Tipo interno só para organizar os dados da tela
interface OrdemServicoPayload {
  numeroOs: string;
  descricao: string;
  equipamento: string;
  empreendimento: string;
  empreendimentoIntervencao: string;
  classificacao: string;
  tipo: string;
  causaIntervencao: string;
  operadorMotorista: string;
  manutentor: string;
  statusCodigo: number | null;
  dataAbertura: string | null;
  dataConclusao: string | null;
}

@Component({
  standalone: false,
  selector: 'app-ordem-servico-edicao',
  templateUrl: './ordem-servico-edicao.page.html',
  styleUrls: ['./ordem-servico-edicao.page.scss'],
})
export class OrdemServicoEdicaoPage implements OnInit {
  // campos de texto
  numeroOS: string = '';
  descricao: string = '';

  // valores SELECIONADOS dos combos (descrição por enquanto)
  equipamento: string = '';
  empreendimento: string = '';
  empreendimentoIntervencao: string = '';
  classificacao: string = '';
  tipo: string = '';
  causaIntervencao: string = '';
  operadorMotorista: string = '';
  manutentor: string = '';

  // status (código numérico)
  statusCodigo: number | null = null;

  // datas
  dataAbertura: string | null = null;
  dataConclusao: string | null = null;

  // listas para os combos
  equipamentosLista: any[] = [];
  empreendimentosLista: any[] = [];
  classificacoesLista: any[] = [];
  tiposOsLista: any[] = [];
  causasIntervencaoLista: any[] = [];
  motoristasLista: any[] = [];
  manutentoresLista: any[] = [];

  // status fixo (doc)
  statusLista = [
    { valor: 0, descricao: 'Aberta' },
    { valor: 1, descricao: 'Serviço Iniciado' },
    { valor: 2, descricao: 'Serviço Concluído' },
    { valor: 3, descricao: 'Fechada' },
    { valor: 4, descricao: 'Reprovada / Cancelada' },
  ];

  carregando = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private popoverCtrl: PopoverController,
    private ordemService: OrdemServicoService
  ) {}

  ngOnInit() {
    // recebe OS da pesquisa
    this.route.queryParams.subscribe((params) => {
      console.log('🔎 QueryParams na edição:', params);

      if (params && params['os']) {
        let osRaw = params['os'];
        let os: any;

        try {
          os = typeof osRaw === 'string' ? JSON.parse(osRaw) : osRaw;
        } catch (e) {
          console.error('Erro ao fazer JSON.parse em osRaw:', e, osRaw);
          os = osRaw;
        }

        console.log('✅ OS recebida na edição:', os);

        this.numeroOS = String(os.numeroOs ?? '');
        this.descricao = os.descricao ?? '';

        this.equipamento = os.equipamento ?? '';
        this.empreendimento = os.empreendimento ?? '';
        this.empreendimentoIntervencao = os.empreendimentoIntervencao ?? '';

        this.classificacao = os.classificacao ?? '';
        this.tipo = os.tipo ?? '';
        this.causaIntervencao = os.causaIntervencao ?? '';

        this.operadorMotorista = os.operadorMotorista ?? '';
        this.manutentor = os.manutentor ?? '';

        // status – converte a descrição para código, se bater
        const st = this.statusLista.find(
          (s) => s.descricao === os.status || s.valor === os.status
        );
        this.statusCodigo = st ? st.valor : null;

        this.dataAbertura = os.dataAbertura ?? null;
        this.dataConclusao = os.dataConclusao ?? null;
      } else {
        console.warn('⚠️ Nenhuma OS recebida na edição.');
      }

      // depois de montar os campos, carrega os combos
      this.carregarCombos();
    });
  }

  // --------- LOOKUPS / COMBOS ---------

  private carregarCombos() {
    // Equipamentos
    this.ordemService.listarEquipamentos().subscribe({
      next: (lista) => {
        this.equipamentosLista = lista || [];
        console.log('Equipamentos (OS):', this.equipamentosLista);
      },
      error: (err) =>
        console.error('Erro ao carregar equipamentos (OS):', err),
    });

    // Empreendimentos
    this.ordemService.listarEmpreendimentos().subscribe({
      next: (lista) => {
        this.empreendimentosLista = lista || [];
        console.log('Empreendimentos (OS):', this.empreendimentosLista);
      },
      error: (err) =>
        console.error('Erro ao carregar empreendimentos (OS):', err),
    });

    // Classificação serviço
    this.ordemService.listarClassificacoesServico().subscribe({
      next: (lista) => {
        this.classificacoesLista = lista || [];
        console.log('Classificações serviço:', this.classificacoesLista);
      },
      error: (err) =>
        console.error('Erro ao carregar classificações serviço:', err),
    });

    // Tipos OS
    this.ordemService.listarTiposOs().subscribe({
      next: (lista) => {
        this.tiposOsLista = lista || [];
        console.log('Tipos de OS:', this.tiposOsLista);
      },
      error: (err) => console.error('Erro ao carregar tipos OS:', err),
    });

    // Causas intervenção
    this.ordemService.listarCausasIntervencao().subscribe({
      next: (lista) => {
        this.causasIntervencaoLista = lista || [];
        console.log('Causas intervenção:', this.causasIntervencaoLista);
      },
      error: (err) =>
        console.error('Erro ao carregar causas intervenção:', err),
    });

    // Motoristas / Operadores
    this.ordemService.listarColaboradoresMotoristas().subscribe({
      next: (lista) => {
        this.motoristasLista = lista || [];
        console.log('Motoristas / Operadores:', this.motoristasLista);
      },
      error: (err) =>
        console.error('Erro ao carregar motoristas / operadores:', err),
    });

    // Manutentores
    this.ordemService.listarColaboradoresManutentores().subscribe({
      next: (lista) => {
        this.manutentoresLista = lista || [];
        console.log('Manutentores:', this.manutentoresLista);
      },
      error: (err) =>
        console.error('Erro ao carregar manutentores:', err),
    });
  }

  // --------- NAVEGAÇÃO / CALENDÁRIO ---------

  onBack() {
    this.router.navigate(['/tabs/ordem-servico']);
  }

  async openCalendar(event: any, fieldName: 'dataAbertura' | 'dataConclusao') {
    const popover = await this.popoverCtrl.create({
      component: CalendarPopoverComponent,
      event,
      backdropDismiss: true,
      translucent: true,
      cssClass: 'calendar-popover',
    });

    await popover.present();
    const { data } = await popover.onDidDismiss();

    if (data && data.date) {
      if (fieldName === 'dataAbertura') {
        this.dataAbertura = data.date;
      } else {
        this.dataConclusao = data.date;
      }
    }
  }

  formatDate(isoOrDate: string | null): string {
    if (!isoOrDate) return '';
    // se já estiver no formato dd/MM/yyyy, só devolve
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(isoOrDate)) {
      return isoOrDate;
    }
    try {
      return format(parseISO(isoOrDate), 'dd/MM/yyyy');
    } catch {
      return isoOrDate;
    }
  }

  /** Converte a data interna para um formato ISO (ou null) */
  private toApiDate(dateStr: string | null): string | null {
    if (!dateStr) return null;

    // dd/MM/yyyy -> ISO
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
      const [dia, mes, ano] = dateStr.split('/');
      const d = new Date(Number(ano), Number(mes) - 1, Number(dia));
      return d.toISOString();
    }

    // já ISO
    try {
      const d = parseISO(dateStr);
      return d.toISOString();
    } catch {
      return dateStr;
    }
  }

  // --------- PAYLOAD PARA A API ---------

  /** Monta o payload completo da OS com base nos campos da tela */
  private montarPayloadOS(): OrdemServicoPayload {
    const payload: OrdemServicoPayload = {
      numeroOs: this.numeroOS,
      descricao: this.descricao,
      equipamento: this.equipamento,
      empreendimento: this.empreendimento,
      empreendimentoIntervencao: this.empreendimentoIntervencao,
      classificacao: this.classificacao,
      tipo: this.tipo,
      causaIntervencao: this.causaIntervencao,
      operadorMotorista: this.operadorMotorista,
      manutentor: this.manutentor,
      statusCodigo: this.statusCodigo,
      dataAbertura: this.toApiDate(this.dataAbertura),
      dataConclusao: this.toApiDate(this.dataConclusao),
    };

    return payload;
  }

  /** Clicou na setinha – monta o JSON igual ao do sistema antigo e chama a API */
 salvarOS() {
  const payload = this.montarPayloadOS();

  const payloadApi: any = {
    EquipamentoId: payload.equipamento,
    Descricao: payload.descricao,
    Origem: 3,
    OsId: payload.numeroOs || null,
    CausaIntervencao: payload.causaIntervencao,
    Classificacao: payload.classificacao,
    EmpreendimentoIntervencao: payload.empreendimentoIntervencao,
    Horimetro: null,
    ManutentorResponsavelId: payload.manutentor,
    MotoristaOperador: payload.operadorMotorista,
    ObsCausas: null,
    ObsDefeitosConstatados: null,
    ObsObservacao: null,
    ObsProvidencias: null,
    Odometro: null,
    OsDataAbertura: payload.dataAbertura,
    OsDataConclusao: payload.dataConclusao,
    Status: payload.statusCodigo ?? 0,
    TipoServico: payload.tipo,
  };

  console.log('📤 Payload API montado para GravarOrdemServico:', payloadApi);

  this.ordemService.gravarOrdem(payloadApi).subscribe({
    next: (res) => {
      console.log('✅ OS gravada (ou simulada):', res);
      this.irParaDefeitos();
    },
    error: (err) => {
      console.error('❌ Erro ao enviar OS (GravarOrdemServico): erro interno', err);
      // mesmo com erro, seguimos para a próxima aba
      this.irParaDefeitos();
    },
  });
}

private irParaDefeitos() {
  this.router.navigate(['/tabs/ordem-servico-defeitos'], {
    queryParams: { os: this.numeroOS },
  });
}

}
