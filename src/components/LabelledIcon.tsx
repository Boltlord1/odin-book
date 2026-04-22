import type { FunctionComponent, HTMLAttributes, SVGProps } from 'react'

interface Props {
	Svg: FunctionComponent<SVGProps<SVGSVGElement>>
	text: string | number
	svgProps?: SVGProps<SVGSVGElement>
	divProps?: HTMLAttributes<HTMLDivElement>
}

const LabelledIcon: FunctionComponent<Props> = (props) => {
	const { Svg, text, divProps, svgProps } = props
	const divClassName =
		`flex gap-2 items-center bg-config-test ${divProps?.className ?? ''}`.trim()
	const svgClassName = `w-6 h-6 icon ${svgProps?.className ?? ''}`.trim()

	return (
		<div {...divProps} className={divClassName}>
			<Svg {...svgProps} className={svgClassName} />
			<span className='font-semibold'>{text}</span>
		</div>
	)
}

export default LabelledIcon
