import { PaperPlaneRightIcon } from '@phosphor-icons/react'
import type { FunctionComponent, SubmitEventHandler } from 'react'
import adjustHeight from '../../lib/adjustHeight'

interface Props {
  handleSubmit: SubmitEventHandler
}

const CommentForm: FunctionComponent<Props> = ({ handleSubmit }) => (
  <form className='flex flex-col pr-4 pl-4' onSubmit={handleSubmit}>
    <textarea
      className='resize-none rounded-lg bg-gray-200 p-2 text-sm outline-0'
      name='content'
      onChange={adjustHeight}
      placeholder='add a comment...'
      rows={2}
    />
    <button className='mt-2 mr-4 self-end' type='submit'>
      <PaperPlaneRightIcon className='h-6 w-6' weight='bold' />
    </button>
  </form>
)

export default CommentForm
