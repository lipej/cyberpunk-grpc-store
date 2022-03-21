type Paid = {
  orderId: string;
};

export default function Paid({ orderId }: Paid) {
  return (
    <div className='items-center space-y-2'>
      <h1 className='text-2xl'>Pago com successo</h1>
      <h1 className='text-xl'>orderId: {orderId}</h1>
    </div>
  );
}
