import { CartItem } from "~/domain/types/cart-item";

export default function CartItem({
  qtd,
  name,
  img,
}: Omit<CartItem, "price" | "id">) {
  return (
    <section className='flex justify-around items-center'>
      <div className='avatar m-2 w-14 h-14 mask mask-squircle bg-accent-content'>
        <img src={img} alt={name} />
      </div>
      <div>
        <span className='text-right text-xl'>{qtd}x</span>
      </div>
    </section>
  );
}
