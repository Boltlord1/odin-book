import { type FunctionComponent, useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router'
import { dashboardLinks } from '../lib/variables'

const Mobile: FunctionComponent = () => {
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY

      if (currentY > lastScrollY.current && currentY > 60) {
        setHidden(true)
      } else if (currentY < lastScrollY.current) {
        setHidden(false)
      }

      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-50 -m-4 flex justify-center gap-2 xxs:gap-8 border-pink-500 border-b-2 bg-white p-2 transition-transform duration-300 lg:hidden ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
    >
      {dashboardLinks.map(({ id, Icon }) => (
        <NavLink
          className='flex gap-4 js-active:text-pink-500 text-4xl'
          key={id}
          to={`/app/${id}`}
        >
          <Icon />
        </NavLink>
      ))}
    </nav>
  )
}

export default Mobile
