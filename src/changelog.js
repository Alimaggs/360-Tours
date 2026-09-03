// Release history, newest first. This is the single source of truth for the
// version the app reports, so add a new entry at the top whenever an update is
// pushed and keep the version in package.json matching the top entry.
//
// Keep notes written for the person using Showround rather than for us: what
// they can now do, not which files changed.

export const releases = [
  {
    version: '0.1.0',
    date: '2026-09-03',
    title: 'Showround is live',
    notes: [
      'Scenes can now be 360° photos as well as video, and a single tour can mix the two freely.',
      'Hotspots and info points take an icon from a set of twelve, chosen when you place one and changeable afterwards.',
      'A new Embed button gives you the code to drop a tour into any web page, with the picture filling the frame.',
      'Chaos360 is now Showround, with a new mark and wordmark.',
    ],
  },
]

export const currentRelease = releases[0]
