import { AdvancedImage } from '@cloudinary/react'
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'
import { type FunctionComponent, useEffect, useMemo, useState } from 'react'
import { slideshowBp } from '../../lib/breakpoint'
import { carouselImg } from '../../lib/cloudinary'
import highestRatio from '../../lib/ratio'
import type { ImageData } from '../../types/data'

interface Props {
  data: ImageData[]
}

const Slideshow: FunctionComponent<Props> = ({ data }) => {
  const [current, setCurrent] = useState<number>(0)
  const [width, setWidth] = useState(Math.min(window.innerWidth, 640))
  const ratio = useMemo(() => highestRatio(data), [data])

  useEffect(() => {
    const onResize = () => {
      const width = Math.min(window.innerWidth, 640)
      setWidth((prev) => (prev === width ? prev : width))
    }

    window.addEventListener('resize', onResize)
    onResize()
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const breakpoint = useMemo(() => slideshowBp(width), [width])
  const cldImages = useMemo(
    () => data.map(({ publicId }) => carouselImg(publicId, breakpoint)),
    [data, breakpoint]
  )

  const butClass = 'absolute h-full group z-1'
  const caretClass =
    'bg-gray-900/50 group-active:bg-gray-800/75 rounded-full p-2'

  const multiple = data.length > 1

  const buttons = multiple && (
    <>
      <button
        className={`${butClass} left-2`}
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
        className={`${butClass} right-2`}
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
    </>
  )

  return (
    <div className='-mx-4 flex flex-col gap-4'>
      <div
        className='relative flex w-full items-center justify-center bg-gray-800'
        style={{ height: `${Math.ceil(width * ratio)}px` }}
      >
        {buttons}
        {data.map((img, ind) => (
          <AdvancedImage
            className={`${ind === current ? '' : 'hidden'} max-h-full w-auto`}
            cldImg={cldImages[ind]}
            key={img.id}
          />
        ))}
      </div>
      {multiple && (
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
      )}
    </div>
  )
}

export default Slideshow
