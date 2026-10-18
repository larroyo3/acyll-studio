// Projets affichés dans « Réalisations » : la carte du carrousel, les couleurs que prend la
// section quand le projet est ouvert, et le contenu de son étude de cas.
export type ProjectId = 'kadanz' | 'musherr' | 'dictfr' | 'thurii';

export interface Project {
  id: ProjectId;
  name: string;
  /** Deux lignes en haut de la carte. */
  label: [string, string];
  summary: string;
  chips: [string, string];
  kind: string;
  tagline: string;
  /** Typo du nom du projet : `tracking` pour l'étude de cas, `card*` pour la carte du carrousel. */
  title: { font: string; weight: number; tracking: string; cardSize: number; cardTracking: string };
  theme: {
    bg: string;
    panel: string;
    glow: string;
    ink: string;
    ink2: string;
    accent: string;
    onAccent: string;
    accentText: string;
    line: string;
  };
  card: { iconBg: string; screen: string; chipLine: string; sectionLine: string };
  meta: { k: string; v: string }[];
  context: string;
  challenge: string;
  done: { t: string; d: string }[];
  facts: { v: string; l: string }[];
  stack: string[];
}

const poppins = { font: 'var(--font-title)', weight: 700, tracking: '-0.03em', cardSize: 38, cardTracking: '-0.02em' };

