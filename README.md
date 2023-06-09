# Sound Sprout - (In Development)

This repository consists of a full stack application that uses [Next.js](https://nextjs.org/) for the frontend, and Python [Django](https://www.djangoproject.com/) with [Django Rest Framework](https://www.django-rest-framework.org/) for the backend API, all backed by a [PostgreSQL](https://www.postgresql.org/) database.

## Features & Functionality

- **Browse Sound Packs:** Users can visit the homepage to browse and explore a list of sound packs fetched from the database.

- **Sound Sample Preview:** Users can select a sound pack from the list and listen to preview audio files fetched from the database.

- **Account Registration:** Users can register an account by filling out a registration form. The system validates the form data, creates a new user in the database, and logs the user in.

- **Sound Pack Upload (Registered Users):** Registered users can upload sound packs by filling out a form, uploading audio files, and assigning genres. The system validates the data and saves the new sound pack in the database.

- **Purchase and Download Sound Packs (Registered Users):** Users can purchase sound packs by selecting an item, confirming the purchase, and entering payment information. Upon successful payment, users are provided with a download link for the pack.

- **User Profile:** Users can view and edit their profile information. The system fetches and displays the user's profile data, and allows them to update and save their profile.

- **Logout:** Registered users can logout from their account. The system logs them out and redirects them to the homepage.

- **Search by Tags:** Users can enter search queries in the search bar to find packs or sounds matching the tags. The system fetches and displays the matching packs or sounds based on the tags.

## The project is organized into two main subfolders:

- `/frontend`: This is a Next.js project bootstrapped with create-next-app using TypeScript & TailWindCSS
- `/backend`: This is a Django project, equipped with Django Rest Framework for creating API endpoints.

## Backend API and Cloudinary Integration

The Sound Sprout application utilizes a backend API built with Django and Django Rest Framework to handle data storage and retrieval. The frontend, developed using Next.js, interacts with the backend API to fetch data and perform various operations.

### Backend Server Calls

The frontend communicates with the backend server using HTTP requests. The axios library is used to make API calls from the frontend to the backend endpoints. The API endpoints are defined in the Django backend using Django Rest Framework's view functions.

API calls are made to endpoints such as `/packs`, `/sounds`, and `/genres` to fetch data related to packs, sounds, and genres respectively. The frontend receives the response from the backend in JSON format, which is then processed and rendered on the user interface.

The file responsible for backend server calls in the frontend repository is located at `frontend/app/api/api.ts`. This file contains functions that encapsulate the API calls to the backend server. The functions use axios to make the requests and handle the responses.

### Cloudinary Integration

Cloudinary is utilized in the Sound Sprout application for hosting and serving media assets, such as pack cover art and sound previews. When a pack or sound is uploaded, the media files are stored in the Cloudinary cloud storage.

To display pack cover art and play sound previews, the frontend generates the Cloudinary URLs for the corresponding media assets using the public IDs of the files. These URLs are then used in the frontend to fetch the media files from Cloudinary and render them in the user interface.

The file responsible for Cloudinary integration in the frontend repository is located at `frontend/app/api/cloudinary.ts`. This file contains functions that generate the Cloudinary URLs for pack cover art and sound previews based on their public IDs. These functions are used in the frontend components to retrieve and display the media assets from Cloudinary.
