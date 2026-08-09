import * as ScrollAreaBase from '@radix-ui/react-scroll-area';
import clsx from 'clsx';
import React from 'react';

interface Props {
    children: React.ReactNode;
    className?: string;
    enableHorizontal?: boolean;
    disableVertical?: boolean;
    highcontrast?: boolean;
}

const ScrollArea = (props: Props) => {
    return (
        <ScrollAreaBase.Root
            className='flex h-full w-full overflow-hidden'
            type='auto'
        >
            <ScrollAreaBase.Viewport
                className={clsx('h-full w-full', props.className)}
            >
                {props.children}
            </ScrollAreaBase.Viewport>
            {!props.disableVertical && (
                <ScrollAreaBase.Scrollbar
                    className={clsx(
                        'flex touch-none select-none p-1 transition-colors ease-out',
                        'data-[orientation=vertical]:w-3'
                    )}
                    orientation='vertical'
                >
                    <ScrollAreaBase.Thumb
                        className={clsx(
                            'relative flex-1 rounded-[10px] ', props.highcontrast ? 'bg-gray-2' : 'bg-gray-1', ' p-[1px]',
                            'before:absolute before:left-1/2 before:top-1/2',
                            'before:h-full before:min-h-[1rem] before:w-full before:min-w-[1rem]',
                            'before:-translate-x-1/2 before:-translate-y-1/2 before:content-[""]'
                        )}
                    />
                </ScrollAreaBase.Scrollbar>
            )}
            {props.enableHorizontal && (
                <ScrollAreaBase.Scrollbar
                    className={clsx(
                        'flex touch-none select-none p-1 transition-colors ease-out',
                        'data-[orientation=horizontal]:h-3 data-[orientation=horizontal]:flex-col'
                    )}
                    orientation='horizontal'
                >
                    <ScrollAreaBase.Thumb
                        className={clsx(
                            'relative flex-1 rounded-[10px] ', props.highcontrast ? 'bg-gray-2' : 'bg-gray-1', ' p-[1px]',
                            'before:absolute before:left-1/2 before:top-1/2',
                            'before:h-full before:min-h-[1rem] before:w-full before:min-w-[1rem]',
                            'before:-translate-x-1/2 before:-translate-y-1/2 before:content-[""]'
                        )}
                    />
                </ScrollAreaBase.Scrollbar>
            )}
        </ScrollAreaBase.Root>
    );
};

export default ScrollArea;