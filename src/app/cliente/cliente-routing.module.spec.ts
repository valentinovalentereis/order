import { ClienteRoutingModule } from './cliente-routing.module';

describe('ClienteRoutingModule', () => {
  let clienteRoutingModule: ClienteRoutingModule;

  beforeEach(() => {
    clienteRoutingModule = new ClienteRoutingModule();
  });

  it('should create an instance', () => {
    expect(clienteRoutingModule).toBeTruthy();
  });
});
