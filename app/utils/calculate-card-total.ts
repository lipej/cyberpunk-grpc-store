import { Cart } from "~/domain/types/cart";

export const calculateCartTotal = (cart: Cart) => cart
  ?.map((item) => item.qtd * item.price)
  .reduce((acc, value) => acc + value, 0) ?? 0;