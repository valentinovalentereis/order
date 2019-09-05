import { OrderModule } from './Order.module';

describe('OrderModule', () => {
  let OrderModule: OrderModule;

  beforeEach(() => {
    OrderModule = new OrderModule();
  });

  it('should create an instance', () => {
    expect(OrderModule).toBeTruthy();
  });
});
