import { type FunctionComponent, useState } from 'react'
import { Outlet, useLoaderData } from 'react-router'
import type { SelfData } from '../types/data'
import Laptop from './Laptop'
import Mobile from './Mobile'

const App: FunctionComponent = () => {
  const data = useLoaderData<SelfData>()
  const [self, setSelf] = useState(data)
  const context = { self, setSelf }

  return (
    <div className='relative flex flex-1 flex-col gap-4 p-4 sm:w-160 sm:self-center'>
      <Mobile />
      <Laptop />
      <div className='lg:hidden' />
      <Outlet context={context} />
    </div>
  )
}

export default App
