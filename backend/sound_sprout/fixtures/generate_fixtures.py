import os
import json

# The base directory where the pack directories are located
base_dir = "../../media/packs"

# The fixture lists
sounds_fixture = []
tags_fixture = []
sound_tag_assoc_fixture = []

# The id counters
sound_id_counter = 1
pack_id_counter = 1
tag_id_counter = 1

# A dictionary to keep track of existing tags
tags_dict = {}

# Iterate over each directory in the base directory
for pack_name in os.listdir(base_dir):
    pack_dir = os.path.join(base_dir, pack_name, "sounds")

    # If the pack directory exists and is a directory
    if os.path.exists(pack_dir) and os.path.isdir(pack_dir):

        # Iterate over each file in the pack directory
        for sound_file in os.listdir(pack_dir):

            # The name of the sound is the file name without the extension
            name, _ = os.path.splitext(sound_file)

            # The file path is the relative path from the base directory to the sound file
            audio_file = os.path.relpath(
                os.path.join(pack_dir, sound_file), base_dir)

            # Create the sound fixture object and append it to the fixture list
            sounds_fixture.append({
                "model": "sound_sprout.Sound",
                "pk": sound_id_counter,
                "fields": {
                    "pack": pack_id_counter,
                    "name": name,
                    "audio_file": audio_file,
                    "price": 0.99,
                    "created_at": "2023-07-24T00:00:00Z",
                    "modified_at": "2023-07-24T00:00:00Z"
                }
            })

            # Split the name into parts based on underscore for tag creation
            parts = name.split("_")

            # Create tags for each part
            for part in parts:
                part = part.lower()  # Convert to lowercase

                # Only add the tag if it doesn't already exist
                if part not in tags_dict:
                    # Add the tag to the dictionary
                    tags_dict[part] = tag_id_counter

                    # Create the tag fixture object and append it to the fixture list
                    tags_fixture.append({
                        "model": "sound_sprout.Tag",
                        "pk": tag_id_counter,
                        "fields": {
                            "name": part,
                        }
                    })

                    # Increment the tag id counter
                    tag_id_counter += 1

                # Create the sound-tag association fixture object and append it to the fixture list
                sound_tag_assoc_fixture.append({
                    "model": "sound_sprout.SoundTagAssociation",
                    "fields": {
                        "sound": sound_id_counter,
                        "tag": tags_dict[part]
                    }
                })

            # Increment the sound id counter
            sound_id_counter += 1

        # Increment the pack id counter after all sounds in the pack have been processed
        pack_id_counter += 1

# Write the fixtures to JSON files
with open("sounds.json", "w") as file:
    json.dump(sounds_fixture, file, indent=4)

with open("tags.json", "w") as file:
    json.dump(tags_fixture, file, indent=4)

with open("sound_tag_assoc.json", "w") as file:
    json.dump(sound_tag_assoc_fixture, file, indent=4)
