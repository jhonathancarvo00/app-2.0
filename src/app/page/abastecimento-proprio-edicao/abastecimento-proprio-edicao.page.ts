import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-abastecimento-proprio-edicao',
  templateUrl: './abastecimento-proprio-edicao.page.html',
  styleUrls: ['./abastecimento-proprio-edicao.page.scss'],
  standalone: false
})
export class AbastecimentoProprioEdicaoPage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onConfirmar(): void {

    this.router.navigate(['/tabs/abastecimento-proprio-pesquisa']);
  }
}
