interface ClientError {
  msg: string
  name: string
  type: 'client'
}

interface ServerError {
  msg: string
  type: 'server'
}

type ResError = ClientError[] | ServerError

export type { ClientError, ResError, ServerError }
