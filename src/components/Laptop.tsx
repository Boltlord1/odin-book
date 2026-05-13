import type { FunctionComponent } from 'react'
import { NavLink } from 'react-router'
import { dashboardLinks } from '../lib/variables'

const Laptop: FunctionComponent = () => (
  <nav className='fixed hidden -translate-x-[calc(100%+3rem)] flex-col gap-4 lg:flex'>
    {dashboardLinks.map(({ id, text, Icon }) => (
      <NavLink
        className='flex gap-4 js-active:text-pink-500 text-4xl'
        key={id}
        to={`/app/${id}`}
      >
        <Icon />
        <h2 className='hidden text-2xl lg:block'>{text}</h2>
      </NavLink>
    ))}
  </nav>
)

export default Laptop
