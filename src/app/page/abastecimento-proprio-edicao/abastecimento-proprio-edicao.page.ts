import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { CalendarPopoverComponent } from '../../components/calendar-popover/calendar-popover.component';

@Component({
  standalone: false,
  selector: 'app-abastecimento-proprio-edicao',
  templateUrl: './abastecimento-proprio-edicao.page.html',
  styleUrls: ['./abastecimento-proprio-edicao.page.scss'],
})
export class AbastecimentoProprioEdicaoPage implements OnInit {

  data: string | null = null;

  constructor(
    private router: Router,
    private popoverCtrl: PopoverController
  ) {}

  ngOnInit() {}

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

  confirmar() {
    console.log('Confirmar Abastecimento Próprio Edição');
    this.router.navigate(['/tabs/abastecimento-proprio-pesquisa']);
  }
}
