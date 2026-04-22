import type { FunctionComponent } from 'react'
import { NavLink } from 'react-router'

const Dashboard: FunctionComponent = () => {
	return (
		<nav className='p-2 pl-4 pr-4'>
			<NavLink to={'/app/post'} className='text-4xl nav-active:text-pink-500'>
				<span className='material-symbols-outlined'>home</span>
			</NavLink>
		</nav>
	)
}

export default Dashboard
