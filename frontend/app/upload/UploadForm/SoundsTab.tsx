import { useEffect, useState } from 'react';
import SoundsInput from './SoundsInput';

const SoundsTab = ({ onSoundsUpdate, soundsData }: any) => {
	const [sounds, setSounds] = useState(soundsData || []);

	const handleSoundsChange = (value: any, index: number, field?: string) => {
		let newSounds = [...sounds];

		if (field) {
			newSounds[index] = { ...newSounds[index], [field]: value };
		} else {
			newSounds[index] = {
				...newSounds[index],
				audio_file: value.target.files[0],
				name: value.target.files[0].name,
				price: 0.99,
			};
		}

		setSounds(newSounds);
	};

	useEffect(() => {
		onSoundsUpdate(sounds);
	}, [sounds, onSoundsUpdate]);

	return (
		<div>
			<div>
				<SoundsInput onChange={handleSoundsChange} />
			</div>
		</div>
	);
};

export default SoundsTab;
