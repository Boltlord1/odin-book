interface ResError {
  msg: string
  name: string
  type: 'client' | 'server'
}

export type { ResError }
