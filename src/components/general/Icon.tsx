import type { IconProps, Icon as IconType } from '@phosphor-icons/react'
import type { FunctionComponent, HTMLAttributes } from 'react'

interface Props {
	Icon: IconType
	text: string | number
	iconProps?: IconProps
	divProps?: HTMLAttributes<HTMLDivElement>
}

const Icon: FunctionComponent<Props> = ({
	Icon,
	text,
	divProps,
	iconProps
}) => {
	const divClass = `flex gap-2 items-center bg-config-test ${divProps?.className ?? ''}`
	const iconClass = `w-6 h-6 icon ${iconProps?.className ?? ''}`

	return (
		<div {...divProps} className={divClass}>
			<Icon weight='bold' {...iconProps} className={iconClass} />
			<span className='font-semibold'>{text}</span>
		</div>
	)
}

export default Icon
