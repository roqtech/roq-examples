import { PrismaClient } from '@prisma/client'

// initialize the Prisma Client
const prisma = new PrismaClient()

async function main() {
  // create two dummy articles
  const user1 = await prisma.user.upsert({
    where: { email: 'alice_smith@example.com' },
    update: {},
    create: {
      first_name: 'Alice',
      last_name: 'Smith',
      email: 'alice_smith@example.com',
      password: '$2a$10$Fnd0k8cUFhJZMN28osf0ROD1bW8xvJpMewbmdYnoPMkwGo2hX8ZFG',
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'bob_johnson@example.com' },
    update: {},
    create: {
      first_name: 'Bob',
      last_name: 'Johnson',
      email: 'bob_johnson@example.com',
      password: '$2a$10$3r8hL3eQ0vfYiVnzDq3HWez4ep0l6sj0oVhLxIaSslA1Rbh6YIF7K',
    },
  })

  const user3 = await prisma.user.upsert({
    where: { email: 'charlie_brown@example.com' },
    update: {},
    create: {
      first_name: 'Charlie',
      last_name: 'Brown',
      email: 'charlie_brown@example.com',
      password: '$2a$10$kyKcUk7VJgUNN.qRbf25Yefuo6U5jVU9e5pZ7fUmdfgLdD7V1iQ2a',
    },
  })

  console.log({ user1, user2, user3 })
}

// execute the main function
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    // close the Prisma Client at the end
    await prisma.$disconnect()
  })
