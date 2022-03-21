export type CollapseContent = {
  title: string;
  children: JSX.Element | JSX.Element[];
};

export default function CollapseContent({ title, children }: CollapseContent) {
  return (
    <div tabIndex={0} className='collapse collapse-arrow w-[600px]'>
      <input type='checkbox' className='peer' />
      <div className='collapse-title bg-secondary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content'>
        {title}
      </div>

      <div className='collapse-content bg-secondary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content space-y-2'>
        {children}
      </div>
    </div>
  );
}
