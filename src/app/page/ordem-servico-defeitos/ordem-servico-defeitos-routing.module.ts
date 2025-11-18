import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdemServicoDefeitosPage } from './ordem-servico-defeitos.page';

const routes: Routes = [
  {
    path: '',
    component: OrdemServicoDefeitosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdemServicoDefeitosPageRoutingModule {}
