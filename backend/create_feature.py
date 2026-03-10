import os

# Base path to the api folder
base_path = os.path.join("api")

# Make sure the api folder exists
if not os.path.exists(base_path):
    os.makedirs(base_path)
    print(f"Created base API folder: {base_path}")

# Ask for the folder name
folder_name = input("Enter the folder name: ").strip()

# Full path to the new folder
folder_path = os.path.join(base_path, folder_name)

# Create the folder if it doesn't exist
if not os.path.exists(folder_path):
    os.makedirs(folder_path)
    print(f"Created folder: {folder_path}")
else:
    print(f"Folder '{folder_path}' already exists.")

# List of files to create inside the new folder
files = ["models.py", "views.py", "serializers.py", "urls.py"]

for file in files:
    file_path = os.path.join(folder_path, file)
    if not os.path.exists(file_path):
        with open(file_path, "w") as f:
            if file == "urls.py":
                # Initialize urls.py with basic structure
                f.write(
                    "from django.urls import path\n\nurlpatterns = [\n    # Add your paths here\n]\n"
                )
        print(f"Created file: {file_path}")
    else:
        print(f"File '{file_path}' already exists.")

# Update parent models.py inside /backend/api to import from the new folder
parent_models = os.path.join(base_path, "models.py")
import_line = f"from .{folder_name}.models import *\n"

if os.path.exists(parent_models):
    with open(parent_models, "a") as f:
        f.write(import_line)
    print(f"Updated {parent_models} to import from {folder_name}.models")
else:
    with open(parent_models, "w") as f:
        f.write(import_line)
    print(f"Created {parent_models} with import from {folder_name}.models")

# Update parent urls.py inside /backend/api to include the new folder
parent_urls = os.path.join(base_path, "urls.py")
include_line = f"    path('{folder_name}/', include('api.{folder_name}.urls')),\n"

if os.path.exists(parent_urls):
    # Check if 'urlpatterns' exists in the file
    with open(parent_urls, "r") as f:
        content = f.read()
    if "urlpatterns" not in content:
        content += "\nfrom django.urls import path, include\n\nurlpatterns = [\n]\n"
    # Append the new include line inside urlpatterns
    if include_line not in content:
        content = content.replace("]\n", f"{include_line}]\n")
    with open(parent_urls, "w") as f:
        f.write(content)
    print(f"Updated {parent_urls} to include {folder_name}.urls")
else:
    # Create urls.py with the new include
    with open(parent_urls, "w") as f:
        f.write(
            "from django.urls import path, include\n\nurlpatterns = [\n"
            f"{include_line}]\n"
        )
    print(f"Created {parent_urls} with include for {folder_name}.urls")