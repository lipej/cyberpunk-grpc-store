/**
 * @fileoverview gRPC-Web generated client stub for dev.lipejose.paymentprocessor
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as payment_pb from './payment_pb';


export class PaymentServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'binary';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodDescriptorprocess = new grpcWeb.MethodDescriptor(
    '/dev.lipejose.paymentprocessor.PaymentService/process',
    grpcWeb.MethodType.UNARY,
    payment_pb.PaymentRequest,
    payment_pb.PaymentResponse,
    (request: payment_pb.PaymentRequest) => {
      return request.serializeBinary();
    },
    payment_pb.PaymentResponse.deserializeBinary
  );

  process(
    request: payment_pb.PaymentRequest,
    metadata: grpcWeb.Metadata | null): Promise<payment_pb.PaymentResponse>;

  process(
    request: payment_pb.PaymentRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: payment_pb.PaymentResponse) => void): grpcWeb.ClientReadableStream<payment_pb.PaymentResponse>;

  process(
    request: payment_pb.PaymentRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: payment_pb.PaymentResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/dev.lipejose.paymentprocessor.PaymentService/process',
        request,
        metadata || {},
        this.methodDescriptorprocess,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/dev.lipejose.paymentprocessor.PaymentService/process',
    request,
    metadata || {},
    this.methodDescriptorprocess);
  }

}

