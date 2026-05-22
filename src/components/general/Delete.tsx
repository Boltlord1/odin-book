import { TrashIcon } from '@phosphor-icons/react'
import type { FunctionComponent } from 'react'
import { useOutletContext } from 'react-router'
import { useDeleteContext } from '../../hooks/delete'
import type { AppContext, DeleteType } from '../../types/app'
import Icon from './Icon'

interface Props {
  id: string
  type: DeleteType
  userId?: string
}

const Delete: FunctionComponent<Props> = ({ id, type, userId }) => {
  const { self, setOptions } = useOutletContext<AppContext>()
  const context = useDeleteContext()

  if (self.id !== userId) {
    return
  }

  const confirm = () => {
    const func = context[type]
    if (func) {
      func(id)
    }
  }

  const message =
    type === 'user'
      ? 'Are you sure you want to delete your account?'
      : `Are you sure you want to delete this ${type}?`

  return (
    <button onClick={() => setOptions({ message, confirm })} type='button'>
      <Icon Icon={TrashIcon} text='Delete' />
    </button>
  )
}

export default Delete
