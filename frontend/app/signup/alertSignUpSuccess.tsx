import Link from 'next/link';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '../components/ui/alert-dialog';

type AlertSignUpSuccessProps = {
	showAlertDialog: boolean;
};

export function AlertSignUpSuccess(
	{ showAlertDialog }: AlertSignUpSuccessProps = { showAlertDialog: false }
) {
	return (
		<AlertDialog open={showAlertDialog}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Your account has been successfully been created!
					</AlertDialogTitle>
					<AlertDialogDescription>
						Please log in to continue
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogAction>
						<Link
							className='bg-purple border border-purple py-2 px-4 rounded-md hover:bg-white hover:text-purple transition-all duration-300'
							href={'/login'}>
							Log In
						</Link>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
