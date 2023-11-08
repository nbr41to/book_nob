export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <div>
      <div>
        <div className='flex gap-2'>
          <div className='font-bold'>Category</div>
          <div>Pychology</div>
          <div>Computer Science</div>
          <div>Business</div>
        </div>
      </div>
      <div>
        <h2>Books</h2>
        {children}
      </div>
    </div>
  );
}
