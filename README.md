# neu events — Luxury Wedding Planning

Next.js site for neu events wedding planning. Built for local development and deployment on [Vercel](https://vercel.com).

## Local preview

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Start development server |
| `npm run build`| Production build         |
| `npm run start`| Run production build     |
| `npm run lint` | Run ESLint               |

## Pages

- `/` — Home
- `/about` — About
- `/services` — Services & Portfolio
- `/travel` — Travel
- `/contact` — Contact

## Deploy to Vercel

1. Push this repo to GitHub.
2. In [vercel.com/new](https://vercel.com/new), import the repository.
3. Vercel detects Next.js automatically — no extra settings required.
4. Deploy. Future pushes to `main` trigger new deployments.

Alternatively, with the [Vercel CLI](https://vercel.com/docs/cli):

```bash
npx vercel
```

## Hero images

Self-hosted WebP files live in `public/images/hero/`. To re-download and optimize from source URLs, place originals in `public/images/hero/source/` and run:

```bash
npm run optimize:hero
```

## Project structure

```
app/           # Routes and global styles
components/    # Nav, Footer, homepage sections
lib/data.ts    # Copy and content data
```
