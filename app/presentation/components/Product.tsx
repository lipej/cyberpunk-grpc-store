import { data } from "~/routes/store";
import currencyFormatter from "~/utils/currency-formatter";

export default function Product(prod: typeof data[0]) {
  return (
    <div className='card w-52 h-[300px] bg-base-300 shadow-xl mx-6 my-4'>
      <figure
        className='bg-white
	'
      >
        <img className='w-52 h-52' src={prod.img} alt='Shoes' />
        <div className='rating gap-1 absolute m-2 right-0 top-0 '>
          <input
            type='checkbox'
            name='rating-3'
            className='checkbox mask mask-heart bg-red-400'
          />
        </div>
      </figure>
      <div className='card-body p-2'>
        <h2 className='card-title text-ellipsis'>{prod.name}</h2>
      </div>
      <div className='text-center'>
        <div className='badge badge-success ml-2'>
          R$ {currencyFormatter(prod.price)}
        </div>
        <button
          onClick={() => console.log(prod)}
          className='badge badge-error ml-2'
        >
          buy
        </button>
      </div>
    </div>
  );
}
