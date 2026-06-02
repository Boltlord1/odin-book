import type { Icon } from '@phosphor-icons/react'
import type { Dispatch, JSX, SetStateAction } from 'react'
import type { SelfData } from './data'
import type { ClientError } from './response'

interface ConfirmOptions {
  confirm: () => void
  message: string
}

interface AppContext {
  self: SelfData
  setOptions: Dispatch<SetStateAction<ConfirmOptions>>
  setSelf: Dispatch<SetStateAction<SelfData>>
}

interface DashboardLink {
  Icon: Icon
  id: string
  text: string
}

type AlertType = string | string[] | undefined | null | false
type DeleteType = 'user' | 'post' | 'comment' | 'reply'
type SortType = 'recent' | 'top'

interface SortObject {
  element: JSX.Element
  value: SortType
}

interface ValidateProps {
  setValidate: Dispatch<SetStateAction<SelfData>>
}

type ValidatorFunction = (errors?: ClientError[]) => void

type Register = (name: string, validate: () => boolean) => void
type Unregister = (name: string) => void

interface FormContextType {
  errors: ClientError[]
  register: Register
  unregister: Unregister
}

interface DeleteContextType {
  comment?: (id: string) => void
  post?: (id: string) => void
  reply?: (id: string) => void
  user?: (id: string) => void
}

export type {
  AlertType,
  AppContext,
  ConfirmOptions,
  DashboardLink,
  DeleteContextType,
  DeleteType,
  FormContextType,
  Register,
  SortObject,
  SortType,
  Unregister,
  ValidateProps,
  ValidatorFunction
}
