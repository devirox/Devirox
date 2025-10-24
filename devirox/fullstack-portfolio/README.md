# Fullstack Developer Portfolio

This is a full-stack web developer portfolio project showcasing skills, projects, and a contact form for potential clients or employers.

## Project Structure

```
fullstack-portfolio
├── src
│   ├── pages
│   │   ├── index.tsx        # Home page
│   │   ├── about.tsx        # About page
│   │   ├── projects.tsx     # Projects page
│   │   ├── contact.tsx      # Contact page
│   │   └── api
│   │       └── contact.ts   # API for contact form
│   ├── components
│   │   ├── Layout.tsx       # Layout component
│   │   ├── Header.tsx       # Header component
│   │   ├── Footer.tsx       # Footer component
│   │   └── ProjectCard.tsx  # Project card component
│   ├── lib
│   │   ├── db.ts            # Database interactions
│   │   └── apiClient.ts     # API client functions
│   ├── styles
│   │   ├── globals.css       # Global styles
│   │   └── layout.module.css  # Layout specific styles
│   ├── hooks
│   │   └── useForm.ts       # Custom hook for form management
│   ├── types
│   │   └── index.ts         # TypeScript types and interfaces
│   └── utils
│       └── mailer.ts        # Email utility functions
├── prisma
│   └── schema.prisma        # Database schema for Prisma
├── tests
│   ├── pages
│   │   └── index.test.tsx   # Tests for Home page
│   └── components
│       └── ProjectCard.test.tsx # Tests for ProjectCard component
├── .env.example              # Example environment variables
├── .gitignore                # Git ignore file
├── package.json              # NPM configuration
├── tsconfig.json             # TypeScript configuration
├── next.config.js            # Next.js configuration
├── Dockerfile                # Dockerfile for building the application
└── README.md                 # Project documentation
```

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd fullstack-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Copy the `.env.example` to `.env` and fill in the required values.

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000` to view the portfolio.

## Features

- **Home Page:** Introduction and overview of the portfolio.
- **About Page:** Information about the developer, including skills and background.
- **Projects Page:** Showcase of projects with descriptions and links.
- **Contact Page:** A contact form for inquiries.

## Technologies Used

- Next.js
- TypeScript
- Prisma
- CSS Modules
- Custom Hooks

## License

This project is licensed under the MIT License. See the LICENSE file for details.