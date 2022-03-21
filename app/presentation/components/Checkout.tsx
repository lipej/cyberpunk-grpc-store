import { useState } from "react";
import { useForm } from "react-hook-form";
import cardBrand from "~/utils/card-brand";
import Card from "./Card";
import CollapseContent from "./CollapseContent";

const inputStyle = "input input-bordered input-sm w-full";

export default function Checkout() {
  const { register, handleSubmit, watch } = useForm();
  const [data, setData] = useState({});
  const brand = cardBrand(watch("cardNumber"));

  return (
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
  )
}