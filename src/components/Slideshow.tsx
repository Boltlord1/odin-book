import { AdvancedImage } from '@cloudinary/react'
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react'
import {
	type FunctionComponent,
	useLayoutEffect,
	useRef,
	useState
} from 'react'
import type { ImageData } from '../types/image'

interface Props {
	data: ImageData[]
}

const Slideshow: FunctionComponent<Props> = ({ data }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState('0px')
	const [current, setCurrent] = useState<number>(0)

	const butClass = 'absolute h-full group z-1'
	const caretClass = 'bg-gray-900/50 group-active:bg-gray-800/75 rounded-full p-2'

  const ratio = data.map(i => i.height / i.width).reduce((high, curr) => curr > high ? curr > 1 ? 1 : curr : high, 0)

  useLayoutEffect(() => {
    const div = ref.current
    if (div) {
      const width = div.offsetWidth
      const height = `${Math.ceil(width * ratio)}px`
      setHeight(height)
    }
  }, [ratio])

	return (
		<div className='flex flex-col gap-2'>
			<div style={{height}} ref={ref} className='bg-gray-800 w-full max-h-100 relative flex justify-center items-center'>
				<button
					type='button'
					onClick={() =>
						setCurrent(current === 0 ? data.length - 1 : current - 1)
					}
					className={`${butClass} -left-2`}
				>
					<CaretLeftIcon
						weight='bold'
						size={36}
						color='white'
						className={caretClass}
					/>
				</button>
				<button
					type='button'
					onClick={() =>
						setCurrent(current === data.length - 1 ? 0 : current + 1)
					}
					className={`${butClass} -right-2`}
				>
					<CaretRightIcon
						weight='bold'
						size={36}
						color='white'
						className={caretClass}
					/>
				</button>
				{data.map((img, ind) => (
					<AdvancedImage
						key={img.id}
						cldImg={img.img}
						className={`${ind === current ? '' : 'hidden'} max-h-full w-auto`}
					/>
				))}
			</div>
			<div className='flex items-center justify-center gap-4'>
				{data.map((img, ind) => (
					<button
						type='button'
						key={img.id}
						onClick={() => setCurrent(ind)}
						className={`w-4 h-4 bg-gray-200 rounded-full js-active:bg-gray-500 ${ind === current ? 'active' : ''}`}
					/>
				))}
			</div>
		</div>
	)
}

export default Slideshow
