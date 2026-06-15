import type { FunctionComponent } from 'react'
import { useNavigate, useOutletContext } from 'react-router'
import type { AppContext } from '../../types/app'
import Guard from '../general/Guard'
import File from '../validate/File'
import Form from '../validate/Form'
import TextInput from '../validate/Text'

const Upload: FunctionComponent = () => {
  const navigate = useNavigate()
  const { self } = useOutletContext<AppContext>()

  if (!self) {
    return <Guard msg='upload posts' />
  }

  function success(json: string | true) {
    if (json === true) {
      setTimeout(() => {
        navigate('/auth/login')
      }, 5000)
      return
    }
    navigate(`/app/post/${json}`)
  }

  const footer = (
    <button className='self-end' type='submit'>
      Create Post
    </button>
  )

  return (
    <Form app footer={footer} path='/post' success={success}>
      <TextInput
        label='Title'
        max={256}
        name='title'
        oneLine
        placeholder='Add a title...'
        required
        rows={1}
        textarea
      />
      <TextInput
        label='Content'
        max={2000}
        name='content'
        placeholder='Add post content...'
        rows={4}
        textarea
      />
      <File
        accept='image/png, image/jpeg, image/gif'
        label='Images (Up to 5)'
        multiple={true}
        name='images'
      />
    </Form>
  )
}

export default Upload
