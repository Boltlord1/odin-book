import { useState } from 'react'
import { Outlet, useLoaderData } from 'react-router'
import type { AppContext } from '../types/app'
import type { UserData } from '../types/user'
import Dashboard from './Dashboard'

function App() {
	const [user, setUser] = useState<UserData>(useLoaderData<UserData>())
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
