import type { FunctionComponent, HTMLInputTypeAttribute } from 'react'

interface Props {
  name: string
  placeholder?: string
  type: HTMLInputTypeAttribute
}

const Input: FunctionComponent<Props> = ({ type, name, placeholder }) => (
  <input
    className='rounded-md border border-gray-700 p-1 pr-4 pl-4 outline-0 focus:border-blue-600 focus:shadow-md'
    id={name}
    name={name}
    placeholder={placeholder}
    type={type}
  />
)

export default Input
