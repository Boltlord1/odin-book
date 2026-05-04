import type { FunctionComponent, SubmitEventHandler } from 'react'
import { useNavigate } from 'react-router'
import useFiles from '../../hooks/files'
import adjustHeight from '../../lib/adjustHeight'
import { formOptions } from '../../lib/options'
import { backendUrl } from '../../lib/variables'
import File from './../general/File'
import Label from './../general/Label'

const Upload: FunctionComponent = () => {
  const navigate = useNavigate()
  const [files, changeFiles] = useFiles()

  const uploadPost: SubmitEventHandler = async event => {
    event.preventDefault()

    const response = await fetch(
      `${backendUrl}/post`,
      formOptions(event.target)
    )
    const json = await response.json()

    if (typeof json === 'string') {
      navigate(`/app/post/${json}`)
      return
    }

    console.log(json)
  }

  const title = (
    <textarea
      className='resize-none rounded-2xl bg-gray-200 p-2 pr-4 pl-4 outline-0 focus:shadow-lg focus:ring-1 focus:ring-gray-800'
      id='title'
      name='title'
      onChange={adjustHeight}
      required={true}
      rows={1}
    />
  )

  const content = (
    <textarea
      className='resize-none rounded-2xl bg-gray-200 p-2 pr-4 pl-4 outline-0 focus:shadow-lg focus:ring-1 focus:ring-gray-800'
      id='content'
      name='content'
      onChange={adjustHeight}
      rows={4}
    />
  )

  return (
    <form className='flex flex-col gap-3 p-4' onSubmit={uploadPost}>
      <Label input={title} label='Title' />
      <Label input={content} label='Content' />
      <File
        accept='image/png, image/jpeg, image/gif'
        changeFiles={changeFiles}
        files={files}
        multiple={true}
        name='images'
      />
      <button className='self-end' type='submit'>
        Create Post
      </button>
    </form>
  )
}

export default Upload
