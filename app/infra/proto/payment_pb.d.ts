import * as jspb from 'google-protobuf'



export class PaymentRequest extends jspb.Message {
  getCard(): Card | undefined;
  setCard(value?: Card): PaymentRequest;
  hasCard(): boolean;
  clearCard(): PaymentRequest;

  getOrder(): Order | undefined;
  setOrder(value?: Order): PaymentRequest;
  hasOrder(): boolean;
  clearOrder(): PaymentRequest;

  getProvider(): string;
  setProvider(value: string): PaymentRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PaymentRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PaymentRequest): PaymentRequest.AsObject;
  static serializeBinaryToWriter(message: PaymentRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PaymentRequest;
  static deserializeBinaryFromReader(message: PaymentRequest, reader: jspb.BinaryReader): PaymentRequest;
}

export namespace PaymentRequest {
  export type AsObject = {
    card?: Card.AsObject,
    order?: Order.AsObject,
    provider: string,
  }
}

export class Card extends jspb.Message {
  getNumber(): string;
  setNumber(value: string): Card;

  getCcv(): string;
  setCcv(value: string): Card;

  getExp(): string;
  setExp(value: string): Card;

  getName(): string;
  setName(value: string): Card;

  getBrand(): string;
  setBrand(value: string): Card;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Card.AsObject;
  static toObject(includeInstance: boolean, msg: Card): Card.AsObject;
  static serializeBinaryToWriter(message: Card, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Card;
  static deserializeBinaryFromReader(message: Card, reader: jspb.BinaryReader): Card;
}

export namespace Card {
  export type AsObject = {
    number: string,
    ccv: string,
    exp: string,
    name: string,
    brand: string,
  }
}

export class Order extends jspb.Message {
  getOrderid(): string;
  setOrderid(value: string): Order;

  getAmount(): number;
  setAmount(value: number): Order;

  getCustomer(): Customer | undefined;
  setCustomer(value?: Customer): Order;
  hasCustomer(): boolean;
  clearCustomer(): Order;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Order.AsObject;
  static toObject(includeInstance: boolean, msg: Order): Order.AsObject;
  static serializeBinaryToWriter(message: Order, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Order;
  static deserializeBinaryFromReader(message: Order, reader: jspb.BinaryReader): Order;
}

export namespace Order {
  export type AsObject = {
    orderid: string,
    amount: number,
    customer?: Customer.AsObject,
  }
}

export class Customer extends jspb.Message {
  getFirstName(): string;
  setFirstName(value: string): Customer;

  getLastName(): string;
  setLastName(value: string): Customer;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Customer.AsObject;
  static toObject(includeInstance: boolean, msg: Customer): Customer.AsObject;
  static serializeBinaryToWriter(message: Customer, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Customer;
  static deserializeBinaryFromReader(message: Customer, reader: jspb.BinaryReader): Customer;
}

export namespace Customer {
  export type AsObject = {
    firstName: string,
    lastName: string,
  }
}

export class PaymentResponse extends jspb.Message {
  getSuccess(): boolean;
  setSuccess(value: boolean): PaymentResponse;

  getOrderId(): string;
  setOrderId(value: string): PaymentResponse;

  getTransactionId(): string;
  setTransactionId(value: string): PaymentResponse;

  getMessage(): string;
  setMessage(value: string): PaymentResponse;

  getCode(): number;
  setCode(value: number): PaymentResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PaymentResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PaymentResponse): PaymentResponse.AsObject;
  static serializeBinaryToWriter(message: PaymentResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PaymentResponse;
  static deserializeBinaryFromReader(message: PaymentResponse, reader: jspb.BinaryReader): PaymentResponse;
}

export namespace PaymentResponse {
  export type AsObject = {
    success: boolean,
    orderId: string,
    transactionId: string,
    message: string,
    code: number,
  }
}

