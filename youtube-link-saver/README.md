# YouTube Link Saver

A simple userscript for saving and managing your favorite YouTube videos. All saved videos are stored locally in your browser and remain available after restarts.

## Preview

![YouTube Link Saver Preview](https://github.com/user-attachments/assets/e612249d-8a74-4767-9351-978ef071b30e)

*Save videos with one click, use selection mode, search saved videos, and more!*

## Features

- **One-Click Save** - Quickly save any YouTube video with a single click
- **Selection Mode** - Save videos by clicking them in selection mode
- **Search** - Easily search through your saved videos
- **Export/Import** - Backup and restore your saved videos collection
- **Visual Indicators** - Saved videos are highlighted in green across YouTube
- **Keyboard Shortcuts** - Quick access to all features
- **Notifications** - Get feedback for all actions
- **Toggle Save** - Click a saved video again to remove it from your collection
- **Modern UI** - Clean and intuitive interface that matches YouTube's design

## Installation

Install this script from [Greasy Fork](https://greasyfork.org/en/scripts/528938-youtube-link-saver)

## How It Works

### Basic Usage

- Click the save button (bookmark icon) in the top bar to save the current video
- Click the list button to view your saved videos
- Search through your saved videos using the search box
- Export your collection using the Export button
- Import previously exported videos using the Import button

### Keyboard Shortcuts

- `\` (Backslash): Save current video
- `_` (Underscore): Toggle selection mode

### Selection Mode

1. Right-click the save button or press underscore (_) to enter selection mode
2. Click any video title to save it (recommended) or thumbnail
   - Note: clicking thumbnail may not work if video preview plays on hover
3. Right-click the save button again or press underscore (_) to exit selection mode

## Technical Details

### Storage
- Uses browser's local storage for persistence
- Stores:
  - Saved video information
  - User preferences
  - Selection mode state

### Visual Elements
- Green highlighting for saved videos
- Modern notification system
- Confirmation dialogs for important actions
- Smooth animations and transitions

### Browser Support
- Works on all major browsers:
  - Chrome
  - Firefox
  - Edge
  - Safari

## Configuration

### Search Functionality
- Real-time search through saved videos
- Searches video titles
- Clear search with one click

### Export/Import
- Export your collection as a JSON file
- Import previously exported collections
- Merge imported videos with existing collection
- Duplicate videos are automatically handled

### Collection Management
- View all saved videos in list view
- Remove individual videos with X button
- Clear entire collection with "Delete All" (requires confirmation)
- Export/Import for backup and restore

## Privacy

- All data is stored locally in your browser
- No external data collection
- No tracking or analytics

## License

MIT License - Feel free to modify and share!