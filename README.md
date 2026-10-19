# Acyll Studio · Landing page

Site vitrine d’Acyll Studio, studio de développement mobile Android et iOS.

En ligne : **https://larroyo3.github.io/acyll-studio/**

## Reste à faire

**Formulaire de contact**
- [ ] Créer le template EmailJS et ajouter les 3 secrets au repo (voir [Formulaire de contact](#formulaire-de-contact-emailjs)). D’ici là, le formulaire affiche un message invitant à écrire par email.

**Contenu à compléter** (valeurs entre crochets, visibles en ligne)
- [ ] `src/data/site.ts` : `siret`, `missions` (nombre de missions, affiché dans les chiffres clés et la carte Malt)
- [ ] `src/data/content.ts` :
  - [ ] `clients` : remplacer les 3 « [Logo client] »
  - [ ] `testimonials` : les 5 avis Malt (citation, prénom, mission)
  - [ ] `offers` : les prix des 3 formules et la durée du support (« [X] mois »)
  - [ ] `pricingNote` : le délai de devis (« [X] jours »)
  - [ ] `faq` : la réponse à « À qui appartient le code de mon application ? »
- [ ] Choisir l’email de contact dans `src/data/site.ts` : `lucas.arroyo70@gmail.com` (actuel, repris de la maquette) ou `acyll.studios@gmail.com` (celui du portfolio)

**Pages légales**
- [ ] `src/pages/mentions-legales.astro` : adresse du siège (le SIRET vient de `site.ts`)
- [ ] Relire les deux pages légales, notamment la durée de conservation des données (3 ans) dans `src/pages/confidentialite.astro`
- [ ] Ajouter un lien « CGV » dans `src/components/Footer.astro` quand elles existeront (retiré en attendant)

**Plus tard (optionnel)**
- [ ] Passer sur un domaine perso (voir [Domaine personnalisé](#domaine-personnalisé))
- [ ] Créer une image de partage dédiée en 1200×630 (aujourd’hui, l’aperçu sur les réseaux utilise le portrait)
- [ ] Mettre à jour Node (22.22 minimum) puis Astro (`npm install astro@latest`) : Astro est fixé en 7.3.8 pour rester compatible avec Node 22.21

## Stack

- [Astro](https://astro.build) : site 100 % statique, aucun framework JS côté client
- CSS natif (tokens du design system dans `src/styles/tokens.css`)
- [EmailJS](https://www.emailjs.com) pour le formulaire de contact
- Hébergement GitHub Pages, déployé par GitHub Actions à chaque push sur `main`

## Développement

```bash
npm install
npm run dev       # http://localhost:4321/acyll-studio/
npm run build     # vérifie les types puis génère dist/
npm run preview   # sert dist/ en local
```

Node 22.12 ou plus récent.

## Modifier le contenu

Tout le texte est dans `src/data/`, pas besoin de toucher aux composants :

| Fichier | Contenu |
| --- | --- |
| `site.ts` | Nom, email, liens (Calendly, LinkedIn, Malt, GitHub), SIRET, nombre de missions |
| `content.ts` | Technologies, clients, services, méthode, chiffres, avis, tarifs, parcours, FAQ, options du formulaire |
| `projects.ts` | Projets du carrousel « Réalisations » et leurs études de cas (textes et couleurs) |

Les valeurs entre crochets (`[X]`, `[XXX] €`, `[Prénom N.]`, `[VOTRE SIRET]`…) sont à compléter.
Pour toutes les lister : `grep -rnE "\[[A-ZÀ][^]'\"]*\]" src`.

La maquette d’origine est gardée en local dans `design-reference/` (exclue du dépôt).

## Formulaire de contact (EmailJS)

Le formulaire envoie les champs `name`, `email`, `project_type`, `budget`, `message` et `consent`.

1. Sur [dashboard.emailjs.com](https://dashboard.emailjs.com), réutiliser le service email déjà créé pour le portfolio (onglet **Email Services**, noter son *Service ID*).
2. Onglet **Email Templates** → **Create New Template** :
   - **Subject** : `Nouvelle demande Acyll Studio : {{project_type}}`
   - **Content** :
     ```
     Nom : {{name}}
     Email : {{email}}
     Type de projet : {{project_type}}
     Budget : {{budget}}

     {{message}}
     ```
   - **To Email** : ton adresse ; **From Name** : `{{name}}` ; **Reply To** : `{{email}}`
   - Enregistrer et noter le *Template ID*.
3. **Account** → **General** : copier la *Public Key* (la même que pour le portfolio).
4. Ajouter les trois valeurs en secrets du repo, puis relancer le déploiement :
   ```bash
   gh secret set PUBLIC_EMAILJS_SERVICE_ID  -R larroyo3/acyll-studio
   gh secret set PUBLIC_EMAILJS_TEMPLATE_ID -R larroyo3/acyll-studio
   gh secret set PUBLIC_EMAILJS_PUBLIC_KEY  -R larroyo3/acyll-studio
   gh workflow run deploy.yml -R larroyo3/acyll-studio
   ```

En local, copier `.env.example` en `.env` et y mettre les mêmes valeurs.
Tant que les clés manquent, le formulaire affiche un message invitant à écrire par email.

## Logotypes

Les polices de marque (Hitch Hike, TAN Headline) sont sous licence commerciale : elles ne sont pas publiées.
Les mots « Acyll », « Lucas » et « Acyll Studio » sont vectorisés dans `src/data/wordmarks.ts`, et le favicon dans `public/favicon.svg`.
Pour les régénérer : voir `scripts/wordmarks.py`.

## Domaine personnalisé

1. Créer `public/CNAME` contenant le domaine (ex. `acyll.studio`).
2. Dans `astro.config.mjs` : `site: 'https://acyll.studio'` et supprimer `base`.
3. Chez le registrar, pointer le domaine vers GitHub Pages ([documentation](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site)).
