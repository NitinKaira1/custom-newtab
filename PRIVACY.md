# Privacy

Custom New Tab runs entirely in your browser.

- **No account, no analytics, no tracking.** Nothing is sent to the author.
- **Your data stays on your device**: settings (browser storage) and uploaded wallpapers (IndexedDB).
- **Network requests**: only the optional weather widget, which sends the city you typed to
  [Open-Meteo](https://open-meteo.com) to get the temperature. Shortcut/bookmark icons come from the browser's own favicon cache.
- **Tabs, scripting and all-sites access** are used only by the audio widgets and visualizer to read the title, artwork,
  progress and audio of the tab that is playing, and to send play/pause/seek/next commands. This information is shown on your
  new tab page and is never stored or transmitted.
- **Bookmarks** are read locally to show the bookmarks widget and search. They are never modified or sent anywhere.

If you do not use the audio widgets, visualizer or bookmarks widget, those features do nothing.
