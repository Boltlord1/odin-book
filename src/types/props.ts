import type { Dispatch, PropsWithChildren, SetStateAction } from 'react'
import type { SelfData } from './data'

interface DisplayProps extends PropsWithChildren {
  className?: string
  setEdit: Dispatch<SetStateAction<boolean>>
}

interface EditProps extends DisplayProps {
  setSelf: (data: SelfData) => void
}

export type { DisplayProps, EditProps }
