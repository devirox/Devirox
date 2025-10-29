This repository hosts the Devirox portfolio built with the Next.js App Router and Tailwind CSS. It now includes a lightweight
custom authentication system inspired by the Web Dev Simplified "Custom Next.js Authentication" example.

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

> **Note:** The project pins Tailwind CSS v4 preview packages. If your environment enforces a custom registry, add an `.npmrc`
> entry pointing `@jsr` scoped packages to `https://registry.npmjs.org/` so the install can complete.

### 2. Configure environment variables

Copy the provided template and customise the values as needed:

```bash
cp .env.example .env
```

- `AUTH_SECRET` should be a long, random string used to sign session tokens. You can generate one with `openssl rand -hex 32`.

### 3. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to explore the public portfolio. Authenticated users can access the
`/dashboard` route to view private portfolio management tools.

## Authentication overview

- Users can register and sign in with email and password credentials.
- Credentials are hashed with Node.js `scrypt` and stored in a JSON file at `data/users.json` for an easy-to-review demo setup.
- Session cookies contain HMAC-signed payloads to verify authenticity without external dependencies.
- Middleware protects `/dashboard` while redirecting signed-in users away from the `/login` and `/register` routes.

## Useful scripts

- `pnpm dev` – start the Next.js development server.
- `pnpm build` – create an optimized production build.
- `pnpm start` – run the production server.
- `pnpm lint` – lint the project.
