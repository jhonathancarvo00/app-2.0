import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { CalendarPopoverComponent } from '../../components/calendar-popover/calendar-popover.component';

@Component({
  selector: 'app-abastecimento-postos-edicao',
  templateUrl: './abastecimento-postos-edicao.page.html',
  styleUrls: ['./abastecimento-postos-edicao.page.scss'],
  standalone: false
})
export class AbastecimentoPostosEdicaoPage implements OnInit {

  dtRetirada: string | null = null;
  hodometroData: string | null = null;
  nCtlPostoData: string | null = null;

  constructor(
    private popoverCtrl: PopoverController,
    private router: Router
  ) {}

  ngOnInit() {}

  async openCalendar(event: any, fieldName: 'dtRetirada' | 'hodometroData' | 'nCtlPostoData') {
    const popover = await this.popoverCtrl.create({
      component: CalendarPopoverComponent,
      event,
      backdropDismiss: true,
      translucent: true,
      cssClass: 'calendar-popover'
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();
    if (data?.date) {
      this[fieldName] = data.date;
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


  confirmar() {
    this.router.navigate(['/tabs/abastecimento-postos']);
  }
}
