import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AbastecimentoProprioEdicaoPage } from './abastecimento-proprio-edicao.page';

const routes: Routes = [
  {
    path: '',
    component: AbastecimentoProprioEdicaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbastecimentoProprioEdicaoPageRoutingModule {}
