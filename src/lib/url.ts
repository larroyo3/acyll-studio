// Préfixe un chemin interne avec la base du site (ex. /acyll-studio sur GitHub Pages).
export function withBase(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

export const external = { target: '_blank', rel: 'noopener' } as const;
