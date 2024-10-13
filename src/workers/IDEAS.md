{
  "actions": [
    {
      "category": "Files & Folders",
      "actions": [
        {
          "name": "Copy Finder Items",
          "description": "Copies specified files and folders to a new location.",
          "inputType": "Files/Folders",
          "outputType": "Copied Files/Folders"
        },
        {
          "name": "Get Specified Finder Items",
          "description": "Allows you to specify files and folders as input for subsequent actions.",
          "inputType": "None",
          "outputType": "Selected Files/Folders"
        }
      ]
    },
    {
      "category": "Photos & Images",
      "actions": [
        {
          "name": "Scale Images",
          "description": "Scales images to a specified size.",
          "inputType": "Images",
          "outputType": "Resized Images"
        },
        {
          "name": "Crop Images",
          "description": "Crops images to specific dimensions.",
          "inputType": "Images",
          "outputType": "Cropped Images"
        }
      ]
    },
    {
      "category": "Music & Audio",
      "actions": [
        {
          "name": "Encode Audio Files",
          "description": "Converts audio files to a specified format.",
          "inputType": "Audio Files",
          "outputType": "Encoded Audio"
        },
        {
          "name": "Import Audio Files",
          "description": "Imports audio files into iTunes.",
          "inputType": "Audio Files",
          "outputType": "iTunes Library"
        }
      ]
    },
    {
      "category": "Text",
      "actions": [
        {
          "name": "Get Specified Text",
          "description": "Specifies a block of text to be used as input in a workflow.",
          "inputType": "None",
          "outputType": "Text"
        },
        {
          "name": "Find and Replace Text",
          "description": "Finds and replaces text within input.",
          "inputType": "Text",
          "outputType": "Modified Text"
        }
      ]
    },
    {
      "category": "Internet",
      "actions": [
        {
          "name": "Download URLs",
          "description": "Downloads the content of URLs.",
          "inputType": "URLs",
          "outputType": "Downloaded Files"
        },
        {
          "name": "Get Specified URLs",
          "description": "Specifies URLs to be used as input.",
          "inputType": "None",
          "outputType": "URLs"
        }
      ]
    },
    {
      "category": "Utilities",
      "actions": [
        {
          "name": "Run Bash Script",
          "description": "Executes a shell script using Bash.",
          "inputType": "Text",
          "outputType": "Script Output"
        },
        {
          "name": "Set Computer Volume",
          "description": "Sets the computer's volume to a specified level.",
          "inputType": "Volume Level",
          "outputType": "Adjusted Volume"
        }
      ]
    }
  ]
}
















{
  "actions": [
    {
      "category": "Files & Folders",
      "actions": [
        {
          "name": "Copy Finder Items",
          "description": "Copies files and folders to a new location.",
          "inputType": "Files/Folders",
          "outputType": "Copied Files/Folders"
        },
        {
          "name": "Move Finder Items",
          "description": "Moves files and folders to a new location.",
          "inputType": "Files/Folders",
          "outputType": "Moved Files/Folders"
        },
        {
          "name": "Rename Finder Items",
          "description": "Renames specified files and folders.",
          "inputType": "Files/Folders",
          "outputType": "Renamed Files/Folders"
        },
        {
          "name": "Delete Finder Items",
          "description": "Deletes specified files and folders.",
          "inputType": "Files/Folders",
          "outputType": "None"
        },
        {
          "name": "Find Finder Items",
          "description": "Finds files and folders based on specified criteria.",
          "inputType": "None",
          "outputType": "Files/Folders"
        },
        {
          "name": "Get Folder Contents",
          "description": "Retrieves the contents of specified folders.",
          "inputType": "Folders",
          "outputType": "Files/Folders"
        }
      ]
    },
    {
      "category": "Photos & Images",
      "actions": [
        {
          "name": "Scale Images",
          "description": "Scales images to a specified size.",
          "inputType": "Images",
          "outputType": "Resized Images"
        },
        {
          "name": "Rotate Images",
          "description": "Rotates images by a specified angle.",
          "inputType": "Images",
          "outputType": "Rotated Images"
        },
        {
          "name": "Flip Images",
          "description": "Flips images horizontally or vertically.",
          "inputType": "Images",
          "outputType": "Flipped Images"
        },
        {
          "name": "Convert Image Format",
          "description": "Converts images to a different format.",
          "inputType": "Images",
          "outputType": "Converted Images"
        }
      ]
    },
    {
      "category": "Music & Audio",
      "actions": [
        {
          "name": "Add Songs to Playlist",
          "description": "Adds songs to a specified iTunes playlist.",
          "inputType": "Songs",
          "outputType": "Updated Playlist"
        },
        {
          "name": "Get Selected iTunes Items",
          "description": "Retrieves selected items from iTunes.",
          "inputType": "None",
          "outputType": "iTunes Items"
        },
        {
          "name": "Convert Audio Files",
          "description": "Converts audio files to a specified format.",
          "inputType": "Audio Files",
          "outputType": "Converted Audio Files"
        }
      ]
    },
    {
      "category": "Text",
      "actions": [
        {
          "name": "Get Specified Text",
          "description": "Specifies a block of text to be used as input.",
          "inputType": "None",
          "outputType": "Text"
        },
        {
          "name": "Extract Text",
          "description": "Extracts text from documents.",
          "inputType": "Documents",
          "outputType": "Text"
        },
        {
          "name": "Find and Replace Text",
          "description": "Finds and replaces text within the input.",
          "inputType": "Text",
          "outputType": "Modified Text"
        },
        {
          "name": "New Text File",
          "description": "Creates a new text file with specified content.",
          "inputType": "Text",
          "outputType": "Text File"
        }
      ]
    },
    {
      "category": "Internet",
      "actions": [
        {
          "name": "Download URLs",
          "description": "Downloads the content of URLs.",
          "inputType": "URLs",
          "outputType": "Downloaded Files"
        },
        {
          "name": "Get Specified URLs",
          "description": "Specifies URLs to be used as input.",
          "inputType": "None",
          "outputType": "URLs"
        },
        {
          "name": "Get Contents of Web Pages",
          "description": "Retrieves the HTML content of web pages.",
          "inputType": "URLs",
          "outputType": "Web Page Content"
        }
      ]
    },
    {
      "category": "Utilities",
      "actions": [
        {
          "name": "Run Shell Script",
          "description": "Executes a shell script.",
          "inputType": "Text",
          "outputType": "Script Output"
        },
        {
          "name": "Set Computer Volume",
          "description": "Sets the computer's volume to a specified level.",
          "inputType": "Volume Level",
          "outputType": "Adjusted Volume"
        },
        {
          "name": "Get Clipboard Contents",
          "description": "Retrieves the current clipboard contents.",
          "inputType": "None",
          "outputType": "Clipboard Content"
        },
        {
          "name": "Display Notification",
          "description": "Displays a notification message.",
          "inputType": "Text",
          "outputType": "Notification"
        }
      ]
    },
    {
      "category": "Calendar",
      "actions": [
        {
          "name": "Create iCal Event",
          "description": "Creates a new event in iCal.",
          "inputType": "Event Details",
          "outputType": "Calendar Event"
        },
        {
          "name": "Find iCal Events",
          "description": "Finds events in iCal based on criteria.",
          "inputType": "Criteria",
          "outputType": "Events"
        }
      ]
    }
  ]
}
