import { Outlet } from 'react-router'
import Dashboard from './Dashboard'

function App() {
	return (
		<>
			<Dashboard />
			<Outlet />
		</>
	)
}

export default App
