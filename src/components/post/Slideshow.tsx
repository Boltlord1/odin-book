import { AdvancedImage } from '@cloudinary/react'
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'
import {
  type FunctionComponent,
  useLayoutEffect,
  useRef,
  useState
} from 'react'
import getImg from '../../lib/cloudinary'
import highestRatio from '../../lib/ratio'
import type { ImageData } from '../../types/data'

interface Props {
  data: ImageData[]
}

const Slideshow: FunctionComponent<Props> = ({ data }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState('0px')
  const [current, setCurrent] = useState<number>(0)

  const butClass = 'absolute h-full group z-1'
  const caretClass =
    'bg-gray-900/50 group-active:bg-gray-800/75 rounded-full p-2'

  const ratio = highestRatio(data)

  useLayoutEffect(() => {
    const div = ref.current
    if (div) {
      const width = div.offsetWidth
      const height = `${Math.ceil(width * ratio)}px`
      setHeight(height)
    }
  }, [
    ratio
  ])

  return (
    <div className='flex flex-col gap-2'>
      <div
        className='relative flex w-full items-center justify-center bg-gray-800'
        ref={ref}
        style={{
          height
        }}
      >
        <button
          className={`${butClass} -left-2`}
          onClick={() =>
            setCurrent(current === 0 ? data.length - 1 : current - 1)
          }
          type='button'
        >
          <CaretLeftIcon
            className={caretClass}
            color='white'
            size={36}
            weight='bold'
          />
        </button>
        <button
          className={`${butClass} -right-2`}
          onClick={() =>
            setCurrent(current === data.length - 1 ? 0 : current + 1)
          }
          type='button'
        >
          <CaretRightIcon
            className={caretClass}
            color='white'
            size={36}
            weight='bold'
          />
        </button>
        {data.map((img, ind) => (
          <AdvancedImage
            className={`${ind === current ? '' : 'hidden'} max-h-full w-auto`}
            cldImg={getImg(img.publicId)}
            key={img.id}
          />
        ))}
      </div>
      <div className='flex items-center justify-center gap-4'>
        {data.map((img, ind) => (
          <button
            className={`h-3 w-3 rounded-full bg-gray-200 js-active:bg-gray-500 ${ind === current ? 'active' : ''}`}
            key={img.id}
            onClick={() => setCurrent(ind)}
            type='button'
          />
        ))}
      </div>
    </div>
  )
}

export default Slideshow
