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
  ) { }

  ngOnInit() {
  }

  async openCalendar(event: any, fieldName: 'dataAbertura' | 'dataConclusao') {
    const popover = await this.popoverCtrl.create({
      component: CalendarPopoverComponent,
      event: event,
      backdropDismiss: true,
      translucent: true,
      cssClass: 'calendar-popover'
    });

    await popover.present();

    const { data } = await popover.onDidDismiss();

    if (data && data.date) {
      if (fieldName === 'dataAbertura') {
        this.dataAbertura = data.date;
      } else if (fieldName === 'dataConclusao') {
        this.dataConclusao = data.date;
      }
    }
  }

  formatDate(isoString: string | null): string {
    if (!isoString) return '';
    try {
      return format(parseISO(isoString), 'dd/MM/yyyy');
    } catch (error) {
      return '';
    }
  }

  proximaEtapa() {
    console.log('Botão de próxima etapa clicado!');
    this.router.navigate(['/tabs/ordem-servico-defeitos']);
  }
}