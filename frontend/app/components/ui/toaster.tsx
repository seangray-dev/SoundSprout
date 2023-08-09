'use client';

import {
	Toast,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
} from '@/app/components/ui/toast';
import { useToast } from './use-toast';

export function Toaster() {
	const { toasts } = useToast();

	return (
		<ToastProvider>
			{toasts.map(function ({ id, title, description, action, ...props }) {
				return (
					<Toast
						className='flex flex-col gap-4 bg-gray-1 text-white'
						key={id}
						{...props}>
						<div className='grid gap-1'>
							{title && <ToastTitle className='truncate'>{title}</ToastTitle>}
							{description && (
								<ToastDescription>{description}</ToastDescription>
							)}
						</div>
						{action}
						<ToastClose />
					</Toast>
				);
			})}
			<ToastViewport />
		</ToastProvider>
	);
}
