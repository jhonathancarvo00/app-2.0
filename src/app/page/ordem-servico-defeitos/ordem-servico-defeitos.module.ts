import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrdemServicoDefeitosPageRoutingModule } from './ordem-servico-defeitos-routing.module';
import { OrdemServicoDefeitosPage } from './ordem-servico-defeitos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdemServicoDefeitosPageRoutingModule
  ],
  declarations: [OrdemServicoDefeitosPage]
})
export class OrdemServicoDefeitosPageModule {}