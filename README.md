# Showround

_by Chaos Created_

Showround is a browser-based editor for turning 360-degree videos and photos into interactive tours. Upload scenes, connect them with hotspots, add information points, preview the journey, and export a self-contained tour package.

## Media

Scenes can be 360-degree video (MP4, WebM, MOV) or 360-degree stills (JPG, PNG, WebP), and a single tour can mix both. Stills are shown without the playback transport, and their interactions stay on screen for as long as the scene is open. Equirectangular source images larger than the GPU texture limit are downscaled to fit before they are uploaded to the sphere.

## Interactions

Hotspots move a visitor to another scene; info points reveal a note in place.
Both carry an icon chosen from a shared set of twelve (defined in
`src/pin-icons.js`), picked when the interaction is created and changeable
later in the inspector. The same definitions are injected into the exported
player, so a published tour draws the identical icons.

## Embedding

Every export contains `embed.html` alongside `index.html`. It is the same
tour with the page chrome removed: the scene picker floats over the top right
of the image, the transport bar appears only for video scenes, and a small
credit links back to showround.app. It fills whatever iframe it is given.

The Embed button in the editor writes the iframe snippet for you. Enter the
URL the uploaded tour folder will live at, adjust the size if you want, then
copy the code.

## Updating the player's look after export

Exported tours are self-contained, which means a design change would normally
never reach a tour someone already published. To get around that, both player
pages load a small theme stylesheet from this site immediately after their own
bundled `styles.css`:

```html
<link rel="stylesheet" href="./styles.css">
<link rel="stylesheet" href="https://showround.app/player/v1/theme.css">
```

That file lives at `public/player/v1/theme.css`. Because it loads second it
wins on the cascade, so editing it restyles every tour already pointing at
that version.

Three constraints keep this safe:

- **It has to stay optional.** `styles.css` always carries the complete
  design, and the theme layer only adjusts it. A tour whose copy fails to
  load still renders correctly, so a published tour cannot be broken by this
  site going down, and exports still work on a private network.
- **CSS only restyles markup that already exists.** Older exports have older
  markup, so anything structural needs a new player version instead.
- **Breaking changes get a new version directory.** `playerThemeVersion` in
  `src/export-player.js` sets what new exports point at. Old tours keep the
  version they shipped with, so `v1` has to keep working indefinitely.

To confirm the layer loaded on a given tour:

```js
getComputedStyle(document.documentElement).getPropertyValue('--showround-theme')
```

## Branding

The wordmark uses the `--brand-font` custom property in `src/style.css`, which defaults to Bungee, the closest freely licensed face to the Chaos Created wordmark. To use the licensed Chaos Created display face instead, drop the web font files into `public/fonts`, uncomment the `@font-face` block at the top of that file, and point `--brand-font` at the family name.

## Pages

The build has two entry points, wired up in `vite.config.js`:

| Path | Source | What it is |
| --- | --- | --- |
| `/` | `index.html` plus `src/landing.css` | Marketing landing page, no JavaScript |
| `/app/` | `app/index.html` plus `src/main.js` | The editor |

They are one project on purpose. It stays a single build and a single deploy,
sessions will not have to cross an origin once accounts exist, and it keeps
the root path free for published tour URLs such as `/t/<slug>`.

The landing page repeats the design tokens rather than importing the editor's
stylesheet, so that a 1.4MB app bundle is not pulled onto a static page. If
they drift, lift the `:root` block into a file both stylesheets import.

## Releases

The megaphone button in the top bar shows the version and what changed in it.
An orange dot appears on that button until the current version has been
opened, remembered per browser in `localStorage`.

`src/changelog.js` is the source of truth. Every push that users would notice
gets a new entry at the top:

```js
{
  version: '0.2.0',
  date: '2026-09-17',
  title: 'Short headline',
  notes: ['One sentence per change, written for the person using Showround.'],
}
```

Then set the same version in `package.json` so the two agree. Write the notes
in terms of what someone can now do rather than which files moved, and skip
releases that only contain refactoring or docs, since a what's new box with
nothing in it for the reader is worse than no box.

## Development

```sh
npm install
npm run dev
```

## Production

```sh
npm run build
```

## Deployment

The editor is a static build, so it is hosted on Sevalla as a **Static Site**
rather than an Application. Applications run a server process, which this
project does not need.

Sevalla settings:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Root directory | leave empty (the project is at the repo root) |
| Node version | 22 |

Static sites take the Node version from a dropdown on the Sevalla form, not
from `package.json`. The `engines` field is kept anyway so the expected
version is recorded in the repo and npm warns on a mismatch locally, but it
is the dropdown that decides the build image. Pick the same major version.

Connect the repository in the Sevalla dashboard and pick the branch to
deploy. Pushes to that branch then rebuild automatically.

`vite.config.js` sets `base: './'`, which keeps every asset path relative.
That works whether the site is served from a domain root or a subpath, and
it is also what lets an exported tour run from any folder.
