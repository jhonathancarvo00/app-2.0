import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { CalendarPopoverComponent } from '../../components/calendar-popover/calendar-popover.component';
import { AbastecimentoService } from '../../services/abastecimento.service';

@Component({
  standalone: false,
  selector: 'app-abastecimento-proprio-edicao',
  templateUrl: './abastecimento-proprio-edicao.page.html',
  styleUrls: ['./abastecimento-proprio-edicao.page.scss'],
})
export class AbastecimentoProprioEdicaoPage implements OnInit {
  // data do abastecimento
  data: string | null = null;

  // combos (listas)
  bombas: any[] = [];
  equipamentos: any[] = [];

  // valores selecionados
  bombaSelecionada: string | null = null;
  equipamentoSelecionado: string | null = null;
  destinoSelecionado: string | null = null;
  bicoSelecionado: string | null = null;

  quantidade: number | null = null;
  horimetro: number | null = null;
  odometro: number | null = null;
  observacao: string = '';

  carregando = false;

  constructor(
    private router: Router,
    private popoverCtrl: PopoverController,
    private abastecimentoService: AbastecimentoService
  ) {}

  ngOnInit() {
    this.carregarBombas();
    this.carregarEquipamentos();
    // no futuro podemos carregar dados se vier um id pela rota (edição real)
  }

  onBack() {
    this.router.navigate(['/tabs/abastecimento-proprio-pesquisa']);
  }

  async openCalendar(event: any) {
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
      this.data = data.date;
    }
  }

  formatDate(isoString: string | null): string {
    if (!isoString) return '';
    try {
      return format(parseISO(isoString), 'dd/MM/yyyy');
    } catch {
      return '';
    }
  }

  // --------- CHAMADAS À API PARA COMBOS ---------

  private carregarBombas() {
    this.abastecimentoService.listarBombas().subscribe({
      next: (bombas) => {
        this.bombas = bombas || [];
        console.log('Bombas carregadas:', this.bombas);
      },
      error: (err) => {
        console.error('Erro ao carregar bombas:', err);
      },
    });
  }

 /* private carregarEquipamentos() {
    this.abastecimentoService.listarEquipamentosMobile().subscribe({
      next: (eqps) => {
        this.equipamentos = eqps || [];
        console.log('Equipamentos carregados:', this.equipamentos);
      },
      error: (err) => {
        console.error('Erro ao carregar equipamentos:', err);
      },
    });
  }
*/
private carregarEquipamentos() {
  // 🔧 Enquanto a API de EquipamentosMobile estiver retornando 405,
  // vamos usar uma lista mock para conseguir testar a tela.
  this.usaEquipamentosMock();
  console.log('Equipamentos (mock) carregados:', this.equipamentos);
}

// lista mock só pra desenvolvimento
private usaEquipamentosMock() {
  this.equipamentos = [
    { id: 'eqp1', descricao: 'RETROESCAVADEIRA' },
    { id: 'eqp2', descricao: 'ESCAVADEIRA HIDRÁULICA PC200' },
    { id: 'eqp3', descricao: 'CAMINHÃO BASCULANTE' },
  ];
}



  // >>>>>>>>>>>>>>> AQUI: muda a bombaSelecionada quando o usuário escolhe <<<<<<<<<<<<<
  onBombaChange(event: any) {
    this.bombaSelecionada = event.detail.value;
    console.log('bombaSelecionada =', this.bombaSelecionada);
  }

  // --------- CONFIRMAR / GRAVAR ABASTECIMENTO ---------

 confirmar() {
  console.log('Confirmar Abastecimento Próprio Edição');

  // validações simples
  if (!this.data) {
    console.warn('⚠️ Data obrigatória');
    return;
  }

  if (!this.bombaSelecionada) {
    console.warn('⚠️ Origem/Tanque obrigatória');
    return;
  }

  if (!this.equipamentoSelecionado) {
    console.warn('⚠️ Equipamento obrigatório');
    return;
  }

  if (!this.quantidade || this.quantidade <= 0) {
    console.warn('⚠️ Quantidade inválida');
    return;
  }

  // ====== FORMATAR DATA NO PADRÃO "YYYY-MM-DDTHH:mm:ss" (SEM Z) ======
  const d = new Date(this.data);
  const pad2 = (n: number) => n.toString().padStart(2, '0');

  const dataFormatada =
    `${d.getFullYear()}-` +
    `${pad2(d.getMonth() + 1)}-` +
    `${pad2(d.getDate())}T` +
    `${pad2(d.getHours())}:` +
    `${pad2(d.getMinutes())}:` +
    `${pad2(d.getSeconds())}`;

  // ========================================================

  const payload: any = {
    TpAbastecimento: 0,
    tpAbastecimento: 0,

    Origem: 3,
    origem: 3,

    // mandando com vários nomes pra garantir
    DataAbastecimento: dataFormatada,
    dataAbastecimento: dataFormatada,
    dataabastecimento: dataFormatada,

    IdtanqueOrigem: this.bombaSelecionada,
    idtanqueOrigem: this.bombaSelecionada,

    Idequipamento: this.equipamentoSelecionado,
    idequipamento: this.equipamentoSelecionado,

    IdDestino: this.destinoSelecionado,
    IdBico: this.bicoSelecionado,

    QuantidadeSolicitada: Number(this.quantidade),
    QuantidadeRetirada: Number(this.quantidade),

    Horimetro: this.horimetro,
    Odometro: this.odometro,

    Observacao: this.observacao || '',
    CheckedRetorno: 1,
  };

  console.log('📤 Payload que será enviado:', payload);

  this.carregando = true;

  this.abastecimentoService.gravarAbastecimento(payload).subscribe({
    next: (res) => {
      console.log('✅ Abastecimento gravado com sucesso:', res);
      this.carregando = false;
      this.router.navigate(['/tabs/abastecimento-proprio-pesquisa']);
    },
    error: (err) => {
      console.error('❌ Erro ao gravar abastecimento:', err);
      this.carregando = false;
    },
  });
}
}