from django.core.management.base import BaseCommand
from sound_sprout.models import Sound
import re


class Command(BaseCommand):
    help = 'Extracts BPM and Key from Sound names and saves them to their respective fields'

    # regular expression pattern for key
    key_pattern = re.compile(r'^[A-G](#?b?)(m|M|min|MAJ)?$', re.I)

    def handle(self, *args, **options):
        # First clear all key fields
        Sound.objects.all().update(key=None)

        sounds = Sound.objects.all()

        for sound in sounds:
            try:
                elements = sound.name.split('_')

                # Find the key
                key = None
                for i in range(len(elements) - 1, -1, -1):  # Start from the end
                    if self.key_pattern.match(elements[i]):
                        key = elements[i]
                        if key[-1].lower() == 'm' or key[-3:].lower() == 'min':
                            key = key[0:-1] + \
                                ' min' if key[-1].lower() == 'm' else key[0:-
                                                                          3] + ' min'
                        elif key[-1].upper() == 'j' or key[-3:].lower() == 'maj':
                            key = key[0:-1] + \
                                ' maj' if key[-1].upper() == 'j' else key[0:-
                                                                          3] + ' maj'
                        elif not key.lower().endswith(('maj', 'min')):
                            key = key + ' maj'
                        # Make sure only the first character is uppercased
                        key = key[0] + key[1:].lower()
                        break

                # Find the BPM
                bpm = None
                for element in elements:
                    try:
                        value = int(element)
                        if 40 <= value <= 220:  # Reasonable BPM range
                            bpm = value
                            break
                    except ValueError:
                        pass

                # Update the sound object
                if key is not None:
                    sound.key = key
                if bpm is not None:
                    sound.bpm = bpm

                sound.save()
                self.stdout.write(self.style.SUCCESS(
                    f'Successfully updated Sound: {sound.name}'))
            except Exception as e:
                self.stdout.write(self.style.ERROR(
                    f'Error updating Sound: {sound.name}. Error: {str(e)}'))
