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

## Branding

The wordmark uses the `--brand-font` custom property in `src/style.css`, which defaults to Bungee, the closest freely licensed face to the Chaos Created wordmark. To use the licensed Chaos Created display face instead, drop the web font files into `public/fonts`, uncomment the `@font-face` block at the top of that file, and point `--brand-font` at the family name.

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
| Node version | read from `engines.node` in `package.json` |

Sevalla builds with Nixpacks, which takes the Node version from the
`engines` field, so the build matches local development without any extra
dashboard configuration.

Connect the repository in the Sevalla dashboard and pick the branch to
deploy. Pushes to that branch then rebuild automatically.

`vite.config.js` sets `base: './'`, which keeps every asset path relative.
That works whether the site is served from a domain root or a subpath, and
it is also what lets an exported tour run from any folder.
