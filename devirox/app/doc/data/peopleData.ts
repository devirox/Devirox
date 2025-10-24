export type Person = {
  name: string
  role: string
  avatar?: string
  experience: string
}

// Simple avatar URL helper using i.pravatar.cc (allowed in next.config)
export function getAvatarUrl(avatar?: string, size = 160) {
  // Use a stable query param so different names get different avatars
  const seed = avatar ? encodeURIComponent(avatar) : Math.random().toString(36).slice(2)
  return `https://i.pravatar.cc/${size}?u=${seed}`
}

export const people: Person[] = [
  {
    name: "Ava Martin",
    role: "Frontend Engineer",
    avatar: "ava.martin@example.com",
    experience: "5 years building performant, accessible UIs using React and Next.js.",
  },
  {
    name: "Liam Chen",
    role: "Full-stack Engineer",
    avatar: "liam.chen@example.com",
    experience: "Experienced in Node.js, Prisma, and cloud deployments.",
  },
  {
    name: "Sophia Patel",
    role: "Product Designer",
    avatar: "sophia.patel@example.com",
    experience: "Design systems, user research, and cross-platform product design.",
  },
  {
    name: "Noah Kim",
    role: "Backend Engineer",
    avatar: "noah.kim@example.com",
    experience: "APIs, data modeling and scaling services with PostgreSQL.",
  },
  {
    name: "Maya Rodriguez",
    role: "ML Engineer",
    avatar: "maya.rodriguez@example.com",
    experience: "Prototyping ML features and integrating models into production.",
  },
  {
    name: "Ethan Brown",
    role: "DevOps Engineer",
    avatar: "ethan.brown@example.com",
    experience: "CI/CD, infra-as-code, and observability best practices.",
  },
  {
    name: "Olivia Nguyen",
    role: "QA Engineer",
    avatar: "olivia.nguyen@example.com",
    experience: "Automated testing, e2e suites, and reliability engineering.",
  },
]

export default people
