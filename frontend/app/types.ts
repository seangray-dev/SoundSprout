export interface User {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	username: string;
}

export interface Pack {
	id: number;
	name: string;
	description: string;
	price: number;
	cover_art_location: string;
	uploader: User;
	preview: string | null;
	purchase_count: number;
	created_at: string;
	modified_at: string;
}

export interface Sound {
	id: number;
	name: string;
	audio_file: string;
	bpm: number;
	key: string;
	price: number;
	pack: Pack;
	purchase_count: number;
	created_at: string;
	modified_at: string;
}

export interface Transaction {
	id: number;
	buyer: User;
	pack: Pack | null;
	sound: Sound | null;
	date: string;
	total_price: number;
	created_at: string;
	modified_at: string;
}

export interface Genre {
	id: number;
	name: string;
}

export interface PackGenreAssociation {
	id: number;
	pack: Pack;
	genre: Genre;
}

export interface Tag {
	id: number;
	name: string;
}

export interface SoundTagAssociation {
	id: number;
	sound: Sound;
	tag: Tag;
}

export interface PackSoundsProps {
	packId: string;
	coverArtLocation: string;
}

export interface LoginFormValues {
	userIdentifier: string;
	password: string;
}

export interface SignUpFormValues {
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
}
