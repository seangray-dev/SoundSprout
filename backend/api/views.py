import cloudinary
import cloudinary.uploader
import cloudinary.api
from cloudinary.utils import cloudinary_url
import logging
import mimetypes
import os
import requests
import scipy
import stripe
import time
import threading
import uuid
import zipfile
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.core.exceptions import MultipleObjectsReturned
from django.core.files.storage import default_storage
from django.db import IntegrityError
from django.http import HttpResponse, JsonResponse, FileResponse, Http404
from dotenv import load_dotenv
from requests import get as http_get
from django.core.exceptions import MultipleObjectsReturned, ObjectDoesNotExist
from pydub import AudioSegment
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from sound_sprout.models import Pack, Sound, Genre, PackGenreAssociation, SoundTagAssociation
from .serializers import PackSerializer, SoundSerializer, UserSerializer, GenreSerializer, SoundTagAssociationSerializer
from transformers import AutoProcessor, MusicgenForConditionalGeneration
from wsgiref.util import FileWrapper

load_dotenv()
CLOUDINARY_BASE_URL = os.getenv('CLOUDINARY_BASE_URL')
CLOUDINARY_CLOUD_NAME = os.getenv('CLOUDINARY_CLOUD_NAME')
CLOUNDINARY_PACKS_URL = os.getenv('CLOUNDINARY_PACKS_URL')
CLOUDINARY_AUDIO_BASE_URL = f"{CLOUDINARY_BASE_URL}/{CLOUDINARY_CLOUD_NAME}/video/upload/f_auto:video,q_auto/v1/packs"
stripe.api_key = os.getenv('STRIPE_SECRET_KEY')


@api_view(['POST'])
def generate_audio(request):
    start_time = time.time()  # Start the timer

    genre = request.data.get('genre')
    mood = request.data.get('mood')
    bpm = request.data.get('bpm')
    instruments = request.data.get('instruments')
    descriptions = f"{genre}, {mood}, bpm:{bpm}, {instruments}"

    file_path = ai_music_gen(descriptions)

    end_time = time.time()  # Stop the timer
    execution_time = end_time - start_time  # Calculate the time taken

    # Print the time taken
    print(f"Function execution time: {execution_time:.2f} seconds")

    response = FileResponse(open(file_path, 'rb'),
                            as_attachment=True, filename='musicgen_out.wav')

    return response


def ai_music_gen(text):
    processor = AutoProcessor.from_pretrained("facebook/musicgen-small")
    model = MusicgenForConditionalGeneration.from_pretrained(
        "facebook/musicgen-small")

    print('ai music gen:', text)

    inputs = processor(
        text=[text],
        padding=False,
        return_tensors="pt",
    )

    audio_values = model.generate(**inputs, max_new_tokens=256)
    sampling_rate = model.config.audio_encoder.sampling_rate
    file_path = "musicgen_out.wav"
    scipy.io.wavfile.write(file_path, rate=sampling_rate,
                           data=audio_values[0, 0].numpy())

    return file_path


