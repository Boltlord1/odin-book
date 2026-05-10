import type { FunctionComponent, SubmitEventHandler } from 'react'
import { jsonOptions } from '../../lib/fetch'
import { backendUrl } from '../../lib/variables'
import type { SelfData } from '../../types/data'
import type { EditProps } from '../../types/props'
import Form from './Form'

const Names: FunctionComponent<EditProps> = ({
  setEdit,
  setSelf,
  children
}) => {
  const handleSubmit: SubmitEventHandler = async (event) => {
    event.preventDefault()
    const response = await fetch(
      `${backendUrl}/user`,
      jsonOptions(event.target, 'put')
    )

    if (response.ok) {
      const json: SelfData = await response.json()
      setSelf(json)
      setEdit(false)
      return
    }
  }

  return (
    <Form handleSubmit={handleSubmit} setEdit={setEdit}>
      {children}
    </Form>
  )
}

export default Names
