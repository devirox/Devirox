This repository hosts the Devirox portfolio built with the Next.js App Router and Tailwind CSS. It now includes a lightweight
custom authentication system inspired by the Web Dev Simplified "Custom Next.js Authentication" example.

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

> **Note:** The Tailwind CSS v4 preview that powers the design system is distributed via the JSR registry. Make sure you have a
> JSR token configured locally if `pnpm install` prompts for authentication.

### 2. Configure environment variables

Copy the provided template and customise the values as needed:

```bash
cp .env.example .env
```

- `DATABASE_URL` points to the SQLite file that Prisma will manage.
- `AUTH_SECRET` should be a long, random string used to sign session tokens. You can generate one with `openssl rand -hex 32`.

### 3. Prepare the database

Generate the Prisma client and push the schema to your SQLite database:

```bash
pnpm prisma generate
pnpm prisma db push
```

### 4. Run the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to explore the public portfolio. Authenticated users can access the
`/dashboard` route to view private portfolio management tools.

## Authentication overview

- Users can register and sign in with email and password credentials.
- Passwords are hashed with `bcryptjs` and stored in a Prisma-managed SQLite database.
- Signed JSON Web Tokens (JWTs) issued with `jose` are stored as secure HTTP-only cookies for session management.
- Middleware protects `/dashboard` while redirecting signed-in users away from the `/login` and `/register` routes.

## Useful scripts

- `pnpm dev` – start the Next.js development server.
- `pnpm build` – create an optimized production build.
- `pnpm start` – run the production server.
- `pnpm lint` – lint the project.
