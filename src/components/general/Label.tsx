import type { FunctionComponent, JSX } from 'react'

interface Props {
  input: JSX.Element
  label: string
}

const Label: FunctionComponent<Props> = ({ label, input }) => (
  <label className='flex flex-col gap-1' htmlFor={input.props.id}>
    <span>{label}</span>
    {input}
  </label>
)

export default Label
