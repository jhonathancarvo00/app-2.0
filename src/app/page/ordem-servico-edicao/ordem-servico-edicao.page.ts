import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { CalendarPopoverComponent } from '../../components/calendar-popover/calendar-popover.component';

@Component({
  standalone: false,
  selector: 'app-ordem-servico-edicao',
  templateUrl: './ordem-servico-edicao.page.html',
  styleUrls: ['./ordem-servico-edicao.page.scss'],
})
export class OrdemServicoEdicaoPage implements OnInit {

  dataAbertura: string | null = null;
  dataConclusao: string | null = null;

  constructor(
    private router: Router,
    private popoverCtrl: PopoverController
  ) {}

  ngOnInit() {}

  // Voltar para a tela de pesquisa de Ordem de Serviço
  onBack() {
    this.router.navigate(['/tabs/ordem-servico']);
  }

  // Abre o popover de calendário,
  // fieldName indica qual campo será preenchido
  async openCalendar(event: any, fieldName: 'dataAbertura' | 'dataConclusao') {
    const popover = await this.popoverCtrl.create({
      component: CalendarPopoverComponent,
      event,
      backdropDismiss: true,
      translucent: true,
      cssClass: 'calendar-popover'
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

  // Mostra dd/MM/yyyy ou vazio
  formatDate(isoString: string | null): string {
    if (!isoString) return '';
    try {
      return format(parseISO(isoString), 'dd/MM/yyyy');
    } catch {
      return '';
    }
  }

  // Clicar na setinha (próxima etapa)
  proximaEtapa() {
    this.router.navigate(['/tabs/ordem-servico-defeitos']);
  }
}
