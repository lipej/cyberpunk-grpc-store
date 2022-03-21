import Cart from "~/presentation/components/Cart";
import Product from "~/presentation/components/Product";
import adrenalineBoosters from "~/presentation/assets/adrenaline-booster.png"
import bioConductor from "~/presentation/assets/bioconductor.png"
import bioPlasticBloodVessel from "~/presentation/assets/bioplastic-blood-vessel.png"
import feedbackCircuit from "~/presentation/assets/feedbackcircuit.png"
import secondHeart from "~/presentation/assets/second-heart.png"
import tyrosineInjector from "~/presentation/assets/tyrosine-injector.png"
import Content from "~/presentation/components/Content";


export const data = [
  {
    name: "Adrenaline Booster",
    id: "1",
    price: 259900,
    img: adrenalineBoosters,
  },
  {
    name: 'Bio-Conductor',
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
    id: "2",
    price: 37905,
    img: secondHeart,
  },
  {
    name: "Tyrosine Injector",
    id: "2",
    price: 29990,
    img: tyrosineInjector,
  },
];

export default function StorePage() {
  return (
    <Content>
      <Cart />
      <div className='grid grid-cols-3'>
        {data.map((prod) => {
          return <Product {...prod} />;
        })}
      </div>
    </Content>
  );
}
