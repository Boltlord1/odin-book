import type { FunctionComponent, HTMLInputTypeAttribute } from 'react'

interface Props {
	type: HTMLInputTypeAttribute
	name: string
	placeholder?: string
}

const Input: FunctionComponent<Props> = ({ type, name, placeholder }) => {
	return (
		<input
			type={type}
			name={name}
			id={name}
			placeholder={placeholder}
			className='border border-gray-700 rounded-md outline-0 p-1 pl-4 pr-4 focus:border-blue-600 focus:shadow-md'
		/>
	)
}

export default Input
