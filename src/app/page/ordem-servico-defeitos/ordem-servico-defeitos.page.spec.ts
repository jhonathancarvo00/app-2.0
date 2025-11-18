import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdemServicoDefeitosPage } from './ordem-servico-defeitos.page';

describe('OrdemServicoDefeitosPage', () => {
  let component: OrdemServicoDefeitosPage;
  let fixture: ComponentFixture<OrdemServicoDefeitosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdemServicoDefeitosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
