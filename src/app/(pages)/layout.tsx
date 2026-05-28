import type { ReactNode } from 'react'

const PagesLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return <div className='flex flex-col'>{children}</div>
}

export default PagesLayout
