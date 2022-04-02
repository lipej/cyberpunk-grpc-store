import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";

import Card from "~/presentation/components/Card";
import Cart from "~/presentation/components/Cart";
import CollapseContent from "~/presentation/components/CollapseContent";
import Content from "~/presentation/components/Content";
import Error from "~/presentation/components/Error";
import Paying from "~/presentation/components/Paid";
import PaymentInProgress from "~/presentation/components/PaymentInProgress";

import cardBrand from "~/utils/card-brand";
import { getInitialValues } from "~/utils/get-initial-values";
import { PaymentService } from "../../domain/service/paymentService";
import { calculateCartTotal } from "~/utils/calculate-card-total";

import type { Cart as CartType } from "~/domain/types/cart";
import { checkFields } from "~/utils/check-fields";
import { formatValidate } from "~/utils/format-date";
import { Payment } from "~/domain/types/payment";

export default function CheckoutPage() {
  const orderId = uuid();
  const [cart, setCart] = useState(getInitialValues() as CartType);
  const { register, handleSubmit, watch } = useForm();
  const [waiting, setWaiting] = useState(false);
  const [payout, setPayout] = useState(false);
  const [checkout, setCheckout] = useState(true);
  const [error, setError] = useState("");
  const brand = cardBrand(watch("cardNumber"));
  const canShowCart = cart?.length > 0;
  const fieldsErrorMessage = "Please enter only numbers in card fields";

  const handleClear = () => {
    setCart([]);
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

  if (!canShowCart) {
    if (typeof window !== "undefined") window.location.pathname = "/store";
  }

  const handleError = (message: string) => {
    setError(message);
    setWaiting(false);
    setCheckout(true);
  };

  const handleSuccess = () => {
    setWaiting(false);
    setPayout(true);
  };

  const handlePayment = async (
    data: Payment,
    brand: string,
    amount: number
  ) => {
    if (validateFields(data)) {
      setError(fieldsErrorMessage);
      return;
    }

    const [firstName, lastName] = data.name.split(" ");
    const validate = formatValidate(data.cardValidate);
    const service = new PaymentService({
      card: {
        brand,
        ccv: data.cardCCV,
        exp: validate,
        name: data.name,
        number: data.cardNumber,
      },
      customer: { firstName, lastName },
      order: { amount, orderid: orderId },
      provider: "cielo",
    });

    setCheckout(false);
    setWaiting(true);

    try {
      const response = await service.execute();

      if (response.getCode() !== 200) {
        handleError(response.getMessage());
        return;
      }

      handleSuccess();
    } catch (err) {
      handleError((err as Error).message);
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <Content>
      {canShowCart && <Cart cart={cart} clear={() => handleClear()} />}
      {!!waiting && <PaymentInProgress />}
      {!!payout && <Paying orderId={orderId} />}
      {!!error && <Error message={error} close={() => setError("")} />}
      {!!checkout && (
        <form
          onSubmit={handleSubmit((data) =>
            handlePayment(
              data as Payment,
              brand.brand,
              calculateCartTotal(cart)
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
        </form>
      )}
    </Content>
  );
}
