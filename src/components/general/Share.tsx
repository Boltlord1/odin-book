import { ShareFatIcon } from '@phosphor-icons/react'
import { type FunctionComponent, useEffect, useState } from 'react'
import Icon from './Icon'

interface Props {
  id: string
}

const Share: FunctionComponent<Props> = ({ id }) => {
  const [toast, setToast] = useState('')

  async function copy() {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/app/post/${id}`
      )
      setToast('')
      requestAnimationFrame(() => {
        setToast('Linked copied to clipboard')
      })
    } catch (err) {
      console.log(err)
      setToast('')
      requestAnimationFrame(() => {
        setToast('Failed to copy')
      })
    }
  }

  useEffect(() => {
    if (!toast) {
      return
    }

    const timeout = setTimeout(() => {
      setToast('')
    }, 2000)

    return () => clearTimeout(timeout)
  }, [toast])

  return (
    <button className='relative' onClick={copy} onKeyDown={copy} type='button'>
      <Icon Icon={ShareFatIcon} text='Share' />
      {toast && (
        <p
          aria-live='polite'
          className='absolute -top-9 left-1/2 w-max -translate-x-1/2 animate-[toast_1s_ease_forwards] rounded-xl bg-gray-100 px-4 py-1 text-sm dark:bg-zinc-700'
          role='status'
        >
          {toast}
        </p>
      )}
    </button>
  )
}

export default Share
