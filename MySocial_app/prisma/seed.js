const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.comment.deleteMany();
  await prisma.like.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  const user1 = await prisma.user.create({
    data: {
      username: "user1",
      email: "user1@test.com",
      password: "123456",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: "user2",
      email: "user2@test.com",
      password: "123456",
    },
  });

  const user3 = await prisma.user.create({
    data: {
      username: "user3",
      email: "user3@test.com",
      password: "123456",
    },
  });

  const post1 = await prisma.post.create({
    data: {
      content: "Hello world",
      userId: user1.id,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      content: "This is my second post",
      userId: user1.id,
    },
  });

  const post3 = await prisma.post.create({
    data: {
      content: "Hi from user2",
      userId: user2.id,
    },
  });

  await prisma.comment.create({
    data: {
      content: "Nice post!",
      postId: post1.id,
      authorId: user2.id,
    },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
