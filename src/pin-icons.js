// Icon set shared by the editor and the exported player.
// Each entry is the inner markup of a 24x24 stroke icon. The consuming
// stylesheet supplies fill, stroke, width and linecaps so the same paths
// render identically in the editor viewer and in a published tour.

export const pinIcons = {
  arrow: { label: 'Arrow', path: '<path d="M4 12h15M13 6l6 6-6 6"/>' },
  door: { label: 'Door', path: '<path d="M7 21V4h10v17M4 21h16M13.6 12.4h.01"/>' },
  stairs: { label: 'Stairs', path: '<path d="M4 20h4v-4h4v-4h4v-4h4"/>' },
  info: { label: 'Info', path: '<circle cx="12" cy="12" r="9"/><path d="M12 11.2v5M12 7.9h.01"/>' },
  bed: { label: 'Bedroom', path: '<path d="M2 20v-5h20v5M4 15V8h16v7M8 12h8"/>' },
  kitchen: { label: 'Kitchen', path: '<rect x="4" y="6" width="16" height="14" rx="2"/><path d="M4 15h16"/><circle cx="9" cy="10.5" r="1.4"/><circle cx="15" cy="10.5" r="1.4"/>' },
  bath: { label: 'Bathroom', path: '<path d="M12 3.2c0 0 6.2 6.6 6.2 10.6a6.2 6.2 0 0 1-12.4 0C5.8 9.8 12 3.2 12 3.2z"/>' },
  tree: { label: 'Garden', path: '<path d="M12 3 6.8 11.4h3.1L6 17.6h12l-3.9-6.2h3.1z"/><path d="M12 17.6V21"/>' },
  car: { label: 'Parking', path: '<path d="M4 17v-4l2-5.2h12L20 13v4M4.5 17h15"/><circle cx="7.5" cy="17.3" r="1.6"/><circle cx="16.5" cy="17.3" r="1.6"/>' },
  star: { label: 'Feature', path: '<path d="m12 3.4 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.9l6.1-.9z"/>' },
  eye: { label: 'Viewpoint', path: '<path d="M2.5 12S6 6.2 12 6.2 21.5 12 21.5 12 18 17.8 12 17.8 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.6"/>' },
  play: { label: 'Media', path: '<circle cx="12" cy="12" r="9"/><path d="m10.2 8.4 5.6 3.6-5.6 3.6z"/>' },
}

export const defaultHotspotIcon = 'arrow'
export const defaultInfoIcon = 'info'

export function pinIconSvg(name, fallback = defaultHotspotIcon) {
  const icon = pinIcons[name] || pinIcons[fallback] || pinIcons.arrow
  return `<svg class="pin-icon" viewBox="0 0 24 24" aria-hidden="true">${icon.path}</svg>`
}
