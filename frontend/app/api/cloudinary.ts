import axios from 'axios';

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export const getCoverArtUrl = (publicId: string) => {
	return `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}.jpg`;
};

export const getPackPreviewUrl = (publicId: string) => {
	return `https://res.cloudinary.com/${cloudName}/video/upload/${publicId}.mp3`;
};

export const getPreviewUrl = (audio_file: string) => {
	return `${process.env.NEXT_PUBLIC_CLOUDINARY_SOUND_URL}${audio_file}`;
};

// Upload endpoint
// The upload endpoint is https://api.cloudinary.com/v1_1/${cloudName}/upload. To use the endpoint in your application, write a function that calls the Cloudinary upload endpoint and pass:
// an unsigned upload preset with the upload method options you want to apply for all files
// the file(s) to upload
// other unsigned upload parameters to apply to the selected files (e.g. tags, if needed).

const uploadPreset = 'soundsprout';

export const uploadToCloudinary = async (file: File, folderPath: string) => {
	const formData = new FormData();
	formData.append('file', file);
	formData.append('upload_preset', uploadPreset);
	formData.append('folder', folderPath);

	const uploadURL = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

	const response = await axios.post(uploadURL, formData);
	return response.data;
};

export const uploadPackToCloudinary = async (packData, soundData) => {
	const packFolderPath = `packs/${packData.packName}`;
	const coverArtResult = await uploadToCloudinary(
		packData.packImage,
		packFolderPath
	);
	const previewResult = await uploadToCloudinary(
		packData.packPreview,
		packFolderPath
	);

	const soundFolderPath = `${packFolderPath}/sounds`;
	const soundResults = await Promise.all(
		soundData.map((sound) => uploadToCloudinary(sound.file, soundFolderPath))
	);

	// Return results if needed
	return { coverArtResult, previewResult, soundResults };
};
