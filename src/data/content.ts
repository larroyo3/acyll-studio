// Contenu éditorial de la page d'accueil. Les valeurs entre crochets sont à compléter.
import type { IconName } from '../lib/icons';
import { site } from './site';

export const technologies: { name: string; highlight?: boolean }[][] = [
  [
    { name: 'Kotlin' },
    { name: 'Jetpack Compose', highlight: true },
    { name: 'Kotlin Multiplatform' },
    { name: 'SwiftUI' },
    { name: 'Swift' },
  ],
  [
    { name: 'Android' },
    { name: 'iOS' },
    { name: 'Google Play', highlight: true },
    { name: 'App Store' },
    { name: 'Flutter' },
    { name: 'React Native' },
  ],
];

export const clients = ['Sogelink', 'Dict.fr', 'Musherr', '[Logo client]', '[Logo client]', '[Logo client]'];

export const services: { icon: IconName; title: string; text: string; items: string[] }[] = [
  {
    icon: 'phone',
    title: 'Création d’application',
    text: 'Vous avez une idée ? Je la transforme en application Android et iOS publiée sur les stores, prête pour vos premiers utilisateurs.',
    items: ['Atelier de cadrage', 'Parcours et maquettes', 'Développement Android et iOS', 'Publication sur les stores'],
  },
  {
    icon: 'layers',
    title: 'Kotlin Multiplatform',
    text: 'Démarrer en multiplateforme ou y migrer une app existante, pour partager le code entre Android et iOS sans sacrifier l’expérience native.',
    items: ['Audit de l’existant', 'Architecture partagée', 'Interfaces Compose et SwiftUI', 'Migration progressive'],
  },
  {
    icon: 'wrench',
    title: 'Reprise et maintenance',
    text: 'Votre app a besoin d’une mise à jour, d’une correction ou d’un nouveau souffle ? Je reprends le code là où il en est, même hors de mes technos habituelles.',
    items: ['Audit du code', 'Correction de bugs', 'Montées de version', 'Android, React Native, Flutter'],
  },
  {
    icon: 'compass',
    title: 'Conseil et renfort d’équipe',
    text: 'Besoin d’un avis avant d’investir, ou d’un développeur mobile en plus dans votre équipe ? Je m’intègre à votre organisation, sur site ou à distance.',
    items: ['Choix techniques', 'Estimation et roadmap', 'Revue de code', 'Renfort en régie'],
  },
];

export const steps: { badge: string; solid?: boolean; title: string; text: string }[] = [
  { badge: '30 min · gratuit', solid: true, title: 'Appel découverte', text: 'On parle de votre projet, de vos utilisateurs et de vos contraintes. Vous repartez avec un premier avis concret.' },
  { badge: 'Devis détaillé', title: 'Cadrage et devis', text: 'Vous recevez un devis détaillé : périmètre, planning et prix. Les projets plus longs peuvent être découpés en étapes.' },
  { badge: 'Démos régulières', title: 'Développement', text: 'Un point de lancement, puis des versions à tester directement sur votre téléphone tout au long du projet.' },
  { badge: 'Sur la durée', title: 'Publication et suivi', text: 'Mise en ligne sur Google Play et l’App Store, puis maintenance et nouvelles versions à votre rythme.' },
];

export const stats: { value: string; label: string }[] = [
  { value: '3+', label: 'années de développement mobile' },
  { value: '20 000+', label: 'téléchargements sur Dict.fr Mobile' },
  { value: '5/5', label: 'note moyenne de mes clients sur Malt' },
  { value: site.missions, label: 'missions réalisées en freelance' },
];

// Avis Malt : `highlight` affiche la carte en rouge.
export const testimonials: { quote: string; author: string; mission: string; highlight?: boolean }[] = [
  { quote: '[Avis client : le résultat obtenu et la qualité du travail livré.]', author: '[Prénom N.]', mission: '[Mission · Entreprise]' },
  { quote: '[Avis client : le respect des délais et la communication pendant la mission.]', author: '[Prénom N.]', mission: '[Mission · Entreprise]', highlight: true },
  { quote: '[Avis client : l’autonomie et les conseils apportés au-delà du code.]', author: '[Prénom N.]', mission: '[Mission · Entreprise]' },
  { quote: '[Avis client : la qualité du code et la facilité de reprise par l’équipe.]', author: '[Prénom N.]', mission: '[Mission · Entreprise]' },
  { quote: '[Avis client : ce qu’il dirait à quelqu’un qui hésite à se lancer.]', author: '[Prénom N.]', mission: '[Mission · Entreprise]', highlight: true },
];

