import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface Foto {
  filepath: string;
  webviewPath?: string;
}

@Component({
  standalone: false,
  selector: 'app-ordem-servico-defeitos',
  templateUrl: './ordem-servico-defeitos.page.html',
  styleUrls: ['./ordem-servico-defeitos.page.scss'],
})
export class OrdemServicoDefeitosPage implements OnInit {

  segmentoAtivo: string = 'defeitos';
  public fotos: Foto[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.fotos = [];
  }

  segmentoMudou(event: any): void {
    this.segmentoAtivo = event?.detail?.value ?? 'defeitos';
  }

  tirarFoto(): void {
    this.router.navigate(['/tabs/ordem-servico-nova-foto']);
  }

  confirmar(): void {
    this.router.navigate(['/tabs/ordem-servico-pesquisa']);
  }
}
