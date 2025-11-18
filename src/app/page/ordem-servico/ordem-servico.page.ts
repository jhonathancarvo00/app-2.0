import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { CalendarPopoverComponent } from '../../components/calendar-popover/calendar-popover.component';

@Component({
  standalone: false,
  selector: 'app-ordem-servico',
  templateUrl: './ordem-servico.page.html',
  styleUrls: ['./ordem-servico.page.scss'],
})
export class OrdemServicoPage {

  dataAberturaInicial: string | null = null;
  dataAberturaFinal: string | null = null;
  dataConclusaoInicial: string | null = null;
  dataConclusaoFinal: string | null = null;

  novaOrdemServico() {
  console.log('Navegando para a página de edição...');
  this.router.navigate(['/tabs/ordem-servico-edicao']);
  }

  constructor(
    private popoverCtrl: PopoverController,
    private router: Router
  ) { }

  async openCalendar(event: any, fieldName: string) {
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
      switch (fieldName) {
        case 'aberturaInicial': this.dataAberturaInicial = data.date; break;
        case 'aberturaFinal': this.dataAberturaFinal = data.date; break;
        case 'conclusaoInicial': this.dataConclusaoInicial = data.date; break;
        case 'conclusaoFinal': this.dataConclusaoFinal = data.date; break;
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

  pesquisar() {
    console.log('Botão PESQUISAR clicado! Navegando para /tabs/ordem-servico-pesquisa');
    this.router.navigate(['/tabs/ordem-servico-pesquisa']);
  }
}