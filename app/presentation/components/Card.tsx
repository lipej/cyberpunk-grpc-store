import cardBrand from "~/utils/card-brand";
import { formatValidate } from "~/utils/format-date";
import CardChip from "./icons/CardChip";

export default function Cart({
  name = "Your Name",
  cardNumber = "0000 0000 0000 0000",
  cardValidate = "000000",
  cardCCV = "000",
}) {
  const { img } = cardBrand(cardNumber);
  const normalizeCardNumber = (number: string) => {
    return (
      number
        .replace(/\s/g, "")
        .match(/.{1,4}/g)
        ?.join(" ")
        .slice(0, 19) || ""
    );
  };
  const validate = formatValidate(cardValidate);

  return (
    <div className='flex justify-center mt-8'>
      <div className='flex flex-col w-[400px] h-[220px] rounded-md shadow-md shadow-slate-900 bg-gradient-to-bl from-black to-blue-500'>
        <div className='relative flex flex-col items-center justify-center text-2xl text-white text-opacity-75 h-full'>
          <CardChip />
          <span className='ml-8 mb-2 text-2xl'>
            {normalizeCardNumber(cardNumber)}
          </span>
          <div className='flex flex-col absolute bottom-0 left-0 mx-8 mb-2'>
            <div className='flex w-[240px] justify-between '>
              <div className='flex flex-col'>
                <span className='text-xs text-zinc-200'>Validade</span>

                <p className='w-[90px] bg-transparent text-xl'>{validate}</p>
              </div>
              <div className='form-control p-0'>
                <span className='text-xs text-zinc-200'>CCV</span>
                <p className='w-[50px] bg-transparent text-xl'>
                  {cardCCV ?? "000"}
                </p>
              </div>
            </div>
            <p className='text-base mt-1'>{name}</p>
          </div>
          <div className='absolute right-0 bottom-0 w-[120px]'>
            {!!img && <img src={img} alt='card-brand' />}
          </div>
        </div>
      </div>
    </div>
  );
}
