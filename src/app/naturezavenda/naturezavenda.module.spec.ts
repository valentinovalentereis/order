import { NaturezavendaModule } from './naturezavenda.module';

describe('NaturezavendaModule', () => {
  let naturezavendaModule: NaturezavendaModule;

  beforeEach(() => {
    naturezavendaModule = new NaturezavendaModule();
  });

  it('should create an instance', () => {
    expect(naturezavendaModule).toBeTruthy();
  });
});
