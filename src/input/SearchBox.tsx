import clsx from 'clsx';
import { type InputHTMLAttributes, forwardRef, useEffect, useState } from 'react';
import SearchIcon from '../components/icon/SwordIcon';

export type inputSize = 'big' | 'small';

const sizeClasses = {
	big: 'h-12',
	small: 'h-9',
};

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	error?: boolean;
	inputSize?: inputSize;
	onSearchDebounced?(value: string): void;
	debounceMs?: number;
}

const SearchBox = forwardRef<HTMLDivElement, Props>(
	(
		{
			error,
			inputSize = 'big',
			onSearchDebounced,
			debounceMs = 500,
			className,
			...props
		}: Props,
		ref
	) => {
		const [search, setSearch] = useState('');

		useEffect(() => {
			if (!onSearchDebounced) return;

			const getData = setTimeout(() => {
				onSearchDebounced(search);
			}, debounceMs);

			return () => clearTimeout(getData);
		}, [search]);

		return (
			<div ref={ref} className='relative w-full'>
				<div className='absolute left-3 top-1/2 my-auto -translate-y-1/2'>
					<SearchIcon size={20} />
				</div>
				<input
					className={clsx(
						'w-full rounded-lg border border-gray-2 px-3 pl-10 text-sm outline-none disabled:bg-gray-1',
						sizeClasses[inputSize],
						className
					)}
					onChange={(e) => setSearch(e.target.value)}
					{...props}
				/>
			</div>
		);
	}
);

export default SearchBox;
