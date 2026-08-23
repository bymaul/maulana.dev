# Portfolio

My personal website, built with Next.js and Tailwind CSS. Design inspired by [nevflynn.com](https://nevflynn.com).

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

## Getting Started

Requires [Node.js](https://nodejs.org/) 20.9+ and [pnpm](https://pnpm.io).

```bash
git clone https://github.com/bymaul/portfolio.git
cd portfolio
pnpm install
```

Create a `.env.local` file with a [Mapbox access token](https://account.mapbox.com/access-tokens/):

```bash
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token
```

Optional Spotify env vars for the now-playing widget: `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN`.

```bash
pnpm dev
```

## Scripts

| Command          | Description                  |
| ---------------- | ---------------------------- |
| `pnpm dev`       | Start the development server |
| `pnpm build`     | Build for production         |
| `pnpm start`     | Run the production build     |
| `pnpm lint`      | Run ESLint                   |
| `pnpm typecheck` | Check types with TypeScript  |
| `pnpm format`    | Format code with Prettier    |

## Project Structure

```
.
├── app/          # App Router routes, layouts, and pages
├── components/   # Reusable UI components
├── config/       # Site configuration (metadata, nav, etc.)
├── content/      # MDX content (posts, projects, etc.)
├── hooks/        # Custom React hooks
├── lib/          # Utilities and shared logic
└── public/       # Static assets
```

## License

Open source under [MIT](LICENSE). Feel free to explore the code for inspiration, but please don't copy the content, design, or branding as your own.
