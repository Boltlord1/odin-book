import { PaperPlaneRightIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import ContentInput from '../validate/Content'
import Form from '../validate/Form'

interface Props<T> {
  label: string
  path: string
  placeholder: string
  success: (data: T) => void
}

const Content = <T,>({ label, path, success, placeholder }: Props<T>) => {
  const [value, setValue] = useState('')
  const [focus, setFocus] = useState(false)

  function reset() {
    setValue('')
    setFocus(false)
  }

  function successAndReset(data: T) {
    success(data)
    reset()
  }

  const footer = focus && (
    <div className='flex gap-2 self-end'>
      <button
        className='flex gap-2 rounded-lg bg-gray-100 px-4 py-1'
        onClick={reset}
        type='button'
      >
        <span className='font-semibold'>Cancel</span>
      </button>
      <button
        className='flex gap-2 rounded-lg bg-gray-100 px-4 py-1'
        type='submit'
      >
        <span className='font-semibold'>Send</span>
        <PaperPlaneRightIcon className='h-6 w-6' weight='bold' />
      </button>
    </div>
  )

  return (
    <Form app footer={footer} path={path} success={successAndReset}>
      <ContentInput
        label={label}
        placeholder={placeholder}
        setFocus={setFocus}
        setValue={setValue}
        value={value}
      />
    </Form>
  )
}

export default Content
