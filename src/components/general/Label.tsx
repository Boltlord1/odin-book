import type { FunctionComponent, JSX } from 'react'

interface Props {
	label: string
	input: JSX.Element
}

const Label: FunctionComponent<Props> = ({ label, input }) => {
	return (
		<label htmlFor={input.props.id} className='flex flex-col gap-1'>
			<span>{label}</span>
			{input}
		</label>
	)
}

export default Label
