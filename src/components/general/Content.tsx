import { PaperPlaneRightIcon } from '@phosphor-icons/react'
import type { SubmitEventHandler } from 'react'
import adjustHeight from '../../lib/adjustHeight'
import { jsonOptions } from '../../lib/fetch'

interface Props<T> {
  absolute?: boolean
  path: string
  placeholder: string
  update: (data: T) => void
}

const Content = <T,>({ path, update, placeholder, absolute }: Props<T>) => {
  const handleSubmit: SubmitEventHandler = async (event) => {
    event.preventDefault()

    const response = await fetch(path, jsonOptions(event.target))

    if (response.ok) {
      event.target.reset()
      const json = await response.json()
      update(json)
      return
    }

    console.log(response)
  }

  return (
    <form
      className={`${absolute ? 'relative' : 'gap-4'} flex flex-col`}
      onSubmit={handleSubmit}
    >
      <textarea
        className='resize-none rounded-lg bg-gray-100 p-2 text-sm outline-0'
        name='content'
        onChange={adjustHeight}
        placeholder={`add a ${placeholder}...`}
        rows={2}
      />
      <button
        className={`${absolute ? 'absolute right-4 -bottom-12' : 'self-end'} flex gap-2 rounded-lg bg-gray-100 px-4 py-1`}
        type='submit'
      >
        <span className='font-semibold'>Send</span>
        <PaperPlaneRightIcon className='h-6 w-6' weight='bold' />
      </button>
    </form>
  )
}

export default Content
