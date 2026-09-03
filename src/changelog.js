// Release history, newest first. This is the single source of truth for the
// version the app reports, so add a new entry at the top whenever an update is
// pushed and keep the version in package.json matching the top entry.
//
// Keep notes written for the person using Showround rather than for us: what
// they can now do, not which files changed.

export const releases = [
  {
    version: '0.4.1',
    date: '2026-09-03',
    title: 'Notes stay in the picture',
    notes: [
      'A note attached near the edge of the picture now opens inwards instead of running off the side. This applies to published tours too.',
    ],
  },
  {
    version: '0.4.0',
    date: '2026-09-03',
    title: 'Tidier info points',
    notes: [
      'Long info point titles now wrap neatly inside their box instead of spilling across the picture.',
      'The settings panel only shows the fields that apply, so info points no longer ask you to link a scene.',
      'Info point notes now show how many characters you have left.',
    ],
  },
  {
    version: '0.3.0',
    date: '2026-09-03',
    title: 'A front door for Showround',
    notes: [
      'showround.app now has a home page, and the editor has moved to showround.app/app. Worth updating your bookmark.',
    ],
  },
  {
    version: '0.2.0',
    date: '2026-09-03',
    title: 'Pick up where you left off',
    notes: [
      'You can now import a tour you exported earlier and carry on editing it, scenes, hotspots, icons and all.',
    ],
  },
  {
    version: '0.1.0',
    date: '2026-09-03',
    title: 'Showround is live',
    notes: [
      'Scenes can now be 360° photos as well as video, and a single tour can mix the two freely.',
      'Hotspots and info points take an icon from a set of twelve, chosen when you place one and changeable afterwards.',
      'A new Embed button gives you the code to drop a tour into any web page, with the picture filling the frame.',
    ],
  },
]

export const currentRelease = releases[0]
