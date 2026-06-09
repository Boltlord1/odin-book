import { TrashIcon } from '@phosphor-icons/react'
import type { FunctionComponent } from 'react'
import { useOutletContext } from 'react-router'
import type { AppContext } from '../../types/app'
import Icon from './Icon'

interface Props {
  confirm: () => void
  msg: string
}

const Delete: FunctionComponent<Props> = ({ confirm, msg }) => {
  const { setOptions } = useOutletContext<AppContext>()
  const message = `Are you sure you want to delete this ${msg}?`

  return (
    <button onClick={() => setOptions({ message, confirm })} type='button'>
      <Icon Icon={TrashIcon} text='Delete' />
    </button>
  )
}

export default Delete
