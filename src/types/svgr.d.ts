declare module '*.svg?react' {
	import type * as React from 'react'

	const Component: React.FunctionComponent<
		React.SVGProps<SVGSVGElement> & { title?: string }
	>

	export default Component
}
