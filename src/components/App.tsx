import { useState } from 'react'
import { Outlet, useLoaderData } from 'react-router'
import type { AppContext } from '../types/app'
import type { SelfData } from '../types/data'
import Dashboard from './Dashboard'

function App() {
	const [user, setUser] = useState<SelfData>(useLoaderData<SelfData>())
	const context: AppContext = {
		user,
		setUser
	}

	return (
		<>
			<Dashboard />
			<Outlet context={context} />
		</>
	)
}

export default App
