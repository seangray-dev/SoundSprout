'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '../components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../components/ui/form';
import { Input } from '../components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../components/ui/select';

const formSchema = z.object({
	genre: z.string().nonempty('Genre is required'),
	mood: z.string().optional(),
	bpm: z.number().min(40).max(220),
	instruments: z.string().optional(),
});

const MusicGenForm = () => {
	const [loadingState, setLoadingState] = useState({
		isLoading: false,
		audioUrl: null,
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			genre: '',
			mood: '',
			bpm: 120,
			instruments: '',
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		setLoadingState({ isLoading: true, audioUrl: null });

		axios
			.post(
				`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/generate-audio/`,
				values,
				{ responseType: 'blob' }
			)
			.then((response) => {
				const url = window.URL.createObjectURL(
					new Blob([response.data], { type: 'audio/wav' })
				);
				setLoadingState({ isLoading: false, audioUrl: url });
			})
			.catch((error) => {
				setLoadingState({ isLoading: false, audioUrl: null });
				console.log(error);
			});
	}

	return (
		<div className='mt-10'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid grid-cols-2 gap-x-10 gap-y-6'>
					<FormField
						control={form.control}
						name='genre'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Genre</FormLabel>
								<FormControl>
									<Select
										onValueChange={(value) => {
											field.onChange(value);
										}}>
										<SelectTrigger className=''>
											<SelectValue placeholder='Genre'></SelectValue>
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='hip hop / trap'>HIP HOP</SelectItem>
											<SelectItem value='rnb'>R&B</SelectItem>
											<SelectItem value='edm'>EDM</SelectItem>
											<SelectItem value='pop'>POP</SelectItem>
											<SelectItem value='house/techno'>
												HOUSE / TECHNO
											</SelectItem>
											<SelectItem value='live sounds'>LIVE SOUNDS</SelectItem>
											<SelectItem value='electronic'>ELECTRONIC</SelectItem>
											<SelectItem value='cinematic'>CINEMATIC</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormDescription>
									Choose the musical genre that fits the style or feel you're
									looking for.
								</FormDescription>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='mood'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Mood (Optional)</FormLabel>
								<FormControl>
									<Select
										onValueChange={(value) => {
											field.onChange(value);
										}}>
										<SelectTrigger>
											<SelectValue placeholder='Mood' />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value='energetic'>Energetic</SelectItem>
											<SelectItem value='dark'>Dark</SelectItem>
											<SelectItem value='relaxing'>Relaxing</SelectItem>
											<SelectItem value='happy'>Happy</SelectItem>
											<SelectItem value='sad'>Sad</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormDescription>
									Select a mood to set the emotional tone of the sound sample.
									If left blank, a neutral mood will be assumed.
								</FormDescription>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='bpm'
						render={({ field }) => (
							<FormItem>
								<FormLabel>BPM</FormLabel>
								<FormControl>
									<Input
										type='number'
										placeholder='BPM'
										{...field}
										onChange={(e) => field.onChange(Number(e.target.value))}
									/>
								</FormControl>
								<FormDescription>
									BPM must be within 40-220 range.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='instruments'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Instruments (Optional)</FormLabel>
								<FormControl>
									<Input placeholder='Instruments' {...field} />
								</FormControl>
								<FormDescription>
									Seperate instruments with a comma. For example: piano, guitar,
									synth
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						className='col-span-2 border border-purple bg-purple py-4 font-bold tracking-wide mt-10 hover:bg-white hover:text-purple transition-all duration-300'
						type='submit'>
						Generate
					</Button>
				</form>
			</Form>
			{loadingState.isLoading && (
				<div className='mt-4 bg-gray-100 p-10 rounded border flex justify-center my-10'>
					<div className='flex flex-col items-center gap-2'>
						<span>Loading...</span>
						<Loader2 className='h-8 w-8 text-purple animate-spin' />
					</div>
				</div>
			)}
			{loadingState.audioUrl && (
				<div className='mt-4 bg-gray-100 p-10 rounded border flex justify-center my-10'>
					<audio controls>
						<source src={loadingState.audioUrl} type='audio/wav' />
						Your browser does not support the audio element.
					</audio>
				</div>
			)}
		</div>
	);
};

export default MusicGenForm;
