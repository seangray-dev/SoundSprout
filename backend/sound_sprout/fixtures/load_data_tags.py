import os
import json

# The base directory where the pack directories are located
base_dir = "../../media/packs"

# The fixture list
fixture = []

# The id counter for tags
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

            # Split the name into parts based on underscore
            parts = name.split("_")

            # Create tags for each part
            for part in parts:
                part = part.lower()  # Convert to lowercase

                # Only add the tag if it doesn't already exist
                if part not in tags_dict:
                    # Add the tag to the dictionary
                    tags_dict[part] = True

                    # Create the fixture object and append it to the fixture list
                    fixture.append({
                        "model": "sound_sprout.tags",
                        "pk": tag_id_counter,
                        "fields": {
                            "name": part,
                        }
                    })

                    # Increment the tag id counter
                    tag_id_counter += 1

# Write the fixture to a JSON file
with open("tags.json", "w") as file:
    json.dump(fixture, file, indent=4)
