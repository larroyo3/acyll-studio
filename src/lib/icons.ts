// Icônes du site (24×24, trait). `fill: true` pour les icônes pleines.
export const icons = {
  check: { body: '<path d="M5 12.5l4.5 4.5L19 7.5"/>', stroke: 2.2 },
  star: { body: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>', fill: true },
  'arrow-right': { body: '<path d="M5 12h14M13 6l6 6-6 6"/>', stroke: 1.8 },
  'arrow-left': { body: '<path d="M19 12H5M11 6l-6 6 6 6"/>', stroke: 1.8 },
  'arrow-up-right': { body: '<path d="M7 17L17 7M8 7h9v9"/>', stroke: 1.6 },
  plus: { body: '<path d="M12 5v14M5 12h14"/>', stroke: 2 },
  menu: { body: '<path d="M4 8h16M4 16h16"/>', stroke: 1.8 },
  close: { body: '<path d="M6 6l12 12M18 6L6 18"/>', stroke: 1.8 },
  user: { body: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>', stroke: 1.6 },
  wallet: { body: '<rect x="3" y="6" width="18" height="13" rx="3"/><path d="M3 10h18M7 15h3"/>', stroke: 1.6 },
  phone: { body: '<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/>', stroke: 1.6 },
  layers: { body: '<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/><path d="M3 17.5l9 5 9-5"/>', stroke: 1.6 },
  wrench: { body: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4 2.6-2.6z"/>', stroke: 1.6 },
  compass: { body: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5 5-2z"/>', stroke: 1.6 },
} satisfies Record<string, { body: string; stroke?: number; fill?: boolean }>;

export type IconName = keyof typeof icons;
