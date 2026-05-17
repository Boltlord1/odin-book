import {
  GithubLogoIcon,
  GoogleLogoIcon,
  type Icon
} from '@phosphor-icons/react'
import type { FunctionComponent } from 'react'
import { Link } from 'react-router'
import { BACKEND_URL } from '../../lib/variables'

interface Props {
  Icon: Icon
  provider: 'Google' | 'Github'
}

const OAuthLink: FunctionComponent<Props> = ({ Icon, provider }) => (
  <Link
    className='flex items-center gap-2'
    to={`${BACKEND_URL}/auth/${provider.toLowerCase()}`}
  >
    <Icon size={32} />
    <span>Sign in with {provider}</span>
  </Link>
)

const OAuthLinks: FunctionComponent = () => (
  <>
    <OAuthLink Icon={GoogleLogoIcon} provider='Google' />
    <OAuthLink Icon={GithubLogoIcon} provider='Github' />
  </>
)

export default OAuthLinks
