import { Cart } from "~/domain/types/cart";
import { calculateCartTotal } from "~/utils/calculate-card-total";
import currencyFormatter from "~/utils/currency-formatter";
import CartItem from "./CartItem";

type CartData = {
  cart: Cart;
  clear: () => void;
};

export default function Cart({ cart, clear }: CartData) {
  const totalPrice = calculateCartTotal(cart);

  return (
    <div className='absolute right-0 top-0 m-10 dropdown dropdown-left'>
      <label tabIndex={0} className='btn btn-circle'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          enableBackground='new 0 0 24 24'
          height='24px'
          viewBox='0 0 24 24'
          width='24px'
          fill='#FFFFFF'
        >
          <g>
            <rect fill='none' height='24' width='24' />
            <path d='M18,6h-2c0-2.21-1.79-4-4-4S8,3.79,8,6H6C4.9,6,4,6.9,4,8v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8C20,6.9,19.1,6,18,6z M12,4c1.1,0,2,0.9,2,2h-4C10,4.9,10.9,4,12,4z M18,20H6V8h2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8h4v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8 h2V20z' />
          </g>
        </svg>
      </label>
      <div tabIndex={0} className='dropdown-content bg-primary w-[250px] mr-1'>
        {!cart?.length && (
          <p className='text-bold text-center py-4'>! Carrinho vazio</p>
        )}
        {cart?.map((prod, index) => (
          <CartItem key={index} {...prod} />
        ))}

        <p className='stat-value text-lg text-right m-2'>
          Total: {currencyFormatter(totalPrice)}
        </p>
        <div className='flex justify-evenly m-1'>
          <a
            className="btn btn-xs {cartEmpty ? 'btn-disabled' : ''}"
            href='/checkout'
          >
            Fechar compra
          </a>
          <button
            className="btn btn-xs bg-warning text-black {cartEmpty ? 'btn-disabled' : ''}"
            onClick={clear}
          >
            Limpar carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
