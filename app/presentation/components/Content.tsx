type Content = { 
  children: JSX.Element | JSX.Element[] | {}
};

export default function Content({ children }: Content) {
  return (
    <div className='flex flex-col justify-center items-center h-screen relative'>
      {children}
    </div>
  );
}
