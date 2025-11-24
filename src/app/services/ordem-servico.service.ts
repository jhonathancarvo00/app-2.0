import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdemServicoService {
  constructor(private api: ApiService) {}

  // =======================
  // 1) BUSCA / LISTAGEM DE OS
  // =======================

  // Buscar OS por número (a gente ainda não está usando esse na edição,
  // mas ele já fica pronto pra quando o back liberar)
  buscarOSPorNumero(numeroOS: string): Observable<any> {
    return this.api.get(`/api/frotas/OrdemServico/Buscar/${numeroOS}`);
  }

  // Pesquisa geral de OS (tela de pesquisa)
  consultarGeral(filtros: {
    numeroOs?: string | number | null;
    empreendimentoId?: string | null;
    equipamentoId?: string | null;
    status?: string | null;
    dataInicial?: string | null;
    dataFinal?: string | null;
  }): Observable<any[]> {
    const params: any = {};

    if (filtros.numeroOs)        params.NumeroOs        = filtros.numeroOs;
    if (filtros.empreendimentoId) params.EmpreendimentoId = filtros.empreendimentoId;
    if (filtros.equipamentoId)   params.EquipamentoId   = filtros.equipamentoId;
    if (filtros.status)          params.Status          = filtros.status;
    if (filtros.dataInicial)     params.DataInicial     = filtros.dataInicial;
    if (filtros.dataFinal)       params.DataFinal       = filtros.dataFinal;

    return this.api.get<any[]>(
      '/api/frotas/OrdensServico/ConsultaGeralOrdensServico',
      params
    );
  }

  // Detalhe de uma OS (pra usar depois se o back expor esse endpoint)
  consultarDetalhe(osId: number | string): Observable<any> {
    return this.api.get<any>(
      '/api/frotas/OrdensServico/ConsultaDetOrdemServico',
      { OsId: osId }
    );
  }

  // Gravar/atualizar OS
  gravarOrdem(payload: any): Observable<any> {
    return this.api.post(
      '/api/frotas/OrdensServico/GravarOrdemServico',
      payload
    );
  }

  // =======================
  // 2) LOOKUPS – COMBOS (MOCK POR ENQUANTO)
  // =======================
  // IMPORTANTE: aqui NÃO vamos bater na API agora,
  // só devolver lista fake com "of()" pra não dar 404/405.

  // Equipamentos (para o combo de Equipamento na edição de OS)
  listarEquipamentos(): Observable<any[]> {
    return of([
      { id: 'eqp1', descricao: 'RETROESCAVADEIRA CAT' },
      { id: 'eqp2', descricao: 'ESCAVADEIRA PC200' },
      { id: 'eqp3', descricao: 'CAMINHÃO PIPA' },
    ]);
  }

  // Empreendimentos (combo Empreendimento / Empreendimento da intervenção)
  listarEmpreendimentos(): Observable<any[]> {
    return of([
      { id: 'emp1', descricao: 'OBRA 001' },
      { id: 'emp2', descricao: 'OBRA 002' },
      { id: 'emp3', descricao: 'PEDREIRA 01' },
    ]);
  }

  // Classificação de serviço
  listarClassificacoesServico(): Observable<any[]> {
    return of([
      { id: 'cls1', descricao: 'Preventiva' },
      { id: 'cls2', descricao: 'Corretiva' },
      { id: 'cls3', descricao: 'Preditiva' },
    ]);
  }

  // Tipos de OS
  listarTiposOs(): Observable<any[]> {
    return of([
      { id: 'tp1', descricao: 'Mecânica' },
      { id: 'tp2', descricao: 'Elétrica' },
      { id: 'tp3', descricao: 'Lubrificação' },
    ]);
  }

  // Causas de intervenção
  listarCausasIntervencao(): Observable<any[]> {
    return of([
      { id: 'c1', descricao: 'Quebra inesperada' },
      { id: 'c2', descricao: 'Desgaste natural' },
      { id: 'c3', descricao: 'Revisão programada' },
    ]);
  }

  // Colaboradores Motoristas / Operadores
  listarColaboradoresMotoristas(): Observable<any[]> {
    return of([
      { id: 'mot1', nome: 'JOÃO OPERADOR' },
      { id: 'mot2', nome: 'MARIA MOTORISTA' },
      { id: 'mot3', nome: 'CARLOS MOTORISTA' },
    ]);
  }

  // Colaboradores Manutentores
  listarColaboradoresManutentores(): Observable<any[]> {
    return of([
      { id: 'man1', nome: 'PEDRO MECÂNICO' },
      { id: 'man2', nome: 'ANA TÉCNICA' },
      { id: 'man3', nome: 'LUIZ ELETRICISTA' },
    ]);
  }
}
