import os
import json

# The base directory where the pack directories are located
base_dir = "../../media/packs"

# The fixture list
fixture = []

# The id counter for sounds
sound_id_counter = 1

# The id counter for packs
pack_id_counter = 1

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
            file_path = os.path.relpath(
                os.path.join(pack_dir, sound_file), base_dir)

            # Create the fixture object and append it to the fixture list
            fixture.append({
                "model": "sound_sprout.sounds",
                "pk": sound_id_counter,
                "fields": {
                    "pack_id": pack_id_counter,
                    "name": name,
                    "file_path": file_path,
                    "price": 0.99
                }
            })

            # Increment the sound id counter
            sound_id_counter += 1

        # Increment the pack id counter after all sounds in the pack have been processed
        pack_id_counter += 1

# Write the fixture to a JSON file
with open("sounds.json", "w") as file:
    json.dump(fixture, file, indent=4)
