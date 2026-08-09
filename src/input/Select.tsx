import * as LabelBase from '@radix-ui/react-label';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as SelectBase from '@radix-ui/react-select';
import clsx from 'clsx';
import { type ReactNode, useEffect, useState } from 'react';
import SearchBox from './SearchBox';

type selectSize = 'big' | 'small' | 'xs';

const sizeClasses = {
	big: 'px-3 min-h-[2rem]',
	small: 'px-3 min-h-[2.25rem]',
	xs: 'px-1.5 min-h-[1.75rem]',
};

interface Props<T> {
	label?: string;
	noLabel?: boolean;
	placeholder?: string;
	size?: selectSize;
	searchable?: boolean;

	arrowIcon?: ReactNode;
	postArrowIcon?: ReactNode;
	preTextIcon?: ReactNode;

	error?: boolean;
	showErrorIcon?: boolean;
	description?: string;

	value?: string;
	onValueChange?(value: string): void;
	disabled?: boolean;

	items: T[];

	getItemTitle(item: T): string;
	getItemValue(item: T): string;
	getItemIcon?(item: T): ReactNode;
	getItemDisabled?(item: T): boolean | undefined;
	getItemClasses?(item: T): string | undefined;
	styleClasses?: {
		root?: string;
		trigger?: string;
		list?: string;
		scroll?: string;
		item?: string;
		errorIcon?: string;
	};
}

const Select = <T extends object>({ size = 'big', ...props }: Props<T>) => {
	const [open, setOpen] = useState(false);

	const [search, setSearch] = useState('');
	const [itemVisibility, setItemVisibility] = useState<boolean[]>([]);

	useEffect(() => {
		if (search === '') {
			return setItemVisibility(props.items.map(() => true));
		} else {
			setItemVisibility(
				props.items.map((item) =>
					props.getItemTitle(item).toLowerCase().includes(search.toLowerCase())
				)
			);
		}
	}, [props.items, search]);

	useEffect(() => {
		if (!open) {
			setSearch('');
		}
	}, [open]);

	return (
		<SelectBase.Root
			value={props.value}
			onValueChange={props.onValueChange}
			disabled={props.disabled}
			onOpenChange={(open) => setOpen(open)}
		>
			<div className={clsx('flex flex-col gap-1', props.styleClasses?.root)}>
				{!props.noLabel && (
					<LabelBase.Root className='block text-xs text-gray-4'>
						{props.label}
					</LabelBase.Root>
				)}
				<SelectBase.Trigger
					className={clsx(
						'flex !bg-[#d1ba96b0] w-full items-center justify-between gap-1 rounded-lg border border-gray-2 text-sm outline-none',
						'disabled:bg-gray-1 data-[placeholder]:text-gray-3',
						sizeClasses[size],
						props.styleClasses?.trigger,
						props.error && '!border-system-red'
					)}
				>
					<span className='flex items-center gap-1 font-bold [&>*]:text-left'>
						{props.preTextIcon}
						<SelectBase.Value placeholder={props.placeholder} />
					</span>
					<span className='flex items-center gap-1'>
						<SelectBase.Icon
							className={clsx(
								'transition-all',
								open ? '-rotate-90' : 'rotate-90'
							)}
						>
							{/* {props.arrowIcon || (
								<ArrowIcon size={16} className='text-gray-3' />
							)} */}
						</SelectBase.Icon>
						{/* {props.showErrorIcon && (
							// <InfoIcon
							// 	className={props.styleClasses?.errorIcon || 'text-system-red'}
							// />
						)} */}
					</span>
				</SelectBase.Trigger>
				{props.description && (
					<LabelBase.Root
						className={clsx(
							'block text-xs',
							props.error ? 'text-system-red' : 'text-gray-4'
						)}
					>
						{props.description}
					</LabelBase.Root>
				)}
			</div>
			<SelectBase.Portal>
				<SelectBase.Content
					position='popper'
					className={clsx(
						'my-2 rounded-lg bg-white py-1 text-sm shadow-1',
						'w-[--radix-select-trigger-width]',
						props.styleClasses?.list
					)}
				>
					<ScrollArea.Root className='h-full w-full' type='hover'>
						{props.searchable && (
							<div className='flex p-3'>
								<SearchBox
									inputSize='small'
									placeholder='Поиск'
									onChange={(e) => setSearch(e.target.value)}
									onKeyDown={(e) => e.stopPropagation()}
								/>
							</div>
						)}
						<SelectBase.Viewport asChild>
							<ScrollArea.Viewport
								className={clsx('h-full w-full max-h-[200px]', props.styleClasses?.scroll)}
								style={{ overflowY: undefined }}
							>
								{props.items.map((item, ind) => {
									return (
										<SelectBase.Item
											className={clsx(
												'flex cursor-pointer items-center px-3 py-1 w-full outline-none hover:bg-gray-1',
												'first:rounded-t-sm last:rounded-b-sm',
												props.styleClasses?.item,
												props.getItemClasses?.(item),
											)}
											key={`item-${ind}`}
											value={props.getItemValue(item)}
											disabled={props.getItemDisabled?.(item)}
										>
											{props.getItemIcon && props.getItemIcon(item)}
											<SelectBase.ItemText>
												{props.getItemTitle(item).toString()}
											</SelectBase.ItemText>
										</SelectBase.Item>
									);
								})}
							</ScrollArea.Viewport>
						</SelectBase.Viewport>
						<ScrollArea.Scrollbar
							className={clsx(
								'flex touch-none select-none p-1 transition-colors ease-out',
								'data-[orientation=horizontal]:h-3 data-[orientation=vertical]:w-3 data-[orientation=horizontal]:flex-col'
							)}
							orientation='vertical'
						>
							<ScrollArea.Thumb
								className={clsx(
									'relative w-1 flex-1 rounded-[10px] bg-gray-1',
									'before:absolute before:left-1/2 before:top-1/2',
									'before:h-full before:min-h-[44px] before:w-full before:min-w-[44px]',
									'before:-translate-x-1/2 before:-translate-y-1/2 before:content-[""]'
								)}
							/>
						</ScrollArea.Scrollbar>
					</ScrollArea.Root>
				</SelectBase.Content>
			</SelectBase.Portal>
		</SelectBase.Root>
	);
};

export default Select;
