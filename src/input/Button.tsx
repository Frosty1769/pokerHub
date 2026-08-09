import clsx from 'clsx';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

type buttonType = 'primary' | 'secondary' | 'tetriary' | 'text' | 'warning';
type buttonSize = 'big' | 'small' | 'big-icon' | 'small-icon';

const typeClasses = {
	primary:
		'!bg-[#211708] border !border-[#c09d36] text-[#fdc94f]  enabled:hover:bg-accent-hover disabled:bg-gray-2 disabled:border-gray-2 focus:bg-accent-hover',
	secondary:
		'text-[#c09d36] bg-gray-1 border-[#c09d36] enabled:hover:bg-gray-2 disabled:text-gray-3 focus:bg-gray-2',
	tetriary:
		'text-[#c09d36] bg-transparent border-[#c09d36] enabled:hover:border-gray-2 disabled:text-gray-2 focus:border-gray-2',
	text: 'text-accent border-transparent bg-transparent enabled:hover:text-accent-hover disabled:text-gray-2 focus:text-accent-hover',
	warning:
		'bg-system-red text-white border-system-red enabled:hover:bg-system-red-hover disabled:bg-gray-2 disabled:border-gray-2 focus:bg-system-red-hover',
};

const sizeClasses = {
	big: 'px-6 h-12',
	small: 'px-2 h-7',
	'big-icon': 'w-12 h-12',
	'small-icon': 'w-9 h-9',
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;

	size?: buttonSize;
	variant?: buttonType;
}

const Button = forwardRef<HTMLButtonElement, Props>(
	(
		{ size = 'big', variant = 'primary', children, className, ...props }: Props,
		ref
	) => {
		return (
			<button
				ref={ref}
				className={clsx(
					'!bg-accent border !border-accent-hover flex cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded-lg text-center text-sm font-semibold',
					'overflow-ellipsis outline-none transition-all disabled:cursor-default',
					sizeClasses[size],
					typeClasses[variant],
					className
				)}
				{...props}
			>
				{children}
			</button>
		);
	}
);

export default Button;
