import type { Dispatch, SetStateAction } from 'react'
import type { SelfData } from './data'

interface AppContext {
  self: SelfData
  setSelf: Dispatch<SetStateAction<SelfData>>
}

export type { AppContext }