@api_view(['GET', 'PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def profile(request):
    user = request.user

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)

    elif request.method == 'PUT':
        try:
            serializer = UserSerializer(instance=user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    elif request.method == 'PATCH':

        new_password = request.data.get('new_password')

        user.set_password(new_password)
        user.save()

        return Response(status=status.HTTP_204_NO_CONTENT)


# unused
@api_view(['GET'])
def get_current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)


@api_view(['GET'])
def get_packs(request):
    packs = Pack.objects.all()
    serializer = PackSerializer(packs, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_trending_packs(request):
    pack_ids = [2, 10, 9]
    packs = Pack.objects.filter(id__in=pack_ids)
    serializer = PackSerializer(packs, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_pack_id(request, pack_id):
    try:
        pack = Pack.objects.get(id=pack_id)
        serializer = PackSerializer(pack)
        return Response(serializer.data)
    except Pack.DoesNotExist:
        return Response(status=404)


@api_view(['GET'])
def get_pack_sounds(request, pack_id):
    try:
        pack = Pack.objects.get(id=pack_id)
    except Pack.DoesNotExist:
        return Response(status=404)

    sounds = Sound.objects.filter(pack=pack)
    serializer = SoundSerializer(sounds, many=True)
    return Response(serializer.data)


@api_view(['POST', 'OPTIONS'])
@permission_classes([AllowAny])
def create_user(request):
    username = request.data.get('username')
    first_name = request.data.get('firstName')
    last_name = request.data.get('lastName')
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        user = User.objects.create_user(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password
        )
        user.save()
        return Response({'success': True})
    except IntegrityError:
        return Response({'success': False, 'error': 'Username already exists'}, status=400)
    except Exception as e:
        return Response({'success': False, 'error': str(e)}, status=500)


@api_view(['POST', 'OPTIONS'])
@permission_classes([AllowAny])
def login_user(request):
    userIdentifier = request.data.get('userIdentifier')
    password = request.data.get('password')

    # Check if the userIdentifier is an email
    if '@' in userIdentifier:
        try:
            user = User.objects.get(email=userIdentifier)
            # Authenticate using the username associated with the email
            user = authenticate(
                request, username=user.username, password=password)
        except User.DoesNotExist:
            return Response({'success': False, 'error': 'Username/Email and/or password is incorrect'}, status=400)
        except MultipleObjectsReturned:
            return Response({'success': False, 'error': 'Multiple users with this email found'}, status=400)
    else:
        user = authenticate(
            request, username=userIdentifier, password=password)

    if user is not None:
        login(request, user)
        serializer = UserSerializer(user)  # Serialize the user object

        # Generate the access token
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        # Include serialized user data and access token in the response
        return Response({'success': True, 'user': serializer.data, 'access_token': access_token})
    else:
        return Response({'success': False, 'error': 'Username/Email and/or password is incorrect'}, status=400)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    request.user.auth_token.delete()  # assuming you are using the built-in Token model
    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
def get_genre(request, genre_id):
    try:
        genre = Genre.objects.get(id=genre_id)
        serializer = GenreSerializer(genre)
        return Response(serializer.data)
    except Genre.DoesNotExist:
        return Response({'error': 'Genre not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_sounds_by_genre(request, genre_id):
    try:
        sounds = Sound.objects.filter(
            pack__packgenreassociation__genre_id=genre_id)
        serializer = SoundSerializer(sounds, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Genre.DoesNotExist:
        return Response({'error': 'Genre not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_packs_by_genre(request, genre_id):
    try:
        packs = Pack.objects.filter(packgenreassociation__genre_id=genre_id)
        genre = Genre.objects.get(id=genre_id)
        genre_name = genre.name

        serializer = PackSerializer(packs, many=True)
        packs_data = serializer.data

        for pack_data in packs_data:
            pack_data['genre'] = genre_name

        return Response(packs_data, status=status.HTTP_200_OK)
    except Genre.DoesNotExist:
        return Response({'error': 'Genre not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_sound_tags(request, sound_id):
    try:
        sound_tags_associations = SoundTagAssociation.objects.filter(
            sound__id=sound_id)
        serializer = SoundTagAssociationSerializer(
            sound_tags_associations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Sound.DoesNotExist:
        return Response({'error': 'Sound not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def create_payment_intent(request):
    try:
        amount_in_dollars = request.data.get('amount', 10.00)

        # Convert to cents
        amount_in_cents = int(amount_in_dollars * 100)

        payment_intent = stripe.PaymentIntent.create(
            amount=amount_in_cents,
            currency='usd',
        )
        client_secret = payment_intent.client_secret

        if not client_secret:
            return JsonResponse({'error': 'Client secret is missing'}, status=500)

        return JsonResponse({'clientSecret': client_secret})
    except stripe.error.StripeError as e:
        return JsonResponse({'error': str(e)}, status=400)


def generate_download_links(public_id):
    return CLOUDINARY_AUDIO_BASE_URL + public_id


@api_view(['POST'])
def download_files(request):
    public_ids = request.data.get('soundPublicIds', [])
    download_links = [generate_download_links(
        public_id) for public_id in public_ids]
    return JsonResponse({'downloadLinks': download_links})


@api_view(['POST'])
def download_packs(request):
    pack_ids = request.data.get('packIds', [])
    unique_id = str(uuid.uuid4())

    for pack_id in pack_ids:
        try:
            pack = Pack.objects.get(id=pack_id)
            # Unique filename for each request
            zip_filename = f'{pack.name}_{unique_id}.zip'
            zipfile_obj = zipfile.ZipFile(zip_filename, 'w')

            sounds = Sound.objects.filter(pack=pack)
            serializer = SoundSerializer(sounds, many=True)

            for sound in serializer.data:
                wav_url = generate_download_links(sound['audio_file'])
                wav_filename = f"{sound['name']}.wav"

                # Debug print
                print(f"Downloading from {wav_url} to {wav_filename}")

                # Download .wav file
                with open(wav_filename, 'wb') as f:
                    f.write(requests.get(wav_url).content)

                # Add .wav file to .zip file
                zipfile_obj.write(wav_filename)

                # Delete the .wav files
                print(os.path.getsize(wav_filename))
                os.remove(wav_filename)

        except Pack.DoesNotExist:
            continue

    zipfile_obj.close()
    delayed_delete(zip_filename, 300)

    return JsonResponse({'zipFileName': zip_filename})


# Get an instance of a logger
logger = logging.getLogger(__name__)


@api_view(['GET'])
def get_zip_file(request, filename):
    cwd = os.getcwd()
    logger.debug(f'Current working directory: {cwd}')
    logger.debug(f'Requesting file: {filename}')

    # Check if the file exists
    if not os.path.exists(filename):
        logger.warning(f'File not found: {filename}')
        raise Http404

    wrapper = FileWrapper(open(filename, 'rb'))
    content_type = mimetypes.guess_type(filename)[0]
    file_size = os.path.getsize(filename)
    logger.debug(f'File size: {file_size}')

    response = FileResponse(wrapper, content_type=content_type)
    response['Content-Disposition'] = f'attachment; filename={filename}'
    response['Content-Length'] = file_size

    return response


def delayed_delete(filename, delay):
    def delete_file():
        time.sleep(delay)
        os.remove(filename)
    threading.Thread(target=delete_file).start()