export const projects: Project[] = [
  {
    id: 'kadanz',
    name: 'Kadanz',
    label: ['App perso · 2026', 'Android & iOS'],
    summary: 'Un objectif d’épargne devient une carte d’embarquement.',
    chips: ['Compose', 'SwiftUI'],
    kind: 'App perso · Android & iOS',
    tagline: 'Un objectif d’épargne devient une carte d’embarquement.',
    title: { font: "'Jost', sans-serif", weight: 300, tracking: '0.04em', cardSize: 40, cardTracking: '0.04em' },
    theme: {
      bg: '#0f2a3f', panel: '#163852', glow: '#1d4763', ink: '#ffffff', ink2: '#9fc4df',
      accent: '#c79a4b', onAccent: '#0f2a3f', accentText: '#e3c489', line: 'rgba(255,255,255,0.16)',
    },
    card: { iconBg: '#163852', screen: '#163852', chipLine: 'rgba(255,255,255,0.28)', sectionLine: 'rgba(255,255,255,0.2)' },
    meta: [
      { k: 'Rôle', v: 'Conception, design system et développement' },
      { k: 'Plateformes', v: 'Android (Jetpack Compose) · iOS (SwiftUI)' },
      { k: 'Année', v: '2026' },
      { k: 'Statut', v: 'Bientôt sur les stores' },
    ],
    context:
      'Kadanz transforme un objectif d’épargne en billet d’avion. Le billet compte les jours jusqu’au départ, et un repère sur la trajectoire indique où l’épargne devrait en être aujourd’hui. Pas de banque connectée, pas de budget à tenir : un objectif, un rythme.',
    challenge:
      'Rendre l’épargne motivante sans jamais culpabiliser : pas de badges, pas de séries à tenir, seulement des dates et des montants.',
    done: [
      { t: 'Un design system partagé', d: 'Android et iOS lisent les mêmes tokens : couleurs, typographies, espacements. Aucune plateforme n’invente une couleur ou une taille.' },
      { t: 'Deux apps natives', d: 'Jetpack Compose sur Android, SwiftUI sur iOS, avec le même billet, les mêmes thèmes et le même comportement.' },
      { t: 'Un billet qui prend vie', d: 'Trajectoire animée, tableau des départs qui s’affiche lettre par lettre, tampon pour les billets archivés.' },
    ],
    facts: [
      { v: '1 billet', l: 'trois thèmes : nuit, clair et embarqué' },
      { v: '2 plateformes', l: 'un seul jeu de tokens' },
      { v: '0 compte', l: 'bancaire connecté, par choix' },
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'Swift', 'SwiftUI', 'Design tokens'],
  },
  {
    id: 'musherr',
    name: 'Musherr',
    label: ['Mission client · 2026', 'Android & iOS'],
    summary: 'Une app développée de A à Z, en Kotlin Multiplatform.',
    chips: ['KMP', 'GPS'],
    kind: 'Mission client · Android & iOS',
    tagline: 'Une application mobile développée seul, de la première ligne de code à la publication.',
    title: poppins,
    theme: {
      bg: '#eaf1f4', panel: '#ffffff', glow: '#d6e3ea', ink: '#12212b', ink2: '#3f5563',
      accent: '#c94a20', onAccent: '#ffffff', accentText: '#a8381a', line: 'rgba(18,33,43,0.14)',
    },
    card: { iconBg: '#c94a20', screen: '#d6e3ea', chipLine: 'rgba(18,33,43,0.25)', sectionLine: 'rgba(18,33,43,0.2)' },
    meta: [
      { k: 'Client', v: 'Nicolas G.' },
      { k: 'Rôle', v: 'Seul développeur, de A à Z' },
      { k: 'Plateformes', v: 'Android et iOS · Kotlin Multiplatform' },
      { k: 'Statut', v: 'En cours depuis plus de 4 mois' },
    ],
    context:
      'Musherr est l’application de mon client Nicolas. Je la développe seul, de A à Z : architecture, développement Android et iOS, préparation de la publication sur les stores. Le projet avance par jalons, chacun avec son devis.',
    challenge:
      'Livrer une app Android et iOS fiable avec une seule base de code et un suivi GPS précis, en gardant le budget sous contrôle.',
    done: [
      { t: 'Une base de code, deux apps', d: 'La logique métier est écrite une fois en Kotlin Multiplatform et partagée entre Android et iOS.' },
      { t: 'Des jalons et des devis clairs', d: 'Chaque étape démarre par un devis et un mail de kick-off, et se termine par une livraison à tester.' },
      { t: 'Le suivi GPS', d: 'Le jalon en cours ajoute le suivi GPS, avec la mise à niveau iOS qui l’accompagne.' },
    ],
    facts: [
      { v: '4+ mois', l: 'de collaboration continue' },
      { v: '1 seul dev', l: 'du cadrage à la publication' },
      { v: '1 base', l: 'de code pour Android et iOS' },
    ],
    stack: ['Kotlin Multiplatform', 'Jetpack Compose', 'SwiftUI', 'Suivi GPS'],
  },
  {
    id: 'dictfr',
    name: 'Dict.fr Mobile',
    label: ['Sogelink · 2023 – 2025', 'Android & iOS'],
    summary: 'L’app des pros du BTP. Plus de 20 000 téléchargements.',
    chips: ['KMP', 'Équipe de 8'],
    kind: 'Sogelink · BTP',
    tagline: 'L’app mobile de Dict.fr pour les professionnels du BTP, sur Android et iOS.',
    title: poppins,
    theme: {
      bg: '#1b2026', panel: '#242b33', glow: '#2b333d', ink: '#ffffff', ink2: '#b9c2cc',
      accent: '#f2b705', onAccent: '#1b2026', accentText: '#f2b705', line: 'rgba(255,255,255,0.14)',
    },
    card: { iconBg: '#242b33', screen: '#242b33', chipLine: 'rgba(255,255,255,0.28)', sectionLine: 'rgba(255,255,255,0.2)' },
    meta: [
      { k: 'Entreprise', v: 'Sogelink' },
      { k: 'Rôle', v: 'Ingénieur développement mobile' },
      { k: 'Équipe', v: '8 personnes' },
      { k: 'Période', v: '2023 – 2025' },
    ],
    context:
      'Chez Sogelink, j’ai travaillé deux ans sur Dict.fr Mobile, une application métier utilisée sur le terrain par les professionnels du BTP, au sein d’une équipe de huit personnes.',
    challenge:
      'Faire évoluer une app en production, utilisée au quotidien sur les chantiers, sur Android et iOS en même temps.',
    done: [
      { t: 'Du code partagé', d: 'La logique commune est écrite en Kotlin Multiplatform, une seule fois pour les deux plateformes.' },
      { t: 'Des interfaces natives', d: 'Jetpack Compose côté Android, SwiftUI côté iOS, pour une app fluide sur chaque téléphone.' },
      { t: 'Le travail en équipe', d: 'Deux ans dans une équipe de huit, sur une app en production avec de vrais utilisateurs.' },
    ],
    facts: [
      { v: '20 000+', l: 'téléchargements' },
      { v: '2 ans', l: 'sur une app en production' },
      { v: '8', l: 'personnes dans l’équipe' },
    ],
    stack: ['Kotlin Multiplatform', 'Jetpack Compose', 'SwiftUI'],
  },
  {
    id: 'thurii',
    name: 'Thurii',
    label: ['Co-fondateur · 2021 – 2024', 'Android'],
    summary: 'Une app de randonnée, meilleur projet d’Epitech Lyon.',
    chips: ['Kotlin', 'Top 10'],
    kind: 'Co-fondateur · Android',
    tagline: 'Une app de randonnée lancée pendant mes études, élue meilleur projet d’Epitech Lyon.',
    title: poppins,
    theme: {
      bg: '#123a2c', panel: '#1a4a39', glow: '#1d5240', ink: '#f3f7ef', ink2: '#b7d0bf',
      accent: '#8fd694', onAccent: '#123a2c', accentText: '#8fd694', line: 'rgba(243,247,239,0.16)',
    },
    card: { iconBg: '#1a4a39', screen: '#1a4a39', chipLine: 'rgba(243,247,239,0.28)', sectionLine: 'rgba(243,247,239,0.2)' },
    meta: [
      { k: 'Rôle', v: 'Co-fondateur, développeur Android' },
      { k: 'Plateforme', v: 'Android · Kotlin' },
      { k: 'Période', v: '2021 – 2024' },
      { k: 'Statut', v: 'Retirée du Play Store' },
    ],
    context:
      'Thurii est une application de randonnée Android, co-fondée et développée pendant mes années à Epitech. Elle a réuni plus de 50 utilisateurs actifs avant d’être retirée du Play Store.',
    challenge: 'Lancer une app de zéro, en équipe, et la faire vivre auprès de vrais randonneurs.',
    done: [
      { t: 'L’app Android', d: 'Développement en Kotlin, d’abord avec des vues XML, puis migration vers Jetpack Compose.' },
      { t: 'La co-fondation', d: 'Porter le projet de l’idée aux premiers utilisateurs, en tant que co-fondateur.' },
      { t: 'La reconnaissance', d: 'Meilleur projet d’Epitech Lyon et top 10 Epitech France.' },
    ],
    facts: [
      { v: '50+', l: 'utilisateurs actifs' },
      { v: 'N° 1', l: 'meilleur projet Epitech Lyon' },
      { v: 'Top 10', l: 'Epitech France' },
    ],
    stack: ['Kotlin', 'Vues XML', 'Jetpack Compose'],
  },
];
