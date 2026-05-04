import { AdvancedImage } from '@cloudinary/react'
import { type FunctionComponent, useState } from 'react'
import { Link, useOutletContext } from 'react-router'
import getImg from '../../lib/cloudinary'
import { backendUrl } from '../../lib/variables'
import type { AppContext } from '../../types/app'
import Input from '../general/Input'
import Label from '../general/Label'
import Display from './Display'
import { default as AvatarForm } from './FormAvatar'
import { default as NameForm } from './FormName'

const Account: FunctionComponent = () => {
  const { self, setSelf } = useOutletContext<AppContext>()
  const [editNames, setNames] = useState(false)
  const [editAvatar, setAvatar] = useState(false)

  const names = editNames ? (
    <NameForm setEdit={setNames} setSelf={setSelf}>
      <Label
        input={<Input name='username' placeholder={self.name} type='text' />}
        label='Username'
      />
      <Label
        input={<Input name='display' placeholder={self.display} type='text' />}
        label='Display name'
      />
    </NameForm>
  ) : (
    <Display setEdit={setNames}>
      <h2>Username: {self.name}</h2>
      <h2>Display name: {self.display}</h2>
    </Display>
  )
  const avatar = editAvatar ? (
    <AvatarForm setEdit={setAvatar} setSelf={setSelf} />
  ) : (
    <Display setEdit={setAvatar}>
      <h2>Avatar</h2>
      <AdvancedImage cldImg={getImg(self.avatar)} />
    </Display>
  )

  const email = self.identities.find(i => i.provider === 'Email')
  const google = self.identities.find(i => i.provider === 'Google')
  const github = self.identities.find(i => i.provider === 'Github')

  return (
    <div>
      {names}
      {avatar}
      <div>
        <h2>Connections:</h2>
        {email ? (
          <h2>Email: {email.id}</h2>
        ) : (
          <h2>
            Email: None <Link to='/auth/signup/email'>Connect</Link>
          </h2>
        )}
        {google ? (
          <h2>Google: {google.data.email}</h2>
        ) : (
          <h2>
            Google: None <Link to={`${backendUrl}/auth/google`}>Connect</Link>
          </h2>
        )}
        {github ? (
          <h2>
            Github: <Link to={github.data.url}>{github.data.username}</Link>
          </h2>
        ) : (
          <h2>
            Github: None <Link to={`${backendUrl}/auth/github`}>Connect</Link>
          </h2>
        )}
      </div>
      <Link to={`${backendUrl}/auth/logout`}>Log out</Link>
    </div>
  )
}

export default Account
