export default function PaymentInProgress() {
  return (
    <div className='flex items-center'>
      <button
        aria-label='loading button'
        className='btn btn-ghost loading btn-circle'
      />
      <p>Realizando pagamento...</p>
    </div>
  );
}