export interface Offer {
  title: string;
  subtitle: string;
  price: string;
  /** Texte avant le prix (« à partir de ») ou après (« / jour »). */
  prefix?: string;
  suffix?: string;
  items: string[];
  cta: string;
  featured?: boolean;
}

export const offers: Offer[] = [
  {
    title: 'Audit et conseil',
    subtitle: 'Pour y voir clair avant d’investir.',
    prefix: 'à partir de',
    price: '[XXX] €',
    items: ['Analyse de votre idée ou de votre app', 'Recommandations techniques écrites', 'Estimation chiffrée et roadmap'],
    cta: 'Demander un audit',
  },
  {
    title: 'Application sur mesure',
    subtitle: 'Votre app Android et iOS, de l’idée aux stores.',
    prefix: 'à partir de',
    price: '[X XXX] €',
    items: ['Cadrage, parcours et maquettes', 'Développement Kotlin Multiplatform', 'Publication Google Play et App Store', '[X] mois de support après la mise en ligne'],
    cta: 'Demander un devis',
    featured: true,
  },
  {
    title: 'Renfort d’équipe',
    subtitle: 'Un développeur mobile dans votre équipe.',
    price: '[XXX] €',
    suffix: '/ jour',
    items: ['Android natif et Kotlin Multiplatform', 'À distance, en hybride ou sur site', 'Intégration rapide à vos outils'],
    cta: 'Vérifier mes disponibilités',
  },
];

export const pricingNote = 'Devis gratuit sous [X] jours · Paiement échelonné possible · Facturation par Acyll Studio';

export const timeline: { period: string; place: string; role: string }[] = [
  { period: '2019 – 2024', place: 'Epitech Lyon', role: 'Expert en informatique' },
  { period: '2022 – 2023', place: 'Algebra, Zagreb', role: 'M1 Software Engineering' },
  { period: '2023 – 2025', place: 'Sogelink', role: 'Ingénieur mobile, Dict.fr' },
  { period: 'Depuis 2025', place: 'Acyll Studio', role: 'Développeur freelance' },
];

export const faq: { q: string; a: string }[] = [
  {
    q: 'Combien coûte une application mobile ?',
    a: 'Tout dépend du nombre d’écrans, des fonctionnalités et des services à connecter. Après l’appel découverte, vous recevez un devis détaillé et transparent : vous savez exactement ce que vous payez, et pourquoi.',
  },
  {
    q: 'Combien de temps faut-il pour créer une app ?',
    a: 'Une première version testable arrive généralement en quelques semaines, une app complète en quelques mois. Le planning exact est fixé ensemble dans le devis.',
  },
  {
    q: 'Faut-il développer deux apps pour Android et iOS ?',
    a: 'Non. Avec Kotlin Multiplatform, la logique de l’app est partagée entre les deux plateformes, tandis que les interfaces restent natives. Vous payez moins de développement pour la même qualité.',
  },
  {
    q: 'Pouvez-vous reprendre une app existante ?',
    a: 'Oui. Je commence par un audit du code pour faire le point, puis je corrige, mets à jour ou fais évoluer l’app, qu’elle soit en Android natif, en React Native ou en Flutter.',
  },
  {
    q: 'À qui appartient le code de mon application ?',
    a: '[À préciser selon vos conditions : en général, le code source et les accès aux stores sont remis au client à la fin du projet.]',
  },
  {
    q: 'Travaillez-vous à distance ?',
    a: 'Oui, partout en France et à l’étranger, en français ou en anglais. Je suis basé à Lyon et je peux venir sur site quand le projet le demande.',
  },
];

export const projectTypes = ['Nouvelle application', 'Reprise d’une app existante', 'Audit et conseil', 'Renfort d’équipe'];
export const budgets = ['Je ne sais pas encore', 'Moins de 5 000 €', '5 000 à 15 000 €', '15 000 à 30 000 €', 'Plus de 30 000 €'];
