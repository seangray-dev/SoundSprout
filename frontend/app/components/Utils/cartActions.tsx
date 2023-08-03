import { Pack, Sound } from '@/app/types';
import {
	addPackToCart,
	addSoundToCart,
	removeFromCart,
} from '@/redux/features/cartSlice';
import { useDispatch } from 'react-redux';
import { ToastAction } from '../ui/toast';
import { useToast } from '../ui/use-toast';

export const handleUndoAddToCart = (
	dispatch: ReturnType<typeof useDispatch>,
	sound: Sound
) => {
	console.log('Undo adding sound to cart', sound);
	dispatch(removeFromCart(sound.id));
};

export const handleAddPackToCart = (
	dispatch: ReturnType<typeof useDispatch>,
	toast: ReturnType<typeof useToast>['toast'],
	event: React.MouseEvent,
	pack: Pack
) => {
	event.stopPropagation();
	dispatch(addPackToCart(pack));
	toast({
		title: `Pack: ${pack.name}`,
		description: `has been added to cart.`,
	});
};

export const handleAddSoundToCart = (
	dispatch: ReturnType<typeof useDispatch>,
	toast: ReturnType<typeof useToast>['toast'],
	event: React.MouseEvent,
	sound: Sound
) => {
	event.stopPropagation();
	dispatch(addSoundToCart(sound));
	toast({
		title: `${sound.name}`,
		description: `has been added to cart.`,
		action: (
			<ToastAction
				altText='Undo'
				onClick={() => handleUndoAddToCart(dispatch, sound)}>
				Undo
			</ToastAction>
		),
	});
};
