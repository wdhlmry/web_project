const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const user1 = await prisma.user.create({
    data: {
      username: "user1",
      email: "user1@test.com",
      password: "1234"
    }
  })

  const post1 = await prisma.post.create({
    data: {
      content: "Hello world",
      authorId: user1.id
    }
  })

  await prisma.comment.create({
    data: {
      content: "Nice post!",
      postId: post1.id,
      authorId: user1.id
    }
  })
}

main()
  .then(() => prisma.$disconnect())
  .catch(e => {
    console.error(e)
    prisma.$disconnect()
  })