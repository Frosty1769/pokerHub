import clsx from 'clsx';
import {
	type InputHTMLAttributes,
	type ReactNode,
	type RefObject,
	forwardRef,
	useEffect,
	useState,
} from 'react';
import Typography from '../Typography';

type inputSize = 'big' | 'small';
type iconAnchor = 'left' | 'right';

const sizeClasses = {
	big: 'h-[2rem]',
	small: 'h-9',
};

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	noLabel?: boolean;

	type?: React.HTMLInputTypeAttribute;

	error?: boolean;
	description?: string;

	inputSize?: inputSize;

	icon?: ReactNode;
	iconAnchor?: iconAnchor;
	onIconClick?(): void;

	onChangeDebounced?(value: string): void;
	debounceMs?: number;

	inputref?: RefObject<HTMLInputElement>,

	styleClasses?: {
		root?: string;
		input?: string;
	};
}

const TextBox = forwardRef<HTMLDivElement, Props>(
	(
		{
			label,
			noLabel,
			error,
			description,
			onChangeDebounced,
			debounceMs = 500,
			inputSize = 'big',
			icon,
			iconAnchor = 'right',
			onIconClick,
			styleClasses,
			className,
			...props
		}: Props,
		ref,
	) => {
		const [text, setText] = useState(props.defaultValue as string);

		useEffect(() => {
			const getData = setTimeout(() => {
				onChangeDebounced?.(text);
			}, debounceMs);

			return () => clearTimeout(getData);
		}, [text]);

		return (
			<div
				ref={ref}
				className={clsx('flex flex-col gap-1', styleClasses?.root)}
			>
				<div className='relative flex'>
					<input
						type={props.type}
						ref={props.inputref}
						className={clsx(
							'w-full rounded-lg border !bg-[#d1ba96b0] border-accent-hover px-3 text-sm outline-none disabled:bg-gray-1 disabled:text-gray-3',
							sizeClasses[inputSize],
							error && 'border-system-red',
							icon && (iconAnchor === 'left' ? 'pl-10' : 'pr-10'),
							className
						)}
						onChange={(e) => {
							if (onChangeDebounced) setText(e.target.value);
							props.onChange?.(e);
						}}
						{...props}
					/>
					{icon && (
						<div
							className={clsx(
								'absolute top-1/2 my-auto -translate-y-1/2',
								iconAnchor === 'left' ? 'left-3' : 'right-3',
								onIconClick ? 'cursor-pointer' : 'pointer-events-none'
							)}
							onClick={onIconClick}
						>
							{icon}
						</div>
					)}
				</div>
				{description && <Typography size='h5' className='text-system-red'>{description}</Typography>}
			</div>
		);
	}
);

export default TextBox;
