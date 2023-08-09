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
