import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-ordem-servico-pesquisa',
  templateUrl: './ordem-servico-pesquisa.page.html',
  styleUrls: ['./ordem-servico-pesquisa.page.scss'],
})
export class OrdemServicoPesquisaPage implements OnInit {
  resultados: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {

    this.resultados = [
      {
        os: '123',
        status: 'Não concluida',
        descricao: 'fdsflk kçkdfç fçfksç kfçkfçksfçskdfçsfkfk',
        empreendimento: '900',
        equipamento: 'fdjskf jksdjf',
        operador: 'jkf jskjfkjf',
        manutentor: 'xxxxxxxx',
        dataAbertura: '99/99/9999',
        dataConclusao: '99/99/9999'
      },
      {
        os: '124',
        status: 'Concluida',
        descricao: 'Troca de óleo e filtro do motor principal',
        empreendimento: '901',
        equipamento: 'Trator de esteira D6',
        operador: 'José da Silva',
        manutentor: 'Carlos Andrade',
        dataAbertura: '15/10/2025',
        dataConclusao: '16/10/2025'
      }
    ];
  }

  abrirDetalhe(item: { os: string | number }) {
    this.router.navigate(['/tabs/ordem-servico-edicao', item.os]);
  }
}
