import { type FunctionComponent, useState } from 'react'
import { Outlet, useLoaderData } from 'react-router'
import type { SelfData } from '../types/data'
import Dashboard from './Dashboard'

const App: FunctionComponent = () => {
  const data = useLoaderData<SelfData>()
  const [self, setSelf] = useState(data)
  const context = { self, setSelf }

  return (
    <>
      <Dashboard />
      <Outlet context={context} />
    </>
  )
}

export default App
