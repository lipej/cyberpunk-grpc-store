import cardBrand from "~/utils/card-brand";
import CardChip from "./icons/CardChip";

export default function Cart({
  name = "",
  cardNumber = "0000 0000 0000 0000",
  cardValidate = "00/0000",
  cardCCV = "000",
}) {
  const { img } = cardBrand(cardNumber);

  return (
    <div className='flex justify-center mt-8'>
      <div className='flex flex-col w-[400px] h-[220px] rounded-md shadow-md shadow-slate-900 bg-slate-500'>
        <div className='relative flex flex-col items-center justify-center text-2xl text-black h-full'>
          <CardChip />
          <span className='ml-8 mb-2 text-2xl'>{cardNumber}</span>
          <div className='flex flex-col absolute bottom-0 left-0 mx-8 mb-2'>
            <div className='flex w-[240px] justify-between '>
              <div className='flex flex-col'>
                <span className='text-xs text-zinc-200'>Validade</span>

                <p className='w-[90px] bg-transparent text-xl'>
                  {cardValidate}
                </p>
              </div>
              <div className='form-control p-0'>
                <span className='text-xs text-zinc-200'>CCV</span>
                <p className='w-[50px] bg-transparent text-xl'>{cardCCV ?? "000"}</p>
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
