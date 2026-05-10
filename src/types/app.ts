import type { Dispatch, JSX, SetStateAction } from 'react'
import type { SelfData } from './data'

interface AppContext {
  self: SelfData
  setSelf: Dispatch<SetStateAction<SelfData>>
}

type Sorts = 'recent' | 'top'

interface SortObject {
  element: JSX.Element
  value: Sorts
}

export type { AppContext, SortObject, Sorts }
