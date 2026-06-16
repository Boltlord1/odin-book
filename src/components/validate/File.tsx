import { FileArrowUpIcon } from '@phosphor-icons/react'
import {
  type ChangeEventHandler,
  type FunctionComponent,
  useState
} from 'react'
import { useOutletContext } from 'react-router'
import useErrors from '../../hooks/errors'
import { useFormContext } from '../../hooks/form'
import useRegister from '../../hooks/register'
import type { AlertType, AppContext } from '../../types/app'
import Alert from '../general/Alert'

interface Props {
  accept: string
  label: string
  multiple?: true
  name: string
  required?: boolean
}

function getFileStatus(files: FileList | null) {
  if (files === null) {
    return 'No files'
  }
  if (files.length > 1) {
    return `${files.length} files`
  }
  return files[0].name
}

const size = 5 * 1024 * 1024
function getFileAlert(files: FileList | null, multiple?: true) {
  if (files === null) {
    return ''
  }

  let newAlert = ''
  if (multiple && files.length > 5) {
    newAlert = 'Posts can only have up to 5 files'
  } else if (!multiple && files.length > 1) {
    newAlert = 'Avatar can only be 1 file'
  }

  const array = Array.from(files)
  const file = array.find((f) => f.size > size)

  if (file) {
    if (newAlert) {
      return [newAlert, 'File size limit is 5 MB']
    }
    return 'File size limit is 5 MB'
  }
  return newAlert
}

const File: FunctionComponent<Props> = ({
  label,
  name,
  accept,
  multiple,
  required
}) => {
  const { theme } = useOutletContext<AppContext>()
  const [files, setFiles] = useState<FileList | null>(null)
  const [alert, setAlert] = useState<AlertType>('')
  const fileStatus = getFileStatus(files)

  const { register, unregister, errors } = useFormContext()
  useErrors('avatar', setAlert, errors)
  useRegister('avatar', register, unregister, () => {
    const alert = getFileAlert(files, multiple)
    setAlert(alert)
    const missing = files === null && !!required
    if (alert === '' && missing) {
      setAlert('Avatar is required')
    }
    return !(alert || missing)
  })

  const changeFiles: ChangeEventHandler<HTMLInputElement> = (event) => {
    const files = event.target.files
    setFiles(files)
    setAlert(getFileAlert(files, multiple))
  }

  const dark = files ? 'oklch(92% 0.004 286.32)' : 'oklch(70.5% 0.015 286.067)'
  const light = files
    ? 'oklch(27.8% 0.033 256.848)'
    : 'oklch(44.6% 0.03 256.802)'

  return (
    <label className='flex flex-col gap-2' htmlFor={name}>
      {label && <p>{label}</p>}
      <div className='flex items-center justify-evenly rounded-xl bg-gray-100 p-2 pr-4 pl-4 text-5xl dark:bg-zinc-700'>
        <input
          accept={accept}
          className='hidden'
          id={name}
          multiple={multiple}
          name={name}
          onChange={changeFiles}
          type='file'
        />
        <FileArrowUpIcon fill={theme === 'dark' ? dark : light} weight='bold' />
        <span
          className={`${files ? 'text-gray-800 dark:text-zinc-200' : 'text-gray-600 dark:text-zinc-400'} min-w-2/3 text-center text-2xl underline decoration-1 underline-offset-10`}
        >
          {fileStatus}
        </span>
      </div>
      <Alert alert={alert} />
    </label>
  )
}

export default File
