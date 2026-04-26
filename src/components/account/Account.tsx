import { AdvancedImage } from '@cloudinary/react'
import { type FunctionComponent, useState } from 'react'
import { useOutletContext } from 'react-router'
import type { AppContext } from '../../types/app'
import Display from './Display'
import { default as NameForm } from './FormName'
import { default as AvatarForm } from './FormAvatar'
import Label from '../general/Label'
import Input from '../general/Input'

const Account: FunctionComponent = () => {
	const { user, setUser } = useOutletContext<AppContext>()
	const [editNames, setNames] = useState(false)
	const [editAvatar, setAvatar] = useState(false)

	const names = editNames ? (
		<NameForm setEdit={setNames} setUser={setUser}>
			<Label label='Username' input={<Input name='username' type='text' placeholder={user.name} />} />
			<Label label='Username' input={<Input name='username' type='text' placeholder={user.display} />} />
		</NameForm>
	) : (
		<Display setEdit={setNames}>
			<h2>Username: {user.name}</h2>
			<h2>Display name: {user.display}</h2>
		</Display>
	)
	const avatar = editAvatar ? (
		<AvatarForm setEdit={setAvatar} setUser={setUser} />
	) : (
		<Display setEdit={setAvatar}>
			<h2>Avatar</h2>
			<AdvancedImage cldImg={user.avatar} />
		</Display>
	)

	return (
		<div>
			{names}
			{avatar}
		</div>
	)
}

export default Account
