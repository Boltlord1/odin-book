import type { FunctionComponent, JSX } from 'react'

interface Props {
	label: string
	input: JSX.Element
	extra?: JSX.Element
}

const Label: FunctionComponent<Props> = ({ label, input, extra }) => {
	return (
		<label htmlFor={input.props.id} className='flex flex-col gap-1'>
			<span>{label}</span>
			{input}
			{extra}
		</label>
	)
}

export default Label
