import { Progress } from '@/app/components/ui/progress';
import { Slider } from '@/app/components/ui/slider';
import {
	playNext,
	playPrevious,
	togglePlay,
} from '@/redux/features/currentSound-slice';
import { RootState } from '@/redux/store';
import { BackwardIcon, ForwardIcon } from '@heroicons/react/24/outline';
import {
	PlayIcon,
	PlusIcon,
	SpeakerWaveIcon,
	SpeakerXMarkIcon,
	StopIcon,
} from '@heroicons/react/24/solid';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	handleAddPackToCart,
	handleAddSoundToCart,
} from '../../../redux/features/cartActions';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';

const AudioPlayer: React.FC = (props) => {
	const { toast } = useToast();
	const audioRef = useRef<HTMLAudioElement>(null);
	const currentSound = useSelector((state: RootState) => state.currentSound);
	const [progress, setProgress] = useState(0);
	const [isMuted, setIsMuted] = useState(false);
	const dispatch = useDispatch();
	const isPlaying = useSelector(
		(state: RootState) => state.currentSound.isPlaying
	);
	const isSoundLoaded = currentSound.soundIndex !== null;
	useEffect(() => {
		if (currentSound.soundIndex !== null && audioRef.current) {
			audioRef.current.play();
		} else if (audioRef.current) {
			audioRef.current.pause();
			audioRef.current.currentTime = 0;
		}
	}, [currentSound, audioRef]);

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.pause();
			audioRef.current.currentTime = 0;
			if (currentSound.soundIndex !== null) {
				audioRef.current.src = currentSound.audio_file as string;
				audioRef.current.play();
				audioRef.current.ontimeupdate = () => {
					setProgress(
						(audioRef.current!.currentTime / audioRef.current!.duration) * 100
					);
				};
			}
		}
	}, [currentSound, audioRef]);

	const handleVolumeChange = (volumeValues: number[]) => {
		const volumeValue = volumeValues[0];

		if (audioRef.current) {
			audioRef.current.volume = volumeValue / 100;
		}

		setIsMuted(volumeValue === 0);
	};

	const isPack = currentSound.isPack;

	const handleAddToCartClick = (event: React.MouseEvent) => {
		if (isSoundLoaded) {
			if (isPack) {
				handleAddPackToCart(dispatch, toast, event, currentSound.pack);
			} else {
				handleAddSoundToCart(dispatch, toast, event, currentSound);
			}
		}
	};

	const handleSliderChange = (sliderValues: number[]) => {
		const sliderValue = sliderValues[0];
		if (audioRef.current) {
			audioRef.current.currentTime =
				(sliderValue / 100) * audioRef.current.duration;
		}
	};

	return (
		<div className='fixed inset-x-0 bottom-0 bg-gray-1 text-white'>
			<Slider
				className='hover:cursor-pointer'
				value={[progress]}
				max={100}
				step={0.1}
				onValueChange={handleSliderChange}
			/>
			<div className='container grid grid-cols-3'>
				<audio ref={audioRef} />
				<div className='flex items-center gap-2 my-8'>
					<BackwardIcon
						className='w-6 h-6 hover:cursor-pointer hover:text-purple transition-all duration-300'
						onClick={() => dispatch(playPrevious)}></BackwardIcon>
					<div className='ml-1'>
						{isPlaying ? (
							<StopIcon
								className='w-6 h-6 hover:cursor-pointer hover:text-purple transition-all duration-300'
								onClick={() => dispatch(togglePlay())}
							/>
						) : (
							<PlayIcon
								className='w-6 h-6 hover:cursor-pointer hover:text-purple transition-all duration-300'
								onClick={() => dispatch(togglePlay())}
							/>
						)}
					</div>
					<ForwardIcon
						className='w-6 h-6 hover:cursor-pointer hover:text-purple transition-all duration-300'
						onClick={() => dispatch(playNext)}></ForwardIcon>
				</div>
				<div className='grid grid-cols-[55%,_45%] gap-2 items-center '>
					<div className='flex gap-4 items-center border-l border-gray-2 h-full pl-6'>
						<img
							className='w-12 h-12'
							src={
								currentSound.coverArt || '/assets/images/default-audiofile.jpeg'
							}
							alt={currentSound.name}
						/>
						<div className='flex flex-col overflow-scroll marquee'>
							<span>{currentSound.name}</span>
						</div>
					</div>
					<div className='grid grid-cols-3 items-center h-full'>
						<div className='flex flex-col gap-2 justify-center items-center border-x border-gray-2 h-full whitespace-nowrap'>
							<span className='text-sm'>{currentSound.key || '--'}</span>
							<span className='text-xs'>KEY</span>
						</div>
						<div className='flex flex-col gap-2 justify-center items-center border-r border-gray-2 h-full'>
							<span className='text-sm'>{currentSound.bpm || '--'}</span>
							<span className='text-xs'>BPM</span>
						</div>
						<div className='flex justify-center border-r border-gray-2 h-full'>
							<button onClick={handleAddToCartClick}>
								<PlusIcon className='w-6 h-6 hover:cursor-pointer hover:bg-purple transition-all duration-300 rounded-md'></PlusIcon>
							</button>
						</div>
					</div>
				</div>
				<div className='flex items-center gap-4 justify-self-end'>
					<div>
						{isMuted ? (
							<SpeakerXMarkIcon className='w-6 h-6 hover:cursor-pointer hover:text-purple transition-all duration-300' />
						) : (
							<SpeakerWaveIcon className='w-6 h-6 hover:cursor-pointer hover:text-purple transition-all duration-300' />
						)}
					</div>
					<Slider
						className='w-[100px]'
						defaultValue={[33]}
						max={100}
						step={1}
						onValueChange={handleVolumeChange}
					/>
				</div>
			</div>
		</div>
	);
};

export default AudioPlayer;
