import { Sound } from '@/app/types';
import { addToCart, removeFromCart } from '@/redux/features/cartSlice';
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

export const handleAddToCart = (
	dispatch: ReturnType<typeof useDispatch>,
	toast: ReturnType<typeof useToast>['toast'],
	event: React.MouseEvent,
	sound: Sound
) => {
	event.stopPropagation();
	dispatch(addToCart(sound));
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
