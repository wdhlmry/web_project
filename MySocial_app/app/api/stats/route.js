import { NextResponse } from "next/server";
import UserRepo from "../../../repos/userRepo";
import PostRepo from "../../../repos/postRepo";

export async function GET() {
  try {
    const totalUsers = await UserRepo.countUsers();
    const totalPosts = await PostRepo.countPosts();
    const averagePostsPerUser = await PostRepo.averagePostsPerUser();
    const mostActive = await PostRepo.mostActiveUser();
    const latestPost = await PostRepo.latestPost();
    const usersWithNoPosts = await UserRepo.usersWithNoPosts();

    let mostActiveUser = null;

    if (mostActive.length > 0) {
      mostActiveUser = await UserRepo.getUserById(mostActive[0].userId);
    }

    return NextResponse.json({
      totalUsers,
      totalPosts,
      averagePostsPerUser,
      mostActiveUser: mostActiveUser
        ? {
            username: mostActiveUser.username,
            postsCount: mostActive[0]._count.id,
          }
        : null,
      latestPost: latestPost
        ? {
            content: latestPost.content,
            username: latestPost.user.username,
          }
        : null,
      usersWithNoPosts,
    });
  } catch (error) {
  console.error("STATS ERROR FULL:", error);

  return NextResponse.json(
    {
      message: error.message,
      stack: error.stack
    },
    { status: 500 }
  );
}
}
