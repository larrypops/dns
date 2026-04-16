# DNS Assainissement - Next.js

Application migrée vers **Next.js App Router** (racine unique: `src/app`).

## Prérequis

- Node.js 20+
- npm 10+

## Lancer en local

1. Installer les dépendances
   ```bash
   npm install
   ```
2. Démarrer le serveur de dev
   ```bash
   npm run dev
   ```
3. Ouvrir [http://localhost:3000](http://localhost:3000)

## Scripts

- `npm run dev` : développement
- `npm run build` : build production
- `npm run start` : démarrer la build
- `npm run lint` : vérification TypeScript

## Déploiement Vercel

- Framework preset: **Next.js**
- Root directory: racine du repo
- Build command: `npm run build`
- Install command: `npm install`
- Si Vercel garde un cache obsolète après migration, relancer un déploiement avec **Clear build cache**.

## Assets locaux

Les visuels sont servis depuis `public/images`:
- `logo.jpg` (header, footer, favicon)
- `image.jpg`
- `flyer.jpg`
- `whatsapp-logo.svg` (bouton flottant)
