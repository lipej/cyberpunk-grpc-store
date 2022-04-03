import { ActionFunction, useFetcher } from "remix";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";

import Card from "~/presentation/components/Card";
import Cart from "~/presentation/components/Cart";
import CollapseContent from "~/presentation/components/CollapseContent";
import Content from "~/presentation/components/Content";
import ToastError from "~/presentation/components/ToastError";
import Paying from "~/presentation/components/Paid";
import PaymentInProgress from "~/presentation/components/PaymentInProgress";

import { cardBrand } from "~/utils/card-brand";
import { getInitialValues } from "~/utils/get-initial-values";
import { PaymentService } from "../domain/service/paymentService";
import { calculateCartTotal } from "~/utils/calculate-card-total";
import { checkFields } from "~/utils/check-fields";
import { formatValidate } from "~/utils/format-date";

import type { Payment } from "~/domain/types/payment";
import type { Cart as CartType } from "~/domain/types/cart";
import { DEFAULT_PROVIDER } from "~/config/env";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const orderId = uuid();
  const name = formData.get("name") as string;
  const cardNumber = formData.get("cardNumber") as string;
  const cardValidate = formData.get("cardValidate") as string;
  const cardCCV = formData.get("cardCCV") as string;
  const brand = formData.get("brand") as string;
  const amount = calculateCartTotal(JSON.parse(formData.get("cart") as string));

  const [firstName, lastName] = name.split(" ");
  const validate = formatValidate(cardValidate);
  const service = new PaymentService({
    card: {
      brand,
      ccv: cardCCV,
      exp: validate,
      name: name,
      number: cardNumber,
    },
    customer: { firstName, lastName },
    order: { amount, orderid: orderId },
    provider: DEFAULT_PROVIDER,
  });

  const response = await service.execute();

  return { code: response.getCode(), message: response.getMessage(), orderId };
};

export default function CheckoutPage() {
  const fetcher = useFetcher();
  const [cart, setCart] = useState(getInitialValues() as CartType);
  const { register, handleSubmit, watch } = useForm();
  const [waiting, setWaiting] = useState(false);
  const [payout, setPayout] = useState(false);
  const [checkout, setCheckout] = useState(true);
  const [order, setOrder] = useState("");
  const [error, setError] = useState("");
  const brand = cardBrand(watch("cardNumber"));
  const canShowCart = cart?.length > 0;
  const response = fetcher.data;
  const fieldsErrorMessage =
    "Por favor digite apenas números nos campos do cartão";

  const handleClear = () => {
    setCart([]);
  };

  if (!canShowCart) {
    if (typeof window !== "undefined") window.location.pathname = "/store";
  }

  const handleError = (message: string) => {
    setError(message);
    setWaiting(false);
    setCheckout(true);
  };

  const handleSuccess = (orderId: string) => {
    setOrder(orderId);
    setWaiting(false);
    setPayout(true);
  };

  const handleRequest = () => {
    setWaiting(true);
    setCheckout(false);
  };

  const validateFields = ({ cardNumber, cardValidate, cardCCV }: Payment) => {
    if (
      checkFields(cardNumber) ||
      checkFields(cardValidate) ||
      checkFields(cardCCV)
    )
      return true;

    return false;
  };

  const handlePayment = (data: Payment, brand: string, amount: string) => {
    if (validateFields(data)) {
      setError(fieldsErrorMessage);
      return;
    }
    handleRequest();

    fetcher.submit({ ...data, brand, amount }, { method: "post" });
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));

    if (response?.code !== 200 && response?.code !== undefined) {
      handleError(response.message);
    }

    if (response?.code === 200 && response?.code !== undefined) {
      handleSuccess(response.orderId);
    }
  }, [cart, response]);

  return (
    <Content>
      {canShowCart && <Cart cart={cart} clear={() => handleClear()} />}
      {!!waiting && <PaymentInProgress />}
      {!!payout && <Paying orderId={order} />}
      {!!error && <ToastError message={error} close={() => setError("")} />}
      {!!checkout && (
        <fetcher.Form
          onSubmit={handleSubmit((data) =>
            handlePayment(
              data as Payment,
              brand.brand,
              calculateCartTotal(cart).toString()
            )
          )}
        >
          <CollapseContent title='Dados Pessoais'>
            <input
              {...register("name")}
              placeholder='Nome Completo'
              className='input input-bordered input-sm w-full'
            />
            <input
              {...register("email")}
              type='email'
              placeholder='E-mail'
              className='input input-bordered input-sm w-full'
            />
          </CollapseContent>
          <CollapseContent title='Dados do cartão'>
            <Card {...watch()} />
            <div className='flex flex-col pt-4 space-y-2'>
              <input
                placeholder='Número Cartão'
                maxLength={16}
                {...register("cardNumber")}
                className='input input-bordered input-sm w-full '
              />
              <div className='flex justify-between space-x-2'>
                <input
                  {...register("cardValidate")}
                  placeholder='Validade'
                  maxLength={6}
                  className='input input-bordered input-sm w-full'
                />
                <input
                  {...register("cardCCV")}
                  placeholder='CCV'
                  maxLength={3}
                  className='input input-bordered input-sm w-full'
                />
              </div>
            </div>
          </CollapseContent>
          <input type='submit' className='mt-8 btn btn-warning' />
        </fetcher.Form>
      )}
    </Content>
  );
}
