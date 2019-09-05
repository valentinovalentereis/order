import { CnpjCpfModule } from './cnpjcpf.module';

describe('CnpjCpfModule', () => {
  let cnpjcpfModule: CnpjCpfModule;

  beforeEach(() => {
    cnpjcpfModule = new CnpjCpfModule();
  });

  it('should create an instance', () => {
    expect(cnpjcpfModule).toBeTruthy();
  });
});
