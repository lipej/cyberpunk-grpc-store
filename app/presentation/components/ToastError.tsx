import Close from "./icons/Close";

type Error = {
  message: string;
  close?: () => void;
};

export default function ToastError({ message, close }: Error) {
  return (
    <div className='alert alert-error shadow-lg absolute left-0 top-0 text-xs w-auto max-w-80 m-8'>
      <button onClick={close}>
        <span>{message}</span>
        {close && <Close />}
      </button>
    </div>
  );
}
