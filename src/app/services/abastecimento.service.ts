import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

export interface AbastecimentoConsulta {
  dataabastecimento: string;
  placa: string;
  codequipamento: string;
  modelo: string;
  fornecedorRazao: string;
  quantidade: number;
  insumoDesc: string;
  numVoucher: number;
}

@Injectable({
  providedIn: 'root',
})
export class AbastecimentoService {
  constructor(private api: ApiService) {}

  // Bombas (Origem / Tanque)
  listarBombas() {
    return this.api.get<any[]>('/api/frotas/Abastecimentos/ConsultaBomba');
  }

  // ✅ ESTE AQUI É O NOVO MÉTODO QUE FALTAVA
  // Equipamentos (EquipamentosMobile)
  listarEquipamentosMobile() {
    return this.api.get<any[]>('/api/frotas/Lookups/EquipamentosMobile');
  }

  // Consulta de abastecimento próprio (tela de pesquisa)
  consultarAbastecimentoProprio(filtros: {
    origemTanque?: string;
    equipamento?: string;
    dataInicial?: string | null;
    dataFinal?: string | null;
  }) {
    const params: any = {
      TpAbastecimento: 0,
      // Origem: 3, // se quiser filtrar só pelos do app
    };

    if (filtros.origemTanque) params.BombaId = filtros.origemTanque;
    if (filtros.equipamento) params.EquipamentoId = filtros.equipamento;
    if (filtros.dataInicial) params.DataInicial = filtros.dataInicial;
    if (filtros.dataFinal) params.DataFinal = filtros.dataFinal;

    return this.api.get<AbastecimentoConsulta[]>(
      '/api/frotas/Abastecimentos/ConsultaAbastecimento',
      params
    );
  }

  // Gravação de abastecimento (Próprio ou Posto)
  gravarAbastecimento(payload: any) {
    return this.api.post('/api/frotas/Abastecimentos/GravaAbastecimento', payload);
  }
}
