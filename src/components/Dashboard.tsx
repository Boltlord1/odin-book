import { HouseIcon, PlusCircleIcon } from '@phosphor-icons/react'
import type { FunctionComponent } from 'react'
import { NavLink } from 'react-router'

const Dashboard: FunctionComponent = () => {
	return (
		<nav className='p-2 pl-4 pr-4 flex'>
			<NavLink to={'/app/post'} className='text-4xl nav-active:text-pink-500'>
				<HouseIcon />
			</NavLink>
			<NavLink to={'/app/upload'} className='text-4xl nav-active:text-pink-500'>
				<PlusCircleIcon />
			</NavLink>
		</nav>
	)
}

export default Dashboard
