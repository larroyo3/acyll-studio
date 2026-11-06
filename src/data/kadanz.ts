// Logo de Kadanz, repris des assets de la marque (Kadanz/Assets/01_Logo).
// `mark` : le symbole billet « K » (variante nuit-or, celle de l'icône d'app), boîte 120 × 120.
// `wordmark` : KADANZ en Jost Light, vectorisé (le tracé d'origine est décalé de (-8.2, 72.7) : la viewBox en tient compte).
export const kadanzMark = {
  viewBox: '0 0 120 120',
  paper: 'M32 26H72A6 6 0 0 0 84 26H88A10 10 0 0 1 98 36V84A10 10 0 0 1 88 94H84A6 6 0 0 0 72 94H32A10 10 0 0 1 22 84V36A10 10 0 0 1 32 26Z',
  perforation: 'M78 36V84',
  k: 'M40 42V78M43 60L60 43M43 60L60 78',
} as const;

export const kadanzWordmark = {
  viewBox: '8.2 -72.7 465.1 75.4',
  d: 'M8.2 -70V0H13.7V-70ZM42.7 -70 12.1 -37.1 44.2 0H51.2L18.9 -37.2L49.7 -70ZM86.1 -23.5H122L120.2 -28.7H87.9ZM103.9 -60 117.7 -26.6 118.2 -25.3 128.6 0H134.8L103.9 -72.7L73 0H79.2L89.7 -25.7L90.3 -26.9ZM164.1 -70V0H169.6V-70ZM183.1 0Q193.3 0 201.05 -4.4Q208.8 -8.8 213.15 -16.65Q217.5 -24.5 217.5 -35Q217.5 -45.5 213.15 -53.35Q208.8 -61.2 201.05 -65.6Q193.3 -70 183.1 -70H167.1V-64.5H183.1Q189.6 -64.5 194.95 -62.4Q200.3 -60.3 204.1 -56.45Q207.9 -52.6 209.95 -47.15Q212 -41.7 212 -35Q212 -28.3 209.95 -22.85Q207.9 -17.4 204.1 -13.55Q200.3 -9.7 194.95 -7.6Q189.6 -5.5 183.1 -5.5H167.1V0ZM255.9 -23.5H291.8L290 -28.7H257.7ZM273.7 -60 287.5 -26.6 288 -25.3 298.4 0H304.6L273.7 -72.7L242.8 0H249L259.5 -25.7L260.1 -26.9ZM387.1 -70V-11.4L333.9 -72.7V0H339.4V-58.4L392.6 2.7V-70ZM424.7 -64.8H463.9L422.7 0H471.7V-5.2H432.1L473.3 -70H424.7Z',
} as const;

// L'avion du trajet (Kadanz/Assets/05_Motifs/avion-trajet), boîte 120 × 120, nez vers le haut.
export const kadanzPlane =
  'M60 8C66 18 68 30 68 46L112 72L112 82L68 70L68 92L86 106L86 113L60 103L34 113L34 106L52 92L52 70L8 82L8 72L52 46C52 30 54 18 60 8Z';
