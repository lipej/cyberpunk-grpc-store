import { useEffect, useState } from "react";

import Cart from "~/presentation/components/Cart";
import Product from "~/presentation/components/Product";
import Content from "~/presentation/components/Content";

import adrenalineBoosters from "~/presentation/assets/adrenaline-booster.png";
import bioConductor from "~/presentation/assets/bioconductor.png";
import bioPlasticBloodVessel from "~/presentation/assets/bioplastic-blood-vessel.png";
import feedbackCircuit from "~/presentation/assets/feedbackcircuit.png";
import secondHeart from "~/presentation/assets/second-heart.png";
import tyrosineInjector from "~/presentation/assets/tyrosine-injector.png";

import { getInitialValues } from "~/utils/get-initial-values";

import type { Cart as CartType } from "~/domain/types/cart";
import type { Product as ProductType } from "~/domain/types/product";
import type { CartItem } from "~/domain/types/cart-item";

export const data = [
  {
    name: "Adrenaline Booster",
    id: "1",
    price: 259900,
    img: adrenalineBoosters,
  },
  {
    name: "Bio-Conductor",
    id: "2",
    price: 1394907,
    img: bioConductor,
  },
  {
    name: "Bio-Plastic Blood Vessel",
    id: "3",
    price: 854905,
    img: bioPlasticBloodVessel,
  },
  {
    name: "Feedback Circuit",
    id: "4",
    price: 42655,
    img: feedbackCircuit,
  },
  {
    name: "Second Heart",
    id: "5",
    price: 37905,
    img: secondHeart,
  },
  {
    name: "Tyrosine Injector",
    id: "6",
    price: 29990,
    img: tyrosineInjector,
  },
];

export default function StorePage() {
  const [cart, setCart] = useState(getInitialValues() as CartType);

  const addProd = (prod: ProductType) => {
    if (getProductFromCart(prod.id)) {
      setCart(
        cart.map((product) =>
          product.id === prod.id ? addQtd(product) : product
        )
      );
    } else {
      setCart([...cart, { ...prod, qtd: 1 }]);
    }
  };

  const getProductFromCart = (id: string) =>
    cart.find((cartProd) => cartProd.id === id);

  const addQtd = (product: CartItem) => ({
    ...product,
    qtd: product.qtd + 1,
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <Content>
      <Cart cart={cart} clear={() => setCart([])} />
      <div className='grid grid-cols-3'>
        {data.map((prod) => {
          return (
            <Product key={prod.id} prod={prod} add={() => addProd(prod)} />
          );
        })}
      </div>
    </Content>
  );
}
