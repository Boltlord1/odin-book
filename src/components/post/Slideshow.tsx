import { AdvancedImage } from '@cloudinary/react'
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'
import {
  type FunctionComponent,
  type UIEventHandler,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react'
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
  const breakpoint = useMemo(() => slideshowBp(width), [width])
  const cldImages = useMemo(
    () => data.map(({ publicId }) => carouselImg(publicId, breakpoint)),
    [data, breakpoint]
  )

  useEffect(() => {
    const onResize = () => {
      const width = Math.min(window.innerWidth, 640)
      setWidth((prev) => (prev === width ? prev : width))
    }

    window.addEventListener('resize', onResize)
    onResize()
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const butClass = 'absolute h-full group z-1'
  const caretClass =
    'bg-gray-900/50 group-active:bg-gray-800/75 rounded-full p-2 hidden lg:block'

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

  const ref = useRef<HTMLDivElement>(null)
  // biome-ignore lint/correctness/useExhaustiveDependencies: the scroll animation needs to occur every time current changes
  useLayoutEffect(() => {
    const div = ref.current
    if (!div) {
      return
    }

    requestAnimationFrame(() =>
      div.scrollTo({ left: div.clientWidth, behavior: 'instant' })
    )
  }, [current])

  const scroll: UIEventHandler<HTMLDivElement> = (event) => {
    const target = event.currentTarget
    if (!target) {
      return
    }

    const width = target.clientWidth
    if (target.scrollLeft > width * 1.5) {
      setCurrent(current === data.length - 1 ? 0 : current + 1)
    } else if (target.scrollLeft < width * 0.5) {
      setCurrent(current === 0 ? data.length - 1 : current - 1)
    } else {
      target.scrollTo({ left: target.clientWidth, behavior: 'instant' })
    }
  }

  const slides = [
    { index: current === 0 ? data.length - 1 : current - 1, role: 'prev' },
    { index: current, role: 'curr' },
    { index: current === data.length - 1 ? 0 : current + 1, role: 'next' }
  ]

  return (
    <div className='-mx-4 flex flex-col gap-4'>
      <div className='relative flex justify-center'>
        {buttons}
        {multiple ? (
          <div
            className='flex w-full touch-pan-x items-center overflow-x-auto bg-gray-800 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
            onScrollEnd={scroll}
            ref={ref}
            style={{ height: `${Math.ceil(width * ratio)}px` }}
          >
            {slides.map(({ index, role }) => (
              <AdvancedImage
                className='max-h-full w-auto'
                cldImg={cldImages[index]}
                key={role}
              />
            ))}
          </div>
        ) : (
          <div
            className='flex w-full items-center bg-gray-800'
            style={{ height: `${Math.ceil(width * ratio)}px` }}
          >
            <AdvancedImage
              className='max-h-full w-auto'
              cldImg={cldImages[0]}
            />
          </div>
        )}
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
