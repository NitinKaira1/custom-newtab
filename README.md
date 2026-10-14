# Custom New Tab

A fast, private and fully customizable new-tab page for Brave, Chrome and Edge.
Video and image wallpapers, draggable widgets, a now-playing audio widget, a real sound-reactive visualizer,
bookmarks dock, scenes, themes and more. No account, no tracking, no heavy framework (about 100 KB).

> Replace `YOUR-USERNAME` / `YOUR-REPO` below after you create the repository.

## Features

| Area | What you get |
|---|---|
| Wallpapers | Upload your own image / GIF / video (looping), built-in library window with live hover preview, slideshow, day/night auto-switch, dim, blur, vignette, focus point, parallax |
| Widgets | Clock (digital + analog), date, greeting, search, shortcuts, notes, to-do, weather, focus timer, calendar, countdown, daily quote, bookmarks |
| Audio | Now-playing players (bar, pill, circle, card, mini) for any tab playing audio; visualizer (bars, mirror, dots, wave, radial) that reacts to real sound |
| Layout | Drag, resize and rotate any widget; snap to grid; zen mode; presets (Minimal / Balanced / Full) |
| Look | Themes, frosted / glossy / clear / OLED-black glass, accent color, fonts, custom CSS |
| Productivity | Command palette (`Ctrl+K`), bang search (`!yt`, `!gh`, `!w`, `!g`, `!r`), scenes (save whole looks), export / import |
| Open animation | Screen-fill loader with the site logo when you open a shortcut or bookmark |
| Performance | Instant first paint, Lite mode (no blur, still wallpaper), video pauses when the tab is hidden |

## Install (Brave / Chrome / Edge)

1. Go to the [Releases page](https://github.com/YOUR-USERNAME/YOUR-REPO/releases) and download `custom-newtab-extension.zip`
   (or click **Code > Download ZIP** and use the `extension` folder).
2. Extract the zip to a folder you will keep (do not delete it later, the extension runs from there).
3. Open `brave://extensions` (Chrome: `chrome://extensions`, Edge: `edge://extensions`).
4. Turn on **Developer mode** (top-right).
5. Click **Load unpacked** and select the extracted folder, the one that contains `manifest.json`.
6. Turn off any other new-tab extension (only one can control the new tab), then press `Ctrl+T`.

Brave and Chrome may show a "developer mode extensions" notice on startup. That is normal for extensions installed this way.

## First two minutes

1. Click the **gear** (bottom-right).
2. **Wallpapers** tab > *Upload your own* and pick an image or video, or open *Choose from library*.
3. **Widgets** tab > pick a preset (Minimal / Balanced / Full) and switch on the widgets you want.
4. **Widgets > Layout > Move & resize**: drag to move, drag the square corner to resize, the round corner to rotate,
   double-click to reset, arrow keys to nudge, `Esc` to finish.
5. **Settings** tab > themes, glass style, accent color. Use the search box at the top if you cannot find something.

## Keyboard shortcuts

| Key | Action |
|---|---|
| `Ctrl+K` / `Cmd+K` | Command palette (shortcuts, bookmarks, commands, `!yt cats` style searches) |
| `/` | Focus the search bar |
| `Z` | Toggle zen mode (move the mouse to peek) |
| `Esc` | Close panels, exit edit mode, cancel the open animation |

## Add your own wallpapers to the library

1. Copy your files into `extension/wallpapers/` (for example `blackhole.mp4` and a poster image `blackhole.jpg`).
2. Open `extension/app.js` and find the `LIB` array near the top. Add a line:
   ```js
   {n:"Black hole",t:"video",s:"wallpapers/blackhole.mp4",p:"wallpapers/blackhole.jpg"},
   {n:"Mountains",t:"img",s:"wallpapers/mountains.jpg"},
   ```
3. Save, open `brave://extensions` and click the reload icon on the extension.

Only add wallpapers you own or have permission to share. This repository ships no third-party wallpapers.

## Audio widgets and visualizer

- **Widgets > Audio players > Add audio widget**, then play something in another tab (YouTube, SoundCloud, YouTube Music, Spotify Web...).
  Click the artwork or title to jump to that tab.
- Play / pause / seek work on any site. Next / previous work on YouTube, YouTube Music, Spotify Web and SoundCloud; elsewhere they skip 10 s.
- **Visualizer > Source**
  - *Tab audio*: reads the real audio of the playing tab. Some sites use protected audio and cannot be read.
  - *Share audio*: the browser asks you to share a tab (tick "Share tab audio"); works for any site, must be restarted per tab.
  - *Demo animation*: a simple animation that moves while music plays.

## Permissions explained

| Permission | Why |
|---|---|
| `favicon` | Show real site icons on shortcuts and bookmarks |
| `tabs` | Find which tab plays audio; open a site in a background tab during the open animation |
| `scripting` + all-sites access | Read title, artwork, progress and audio of the playing tab; send play/pause/seek commands. Used only when you add audio widgets or the visualizer |
| `bookmarks` | Bookmarks widget and search in the command palette |
| `api.open-meteo.com` | Optional weather widget |

Nothing is sent to the author. See [PRIVACY.md](PRIVACY.md).

## Web version (no install)

A single-file web version lives in `docs/index.html` and can be hosted with GitHub Pages:
[https://YOUR-USERNAME.github.io/YOUR-REPO/](https://YOUR-USERNAME.github.io/YOUR-REPO/).
Wallpapers, widgets, scenes and themes work. Audio widgets, tab audio, the bookmarks widget (it shows demo bookmarks), real weather
and the background-tab open animation need the extension.

## Updating

1. Download the new release zip and extract it over the old folder (same location).
2. Open `brave://extensions` and click the reload icon.

Your settings and uploaded wallpapers are kept. Use **Settings > Backup > Export** first if you want a safety copy.

## Troubleshooting

| Problem | Fix |
|---|---|
| Blank page / nothing shows | `brave://extensions` > *Errors* button on the card, then open an issue with the message |
| Old new-tab page still shows | Turn off other new-tab extensions, then restart the browser |
| Extension disappeared | The folder you loaded was moved or deleted. Load it again |
| Visualizer does not move | Set Source to *Share audio* (the site may use protected audio) |
| Slow on an old PC | Settings > Look > *Lite mode* |
| Wallpaper video does not play | Use MP4 (H.264) or WebM; very large files are heavy, try 1080p |

## Contributing

Issues and pull requests are welcome. The extension is plain HTML, CSS and JavaScript with no build step.
To test changes, edit files in `extension/` and press reload on the extension card.

## License

[MIT](LICENSE)
