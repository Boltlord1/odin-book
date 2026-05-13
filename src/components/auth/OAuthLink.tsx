import type { Icon } from '@phosphor-icons/react'
import type { FunctionComponent } from 'react'
import { Link } from 'react-router'
import { backendUrl } from '../../lib/variables'

interface Props {
  Icon: Icon
  provider: 'Google' | 'Github'
}

const OAuthLink: FunctionComponent<Props> = ({ Icon, provider }) => (
  <Link
    className='flex items-center gap-2'
    to={`${backendUrl}/auth/${provider.toLowerCase()}`}
  >
    <Icon size={32} />
    <span>Sign in with {provider}</span>
  </Link>
)

export default OAuthLink
