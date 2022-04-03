import { GRPC_ENTRY } from "~/config/env";
import { PaymentServiceClient } from "~/infra/proto/PaymentServiceClientPb";
import { Card, Customer , Order, PaymentRequest} from "~/infra/proto/payment_pb";

type Params = {
  card: Card.AsObject
  customer: Customer.AsObject
  order: Omit<Order.AsObject, 'customer'>
} & Pick<PaymentRequest.AsObject, 'provider'>

export class PaymentService {
  private readonly payment: PaymentRequest

  constructor(params: Params) {
    this.payment =  new PaymentRequest()
    this.payment.setCard(this.createCard(params.card))
    this.payment.setOrder(this.createOrder({...params.customer, ...params.order}))
    this.payment.setProvider(params.provider)
  }

  async execute() {
    const client = new PaymentServiceClient(GRPC_ENTRY)
    return await client.process(this.payment, null)
  }

  private createCard(data: Card.AsObject) {
    const card = new Card();

    card.setBrand(data.brand)
    card.setCcv(data.ccv)
    card.setExp(data.exp)
    card.setName(data.name)
    card.setNumber(data.number)

    return card
  }

  private createOrder(data: Customer.AsObject & Omit<Order.AsObject, 'customer'>){
    const customer = new Customer();
    const order = new Order()

    customer.setFirstName(data.firstName)
    customer.setLastName(data.lastName)
    order.setCustomer(customer)
    order.setAmount(data.amount)
    order.setOrderid(data.orderid)

    return order
  }
}