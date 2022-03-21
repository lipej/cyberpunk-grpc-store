import { useState } from "react";
import { useForm } from "react-hook-form";
import {v4 as uuid } from "uuid"

import Card from "~/presentation/components/Card";
import Cart from "~/presentation/components/Cart";
import CollapseContent from "~/presentation/components/CollapseContent";
import Content from "~/presentation/components/Content";
import Error from "~/presentation/components/Error";
import Paying from "~/presentation/components/Paid";
import PaymentInProgress from "~/presentation/components/PaymentInProgress";

import cardBrand from "~/utils/card-brand";

const inputStyle = "input input-bordered input-sm w-full";

export default function CheckoutPage() {
  const orderId = uuid();
  const { register, handleSubmit, watch } = useForm();
  const [data, setData] = useState({});
  const [waiting, setWaiting] = useState(false);
  const [payout, setPayout] = useState(false);
  const [checkout, setCheckout] = useState(true);
  const [error, setError] = useState(true);

  const brand = cardBrand(watch("cardNumber"));

  return (
    <Content>
      <Cart />
      {!!waiting && <PaymentInProgress />}
      {!!payout && <Paying orderId='test' />}
      {!!error && <Error message='teste' close={() => setError(!error)} />}
      {!!checkout && (
        <form onSubmit={handleSubmit((data) => setData(data))}>
          <CollapseContent title='Dados Pessoais'>
            <input
              {...register("name")}
              placeholder='Nome Completo'
              className={inputStyle}
            />
            <input
              {...register("email")}
              type='email'
              placeholder='E-mail'
              className={inputStyle}
            />
          </CollapseContent>
          <CollapseContent title='Dados do cartão'>
            <Card {...watch()} />
            <div className='flex flex-col pt-4 space-y-2 text-white'>
              <input
                {...register("cardNumber")}
                placeholder='Número Cartão'
                maxLength={16}
                type='number'
                className={inputStyle}
              />
              <div className='flex justify-between space-x-2'>
                <input
                  {...register("cardValidate")}
                  placeholder='Validade'
                  maxLength={6}
                  type='text'
                  className={inputStyle}
                />
                <input
                  {...register("cardCCV")}
                  placeholder='CCV'
                  maxLength={3}
                  type='text'
                  className={inputStyle}
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
