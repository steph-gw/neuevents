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

Original uploads live in `public/images/hero/`. To replace them, drop files into `public/images/hero/source/` and run:

```bash
npm run optimize:hero
```

Files under 1 MB are copied as-is. Only larger files are resized and compressed to WebP.

## Project structure

```
app/           # Routes and global styles
components/    # Nav, Footer, homepage sections
lib/data.ts    # Copy and content data
```
