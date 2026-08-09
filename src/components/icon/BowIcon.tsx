import type { IconProps } from "./base/IconBase";

export default function ArrowIcon({ size = 24, className }: IconProps) {
	return (
		<svg
			width={size}
			height={size}
			className={className}
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M9 4L17 12L9 20'
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}
