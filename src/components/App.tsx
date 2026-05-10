import { type FunctionComponent, useState } from 'react'
import { Outlet, useLoaderData } from 'react-router'
import type { SelfData } from '../types/data'
import Dashboard from './Dashboard'

const App: FunctionComponent = () => {
  const data = useLoaderData<SelfData>()
  const [self, setSelf] = useState(data)
  const context = { self, setSelf }

  return (
    <div className='flex flex-1 flex-col gap-4 p-4'>
      <Dashboard />
      <Outlet context={context} />
    </div>
  )
}

export default App
