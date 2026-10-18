// @ts-check
import { defineConfig } from 'astro/config';

// Hébergé sur https://larroyo3.github.io/acyll-studio/
// Pour passer sur un domaine perso : mettre le domaine dans `site`, retirer `base`
// et ajouter un fichier public/CNAME contenant ce domaine.
export default defineConfig({
  site: 'https://larroyo3.github.io',
  base: '/acyll-studio',
  // Garde les espaces entre éléments inline, comme en HTML classique.
  compressHTML: true,
});
