import { EmpresaModule } from '@app/empresas/empresa.module';

describe('EmpresaModule', () => {
  let empresaModule: EmpresaModule;

  beforeEach(() => {
    empresaModule = new EmpresaModule();
  });

  it('should create an instance', () => {
    expect(empresaModule).toBeTruthy();
  });
});
