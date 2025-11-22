import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-ordem-servico-pesquisa',
  templateUrl: './ordem-servico-pesquisa.page.html',
  styleUrls: ['./ordem-servico-pesquisa.page.scss'],
})
export class OrdemServicoPesquisaPage {

  // Ajuste esse array para vir do seu service / API
  ordens: any[] = [
    // Exemplo só pra não ficar vazio:
     {
     id: 123,
      numeroOs: '123',
     statusTexto: 'Não concluída',
     descricao: 'Descrição da OS...',
     empreendimento: '900',
      equipamento: 'Escavadeira',
      operador: 'João da Silva',
      manutentor: 'Carlos Andrade',
       dataAbertura: '15/10/2025',
     dataConclusao: '16/10/2025'
    }
  ];

  constructor(private router: Router) {}

  onBack() {
    this.router.navigate(['/tabs/ordem-servico']);
  }

  verDetalhes(os: any) {
    // Se você tiver o id da OS, passa aqui
    if (os?.id) {
      this.router.navigate(['/tabs/ordem-servico-edicao', os.id]);
    } else {
      this.router.navigate(['/tabs/ordem-servico-edicao']);
    }
  }
}
