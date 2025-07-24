# YouTube Shorts Daily Time Limiter

A userscript that helps you manage your YouTube Shorts viewing time by setting a daily limit of 40 minutes.

## Features

- **Daily Time Limit** - Set maximum viewing time for YouTube Shorts
- **Time Tracking** - Persistent tracking across browser sessions
- **Auto Reset** - Automatically resets counter at midnight
- **Smart Warnings** - Get notified before limit is reached
- **Precise Tracking** - Only counts actual viewing time

## Installation

Install this script from [Greasy Fork](https://greasyfork.org/en/scripts/529077-youtube-shorts-auto-closer)

## How It Works

### Daily Limit
- Tracks total viewing time per day
- Automatically closes shorts when 40-minute limit is reached
- Resets counter at midnight
- Persists across browser sessions and refreshes

### Warning System
- Shows warning notification 10 seconds before closing
- Displays countdown before auto-close
- Warning appears when approaching daily limit

## Technical Details

### Storage
- Uses browser's local storage for persistence
- Stores:
  - Daily viewing time
  - Last access date
  - Session state

### Time Tracking
- Only counts active viewing time
- Pauses when:
  - Leaving shorts section
  - Switching to different tabs
  - Browser is minimized

### Browser Support
- Works with all major browsers:
  - Chrome
  - Firefox
  - Edge
  - Safari

## Configuration

To modify the daily time limit, edit the following constant in the script:

```javascript
const DAILY_LIMIT_MINUTES = 40; // Change to desired minutes
```

## Privacy

- All data is stored locally in your browser
- No external data collection
- No tracking or analytics

## License

MIT License - Feel free to modify and share!