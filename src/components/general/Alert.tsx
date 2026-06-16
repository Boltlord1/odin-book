import type { FunctionComponent } from 'react'
import type { AlertType } from '../../types/app'

interface Props {
  alert: AlertType
}

const Alert: FunctionComponent<Props> = ({ alert }) => (
  <>
    {Array.isArray(alert)
      ? alert.length > 0 && (
          <div
            className='flex flex-col gap-1 rounded-r-lg border-red-600 border-l-6 bg-red-300 px-4 py-1 dark:bg-red-800'
            role='alert'
          >
            {alert.map((e) => (
              <p key={e}>{e}</p>
            ))}
          </div>
        )
      : alert && (
          <p
            className='flex flex-col gap-1 rounded-r-lg border-red-600 border-l-6 bg-red-300 px-4 py-1 dark:bg-red-800'
            role='alert'
          >
            {alert}
          </p>
        )}
  </>
)

export default Alert
