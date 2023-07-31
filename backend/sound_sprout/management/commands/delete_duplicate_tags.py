from django.core.management.base import BaseCommand
from sound_sprout.models import Sound, SoundTagAssociation


class Command(BaseCommand):
    help = 'Delete duplicate SoundTagAssociations from the database'

    def handle(self, *args, **kwargs):
        # Iterate through all Sounds
        for sound in Sound.objects.all():
            self.stdout.write(f"Checking Sound with id {sound.id}.")

            # Get a list of all unique tag ids associated with this sound
            unique_tag_ids = set(SoundTagAssociation.objects.filter(
                sound=sound).values_list('tag__id', flat=True))

            # Iterate through the unique tag ids
            for tag_id in unique_tag_ids:
                # Get all SoundTagAssociations with the current sound and tag id
                duplicate_associations = SoundTagAssociation.objects.filter(
                    sound=sound, tag__id=tag_id)

                self.stdout.write(
                    f"Found {duplicate_associations.count()} occurrences for tag id {tag_id}.")

                # If there are more than one associations with the current sound and tag id
                if duplicate_associations.count() > 1:
                    # Keep the first one and find the rest
                    associations_to_delete = duplicate_associations.exclude(
                        pk=duplicate_associations.first().pk)

                    self.stdout.write(
                        f"Deleting {associations_to_delete.count()} duplicate associations.")
                    # Delete the duplicate associations
                    associations_to_delete.delete()

        self.stdout.write(self.style.SUCCESS(
            'Successfully deleted duplicate SoundTagAssociations'))
